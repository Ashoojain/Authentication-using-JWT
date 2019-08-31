const express=require('express');
const app=express();
const mongoose=require('mongoose');
const PORT=process.env.PORT || 2600;
const signup=require('./signup');
const login=require('./login');
const logout=require('./logout');
const update=require('./update');
const readall=require('./readalluser');

//database key
const url='mongodb+srv://ashoo:ashoojain@cluster0-6ub8m.mongodb.net/test?retryWrites=true&w=majority';

//mongodb database connection
mongoose.connect(url,{useNewUrlParser:true,useCreateIndex:true}).then(
    ()=> console.log('connected to db')
).catch(
    (err)=> console.error(err)
);

// middleware or receiving response
app.use(express.json());

//signup route
app.use(signup);

// login route
app.use(login);

//logout route
app.use(logout);

//update route
app.use(update);

//readall route
app.use(readall);

//listening port Or server started
app.listen(PORT,()=>{
    console.log('connected server' ,PORT);
});