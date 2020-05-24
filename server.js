// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8080;
app.listen(port, function () {
    console.log("Server is running at: " + port);
});


app.post('/addData', function (req, res) {
    const data = req.body;
    projectData.temperature = data.temperature - 273.15;
    projectData.date = data.date;
    projectData.feelings = data.feelings;
    res.end();
});

app.get('/all',function (req,res) {
    res.send(JSON.stringify(projectData));
});
