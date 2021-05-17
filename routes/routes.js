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
    let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(data);
  });

  //POST handling
  app.post("/api/notes", function(req, res) {
    let newNote = req.body;
    newNote.id = uniqid
    let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    notes.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(data));
    res.JSON(data);
    
  });

  // DELETE handling
  app.delete("/api/notes/:id", (req, res) => {
    let noteId = req.params.id.toString();
    let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    const updateData = data.filter( note => note.id.toString()!== noteId);
    fs.writeFileSync('./db/db.json', JSON.stringify(updateData));
    res.json(updateData);
  });

 // If no matching route is found default to home
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });


};
