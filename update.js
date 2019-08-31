const express=require('express');
const router=express.Router();
const auth=require('./auth');
const bcrypt=require('bcryptjs');


// update data
router.patch('/update',auth,async (req, res)=>{
    const updates=Object.keys((req.body));
    try
    {
        //update the data
        updates.forEach((update)=>req.user[update]=req.body[update]);

        //if user update the password then hash the password
        if(req.body.password)
            req.user.password= await bcrypt.hash(req.body.password,8);

        //save the updated data
        await req.user.save();

        // send the response
        res.status(200).send(req.user);
    }
    catch (e) {
        res.status(500).send(e);

    }

})

module.exports=router;
