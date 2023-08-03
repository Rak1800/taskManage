const express=require('express');
const mongoose =require('mongoose');
const route=require('./Routes/routes');
const cors=require("cors");
const path=require("path");

const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(express.static(path.join(__dirname, './client/build')))
  
mongoose.set('strictQuery', true)
mongoose.connect('mongodb+srv://Rak18000:Rakesh123@cluster0.xntrj.mongodb.net/Tasks',{
    useNewUrlParser:true
}).then(()=>console.log('mongoDb is connected')) 
.catch(err=>console.log(err))

app.use('*',function(req,res){
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});
app.use('/', route)

app.listen(5000,()=>console.log('express is running on port '+(5000))) 