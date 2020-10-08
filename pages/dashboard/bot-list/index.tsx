import * as React from 'react'
import * as Styled from'./bot-list.styles'
import MainLayout from '../../../layouts/Main'
import useSWR from 'swr'
import { api } from '../../../services/api'
import BotList from './list'

const BotsListContainer: React.FC = () => {
  const { 
    data, 
    error, 
    mutate, 
  } = useSWR('/api/bots/get-bots', api.bot.getAllBots)

  return (
    <MainLayout>
      <BotList bots={data} />
    </MainLayout>
  )
}

export default BotsListContainer
