const express = require('express');
const { resolve } = require('path');
const mongoose=require('mongoose');
const User=require('./schema');
const { error } = require('console');
const bcrypt=require('bcrypt');
require('dotenv').config();

const app = express();
const port = 3010;
const URI=process.env.URI;
app.use(express.json());


mongoose.connect(URI)
.then(()=>{
  console.log("MongoDB Connected Successfully")
})
.catch((error)=>{
  console.log("Failed to connect",error)
})

app.post('/create',async(req,res)=>{
  try{
    const{UserName,Email,Password}=req.body;

    if(!UserName||!Email||!Password){
      return res.status(400).json({
        error:"All fields are required"
      })
    }

    const saltRound=12;
    const hashedPassword = await bcrypt.hash(Password,saltRound);

    const newUser = new User({
      UserName:UserName,Email:Email,Password:hashedPassword
    })
    await newUser.save();
    return res.status(200).json({
      message:"Created Successfully"
    });
  }
  catch{
    return res.status(500).json({
        message:"Internal Server Error"
    });
  }
})

  


app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
