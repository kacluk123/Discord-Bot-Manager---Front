import { mainApi } from '../instance'
import { IServerResponseBot, IServerRequestBot } from './bots.types'

const botURL = 'bots/bot'

export const addBot = async (body: IServerRequestBot): Promise<IServerResponseBot> => {
  const { data } = await mainApi.post<IServerResponseBot>(botURL, body, {
    withCredentials: true
  })

  return data
}