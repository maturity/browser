import { successResponse } from '../data/response'
import { customerLogin, customerFetch } from '../data/customer'

export const register = req => {
  req = JSON.parse(req.body)

  customerLogin.customer.name = req.name
  customerLogin.customer.email = req.email

  successResponse.data = customerLogin
  return successResponse
}

export const login = req => {
  req = JSON.parse(req.body)
  if (req.username.indexOf('@') !== -1) {
    customerLogin.customer.email = req.username
  } else {
    customerLogin.customer.name = req.username
  }

  successResponse.data = customerLogin
  return successResponse
}

export const logout = () => {
  return successResponse
}

export const fetchUser = () => {
  successResponse.data = customerFetch
  return successResponse
}

export const passwordEmail = () => {
  return successResponse
}

export const passwordReset = () => {
  return successResponse
}
