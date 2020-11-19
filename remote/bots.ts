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
    revalidateOnMount:true,
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

  const replaceData = (newBot: IUIResponseBot) => {
    const replacedList = data.bots.filter((bot) => bot.id !== newBot.id)
    
    mutate({
      ...data,
      bots: [
        newBot, 
        ...replacedList
      ]
    })
  }

  return {
    data, 
    error, 
    mutate, 
    replaceBot,
    replaceData,
    getCurrentPickedBot
  }
}

export default useBots