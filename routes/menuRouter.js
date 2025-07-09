const express = require('express');
const Router = express.Router();
const MenuItem = require('./../models/MenuItem.js');


//POST method
Router.post('/', async(req, res) =>{
  try {
    const data = req.body;
    console.log('Incoming data', data)
    const newMenu = new MenuItem(data);
    const response = await newMenu.save();
    console.log('data saved');
    res.status(200).json(response);
  }catch(err){
    console.log('validation error',err);
    res.status(500).json({error: 'Internal server error'});
  }
})

//GET method
Router.get('/', async(req, res) =>{
  try{
    const data = await MenuItem.find();
    console.log('data fetched');
    res.status(200).json(data);
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
})

//get method parameterised by taste type
Router.get('/:tastType', async(req, res) =>{
  try{
    const tastType = req.params.tastType;

    if(tastType == 'sweet' || tastType == 'spicy' || tastType == 'sour')
    {
      const response = await MenuItem.find({taste: tastType});
      console.log('response fetched');
      res.status(200).json(response);
    }else{
      res.status(404).json({error: 'invalid taste type'});
    }
  }catch(err)
  {
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
})

module.exports = Router;