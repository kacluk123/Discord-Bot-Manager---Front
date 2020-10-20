import * as React from 'react'
import * as Styled from './bots.styles'
import { Menu } from 'antd';
import { useRouter } from "next/router";
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

const BotFormPageLayout: React.FC = ({ children }) => {
  const router = useRouter()

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
          General
        </Menu.Item>
        <Menu.Item key="usability" icon={<SettingOutlined />}>
          Usability
        </Menu.Item>
      </Menu>
      {children}
    </Styled.BotFormPageLayout>
  )
}

export default BotFormPageLayout