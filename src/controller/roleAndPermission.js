import db from '../database/models';
import { hashPassword } from "../utilis/hashedPassword";

const createAdmin = async (req, res) => {
  try {
    const { password, permissions } = req.body;
    const hashedPassword = await hashPassword(password);
    let newRole = await db.role.findOne({ where: { roleName: 'admin' } });

    if (!newRole) {
      newRole = await db.role.create({
        roleName: 'admin'
      });
      const admin = await db.user.create({
        ...req.body,
        password: hashedPassword,
        roleId: newRole.id
      });
      const newPermission = await db.permission.create({
        name: permissions
      });
      if (newPermission) {
        await db.rolePermission.create({
          roleId: newRole.id,
          permissionId: newPermission.id
        });
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
