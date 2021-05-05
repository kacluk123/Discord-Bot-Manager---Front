import * as React from 'react'

import { useRouter } from 'next/router'

import * as Styled from './bots.styles'
import MainLayout from 'src/layouts/Main'
import useBots from 'src/remote/bots'
import BotList from '../list'

interface IMainBotLayout {
  botId?: string
}

const MainBotLayout: React.FC<IMainBotLayout> = ({ botId, children }) => {
  const { 
    data, 
    getCurrentPickedBot,
  } = useBots()
  
  const router = useRouter()

  React.useEffect(() => {
    const bot = getCurrentPickedBot(botId)
    if (!bot && data?.bots) {
      console.log('elo')
      router.push(`/dashboard/bot-list/${data.bots[0].id}/general`)
    }
  }, [botId, data?.bots.length])

  const bot = getCurrentPickedBot(botId)

  return (
    <MainLayout>
      <Styled.BotPageContainer>
        {data?.bots && <BotList bots={data.bots} currentPickedBot={botId} />}
        {data?.bots.length > 0 && bot ? (
          children
        ) : null}
      </Styled.BotPageContainer>
    </MainLayout>
  )
}

export default MainBotLayout