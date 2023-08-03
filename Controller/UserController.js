const jwt=require("jsonwebtoken");
const userModel = require("../Models/userModel");

const validName = /^[a-zA-Z ]{3,20}$/
const validEmail = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
const validPhoneNumber = /^[0]?[6789]\d{9}$/
const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;


const userRegister = async function (req, res) {
    try {
        const data = req.body
        const { name, gender, age, phone, email, password } = data;

        // validation of required field
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "Please Data provide" })
        if (!name) return res.status(400).send({ status: false, message: "Name is required" })
        if (!gender) return res.status(400).send({ status: false, message: "Gender is required" })
        if (!age) return res.status(400).send({ status: false, message: " Age is required" })
        if (!phone) return res.status(400).send({ status: false, message: "Phone is required" })
        if (!email) return res.status(400).send({ status: false, message: "Email is required" })
        if (!password) return res.status(400).send({ status: false, message: "Password is required" })
       
        // validation of worng input 
        if (!validName.test(name)) return res.status(400).send({ status: false, message: "Name is invalid" })
        const enums = ["Male", "Female", "Other"]
        checkgender = enums.includes(gender)
        if (!checkgender) return res.status(400).send({ status: false, message: "Gender should be Male, Female,Other" })
        if (!validEmail.test(email)) return res.status(400).send({ status: false, message: "Email is invalid" })
        if (!validPhoneNumber.test(phone)) return res.status(400).send({ status: false, message: "Phone is invalid" })
        if (!validPassword.test(password)) { return res.status(400).send({
                status: false,message: "password must have atleast 1digit , 1uppercase , 1lowercase , special symbols(@$!%*?&) and between 8-15 range, ex:Rakesh@123"
            })}
       
        // check unique 
        const emailCheck =await userModel.findOne({email:email})
        if (emailCheck) return res.status(400).send({ status: false, message: "Email is already Exist" })

        const saveData = await userModel.create(data)
        return res.status(201).send({ status: true, message: "registered", saveData })
    } catch (error) {
        res.status(500).send({ status: false, message:error.message })
    }

}

const loginUser=async (req,res)=>{
    try{
         const data=req.body
         const {email,password}=data
         if(!email) return res.status(400).send({ status: false, message: "Email is required" })
         if(!password) return res.status(400).send({ status: false, message: "Password is required" })
         //check user in database
         const findUser=await userModel.findOne({email:email,password:password})
         if(!findUser) return res.status(404).send({ status: false, message: "Invalid email or Password" })

         const token=jwt.sign({
            userId:findUser._id.toString(),
            iat: new Date().getTime() / 1000
         },"userinfo",{
            expiresIn:"1h"
         });

         res.setHeader("x-api-key", token)

         return res.status(200).send({ status: true, message: "User Logged in Successfully", token: token ,data:findUser})
    }catch(error){
        res.status(500).send({ status: false, message:error.message })
    }
}

module.exports = { userRegister,loginUser}