import { successResponse } from '../data/response'
import { adminLogin, adminFetch } from '../data/admin'

export const register = req => {
  req = JSON.parse(req.body)

  adminLogin.admin.name = req.name
  adminLogin.admin.email = req.email

  successResponse.data = adminLogin
  return successResponse
}

export const login = req => {
  req = JSON.parse(req.body)
  if (req.username.indexOf('@') !== -1) {
    adminLogin.admin.email = req.username
  } else {
    adminLogin.admin.name = req.username
  }

  successResponse.data = adminLogin
  return successResponse
}

export const logout = () => {
  return successResponse
}

export const fetchUser = () => {
  successResponse.data = adminFetch
  return successResponse
}

export const passwordEmail = () => {
  return successResponse
}

export const passwordReset = () => {
  return successResponse
}
