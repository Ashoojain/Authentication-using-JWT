const express=require('express');
const router=express.Router();
const auth=require('./auth');


router.get('/logoutall',auth,async (req, res)=>{
    try{

        //empty the tokens array
        req.user.tokens=[]

        //save the data
        await req.user.save();

        //send the response
        res.status(200).send('logout');

    }catch (e) {
        res.status(500).send('failed logout');

    }
})

// exports the signup to the other file
module.exports=router;