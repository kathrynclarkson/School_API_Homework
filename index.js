/*jshint esversion:6*/

// require express
var express = require("express");

// run express
var app = express();

const PORT = process.env.port || 3030;

var classes = ["algebra", "p.e.", "english", "physics", "programming"];
var userGrades = {
	'algebra': 'A',
	'p.e.': 'D',
	'english': 'B',
	'physics': 'A',
	'programming': 'A',
};

var homework = {
	'algebra': false,
	'p.e.': false,
	'english': false,
	'physics': false,
	'programming': false,
};

var schedule = [];

// give us req.body for post requests
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// sets up a handler to respond to a GET request for "/" (site root)
app.get("/", (request, response) => {
	response.sendFile(__dirname + "/index.html");
});

app.get("/allclasses", (req, res) => {
	res.send(classes);
});

app.get("/schedule", (req, res) => {
	res.send(schedule);
});
app.get("/grades", (req, res) => {
	res.send(userGrades);
});
app.get("/homework", (req, res) => {
	res.send(homework);
});
app.get('/homework/:className', (req, res) => {
	var className = req.params.className;
	res.send(homework[className]);
});
app.post('/homework', (req, res) => {
	var className = req.body.class;
	homework[className] = true;
	res.send("Successfully completed homework for " + className);
});
app.post("/schedule", (req, res) => {
	if (schedule.indexOf(req.body.name) === -1){
		schedule.push(req.body.name);
		res.send(req.body.name + " was added to your schedule.");
	} else {
		res.send(req.body.name + " is already in your schedule.");
	}
});

app.use(express.static('frontend'));

// 404 handler
app.use((req, res, next) => {
	res.status(404);
	res.send("404 - File Not Found");
});

// 500 error handler
app.use((err, req, res, next) => {
	console.log(err);
	res.status(500);
	res.send("500 - Internal Server Error.\n<br />CHECK YOUR TERMINAL!");
});

app.listen(PORT, () => {
	console.log("Listening on port " + PORT);
});


