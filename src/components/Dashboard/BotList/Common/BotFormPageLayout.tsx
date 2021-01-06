import * as React from 'react'
import * as Styled from './bots.styles'
import { Menu } from 'antd';
import { useRouter } from "next/router";
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import Link from 'next/link'

const BotFormPageLayout: React.FC = ({ children }) => {
  const router = useRouter()
  const { botId } = router.query

  const getCurrentOpenedSettingLabel = () => {
    if (router.pathname.includes('general')) {
      return 'general'
    }
    if (router.pathname.includes('usability')) {
      return 'usability'
    }
  }

  return (
    <Styled.BotFormPageLayout>
      <Menu mode="horizontal" selectedKeys={[getCurrentOpenedSettingLabel()]}>
        <Menu.Item key="general" icon={<SettingOutlined />}>
          <Link href={`/dashboard/bot-list/${botId}/general`}>
            General
          </Link>
        </Menu.Item>
        <Menu.Item key="usability" icon={<SettingOutlined />}>
          <Link href={`/dashboard/bot-list/${botId}/usability`}>
            Usability
          </Link>
        </Menu.Item>
      </Menu>
      {children}
    </Styled.BotFormPageLayout>
  )
}

export default BotFormPageLayout