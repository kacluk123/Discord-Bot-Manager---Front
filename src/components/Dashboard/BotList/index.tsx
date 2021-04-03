import * as React from 'react'
import * as Styled from'./BotList.styles'
import MainLayout from '../../../layouts/Main'
import useSWR from 'swr'
import { api } from '../../../services/api'
import BotList from './list'
import { useRouter } from "next/router";
import ProtectRoute from '../../../hoc/ProtectRoute'
import useBots from '../../../remote/bots'

const BotsListContainer: React.FC = () => {
  const router = useRouter()
  const { 
    data, 
    error, 
    mutate, 
  } = useBots()

  React.useEffect(() => {
    if (data?.bots[0]) {
      router.push(`/dashboard/bot-list/${data.bots[0].id}/general`)
    } 
  }, [data])
  
  return error ? (
    <MainLayout>
      Failed to load bot list
    </MainLayout>
  ) : <MainLayout>No bots currently created!</MainLayout>
}

export default ProtectRoute(BotsListContainer)
