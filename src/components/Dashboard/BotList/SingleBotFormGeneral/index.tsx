import * as React from 'react'
import * as Styled from'../BotList.styles'
import MainLayout from '../../../../layouts/Main'
import useSWR from 'swr'
import { api } from '../../../../services/api'
import BotList from '../list'
import { GetServerSidePropsContext } from 'next'
import ProtectRoute from '../../../../hoc/ProtectRoute'
import { BotPageContainer } from '../Common/bots.styles'
import SingleBotFormGeneral from './SingleBotFormGeneral'
import useBots from '../../../../remote/bots'
import { useRouter } from 'next/router'

interface BotsListContainer {
  botId?: string
}

const BotsListContainer: React.FC<BotsListContainer> = ({ botId }) => {
  const { 
    data, 
    error, 
    mutate, 
    getCurrentPickedBot,
  } = useBots()
  const router = useRouter()

  React.useEffect(() => {
    const bot = getCurrentPickedBot(botId)
    if (!bot && data?.bots) {
      router.push(`/dashboard/bot-list/${data.bots[0].id}/general`)
    }
  }, [botId, data?.bots.length])

  const bot = getCurrentPickedBot(botId)

  return (
    <MainLayout>
      <BotPageContainer>
        {data?.bots && <BotList bots={data.bots} currentPickedBot={botId} />}
        {data?.bots.length > 0 && bot ? <SingleBotFormGeneral bot={getCurrentPickedBot(botId)} /> : null}
      </BotPageContainer>
    </MainLayout>
  )
}

export default ProtectRoute(BotsListContainer)
