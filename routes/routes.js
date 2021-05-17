// DEPENDENCIES
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');


// ROUTING
module.exports = (app) => {
  // GET handling
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });

  app.get('/api/notes', (req, res) => {
    let data = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
    res.json(data);
  });

  //POST handling
  app.post('/api/notes', function(req, res) {
    // get request from body and add unique ID
    let input = req.body;
    input.id = uniqid()
    // Retrieve JSON and push input 
    let data = JSON.parse(fs.readFileSync('db/db.json','utf8'));
    data.push(input);
    //Write updated json back to db
    fs.writeFileSync('db/db.json', JSON.stringify(data));
    res.JSON(data);
  });

  // DELETE handling
  app.delete('/api/notes/:id', (req, res) => {
    // Define id for use
      let Id = req.params.id
      //Retrieve json
      let data = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
      // Filter by id to remove selection
      const update = data.filter( data => data.id.toString() !== Id );
      //Write updated json to db
      fs.writeFileSync('db/db.json', JSON.stringify(update));
      res.json(update);
  });

 // If no matching route is found default to home
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });


};
