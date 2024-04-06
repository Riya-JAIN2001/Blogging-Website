import express from "express";
import userAuth from "../middelware/authmiddleware.js";
import { getuserController, updateController } from "../controller/userController.js";
const router = express.Router();
router.get("/get-user",userAuth,getuserController)



router.put("/update-user",userAuth,updateController)
export default router;