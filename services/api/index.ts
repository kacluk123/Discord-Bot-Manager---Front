import * as auth from './auth/auth'
import * as user from './user/user'

export const api = {
  auth: {
    getAuthData: auth.getAuthData
  },
  user: {
    authorize: user.authorizeUser
  }
}