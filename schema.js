const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    UserName:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    }

})

module.exports=mongoose.model('User',userSchema);