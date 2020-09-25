import * as React from 'react'
import * as Styled from './form.styles'
import { api } from '../../../../services/api'
import { useRouter } from "next/router";
import { Form, Input, Button, Checkbox } from 'antd';
import { useForm, Controller } from 'react-hook-form'
import MainLayout from '../../../../layouts/Main'
import { IServerRequestBot } from '../../../../services/api/bots/bots.types'

interface CreateBotForm {
  name: string
  token: string
}

const CreateBotForm: React.FC = () => {
  const router = useRouter()
  const { register, handleSubmit, control } = useForm<CreateBotForm>({
    mode: 'onChange'
  })

  const createBot = async (data: CreateBotForm) => {
    console.log(data)
    const response = await api.bot.createBot({
      ...data,
      type: router.query.bot,
      isActive: false,
    })
    console.log(response)
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