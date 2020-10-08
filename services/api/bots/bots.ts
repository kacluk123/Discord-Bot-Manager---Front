import { mainApi } from '../instance'
import { IServerResponseBot, IServerRequestBot } from './bots.types'

const botURL = 'bots/bot'
const botsURL = 'bots/get-bots'

export const addBot = async (body: IServerRequestBot): Promise<IServerResponseBot> => {
  const { data } = await mainApi.post<IServerResponseBot>(botURL, body, {
    withCredentials: true
  })

  return data
}

export const getBots = async (): Promise<IServerResponseBot[]> => {
  const { data } = await mainApi.get<IServerResponseBot[]>(botsURL, {
    withCredentials: true
  })

  return data
}