import * as React from 'react'
import * as Styled from './AdInfo.styles'
import { Form, Input, Button, Switch, TimePicker, Select } from 'antd';
import { Controller, useForm, Control, ArrayField } from 'react-hook-form'
import moment from 'moment'

interface AdInfo {
  control: Control<Record<string, any>>
  index: number
  field: Partial<ArrayField<Record<string, any>, "id">>
}

const { Option } = Select

const AdInfo: React.FC<AdInfo> = ({ control, index, field }) => {
  console.log(field.time)
  return (
    <Styled.AdInfo>
      <Form.Item label='Message'>
        <Controller 
          as={Input}
          defaultValue={field.message}
          name={`ads[${index}].message`}
          control={control}
        />
      </Form.Item>
      <Form.Item label='Day'>
        <Controller 
          name={`ads[${index}].day`}
          defaultValue={field.day}
          control={control}
          render={({ onChange, onBlur, value, name }) => (
            <Select
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            >
              <Option value='1'>
                Monday
              </Option>
              <Option value='2'>
                Tuesday
              </Option>
              <Option value='3'>
                Wednesday
              </Option>
              <Option value='4'>
                Thursday
              </Option>
              <Option value='5'>
                Friday
              </Option>
              <Option value='6'>
                Saturday
              </Option>
              <Option value='7'>
                Sunday
              </Option>
            </Select>
          )}
        />
      </Form.Item >
      <Form.Item label='Time'>
        <Controller 
          as={TimePicker}
          name={`ads[${index}].time`}
          defaultValue={moment(field.time, 'HH:mm:ss')}
          control={control}
        />
      </Form.Item>
    </Styled.AdInfo>
  )
}

export default AdInfo