const express=require('express');
const router=express.Router();
const auth=require('./auth');
const task=require('./database__model');

//Reading users and check authentication property
router.get('/read',auth,async (req, res)=>{

    try
    {

        //to get all the data from database
        const yy = await task.find({})

        // send all data
        res.status(200).send(yy);

    }
    catch (e) {
        res.status(500).send(e);

    }
})


// exports the router to the other file
module.exports=router;
