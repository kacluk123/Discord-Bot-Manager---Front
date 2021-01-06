import * as React from 'react'
import * as Styled from './form.styles'
import { api } from '../../../../services/api'
import { botTypes } from '../../../../services/api/bots/bots.types'
import { useRouter } from "next/router";
import { Form, Input, Button, Checkbox } from 'antd';
import { useForm, Controller } from 'react-hook-form'
import MainLayout from '../../../../layouts/Main'
import { IServerRequestBot } from '../../../../services/api/bots/bots.types'
import cogoToast from 'cogo-toast';
import useBots from '../../../../remote/bots'

interface CreateBotForm {
  name: string
  token: string
}

const CreateBotForm: React.FC = () => {
  const router = useRouter()
  const { addBot } = useBots()
  const { register, handleSubmit, control } = useForm<CreateBotForm>({
    mode: 'onChange'
  })

  const createBot = async (data: CreateBotForm) => {
    try {
      if (((type): type is botTypes => typeof type === 'string')(router.query.bot)) {
        const response = await api.bot.createBot({
          ...data,
          type: router.query.bot,
          isActive: false,
        })
        addBot(response)
        router.push(`/dashboard/bot-list/${response.id}/general`)
      }
      cogoToast.success('Bot created succesfully!')
    } catch (err) {
      cogoToast.error(err.message)
    }
  }

  return (
    <MainLayout>
      <Styled.CreateBotForm>
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
          <Button type="primary" onClick={handleSubmit(createBot)}>
            Create bot
          </Button>
        </Styled.CreateBotFormContent>
      </Styled.CreateBotForm>
    </MainLayout>
  )
}

export default CreateBotForm