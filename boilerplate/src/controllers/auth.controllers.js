import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import User from "../models/user.models.js"
import {
  registerUserSchema,
  loginUserSchema,
} from "../validators/auth.validators.js"
import { UserRolesEnum } from "../constants.js"
import { emailVerificationMailgenContent, sendMail } from "../utils/mail.js"

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Strict",
}

const registerUser = asyncHandler(async (req, res) => {
  const validate = registerUserSchema.safeParse(req.body)
  if (!validate.success)
    throw new ApiError(
      401,
      validate.error.issues.map((mess) => mess.message)
    )

  const { username, email, password } = req.body

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  })
  if (existingUser)
    throw new ApiError(409, "user with username or email already exists")

  const user = await User.create({
    username,
    email,
    password,
    isEmailVerified: false,
    // role: role || UserRolesEnum.USER
  })

  const { unHashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken()

  user.emailVerificationToken = hashedToken
  user.emailVerificationExpiry = tokenExpiry
  await user.save({ validateBeforeSave: false })

  await sendMail({
    email: user?.email,
    subject: "Please verify your email",
    mailgenContent: emailVerificationMailgenContent(
      user.username,
      `${req.protocol}://${req.get(
        "host"
      )}/api/v1/users/verify-email/${unHashedToken}`
    ),
  })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
  )

  if (!createdUser)
    throw new ApiError(500, "Something went wrong while registering the user")
  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        "User registered successfully and verification email has been sent on your email"
      )
    )
})

const loginUser = asyncHandler(async (req, res) => {
  const validate = loginUserSchema.safeParse()
  if (!validate.success)
    throw new ApiError(
      400,
      validate.error.issues.map((mess) => mess.message)
    )

  const { email, username, password } = req.body

  const user = await User.findOne({
    $or: [{ username }, { email }],
  })

  if (!user) throw new ApiError(404, "User does not exist")

  const isPasswordValid = await user.isPasswordCorrect(password)

  if (!isPasswordValid) throw new ApiError(400, "invalid credentials")

  const accessToken = user.generateAccessToken()
  const refreshToken = user.generateRefreshToken()

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
  )

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(200, "User logged in successfully", {
        user: loggedInUser,
        accessToken,
        refreshToken,
      })
    )
})

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: "",
      },
    },
    { new: true }
  )

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, {}, "User logged out"))
})

export { registerUser, loginUser, logoutUser }
