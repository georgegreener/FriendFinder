// Establishes connection to friends.js so we can use that data
var friends = require("../data/friends");

// API routing will be exported so other files in the application have access
module.exports = function(app) {

    // GET route will show current list of friends as JSON objects
    app.get("/api/friends", function(req, res) {

      res.json(friends);

    });

    // POST route will add user as a new friend, as well as return the best match for them, based on survey results
    app.post("/api/friends", function(req, res) {

      // Stores incoming user data in local variable
      var newFriend = req.body;

      // Stores reference to user scores in variable
      var userScores = newFriend.scores;

      // Creates an empty object for the best match
      var bestMatch = {};

      // This variable will reference the index of the friends array that represents the best match
      var bestMatchIndex = 0;

      // This variable represents the greatest difference that can exist between all scores
      var bestMatchDifference = 40;

      // Our first for loop will iterate through the friends array
      for (var i = 0; i < friends.length; i++) {

        // This variable will represent the total difference between the scores of each friend and the user
        var totalDifference = 0;

        // Our second for loop, nested within the first, will iterate through the scores array of the friend currently selected in the parent loop
        for (var index = 0; index < friends[i].scores.length; index++) {

          // This variable compares the scores of the currently selected friend and the user scores
          var thisDifference = Math.abs(friends[i].scores[index] - newFriend.scores[index]);

          // The difference between each score is then added to the totalDifference variable
          totalDifference += thisDifference;

        }

        // If the totalDifference is less than 40...
        if (totalDifference < bestMatchDifference) {

          // Set the bestMatchIndex to the index of the current friend...
          bestMatchIndex = i;

          // Then set the bestMatchDifference to the totalDifference, so we have a new value to compare, less than 40...
          // This will ensure that the friend with the least difference in score values will be selected as a best match
          bestMatchDifference = totalDifference;

        }

      }

      // After we have our friend, we want to place it in our empty bestMatch object
      bestMatch = friends[bestMatchIndex];

      // We then add the user to the friend array
      friends.push(newFriend);

      // Finally, we return the bestMatch as a JSON response to the client so they can see who their new friend is!
      res.json(bestMatch);

    });
    
  };