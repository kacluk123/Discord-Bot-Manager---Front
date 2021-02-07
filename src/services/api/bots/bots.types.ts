export type botTypes = 'music' | 'ad'

export interface IServerRequestBot {
  name?: string
  type?: botTypes
  isActive?: boolean;
  token?: string;
  config?: BotConfigsRequest;
}

export interface IServerResponseBot extends Omit<IServerRequestBot, 'config'> {
  id: number
  config?: BotConfigsServerResponse
}

export interface IUIResponseBot {
  id: string
  name: string
  type: botTypes
  isActive: boolean
  token: string
  config: BotConfigsUIResponse 
}

export interface IUIResponseBots {
  bots: IUIResponseBot[]
}

export interface IServerResponseBots {
  bots: IServerResponseBot[]
}
export interface ServerResponseBotAdConfigAds {
  day: string
  id: string
  time: string
}

export interface IUIResponseAdBotConfig {
  ads: ServerResponseBotAdConfigAds[]
}

export interface IServerResponseAdBotConfig {
  id: number
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

export interface IServerResponseMusicBotConfig {
  playlist: string[]
}
export interface IUIResponseMusicBotConfig {
  playList: string[]
}



export type BotConfigsRequest = ServerRequestBotAdConfig
export type BotConfigsUIResponse = IUIResponseMusicBotConfig | IUIResponseAdBotConfig
export type BotConfigsServerResponse = IServerResponseMusicBotConfig | IServerResponseAdBotConfig
