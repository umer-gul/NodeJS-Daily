const express = require('express');
const router = express.Router();
const Joi = require('joi');
//const Joi = require('joi');
router.use(express.json());

var courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
    {id: 4, name: 'course4'}
];

router.get('/', (req,res)=> {
    res.send(courses);
});
//get a specific course with the known ID
router.get('/:id', (req,res)=> {
    const course = courses.find( c => c.id === parseInt(req.params.id));
    res.send(course);
   });

router.post('/', (req,res)=> {
    const {error} = validation(req.body);
    if (error){
      res.status(400).send(error.details[0].message);
      return; }
    const course = {
            id: courses.length +1,
            name: req.body.name
    };
    courses.push(course);
    res.send(course);
});
 // put request - to update data 
router.put('/:id', (req,res)=> {
     // check if id is avaialable- if not bad request 404
     const course = courses.find( c => c.id === parseInt(req.params.id));
     if(!course)
        return res.status(404).send('Course with this id does not found');
        
     // check if data provided for updation is valid
     const {error} = validation(req.body);
     if (error){
       res.status(400).send(error.details[0].message);
       return; }
    // if everything is good, update the course and return it to the client
     course.name = req.body.name;
     res.send(course);
 });
 // Delete a course from the courses array by a known valid ID
 router.delete('/:id', (req,res)=> {
    // check if id is avaialable- if not bad request 404
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course) 
      return res.status(404).send('Course with this id does not found');
      // if valid id delete the course 
      const index = courses.indexOf(course);
      courses.splice(index,1);
      res.send(course);
 });
 
// VALIDATION FUNCTION
 function validation(course) {
    const schema = {
        name: Joi.string().min(3).required() };
        return Joi.validate(course,schema);
 }

 module.exports = router;
 //module.exports = validation;