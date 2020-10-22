import useSWR from 'swr'
import { IUIResponseBot, IUIResponseBots } from '../services/api/bots/bots.types'
import { api } from '../services/api'

const useBots = () => {
  const { 
    data, 
    error, 
    mutate, 
  } = useSWR<IUIResponseBots>('/api/bots/get-bots', api.bot.getAllBots, {
    revalidateOnFocus: false,
    // revalidateOnMount:false,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
  })
  
  const replaceBot = (newBot: IUIResponseBot) => {
    const newBotList = data.bots.map(bot => bot.id === newBot.id ? newBot : bot)
    mutate({
      ...data,
      bots: newBotList
    })
  }

  const getCurrentPickedBot = (botId: string) => {
    return data.bots.find(bot => bot.id === botId)
  }

  return {
    data, 
    error, 
    mutate, 
    replaceBot,
    getCurrentPickedBot
  }
}

export default useBots