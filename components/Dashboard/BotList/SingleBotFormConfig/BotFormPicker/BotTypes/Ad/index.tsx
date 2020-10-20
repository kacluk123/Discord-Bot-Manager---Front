import * as React from 'react'
import * as Styled from './ad.styles'
import { IUIResponseAdBotConfig } from '../../../../../../../services/api/bots/bots.types'

interface AdBot {
  config: IUIResponseAdBotConfig
}

const AdBot: React.FC<AdBot> = ({ config }) => {
  return (
    <Styled.AdBot>
      asd
    </Styled.AdBot>
  )
}

export default AdBot