import * as React from 'react'
import { botTypes, IUIResponseAdBotConfig, IUIResponseBot } from '../../../../../services/api/bots/bots.types'
import Ad from './BotTypes/Ad'
import BotFormPageLayout from '../../Common/BotFormPageLayout'

interface BotFormPicker {
  bot: IUIResponseBot
}

const BotFormPicker: React.FC<BotFormPicker> = ({ bot }) => {
  let botComponent: React.ReactElement
  
  switch (bot.type) {
    case 'ad': {
      botComponent = <Ad config={bot.config} />
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