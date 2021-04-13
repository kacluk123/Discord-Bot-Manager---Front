import Head from 'next/head'
import { Button } from 'antd';
import * as Styled from './login.styles'
import { api } from '../../services/api'

const config = require('../../../config.json')

export default function Home() {

  return (
    <Styled.Login>
      <Styled.LoginHeader>Discord Bot Manager</Styled.LoginHeader>
      <a href={`${config.apiUrl}/login`}>
        <Button type="primary">
          Login with discord
        </Button>
      </a>
    </Styled.Login>
  )
}
