import Dashboard from '../../components/Dashboard'
import { GetServerSidePropsContext } from 'next'

export default Dashboard

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
