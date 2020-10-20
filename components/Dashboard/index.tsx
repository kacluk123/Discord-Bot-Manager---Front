import * as React from 'react'
import { Button } from 'antd';
import { api } from '../../services/api'
import { IDiscordUserServerResponse } from '../../services/api/user/user.types'
import { useRouter, withRouter  } from 'next/router'
import { GetServerSidePropsContext } from 'next'
import useSWR from 'swr'
import MainLayout from '../../layouts/Main'
import { UserModel } from '../../services/api/user/user.model'
import ProtectRoute from '../../hoc/ProtectRoute'
interface IDashboard {
  // userData: IDiscordUserServerResponse
  // code: string
}


const Dashboard: React.FC<IDashboard> = () => {
  const { 
    data, 
    error, 
    mutate 
  } = useSWR('/api/user')
  
  // const authorizeUser = async () => {
  //   const userData = await api.auth.getAuthData({ code })
  //   mutate(new UserModel(userData))
  // }

  // React.useEffect(() => {
  //   if (!data) {
  //     authorizeUser()
  //   }
  // }, [])

  // const x = async () => {
  //   const data = await api.user.authorize()
  //   console.log(data)
  // }

  return (
    <MainLayout>
      <div>
        dasdasdasasd
      </div>
    </MainLayout>
  )
}

export default ProtectRoute(Dashboard)

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const code = context.query.code 
  
  if (code) {
    return {
      props: {
        code
      },
    }
  }
  return {
    props: {}
  }
}
