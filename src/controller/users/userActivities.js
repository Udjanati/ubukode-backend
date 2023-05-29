import db from "../../database/models";
const createActivities =async(req,res)=>{
    
    try {
    const {roleId,permissionId} = req.body    

const role = await db.roles.findByPk(roleId);
const permission = await db.permissions.findByPk(permissionId);
if(!role || !permission){
    return res.json({status:404,message:"PermissionId or roleId not found."})
}

const addActivities = await db.userActivities.create({
    roleId,
    permissionId
})
return res.json({status:201,message:"User Activities created successfully.", data:addActivities})
    } catch (error) {
        console.log(error)
        return res.json({status:500,error:"Internal server error"})
    }





}

export default {createActivities}