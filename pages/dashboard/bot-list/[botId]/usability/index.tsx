import SingleBotFormUsability from '../../../../../components/Dashboard/BotList/SingleBotFormUsability'
import { GetServerSidePropsContext } from 'next'

export default SingleBotFormUsability

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