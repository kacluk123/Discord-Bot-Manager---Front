import * as React from 'react'
import { botTypes, IUIResponseAdBotConfig, IUIResponseBot, IUIResponseMusicBotConfig } from '../../../../../services/api/bots/bots.types'
import Ad from './BotTypes/Ad'
import Music from './BotTypes/Music'
import BotFormPageLayout from '../../Common/BotFormPageLayout'

interface BotFormPicker {
  bot: IUIResponseBot
}

const BotFormPicker: React.FC<BotFormPicker> = ({ bot }) => {
  let botComponent: React.ReactElement

  switch (bot.type) {
    case 'ad': {
      const config = bot.config as IUIResponseAdBotConfig
      botComponent = <Ad config={config} />
      break;
    }
    case 'music': {
      const config = bot.config as IUIResponseMusicBotConfig
      botComponent = <Music config={config} />
      break;
    }
  }

  return (
    <BotFormPageLayout>
      {botComponent}
    </BotFormPageLayout>
  )
}

export default BotFormPicker