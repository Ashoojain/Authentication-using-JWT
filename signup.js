const express=require('express');
const router=express.Router();
const task=require('./database__model');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

// Create A User
router.post('/users',async (req, res)=>{
    const user=new task(req.body);
    try
    {
        //hash the password
        user.password= await bcrypt.hash(req.body.password,8);

        //save the user data
        await user.save()
        if(!user)
        {
            return res.status(401).send()
        }
        //making token for authentication for future
        const token=jwt.sign({_id:user.id.toString()},'secret');

        // adding token to the user database
        user.tokens=user.tokens.concat({token});

        //token saving into database
        await user.save()

        // send the response
        res.send({user,token});
    }
    catch (e) {
        //error by bad data
        res.status(500).send(e);
    }
});


// exports the signup to the other file
module.exports=router;
