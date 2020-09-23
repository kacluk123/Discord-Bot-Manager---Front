import * as React from 'react'
import { api } from '../services/api'
import { UserModel } from '../services/api/user/user.model'
import { useRouter } from 'next/router'
import useUser from '../remote/user'
import useSWR from 'swr'

function ProtectRoute<T>(Component: React.ComponentType<T>) {
  return (props: T & { code?: string }) => {
    const code = props?.code
    React.useEffect(() => {
      if (!data) {
        getUserData()
      }
    }, [])
    
    const { data, mutate } = useUser()
    const router = useRouter()

    const getUserData = async () => {
      try {
        if (code) {
          await api.auth.getAuthData({ code })
        }
        const userData = await api.user.authorize()
        mutate(new UserModel(userData))
      } catch {
        router.push('/login')
      }
    }
    

    if (!data) {
      return null
    } 

    return <Component {...props} /> 
  }
}
export default ProtectRoute