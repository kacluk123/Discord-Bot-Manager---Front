import useSWR from 'swr'
import { UserModel } from '../services/api/user/user.model'

const useUser = () => {
  const { 
    data, 
    error, 
    mutate, 
  } = useSWR<UserModel>('/api/user')
  
  return {
    data, 
    error, 
    mutate 
  }
}

export default useUser