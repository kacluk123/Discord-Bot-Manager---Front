import * as React from 'react'
import MainLayout from '../../../layouts/Main'
import { IServerResponseBot } from '../../../services/api/bots/bots.types'
import * as Styled from'./bot-list.styles'
import { Skeleton, Switch, Card, Avatar } from 'antd';
import { MoneyCollectOutlined } from '@ant-design/icons';

const { Meta } = Card

interface IBotsList {
  bots: IServerResponseBot[]
}

const List: React.FC<IBotsList> = ({ bots }) => {
  return (
    <Styled.BotList>
      {bots.map(bot => <SingleBotCard bot={bot} />)}
    </Styled.BotList>
  )
}

interface ISingleBotCard {
  bot: IServerResponseBot
}

const SingleBotCard: React.FC<ISingleBotCard> = ({ bot }) => (
  <Card style={{ width: 300 }}>
    <Meta 
      title={bot.name}
      description={bot.type}
      avatar={<MoneyCollectOutlined color='#BFBFBF' style={{ fontSize: '35px', color: '#BFBFBF' }} />}
    />
  </Card>
)

export default List
