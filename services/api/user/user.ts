import { mainApi } from '../instance'
import { IDiscordUserServerResponse } from './user.types'
import { UserModel } from './user.model'

const authorizeUserUrl = () => `/user/authorize`

export const authorizeUser = async (): Promise<IDiscordUserServerResponse> => {
  const { data } = await mainApi.get<IDiscordUserServerResponse>(authorizeUserUrl(), {
    withCredentials: true
  })
  return data
} 