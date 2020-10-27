import { 
  IUIResponseBot, 
  IServerResponseBot, 
  IServerResponseBots, 
  IUIResponseBots, 
  IServerResponseAdBotConfig, 
  IUIResponseAdBotConfig,
  botTypes 
} from './bots.types'

const botFactory = (config: IUIResponseAdBotConfig | null, botType: botTypes): IUIResponseAdBotConfig => {
  switch (botType) {
    case 'ad': {
      return {
        aDtext: config?.aDtext || "",
        timeToResend: config?.timeToResend || 0
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