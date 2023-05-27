import { Router } from "express";
import createNewUsers from "../controller/users/userController";
import loginApi from "../controller/users/userController";
import allUserApi from "../controller/users/userController";
import deleteAllUser from "../controller/users/userController";
import adminController from "../controller/roleAndPermission"

const router = Router();

router.post("/user/create", createNewUsers.createNewUser);
router.post("/user/login", loginApi.loginUser);
router.get("/user", allUserApi.allUser);
router.delete("/delete/user", deleteAllUser.deleteAll)
router.post("/create/admin", adminController.createAdmin)

export default router;
