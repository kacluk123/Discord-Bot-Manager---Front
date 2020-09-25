import * as React from 'react'
import * as Styled from './create-bot.styles'
import { MoneyCollectOutlined } from '@ant-design/icons';
import MainLayout from '../../../layouts/Main'
import Link from 'next/link'
import { useRouter } from "next/router";

const CreateBot: React.FC = () => {
  return (
    <MainLayout>
      <Styled.CreateBot>
        <Styled.CreateBotTypes>
          <SingleBotCard
            headerText='Ad bot'
            description="Create bot to send add's on discord channels!"
            botName='ad'
          >
            <MoneyCollectOutlined color='#BFBFBF' style={{ fontSize: '100px', color: '#BFBFBF' }} />
          </SingleBotCard>
        </Styled.CreateBotTypes>
      </Styled.CreateBot>
    </MainLayout>
  )
}

interface ISingleBotCard {
  headerText: string
  description: string
  botName: string
}

const SingleBotCard: React.FC<ISingleBotCard> = ({ children, headerText, botName, description }) => {
  const router = useRouter()

  return (
    <Link href={`${router.pathname}/form?bot=${botName}`}>
      <Styled.CreateBotSingle>
        {children}
        <Styled.CreateBotSingleHeader>{headerText}</Styled.CreateBotSingleHeader>
        <Styled.CreateBotSingleDescription>{description}</Styled.CreateBotSingleDescription>
      </Styled.CreateBotSingle>
    </Link>
  )
}

export default CreateBot