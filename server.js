require('dotenv').config();
const app = require('./app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT;

// Uncaught Expections
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server, Uncaught Exceptions');
  process.exit(1);
});

connectDB();

app.listen(process.env.PORT, () => {
  console.log(
    `Server is started in ${process.env.NODE_ENV} at PORT:${process.env.PORT}`
  );
});
