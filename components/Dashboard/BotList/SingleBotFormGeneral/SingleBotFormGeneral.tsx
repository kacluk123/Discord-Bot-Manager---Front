import * as Styled from './SingleBotFormGeneral.styles'
import * as React from 'react'
import BotFormPageLayout from '../Common/BotFormPageLayout'
import { IUIResponseBot } from '../../../../services/api/bots/bots.types'
import { Form, Input, Button, Checkbox } from 'antd';
import { Controller, useForm } from 'react-hook-form'
import { api } from '../../../../services/api'

interface SingleBotFormGeneral {
  bot: IUIResponseBot
}

const SingleBotFormGeneral: React.FC<SingleBotFormGeneral> = ({ bot }) => {
  const { control, handleSubmit, reset } = useForm({ defaultValues: {
    name: bot.name,
    token: bot.token
  }})

  React.useEffect(() => {
    reset(bot)
  }, [bot])

  const onSubmit = async (data: any) => {
    await api.bot.editBot(data, bot.id)
  }
  
  return (
    <BotFormPageLayout>
      <Styled.SingleBotFormGeneral>
        <Styled.CreateBotFormContent>
          <Form.Item label='Bot name'>
            <Controller 
              as={Input}
              name='name'
              defaultValue=""
              control={control}
              rules={{required: true}}
            />
          </Form.Item>
          <Form.Item label='Bot Token'>
            <Controller 
              as={Input}
              name='token'
              defaultValue=""
              control={control}
              rules={{required: true}}
            />
          </Form.Item>
          <Button type="primary" onClick={handleSubmit(onSubmit)}>
            Save
          </Button>
        </Styled.CreateBotFormContent>
      </Styled.SingleBotFormGeneral>
    </BotFormPageLayout>
  )
}

export default SingleBotFormGeneral