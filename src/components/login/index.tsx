import Head from 'next/head'
import { Button } from 'antd';
import * as Styled from './login.styles'
import { api } from '../../services/api'

export default function Home() {
  return (
    <Styled.Login>
      <Styled.LoginHeader>Discord Bot Manager</Styled.LoginHeader>
      <a href='http://localhost:3000/login'>
        <Button type="primary">
          Login with discord
        </Button>
      </a>
    </Styled.Login>
  )
}