var friends = require("../data/friends");
// GET route to "/api/friends" to display JSON all friends
module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
      res.json(friends);
    });

    // POST route to "/api/friends" for survey results/compatibility
    app.post("/api/friends", function(req, res) {
      friends.push(req.body);
      res.json(true);
    });
  };