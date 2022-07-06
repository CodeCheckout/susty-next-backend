import express from "express";
import {
  adduser,
  updateUserName,
  updateUserRole,
  updateUserAddress,
  getUserAddress,
} from "../controllers/user";

const router = express.Router();

router.post("/user/adduser", adduser);

router.put("/user/updateusername", updateUserName);
router.put("/user/updateuserrole", updateUserRole);
router.put("/user/updateaddress", updateUserAddress);

router.get("/user/getaddress", getUserAddress);

module.exports = router;
