import * as React from 'react'
import * as Styled from'./bot-list.styles'
import MainLayout from '../../../layouts/Main'
import useSWR from 'swr'
import { api } from '../../../services/api'
import BotList from './list'
import { useRouter } from "next/router";
import ProtectRoute from '../../../hoc/ProtectRoute'

const BotsListContainer: React.FC = () => {
  const router = useRouter()
  const { 
    data, 
    error, 
    mutate, 
  } = useSWR('/api/bots/get-bots', api.bot.getAllBots)

  React.useEffect(() => {
    if (data) {
      router.push(`/dashboard/bot-list/${data.bots[0].id}`)
    }
  }, [data])
  
  return error ? (
    <MainLayout>
      Failed to load bot list
    </MainLayout>
  ) : <MainLayout />
}

export default ProtectRoute(BotsListContainer)
