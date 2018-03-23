// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Express configuration
var app = express();
var PORT = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// Static public folder
app.use(express.static(path.join(__dirname, '/app/public')));

// Route files
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// Initialize Express
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});