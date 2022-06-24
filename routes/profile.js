import express from "express"
import {getProfileDetails} from '../controllers/profile'

const router = express.Router()

router.get('/user/fetch-profile-details',getProfileDetails)

module.exports = router