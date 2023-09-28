# Shopify | Stripe | Node 

## Project Description
This project aims to seamlessly integrate a wholesaler form into a Shopify website. When customers submit the form, a Stripe checkout view is displayed, allowing them to input their card details and complete the purchase. The Node.js application serves as the backend to handle form routes and provides an admin dashboard to view responses from both paid and unpaid customers.

## Project Setup

### Prerequisites

Before you begin, make sure you have the following software/tools installed:

- Node.js
- MongoDB
- Stripe Account (for payment processing)
- Shopify Website (for form integration)

### Installation

1. Clone the repository:

```shell
git clone https://github.com/aabdullaharif/stripe_shopify_intregation.git
cd stripe_shopify_intregation

npm install
```

2. Add following environment variables in .env:
```shell
PORT=3000               # Port on which the server will run
NODE_ENV=Development    # Environment (Development/Production)

MONGO_URI=              # MongoDB connection URI
CORS_ORIGIN=            # Define CORS origin (e.g., http://localhost:3000)

STRIPE_PRIVATE_KEY=     # Your Stripe private key
STRIPE_WEBHOOK_SECRET=  # Your Stripe webhook secret

STRIPE_SUCCESS_URL=     # Stripe success URL (e.g., http://localhost:3000/success)
STRIPE_CANCEL_URL=      # Stripe cancel URL (e.g., http://localhost:3000/cancel)

COOKIE_EXPIRE=          # Define cookie expiration time (e.g., 30d)
JWT_SECRET=             # Your JWT secret key

```

3. Run the server
```shell
npm run dev
```
