
const mongoose=require('mongoose');
const validator=require('validator');

//create a database model  with schema property
const task=mongoose.model('task',{
    name:{
        type:String,
        trim:true,
        required:true
    },
    password:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required: true,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error("email is invalid")
        }
    },

    age:{
        default:0,
        type:Number,
        validate(value)
        {
            if(value<0)
                throw new Error("age can not big") ;
        }
    },
    tokens:[
        {
            token: {
                type:String,
                required:true
            }
        } ]

});
module.exports=task;
