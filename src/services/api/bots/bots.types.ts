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
  type: 'ad'
}

export interface IServerResponseAdBotConfig {
  id: number
  ads: ServerResponseBotAdConfigAds[]
  type: 'ad'
}

export interface ServerRequestBotAdConfig {
  type: 'ad'
  ads: ServerRequestBotAdConfigAds[]
}
export interface ServerRequestBotMusicConfig {
  type: 'music'
  playlist: string[]
}

export interface ServerRequestBotAdConfigAds {
  day: string
  id: string
  time: string
}

export interface IServerResponseMusicBotConfig {
  playlist: IServerResponseYoutubeVideInfo[]
  type: 'music'
}
export interface IUIResponseMusicBotConfig {
  playList: IServerResponseYoutubeVideInfo[]
  type: 'music'
}

export interface IServerResponseYoutubeVideInfo {
  id: string;
  title: string;
  img: string;
  description: string;
}



export type BotConfigsRequest = ServerRequestBotAdConfig | ServerRequestBotMusicConfig
export type BotConfigsUIResponse = IUIResponseMusicBotConfig | IUIResponseAdBotConfig
export type BotConfigsServerResponse = IServerResponseMusicBotConfig | IServerResponseAdBotConfig
