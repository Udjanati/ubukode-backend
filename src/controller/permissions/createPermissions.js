import db from "../../database/models";

const createUserPermissions = async(req, res)=>{

    try {
         // Check if the user and role exist
        const {userId, roleId} = req.body
        const user = await db.users.findByPk(userId);
        const role = await db.roles.findByPk(roleId);
        if(!user || !role){
            return res.json({status:404, error: "User or role not found."})
        } 
          // Create the permission
          const newPermission = await db.permissions.create({
            userId,
            roleId
          })
          return res.json({status:201, message:"Permission created successfully.", data:newPermission})

    } catch (error) {
        console.log(error)
        return res.json({status:500, message:"Internal server error"})
        
    }
}

export default {createUserPermissions}