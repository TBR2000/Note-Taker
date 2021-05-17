// DEPENDENCIES
const express = require('express');

// EXPRESS CONFIGURATION
// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTER
require('./routes/htmlRoutes')(app);


// LISTENER
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
  });