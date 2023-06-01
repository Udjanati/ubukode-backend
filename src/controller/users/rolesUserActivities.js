import db from "../../database/models";

const rolesUserActivity = async (req, res) => {
  try {
    const { roleId, userActivityId } = req.body;
    const user = await db.userActivities.findByPk(userActivityId);
    const role = await db.roles.findByPk(roleId);

    if (!user || !role) {
      return res.json({ status: 404, error: "User or role not found." });
    }

    const addrolesUser = await db.rolesUserActivities.create({
      roleId,
      userActivityId,
    });

    return res.json({
      status: 201,
      message: "The user activity role was successfully created.",
      data: addrolesUser,
    });
  } catch (error) {
    // Handle any errors that occur during the try block
    console.error(error);
    return res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};

export default { rolesUserActivity };
