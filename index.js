// --- REQUIRES ---
// Environment variables
require('dotenv').config();
// Middleware for requests
const bodyParser = require('body-parser');
// Requests logger
const morgan = require('morgan');
// Cors (Cross origin requests)
const cors = require('cors');

// --- CONFIGS ---
const port = process.env.PORT || 3000;
const app = require('express')();

// --- USES ---
app.use(morgan('[:date[web]] [:response-time ms] [:status] :method :url'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

// Routes
app.use(require('./src/routes/v1'));

// --- LISTEN ---
app.listen(port, () => {
  try {
    console.log(`Server is running at ${port}`);
  } catch (e) {
    console.error(e);
  }
});
