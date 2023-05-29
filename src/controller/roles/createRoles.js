import { roles } from "../../database/models";
const createUserRoles = async (req, res) => {
  try {
    const { roleName, description } = req.body;

    // Validation: Check if roleName contains only lowercase letters
    const lowercaseRegex = /^[a-z]+$/;
    if (!lowercaseRegex.test(roleName)) {
      return res.status(400).json({ error: "Role name should contain only lowercase letters." });
    }
const existRole = await roles.findOne({where:{roleName}})
if(existRole){
    return res.json({status:400, message:"This role is already exist"})
}
    const newRole = await roles.create({
      roleName,
      description,
    });
return res.json({status:201, message:'Role created successfully.' , data:newRole})
   
  } catch (error) {

    res.status(500).json({ error: "Internal server error." });
  }
};

export default { createUserRoles };
