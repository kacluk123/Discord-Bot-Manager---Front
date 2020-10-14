import { 
  IUIResponseBot, 
  IServerResponseBot, 
  IServerResponseBots, 
  IUIResponseBots, 
  IServerResponseAdBotConfig, 
  IUIResponseAdBotConfig,
  botTypes 
} from './bots.types'

const botFactory = (config: IUIResponseAdBotConfig, botType: botTypes): IUIResponseAdBotConfig => {
  switch (botType) {
    case 'ads': {
      return {
        aDtext: config.aDtext,
        id: config.id,
        timeToResend: config.timeToResend
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