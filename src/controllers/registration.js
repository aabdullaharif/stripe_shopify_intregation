const RegistrationModel = require('../models/registration');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const { STRIPE_SUCCESS_URL, STRIPE_CANCEL_URL, STRIPE_WEBHOOK_SECRET } =
  process.env;

exports.registration = async (req, res) => {
  const {
    firstItemUrl,
    secondItemUrl,
    desiredSize,
    shippingSpeed,
    packageProtection,
    additionalNotes,
    firstName,
    lastName,
    email,
    birthday,
    dial_code,
    phoneNum,
    address1,
    address2,
    city,
    state,
    zipcode,
    country,
  } = req.body;

  const phoneNumber = dial_code + phoneNum;
  try {
    const items = {
      firstItemUrl,
      secondItemUrl,
      desiredSize,
      shippingSpeed,
      packageProtection,
      additionalNotes,
    };

    const registration = await RegistrationModel.create({
      items,
      firstName,
      lastName,
      email,
      birthday,
      phoneNumber,
      address1,
      address2,
      city,
      state,
      zipcode,
      country,
    });

    const customer = await stripe.customers.create({
      metadata: {
        c_id: registration._id.toString(),
      },
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'WholeSale Form',
            },
            unit_amount: 50,
          },
          quantity: 1,
        },
      ],
      customer: customer.id,
      success_url: `${STRIPE_SUCCESS_URL}`,
      cancel_url: `${STRIPE_CANCEL_URL}`,
    });

    res.status(201).json({ success: true, url: session.url });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

let endpointSecret;
endpointSecret = `${STRIPE_WEBHOOK_SECRET}`;

exports.handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let data;
  let eventType;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  data = event.data.object;
  eventType = event.type;

  if (eventType === 'checkout.session.completed') {
    stripe.customers
      .retrieve(data.customer)
      .then(async (customer) => {
        const customerId = customer.metadata.c_id;
        // console.log('customer', { customer });
        // console.log('data', { data });

        try {
          const registrationRes = await RegistrationModel.findOne({
            _id: customerId,
          });
          registrationRes.paid = true;
          await registrationRes.save();
        } catch (err) {
          console.error('Error updating "paid" status:', err);
        }
      })
      .catch((err) => console.log(err.message));
  }

  res.send().end();
};
