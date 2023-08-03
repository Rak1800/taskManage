const { default: mongoose } = require("mongoose");
const objectId=mongoose.Schema.Types.ObjectId;

const taskSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    userId:{
        type:objectId,
        required:true,
        ref:"User"
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

module.exports=mongoose.model("Task",taskSchema)