import * as React from 'react'
import * as Styled from './AdInfo.styles'
import { Form, Input, Button, Switch, TimePicker, Select } from 'antd';
import { Controller, useForm, Control, ArrayField } from 'react-hook-form'
import moment from 'moment'
import { DeleteFilled } from '@ant-design/icons';

interface AdInfo {
  control: Control<Record<string, any>>
  index: number
  field: Partial<ArrayField<Record<string, any>, "id">>
  remove: (index?: number | number[]) => void
}

const { Option } = Select

const AdInfo: React.FC<AdInfo> = ({ control, index, field, remove }) => {

  return (
    <Styled.AdInfo>
      <Form.Item label='Message'>
        <Controller 
          as={Input}
          defaultValue={field.message}
          name={`ads[${index}].message`}
          control={control}
          rules={{
            required: true
          }}
        />
      </Form.Item>
      <Form.Item label='Day'>
        <Controller 
          name={`ads[${index}].day`}
          defaultValue={field.day}
          rules={{
            required: true
          }}
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
          rules={{
            required: true
          }}
          name={`ads[${index}].time`}
          defaultValue={moment(field.time, 'HH:mm:ss')}
          control={control}
        />
      </Form.Item>
      <Styled.AdInfoInputId>
        <Controller 
          as={Input}
          rules={{
            required: true
          }}
          name={`ads[${index}].id`}
          defaultValue={field.id}
          control={control}
        />
      </Styled.AdInfoInputId>
      <Styled.DeleteButtonContainer>
        <DeleteFilled 
          style={{ fontSize: '25px', color: 'var(--Grey)' }}
          onClick={() => {
            remove(index)
          }} 
        />
      </Styled.DeleteButtonContainer>
    </Styled.AdInfo>
  )
}

export default AdInfo