// DEPENDENCIES
const path = require('path');


// ROUTING

module.exports = (app) => {
  // GET handling

  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });

  app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'));
  });
 
  // If no matching route is found default to home
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

 //POST handling
  app.post('/api/notes', (req, res) => {
   
   
  });
};
