import * as React from 'react'
import MainLayout from '../../../layouts/Main'
import { IServerResponseBot, IUIResponseBot } from '../../../services/api/bots/bots.types'
import * as Styled from'./BotList.styles'
import { Skeleton, Switch, Card, Avatar } from 'antd';
import { MoneyCollectOutlined } from '@ant-design/icons';
import { useRouter } from "next/router";
import Link from 'next/link'

const { Meta } = Card

interface IBotsList {
  bots: IUIResponseBot[]
  currentPickedBot: string
}

const List: React.FC<IBotsList> = ({ bots, currentPickedBot }) => {
  return (
    <Styled.BotList>
      {bots.map(bot => <SingleBotCard bot={bot} key={bot.id} currentPickedBot={currentPickedBot} />)}
    </Styled.BotList>
  )
}

interface ISingleBotCard {
  bot: IUIResponseBot
  currentPickedBot: string
}

const SingleBotCard: React.FC<ISingleBotCard> = ({ bot, currentPickedBot }) => {
  const router = useRouter()

  return (
    <Link href={`/dashboard/bot-list/${bot.id}/general`}>
      <Styled.BotCardContainer isBotPicked={currentPickedBot === bot.id} data-testid="bot">
        <Styled.BotCard style={{ width: '100%' }} hoverable>
          <Meta 
            title={bot.name}
            description={bot.type}
            avatar={<MoneyCollectOutlined color='#BFBFBF' style={{ fontSize: '35px', color: '#BFBFBF' }} />}
          />
        </Styled.BotCard>
      </Styled.BotCardContainer>
    </Link>
  )
}

export default List
