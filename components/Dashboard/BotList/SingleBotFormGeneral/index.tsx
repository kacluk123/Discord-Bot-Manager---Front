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

interface BotsListContainer {
  botId?: string
}

const BotsListContainer: React.FC<BotsListContainer> = ({ botId }) => {
  const { 
    data, 
    error, 
    mutate, 
  } = useSWR('/api/bots/get-bots', api.bot.getAllBots)

  // const currentPickedBot = React.useMemo(() => {
  //   return data?.bots ? data?.bots?.find(bot => bot.id === botId) : null
  // }, [botId])

  const getCurrentPickedBot = () => {
    return data.bots.find(bot => bot.id === botId)
  }

  return (
    <MainLayout>
      <BotPageContainer>
        {data?.bots && <BotList bots={data.bots} currentPickedBot={botId} />}
        {data?.bots ? <SingleBotFormGeneral bot={getCurrentPickedBot()} /> : null}
      </BotPageContainer>
    </MainLayout>
  )
}

export default ProtectRoute(BotsListContainer)
