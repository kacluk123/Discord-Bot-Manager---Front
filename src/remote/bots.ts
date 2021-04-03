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
    if (data?.bots) {
      const newBotList = data.bots.map(bot => bot.id === newBot.id ? newBot : bot)
      mutate({
        ...data,
        bots: newBotList
      })
    }
  }

  const getCurrentPickedBot = (botId: string) => {
    return data.bots.find(bot => bot.id === botId)
  }

  const addBot = (newBot: IUIResponseBot) => {
    mutate({
      ...data,
      bots: [
        newBot, 
        ...data.bots
      ]
    })
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

  const deleteBot = (botId: string) => {
    const { bots } = data
    const replacedList = bots.filter((bot) => bot.id !== botId)
    
    mutate({
      ...data,
      bots: replacedList
    })
  }

  return {
    data, 
    error, 
    addBot,
    mutate, 
    replaceBot,
    replaceData,
    getCurrentPickedBot,
    deleteBot
  }
}

export default useBots