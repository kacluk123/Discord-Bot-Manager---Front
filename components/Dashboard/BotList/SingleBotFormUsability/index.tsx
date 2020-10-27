import * as React from 'react'
import * as Styled from'../BotList.styles'
import MainLayout from '../../../../layouts/Main'
import useSWR from 'swr'
import { api } from '../../../../services/api'
import BotList from '../list'
import { GetServerSidePropsContext } from 'next'
import ProtectRoute from '../../../../hoc/ProtectRoute'
import { BotPageContainer } from '../Common/bots.styles'
// import SingleBotFormGeneral from './SingleBotFormGeneral'
import useBots from '../../../../remote/bots'
import BotFormPicker from './BotFormPicker/botFormPicker'

interface BotsListContainer {
  botId?: string
}

const UsabilityBotsListContainer: React.FC<BotsListContainer> = ({ botId }) => {
  const { 
    data, 
    error, 
    mutate, 
    getCurrentPickedBot
  } = useBots()

  return (
    <MainLayout>
      <BotPageContainer>
        {data?.bots && <BotList bots={data.bots} currentPickedBot={botId} />}
        {data?.bots ? <BotFormPicker bot={getCurrentPickedBot(botId)} /> : null}
      </BotPageContainer>
    </MainLayout>
  )
}

export default ProtectRoute(UsabilityBotsListContainer)
