import jwt from "jsonwebtoken";
import {users} from '../database/models';
import 'dotenv/config'
import asyncHandler from "express-async-handler";
const protect = asyncHandler(async(req, res, next)=>{
let token;
if(req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer"))


    {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_KEY).user
            req.user= await users.find({where:{id:decoded.id},
           attributes:{exclude:["password"]} });
           if(req.user){
            next();
           }else {
            res.status(401).json({ message: "Not authorized" });

           }
        } catch (error) {
            console.log(error);
      res.status(401).json({ message: "Not authorized" });
            
        }
    }else {
        res.status(401).json({ message: "Not authorized, no token" });
      }

})

export  {protect}