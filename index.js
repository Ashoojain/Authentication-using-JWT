const express=require('express');
const app=express();
const bcrypt=require('bcryptjs');
const mongoose=require('mongoose');
const PORT=process.env.PORT || 2600;
const task=require('./app');
const jwt=require('jsonwebtoken');
const auth=require('./auth');

//mongodb database connection
const url='mongodb+srv://ashoo:ashoojain@cluster0-6ub8m.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(url,{useNewUrlParser:true}).then(
    ()=> console.log('connected to db')
).catch(
    (err)=> console.error(err)
);

app.use(express.json());


// registeration
app.post('/users',async (req,res)=>{
    console.log(req.body);

   const user=new task(req.body);
   console.log(user.password);
   try
   {
      user.password= await bcrypt.hash(req.body.password,8);
      await user.save()
       if(!user)
       {
          return res.status(401).send()
       }
       const token=jwt.sign({_id:user.id.toString()},'secret');
        user.tokens=user.tokens.concat({token});
        await user.save()

       res.send({user,token});
   }
   catch (e) {
       res.status(500).send(e);
   }
});
//reading users to check authentication
app.get('/read',auth,async (req,res)=>{
     try {

         const yy = await task.find({})


         res.status(200).send(yy);

     }
     catch (e) {
         res.status(500).send(e);

     }
})


// login
app.post('/users/login',async (req,res)=> {
    const password = req.body.password;
   try
   {
       const user = await task.findOne({email: req.body.email});
       if (!user)
       {
           return res.status(401).send('no email registered');
       }
       const  ismatch=await bcrypt.compare(password,user.password);
       if(!ismatch)
       {
          return res.status(401).send('password not matched');
       }
       const token=jwt.sign({_id:user._id.toString()},'secret');
       user.tokens=user.tokens.concat({token});
        await user.save()

       res.send({user,token});
   }
   catch (e) {
       res.status(500).send(e);

   }
});
// update
app.patch('/update',async (req,res)=>{

    try
    {
        const user=await task.findOne({email:req.body.email});
        if(!user)
        {
            return res.status(401).send('no data ');
        }
       const tt= await task.update({age:req.body.age})

       if(!tt)
           res.status(401).send('not updated');
          res.status(200).send(user);
    }
    catch (e) {
        res.status(500).send(e);

    }

})

app.listen(PORT,()=>{
    console.log('connected server' ,PORT);
})