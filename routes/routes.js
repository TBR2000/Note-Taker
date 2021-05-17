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
    let input = req.body;
    input.id = uniqid()
    let data = JSON.parse(fs.readFileSync('db/db.json','utf8'));
    data.push(input);
    fs.writeFileSync('db/db.json', JSON.stringify(data));
    res.JSON(data);
    
  });

  // DELETE handling
  app.delete('/api/notes/:id', (req, res) => {
    let noteId = req.params.id.toString();
    let data = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
    const update = data.filter(note => note.id.toString()!== noteId);
    fs.writeFileSync('db/db.json', JSON.stringify(update));
    res.json(update);
  });

 // If no matching route is found default to home
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });


};
