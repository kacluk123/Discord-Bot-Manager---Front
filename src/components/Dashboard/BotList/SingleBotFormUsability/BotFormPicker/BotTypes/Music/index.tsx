import * as React from 'react'
import * as Styled from './Music.styles'
import { IUIResponseMusicBotConfig } from '../../../../../../../services/api/bots/bots.types'

interface IMusicBot {
  config: IUIResponseMusicBotConfig
}

const MusicBot: React.FC<IMusicBot> = ({ config }) => {
  return (
    <Styled.MusicBot>
      'yoo'
    </Styled.MusicBot>
  )
}

export default MusicBot