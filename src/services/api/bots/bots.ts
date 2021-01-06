import { mainApi } from '../instance'
import { IServerResponseBot, IServerRequestBot, IServerResponseBots, IUIResponseBots, IUIResponseBot } from './bots.types'
import { unpackBot, unpackBots } from './bots.mappers'

const botURL = 'bots/bot'
const editBotURL = (botId: string) =>  `bots/bot/${botId}` 
const botsURL = 'bots/get-bots'

export const addBot = async (body: IServerRequestBot): Promise<IUIResponseBot> => {
  const { data } = await mainApi.post<IServerResponseBot>(botURL, body, {
    withCredentials: true
  })

  return unpackBot(data)
}

export const editBot = async (body: Partial<IServerRequestBot>, botId: string): Promise<IUIResponseBot> => {
  const { data } = await mainApi.patch<IServerResponseBot>(editBotURL(botId), body, {
    withCredentials: true
  })

  return unpackBot(data)
}

export const getBots = async (): Promise<IUIResponseBots> => {
  const { data } = await mainApi.get<IServerResponseBots>(botsURL, {
    withCredentials: true
  })

  return unpackBots(data)
}