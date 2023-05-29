import { Router } from "express";
import createNewUsers from "../controller/users/userController";
import loginApi from "../controller/users/userController";
import allUserApi from "../controller/users/userController";
import deleteAllUser from "../controller/users/userController";
import createRolesController from "../controller/roles/createRoles";
import createUserPermission from "../controller/permissions/createPermissions";
import addUserActivities from "../controller/users/userActivities"

const router = Router();

router.post("/user/create", createNewUsers.createNewUser);
router.post("/user/login", loginApi.loginUser);
router.get("/user",allUserApi.allUser);
router.delete("/delete/user", deleteAllUser.deleteAll)
router.post('/create/roles', createRolesController.createUserRoles)
router.post("/add/permission",createUserPermission.createUserPermissions)
router.post("/add/activities", addUserActivities.createActivities)


export default router;
