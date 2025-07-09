const express = require('express');
const app = express();
//import db.js file 
const db = require('./db.js');
require('dotenv').config();
const PORT = process.env.PORT || 3000;


// Middleware to parse incoming JSON requests and make the data available in req.body
const bodyParser = require('body-parser');
app.use(bodyParser.json());


//main Hotels get method
app.get('/', function(req, res){
  res.send('Welcome to my hotel.. How i can help you ? , we have list of menus you would like to check !');
});

//methods for Person model GET, POST are defined in router folder for proper organization
//Methods for MenuItems in GET, POST are defined in router folder for proper organization


//import the router file
const personRoutes = require('./routes/personRouter.js');
const menuRoutes = require('./routes/menuRouter.js');
//use the routers
app.use('/person', personRoutes);
app.use('/menu', menuRoutes);


app.listen(PORT, () => {
  console.log('listening on port 3000');
}); 