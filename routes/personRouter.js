const express = require('express');
const Router = express.Router();
const Person = require('./../models/Person.js');



//POST method
Router.post('/', async (req, res) =>{ 
  
  try{
    //assuming the request body contains the person data
    const data = req.body;

    //create a new person document using the mongosse model
    const newPerson = new Person(data);

    //save the new person document to the database
    const response = await newPerson.save();
    console.log('data saved');
    res.status(200).json(response);
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
})

//GET method 
Router.get('/', async (req, res) =>{
  try{
    const data = await Person.find();
    console.log('data fetched');
    res.status(200).json(data);
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
})


//GET method parameterized by work type **IMP**
Router.get('/:workType', async (req, res) =>{
  try{
    //extract the work type from the url
    const workType = req.params.workType;

    if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
      const response = await Person.find({work: workType});
      console.log('response fetched');
      res.status(200).json(response);
    }else{
      res.status(404).json({error: 'Invalid work type'});
    }
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
})

//PUT method to update any record based on unique id 
Router.put('/:id',async (req, res) =>{
  try{
    const personId = req.params.id;
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(personId, updatedPersonData,{
      new: true,
      runValidators: true
    })

    if(!updatedPersonData){
      return res.status(404).json({error: 'Person not found'});
    }

    console.log('data updated');
    res.status(200).json(response);
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
})

//DELETE
Router.delete('/:id', async(req, res) =>{

  try
  {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
  if(!response) {
    return res.status(404).json({error: 'Person not found'});
  
  }
  console.log('data delete');
  res.status(200).json({message: 'person deleted successfully'});
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }

})

module.exports = Router;