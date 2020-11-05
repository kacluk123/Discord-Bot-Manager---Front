export type botTypes = 'music' | 'ad'

export interface IServerRequestBot {
  name?: string
  type?: botTypes
  isActive?: boolean;
  token?: string;
  config?: BotConfigs;
}

export interface IServerResponseBot extends IServerRequestBot {
  id: number
  config?: IServerResponseAdBotConfig
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
  ads: ServerResponseBotAdConfigAds[]
}

export interface ServerResponseBotAdConfigAds {
  day: string
  id: string
  time: string
}

export interface IUIResponseAdBotConfig {
  ads: ServerResponseBotAdConfigAds[]
}

export interface ServerRequestBotAdConfig {
  ads: ServerRequestBotAdConfigAds[]
}

export interface ServerRequestBotAdConfigAds {
  day: string
  id: string
  time: string
}

export type BotConfigs = ServerRequestBotAdConfig
