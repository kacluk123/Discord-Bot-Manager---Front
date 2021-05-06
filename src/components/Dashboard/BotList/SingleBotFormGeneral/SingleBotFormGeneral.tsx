import * as Styled from './SingleBotFormGeneral.styles'
import * as React from 'react'
import BotFormPageLayout from '../Common/BotFormPageLayout'
import { IUIResponseBot } from '../../../../services/api/bots/bots.types'
import { Form, Input, Button, Switch } from 'antd';
import { Controller, useForm } from 'react-hook-form'
import { api } from '../../../../services/api'
import useBots from '../../../../remote/bots'
import cogoToast from 'cogo-toast';
import { SaveOutlined } from '@ant-design/icons';
interface SingleBotFormGeneral {
  bot: IUIResponseBot
}

const SingleBotFormGeneral: React.FC<SingleBotFormGeneral> = ({ bot }) => {
  const { replaceBot, data } = useBots()
  const [isPending, setPending] = React.useState<boolean>(false)
  const { control, handleSubmit, reset } = useForm({ defaultValues: {
    name: bot.name,
    token: bot.token,
    isActive: bot.isActive
  }})

  React.useEffect(() => {
    reset(bot)
  }, [bot])

  const onSubmit = async (data: any) => {
    setPending(true)
    try {
      const response = await api.bot.editBot(data, bot.id)

      replaceBot(response)
      cogoToast.success('Bot data saved sucesfully!')
    } catch (err) {
      cogoToast.error(err.message)
    } finally {
      setPending(false)
    }
  }
  
  return (
    <BotFormPageLayout>
      <Styled.SingleBotFormGeneral>
        <Styled.CreateBotFormContent>
          <Form.Item label='Bot name'>
            <Controller 
              as={Input}
              name='name'
              data-testid='generalName'
              defaultValue=""
              control={control}
              rules={{required: true}}
            />
          </Form.Item>
          <Form.Item label='Bot Token'>
            <Controller 
              as={Input}
              name='token'
              data-testid='generalToken'
              defaultValue=""
              control={control}
              rules={{required: true}}
            />
          </Form.Item>
          <Form.Item label='Enabled'>
            <Controller 
              render={({ value, onChange }) => (
                <Switch 
                  checked={value}
                  title='Enabled'
                  data-testid='generalIsActive'
                  onChange={onChange}
                  defaultChecked={bot.isActive}
                />
              )}
              name='isActive'
              control={control}
              // rules={{required: true}}
            />
          </Form.Item>
          <Button 
            type="primary" 
            onClick={handleSubmit(onSubmit)} 
            loading={isPending}
            data-testid='saveGeneralBot'
          >
            Save <SaveOutlined size={2} />
          </Button>
        </Styled.CreateBotFormContent>
      </Styled.SingleBotFormGeneral>
    </BotFormPageLayout>
  )
}

export default SingleBotFormGeneral