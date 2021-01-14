// must require package
const express = require("express");
// this instantiates the server. telling it to listen for requests
const app = express();
// the above two lines of code are all it takes to set up an express server

// this requires the data ... pulling info from the json file
const { animals } = require("./data/animals");


function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    // Note that we save the animalsArray as filteredResults here:
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
      // Save personalityTraits as a dedicated array.
      // If personalityTraits is a string, place it into a new array and save.
      if (typeof query.personalityTraits === 'string') {
        personalityTraitsArray = [query.personalityTraits];
      } else {
        personalityTraitsArray = query.personalityTraits;
      }
      // Loop through each trait in the personalityTraits array:
      personalityTraitsArray.forEach(trait => {
        // Check the trait against each animal in the filteredResults array.
        // Remember, it is initially a copy of the animalsArray,
        // but here we're updating it for each trait in the .forEach() loop.
        // For each trait being targeted by the filter, the filteredResults
        // array will then contain only the entries that contain the trait,
        // so at the end we'll have an array of animals that have every one 
        // of the traits when the .forEach() loop is finished.
        filteredResults = filteredResults.filter(
          animal => animal.personalityTraits.indexOf(trait) !== -1
        );
      });
    }
    if (query.diet) {
      filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
      filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
      filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    // return the filtered results:
    return filteredResults;
  }

// this adds a route
// GET requests take TWO args: 1st a string desc the route the client will fetch from
// the second is a call back function triggered everytime the route is accessed
app.get("/api/animals", (req, res) => {
  let results = animals;
  console.log(req.query)
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

// chaining listen method onto the server so that it will listen
// this must be at the bottom of this file
// changing the method to json lets the client know its recieving json data
app.listen(3001, () => {
  console.log(`API server now on port 3001!`);
});
