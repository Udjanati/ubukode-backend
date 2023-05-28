import db from '../database/models';
import { hashPassword } from "../utilis/hashedPassword";

const createAdmin = async (req, res) => {
  try {
    const { firstName, lastName, email, password, permissions } = req.body;
    const hashedPassword = await hashPassword(password);
    let newRole = await db.role.findOne({ where: { roleName: 'admin' } });

    if (!newRole) {
      newRole = await db.role.create({
        roleName: 'admin'
      });

      const admin = await db.users.create({
        ...req.body,
        password: hashedPassword,
        roleId: newRole.id
      });

      if (Array.isArray(permissions) && permissions.length > 0) {
        const createdPermissions = await db.permission.bulkCreate(
          permissions.map(permission => ({ name: permission }))
        );

        await db.rolePermission.bulkCreate(
          createdPermissions.map(permission => ({
            roleId: newRole.id,
            permissionId: permission.id
          }))
        );
      }

      res.json({
        status: 201,
        message: 'Admin added',
        data: admin
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: 'Internal server error'
    });
  }
};

export default { createAdmin };
