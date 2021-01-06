import { IDiscordUserServerResponse } from './user.types'

export class UserModel {
  id: string
  username: string
  discriminator: string
  avatar: string
  bot?: boolean
  system?: boolean
  mfaEnabled?: boolean
  locale?: string
  verified?: boolean
  email?: string
  flags?: number
  premiumType?: number
  publicFlags?: number
  
  constructor(user: IDiscordUserServerResponse) {
    this.id = user.id
    this.username = user.username
    this.discriminator = user.discriminator
    this.avatar = user.avatar
    this.bot = user.bot
    this.system = user.system
    this.mfaEnabled = user.mfaEnabled
    this.locale = user.locale
    this.verified = user.verified
    this.email = user.email
    this.flags = user.flags
    this.premiumType = user.premiumType
    this.publicFlags = user.publicFlags
  }

  get avatarUrl() {
    return `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.jpg`
  }
}