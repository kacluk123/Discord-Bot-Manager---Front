import SingleBotFormGeneral from '../../../../../components/Dashboard/BotList/SingleBotFormGeneral'
import { GetServerSidePropsContext } from 'next'

export default SingleBotFormGeneral

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const botId = context.query.botId 
  
  if (botId) {
    return {
      props: {
        botId
      },
    }
  }
  return {
    props: {}
  }
}