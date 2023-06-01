import db from "../../database/models";
const createActivities =async(req,res)=>{
    
    try {
    const { userActivityName,  description} = req.body    
const addActivities = await db.userActivities.create({
    userActivityName,
    description
})
return res.json({status:201,message:"User Activities created successfully.", data:addActivities})
    } catch (error) {
        console.log(error)
        return res.json({status:500,error:"Internal server error"})
    }





}

export default {createActivities}