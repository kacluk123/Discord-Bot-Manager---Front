export type botTypes = 'music' | 'ads'

export interface IServerRequestBot {
  name: string
  type: botTypes
  isActive: boolean;
  token: string;
}

export interface IServerResponseBot extends IServerRequestBot {
  id: number
  config: IServerResponseAdBotConfig
}

export interface IUIResponseBot {
  id: string
  name: string
  type: botTypes
  isActive: boolean
  token: string
  config: IUIResponseAdBotConfig 
}

export interface IUIResponseBots {
  bots: IUIResponseBot[]
}

export interface IServerResponseBots {
  bots: IServerResponseBot[]
}

export interface IServerResponseAdBotConfig {
  id: number
  timeToResend: number
  aDtext: string
}

export interface IUIResponseAdBotConfig {
  id: number
  timeToResend: number
  aDtext: string
}
