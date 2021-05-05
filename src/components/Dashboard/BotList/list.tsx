import * as React from 'react'
import MainLayout from '../../../layouts/Main'
import { botTypes, IServerResponseBot, IUIResponseBot } from '../../../services/api/bots/bots.types'
import * as Styled from'./BotList.styles'
import { Skeleton, Switch, Card, Avatar, Popover } from 'antd';
import { MoneyCollectOutlined, StepForwardOutlined, DeleteFilled } from '@ant-design/icons';
import { useRouter } from "next/router";
import Link from 'next/link'
import { api } from '../../../services/api';
import cogoToast from 'cogo-toast';
import useBots from '../../../remote/bots';

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

const getBotIcon: {[k in botTypes]: React.ReactNode} = {
  'ad': <MoneyCollectOutlined color='#BFBFBF' style={{ fontSize: '35px', color: '#BFBFBF' }} />,
  'music': <StepForwardOutlined color='#BFBFBF' style={{ fontSize: '35px', color: '#BFBFBF' }} />
}


const SingleBotCard: React.FC<ISingleBotCard> = ({ bot, currentPickedBot }) => {
  const { deleteBot, data, revalidate } = useBots()
  const [ isDeletePopoverVisible, setVisibilityOfPopover ] = React.useState<boolean>(false)
  const router = useRouter()
  const BotIcon = getBotIcon[bot.type]
  
  const removeBot = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    try {
      await api.bot.deleteBot(bot.id)
      await revalidate()
    } catch {
      cogoToast.success('Failed to delete bot')
    }
  }

  const handlePopoverNo = (e: React.MouseEvent<HTMLDivElement>) => { 
    e.stopPropagation()
    setVisibilityOfPopover(false) 
  }

  return (
    <Link href={`/dashboard/bot-list/${bot.id}/${router.pathname.includes('general') ? 'general' : 'usability'}`}>
      <Styled.BotCardContainer isBotPicked={currentPickedBot === bot.id} data-testid="bot">
        <Styled.BotCard style={{ width: '100%' }} hoverable>
          <Meta 
            title={bot.name}
            description={bot.type}
            avatar={BotIcon}
          />
          <Styled.DeleteButtonContainer>
            <Popover
              content={<Styled.DeletePopoverContent>
                <Styled.PopoverDelete onClick={removeBot}>
                  Yes
                </Styled.PopoverDelete>
                <Styled.PopoverNotDelete onClick={handlePopoverNo}>
                  No
                </Styled.PopoverNotDelete>
              </Styled.DeletePopoverContent>}
              title="Are you sure to delete bot?"
              trigger="click"
              visible={isDeletePopoverVisible}
              onVisibleChange={setVisibilityOfPopover}
            >
                <DeleteFilled 
                  style={{ fontSize: '18px', color: 'var(--Grey)' }}
                  // onClick={() => {
                  //   remove(index)
                  // }} 
                />
            </Popover>
          </Styled.DeleteButtonContainer>
        </Styled.BotCard>
      </Styled.BotCardContainer>
    </Link>
  )
}

export default List
