import { Router } from "express";
import createNewUsers from "../controller/users/userController";
import loginApi from "../controller/users/userController";
import allUserApi from "../controller/users/userController";
import deleteAllUser from "../controller/users/userController";
import createRolesController from "../controller/roles/createRoles";
import createUserPermission from "../controller/permissions/createPermissions";
import addUserActivities from "../controller/users/userActivities";
import addrolesUserActivity from "../controller/users/rolesUserActivities";
import deleteOneUser from "../controller/users/userController";
import updateOneUser from "../controller/users/userController";
import getOneUser from "../controller/users/userController";
import {protect} from "../middlewares/verifyToken"
const router = Router();

router.post("/user/create", createNewUsers.createNewUser);
router.post("/user/login", loginApi.loginUser);
router.get("/user",protect,allUserApi.allUser);
router.delete("/delete/user", deleteAllUser.deleteAll);
router.post('/create/roles', createRolesController.createUserRoles);
router.post("/add/permission",createUserPermission.createUserPermissions);
router.post("/add/activities", addUserActivities.createActivities);
router.post("/add/role/user/activity", addrolesUserActivity.rolesUserActivity);
router.delete("/user/delete/:id",deleteOneUser.deleteById );
router.put("/update/:id", updateOneUser.updateById);
router.get("/user/:id",getOneUser.oneUser);

export default router;
 