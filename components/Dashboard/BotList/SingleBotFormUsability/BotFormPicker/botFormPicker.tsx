import * as React from 'react'
import { botTypes, IUIResponseAdBotConfig, IUIResponseBot } from '../../../../../services/api/bots/bots.types'
import Ad from './BotTypes/Ad'

interface BotFormPicker {
  bot: IUIResponseBot
}

const BotFormPicker: React.FC<BotFormPicker> = ({ bot }) => {
  switch (bot.type) {
    case 'ads': {
      <Ad config={bot.config} />
    }
  }
}