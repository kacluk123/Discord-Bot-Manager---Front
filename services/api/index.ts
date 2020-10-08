import * as auth from './auth/auth'
import * as user from './user/user'
import * as bot from './bots/bots'

export const api = {
  auth: {
    getAuthData: auth.getAuthData
  },
  user: {
    authorize: user.authorizeUser
  },
  bot: {
    createBot: bot.addBot,
    getAllBots: bot.getBots
  }
}