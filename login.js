const express=require('express');
const router=express.Router();
const task=require('./database__model');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');


// login
router.post('/users/login',async (req,res)=> {
    const password = req.body.password;
    try
    {
        // finding email from database
        const user = await task.findOne({email: req.body.email});

        if (!user) //if not found then no email registered
        {
            return res.status(401).send('no email registered');
        }

        // if match then continue:

        // compare given password with stored password
        const  ismatch=await bcrypt.compare(password,user.password);

        if(!ismatch)
        {
            return res.status(401).send('password not matched');
        }

        //create a token with secret(unique) key for authentication
        const token=jwt.sign({_id:user._id.toString()},'secret');

        //adding to the user database
        user.tokens=user.tokens.concat({token});

        // save the user to the database
        await user.save()

        // send data to client
        res.send({user,token});
    }
    catch (e) {
        res.status(500).send(e);

    }
});
module.exports=router;