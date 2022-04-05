const express = require('express');
const app = express();

// enable the static folder...
app.use(express.static('public'));

// import the dataset to be used here
const garments = require('./garments.json');

const PORT = process.env.PORT || 4017;

// API routes to be added here
app.get('/api/garments', function(req, res){
	// note that this route just send JSON data to the browser
	// there is no template
	res.json({garments});
});
app.listen(PORT, function() {
	console.log(`App started on port ${PORT}`)
});