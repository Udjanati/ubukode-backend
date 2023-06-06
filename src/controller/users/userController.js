import {users} from "../../database/models";
import { hashPassword, isPasswordMatching } from "../../utilis/hashedPassword";
import { generateToken } from "../../utilis/token";
const createNewUser = async(req, res)=>{
    const {firstName, lastName, email, password} = req.body;
    //const emailRegex = /\S+@\S+\.\S+/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        return res.json({status:400, message:"Invalid email address"})
    }
    if (!password || password.length < 8){
        return res.json({status:400, message:"Password must be at least 8 characters"})
    }

    try {
        const hashedPassword = await hashPassword(password);
        const existingUser = await users.findOne({where:{email}});

        if(existingUser){
            return res.json({status:400, message:"Email already exists"})
        }
        const newUser = await users.create({
            firstName,
            lastName, 
            email, 
            password:hashedPassword
        })
        return res.json({status:201, message:"created new user successfully", data:newUser})
        
    } catch (error) {
        console.log(error)
        return res.json({status:500, message:"Internal server error"})
        
    }

}
const loginUser = async (req, res) => {
    try {
      let { email, password } = req.body;
      const currentUser = await users.findOne({ where: { email } });
      
      if (!currentUser) {
        return res.json({ status: 404, message: "User does not exist" });
      }
      
      if (isPasswordMatching(password, currentUser.password)) {
        users.password = null;
        const token = generateToken({ currentUser });
        return res.json({
          message: "Successfully Logged in",
          status: 200,
          data: currentUser,
          token,
        });
      }
    } catch (error) {
      console.log(error);
      return res.json({ status: 500, message: "Internal Server Error" });
    }
  };
  

const allUser = async (req, res) => {
    try {
      const Users = await users.findAll();
      return res.json( {status:200,message:"Retrieve all users successfully", data:Users});
    } catch (error) {
      console.log(error);
      return res.json({ status: 500, message: "Internal server error" });
    }
  };

  const oneUser = async(req,res) =>{
    try {
        const {id} = req.params;
        const Users = await users.findOne({where:{id}})
        if (Users === 0){
            return res.json({status:404, error:"User Not found"})

        }
        return res.json({status:200,message:"Retrieve one user successfully", data:Users})
    } catch (error) {
        return res.json({status:500, error:"Internal server Error"})
        
    }
  }
  
  const deleteAll = async (req, res) => {
    try {
        const deletedUsers = await users.destroy({ where: {} });
  
      return res.json({
        status: 201,
        message: "Delete users successfully",
        data: deletedUsers,
      });
    } catch (error) {
      console.log(error);
      return res.json({ status: 500, message: "Internal server error" });
    }
  };
  

  const deleteById = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await users.destroy({ where: { id } });
  
      if (deletedUser === 0) {
        return res.json({ status: 404, message: "User not found" });
      }
  
      return res.json({
        status: 200,
        message: "User deleted successfully",
        data: deletedUser,
      });
    } catch (error) {
      console.log(error);
      return res.json({ status: 500, message: "Internal Server Error" });
    }
  };
  
const updateById = async(req,res)=>{
    try {
        const { id } = req.params;
        const {firstName,lastName,email,password } = req.body;

        const updatedUser = await users.update(
            {firstName,lastName,email,password } ,
            {where:{id}})
            if(updatedUser[0] === 0){
                return res.json({status:404,error:"User not found"})
            }
            return res.json({status:200,message:"User updated successfully", data:updatedUser})
    } catch (error) {
        console.log(error);
    return res.json({ status: 500, message: "Internal Server Error" });
        
    }


}

export default {createNewUser, loginUser, allUser , deleteAll, deleteById , updateById, oneUser}