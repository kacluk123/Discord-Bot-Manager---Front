import { mainApi } from '../instance'
import { IServerResponseBot, IServerRequestBot, IServerResponseBots, IUIResponseBots, IUIResponseBot, IServerResponseYoutubeVideInfo } from './bots.types'
import { unpackBot, unpackBots } from './bots.mappers'

const botURL = 'bots/bot'
const editBotURL = (botId: string) =>  `bots/bot/${botId}` 
const botsURL = 'bots/get-bots'
const youtubeURL = (ytVideoId: string) => `music/${ytVideoId}`

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

export const deleteBot = async (id: string): Promise<void> => {
  await mainApi.delete(editBotURL(id), {
    withCredentials: true
  })
}

export const getYoutubeVideoInfo = async (link: string) => {
  const { data } = await mainApi.get<IServerResponseYoutubeVideInfo>(youtubeURL(getYoutubeId(link)), {
    withCredentials: true
  })

  return data
}

const getYoutubeId = (link: string) => {
  const url = new URL(link)

  return url.search.substr(3, url.search.length)
}