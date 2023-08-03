
const userModel = require("../Models/userModel");
const TaskModel = require("../Models/TaskModel");


// create book
const newTask = async function (req, res) {

    try {
        const data = req.body
        const { title, description,status,date,userId } = data
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "Please Data provide" })
        if (!title) return res.status(400).send({ status: false, message: "title is required" })
        if (!description) return res.status(400).send({ status: false, message: "description is required" })
        if (!status) return res.status(400).send({ status: false, message: " status is required" })
        if (!date) return res.status(400).send({ status: false, message: "date is required" })
        if (!userId) return res.status(400).send({ status: false, message: "userId is required" })

        const finduserId = await userModel.findById({ _id: userId })
        if (!finduserId) return res.status(404).send({ status: false, msg: "userId is not found" })
      

      //  if (finduserId._id != req.userId) return res.status(400).send({ status: false, message: "you are unathorized" })

        saveData = await TaskModel.create(data)
        return res.status(201).send({ status: true, message: "created new task ", data: saveData })

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }

};



const taskList = async function (req, res) {
    try {

        const tasklist = await TaskModel.find({ isDeleted: false }).select({ _id: 1, title: 1, description: 1, status: 1 })

        if (tasklist.length == 0)
            return res.status(404).send({ status: false, message: "Task are not present" })


        return res.status(200).send({ status: true, message: 'Task list', data: tasklist })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
};

let taskById = async function (req, res) {
    try {
        let taskId = req.params.taskId
        if (!taskId) return res.status(400).send({ status: false, message: " please Provide  task Id" })
        const findtaskId = await TaskModel.findOne({ _id: taskId, isDeleted: false },{__v:0})
        if (!findtaskId) return res.status(404).send({ status: false, message: "not found of taskId" })

        res.status(200).send({ status: true, message: "Task", findtaskId })

    } catch (error) {
        res.status(500).send({ status: false, messsage: error.message })
    }
};

let updateTask = async function (req, res) {

    try {
        let taskId = req.params.taskId
        if (!taskId) return res.status(400).send({ status: false, message: "taskId is require" })
       
        let findTask = await TaskModel.findOne({ _id: taskId })
        if (!findTask) return res.status(400).send({ status: false, message: "taskId is not present " })

      //  if (findTask.userId != req.userId) return res.status(403).send({ status: false, message: "you are unAutherized" })

        let data = req.body
        let { title, description, status, date } = data

        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "Please Data provide" })
        let findTitle = await TaskModel.findOne({ title: title })
        if (findTitle) return res.status(400).send({ status: false, message: "Title is allready exist" })

        let updatedata = await TaskModel.findOneAndUpdate({ _id: taskId, isDeleted: false }, {
            $set: {
                title: data.title,
                description: data.description,
                status: data.status,
                date: data.date,
            }
        }, { new: true })

        return res.status(200).send({ status: true, message: "data is successfull update", data: updatedata })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }

};

const deleteTask = async function (req, res) {
    try {
        let taskId = req.params.taskId;

        if (!taskId) { return res.status(400).send({ status: false, msg: "task Id is Required" }); }
       
        let findTask = await TaskModel.findOne({ _id: taskId, isDeleted: false });
        if (!findTask) return res.status(404).send({ status: false, message: "Task not Found or Already been Deleted" });

    //     if (findTask.userId != req.userId) { return res.status(403).send({ status: false, msg: "You are not Authorized" }); 
    // }else {
        await TaskModel.findOneAndUpdate(  { _id: taskId },  { $set: { isDeleted: true, deletedAt: new Date() } },  { new: true } );
   // }
        return res.status(200).send({ status: true, msg: "task Deleted Successfully" });
  
    } catch (error) {
        res.status(500).send({ status: false, Error: error.message });
    }
};

module.exports = { newTask, taskList, taskById, updateTask, deleteTask }