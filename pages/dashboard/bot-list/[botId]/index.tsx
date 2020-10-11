import * as React from 'react'
import * as Styled from'../bot-list.styles'
import MainLayout from '../../../../layouts/Main'
import useSWR from 'swr'
import { api } from '../../../../services/api'
import BotList from '.././list'
import { GetServerSidePropsContext } from 'next'
import ProtectRoute from '../../../../hoc/ProtectRoute'

interface BotsListContainer {
  botId?: string
}

const BotsListContainer: React.FC<BotsListContainer> = ({ botId }) => {
  const { 
    data, 
    error, 
    mutate, 
  } = useSWR('/api/bots/get-bots', api.bot.getAllBots)

  return (
    <MainLayout>
      {data && <BotList bots={data} />}
    </MainLayout>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const botId = context.query.botId 
  
  if (botId) {
    return {
      props: {
        botId
      },
    }
  }
  return {
    props: {}
  }
}

export default ProtectRoute(BotsListContainer)
