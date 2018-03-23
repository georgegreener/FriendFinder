var path = require("path");

module.exports = function(app) {
  // Catch-all route to "home.html"
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  // A GET route to "/survey"
  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
  });
};