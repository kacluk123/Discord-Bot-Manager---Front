import { mainApi } from '../instance'
import { IDiscordUserServerResponse } from '../user/user.types'
import { UserModel } from '../user/user.model'

const getAuthDataURL = (code: string) => `/login/token?code=${code}`

export const getAuthData = async ({ code }: { code: string }): Promise<IDiscordUserServerResponse> => {
  const { data } = await mainApi.get<IDiscordUserServerResponse>(getAuthDataURL(code), {
    withCredentials: true
  })
  return data
} 