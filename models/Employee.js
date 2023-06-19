const mongoose=require('mongoose')
const employeeSchema=new mongoose.Schema({
    first_name:{
        type:String,
        required:[true,"Please Provide Firstname"]
    },
    last_name:{
        type:String,
        required:[true,"Please Provide Lastname"]
    },
    email:{
        type:String,
        required:[true,"Please Provide Email"]
    },
    gender:{
        type:String,
        
    },
    salary:{
        type:String,
        required:[true,"Please Provide Salary"]
    }

})

const Employee_db=mongoose.model("employee",employeeSchema)
module.exports=Employee_db;