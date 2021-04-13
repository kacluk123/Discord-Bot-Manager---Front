import Head from 'next/head'
import { Button } from 'antd';
import * as Styled from './login.styles'
import { api } from '../../services/api'
import getConfig from 'next/config'

export default function Home() {
  const { publicRuntimeConfig } = getConfig()
  return (
    <Styled.Login>
      <Styled.LoginHeader>Discord Bot Manager</Styled.LoginHeader>
      <a href={`${publicRuntimeConfig.apiUrl}/login`}>
        <Button type="primary">
          Login with discord
        </Button>
      </a>
    </Styled.Login>
  )
}
