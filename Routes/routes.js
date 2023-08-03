const { checkAuth } = require("../Middleware/auth");
const { userRegister, loginUser, } = require("../Controller/UserController");
const { newTask, taskList, taskById, updateTask, deleteTask } = require("../Controller/taskController");

const router=require("express").Router();
// user /API
router.post("/register",userRegister);
router.post("/login",loginUser);

//Task API
router.post("/addtask",newTask);
router.get("/alltask",taskList);
router.get("/task/:taskId",taskById);
router.put("/taskUpdate/:taskId",updateTask);
router.delete("/deleteTask/:taskId",deleteTask);


module.exports=router 