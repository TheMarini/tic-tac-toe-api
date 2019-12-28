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
let app = require('express')();
let server = require('http').createServer(app);

// --- USES ---
app.use(morgan('[:date[web]] [:response-time ms] [:status] :method :url'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors());

// START SERVER
app.listen(port, _ => {
	try {
	  console.log(`Server is running at ${port}`);
	} catch (e) {
		console.error(e)
	}
});
