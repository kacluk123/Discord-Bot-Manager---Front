export type botTypes = 'music' | 'ads'

export interface IServerRequestBot {
  name: string
  type: botTypes
  isActive: boolean;
  token: string;
}

export interface IServerResponseBot extends IServerRequestBot {
  id: string
}