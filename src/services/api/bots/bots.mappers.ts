import { 
  IUIResponseBot, 
  IServerResponseBot, 
  IServerResponseBots, 
  IUIResponseBots, 
  IServerResponseAdBotConfig, 
  IUIResponseAdBotConfig,
  botTypes,
  BotConfigsUIResponse,
  BotConfigsServerResponse,
  IUIResponseMusicBotConfig,
  IServerResponseMusicBotConfig
} from './bots.types'

const botFactory = (config: BotConfigsServerResponse | null, botType: botTypes): BotConfigsUIResponse => {
  switch (botType) {
    case 'ad': {
      const conf = config as IServerResponseAdBotConfig
      return {
        ads: conf.ads || []
      }
    }
    case 'music': {
      const conf = config as IServerResponseMusicBotConfig
      return {
        playList: conf.playlist
      }
    }
  }
}


export const unpackBot = (response: IServerResponseBot): IUIResponseBot => ({
  id: response.id.toString(),
  name: response.name,
  type: response.type,
  isActive: response.isActive,
  token: response.token,
  config: botFactory(response.config, response.type)
})

export const unpackBots = (response: IServerResponseBots): IUIResponseBots => ({
  bots: response.bots.map(bot => unpackBot(bot))
})