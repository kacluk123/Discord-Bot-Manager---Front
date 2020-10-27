import * as React from 'react'
import * as Styled from './ad.styles'
import { IUIResponseAdBotConfig } from '../../../../../../../services/api/bots/bots.types'
import { Form, Input, Button, Checkbox } from 'antd';
import { Controller, useForm } from 'react-hook-form'

interface AdBot {
  config: IUIResponseAdBotConfig
}

const AdBot: React.FC<AdBot> = ({ config }) => {
  const { control, handleSubmit } = useForm()
  
  return (
    <Styled.AdBot>
      <Styled.AdBotFormContent>
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
        {/* <Button type="primary" onClick={handleSubmit(onSubmit)} loading={isPending}>
          Save
        </Button> */}
      </Styled.AdBotFormContent>
    </Styled.AdBot>
  )
}

export default AdBot