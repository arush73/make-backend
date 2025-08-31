import { Router } from "express"

const router = Router()

import {
    registerUser,
    loginUser,
    logoutUser
} from "../controllers/auth.controllers.js"

router.route("/register").post( registerUser)
router.route("/login").post( loginUser)
// router.route("/refresh-token").post(refreshAccessToken)
// router.route("/verify-email/:verificationToken").get(verifyEmail)

export default router
