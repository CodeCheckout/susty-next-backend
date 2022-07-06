import express from 'express'
import {
  adduser,
  updateUser,
  getUserAddress,
} from "../controllers/user";

const router = express.Router()

router.post('/user/adduser', adduser)


router.put("/user/updateuser", updateUser);


router.get('/user/getaddress', getUserAddress)

module.exports = router
