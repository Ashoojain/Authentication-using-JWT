const jwt=require('jsonwebtoken');
const User=require('./database__model');

//authentication process
const auth=async (req,res,next)=> {
    try {
        // incoming token from the user
        const token = req.header('Authorization').replace('Bearer ', '');

      //verify the token with key
        const decoded = jwt.verify(token, 'secret');

     //  finding the user from database  with some  property
        const user=await User.findOne({_id:decoded._id,'tokens.token':token})

        //if user not exist with same incoming token in the database
        if(!user)
            throw new Error()

        //give the user profile to next function
        req.user=user;

        //complete  the function and out of this function
        next();
    }
    catch (e) {

        //user without authenticate accessing the profile
        res.status(501).send({error:'Please authentiate'});

    }
}
module.exports=auth;