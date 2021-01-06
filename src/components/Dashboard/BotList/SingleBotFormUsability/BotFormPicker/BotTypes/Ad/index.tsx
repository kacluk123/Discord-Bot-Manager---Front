import * as React from 'react'
import * as Styled from './ad.styles'
import { IUIResponseAdBotConfig, ServerRequestBotAdConfigAds } from '../../../../../../../services/api/bots/bots.types'
import { Form, Input, Button, Checkbox } from 'antd';
import { Controller, useForm, useFieldArray } from 'react-hook-form'
import { api } from '../../../../../../../services/api'
import { useRouter } from "next/router";
import AdInfo from './AdInfo'
import { PlusSquareOutlined } from '@ant-design/icons'
import IconWithHover from '../../../../../../Common/IconWithHover'
import moment from 'moment'
import { v4 as uuid } from 'uuid';
import useBots from '../../../../../../../remote/bots'
import cogoToast from 'cogo-toast';
interface AdBot {
  config: IUIResponseAdBotConfig
}

const AdBot: React.FC<AdBot> = ({ config }) => {
  const { mutate, data, replaceData } = useBots()
  const [isPending, setPending] = React.useState<boolean>(false)
  const router = useRouter()
  const { botId } = router.query
  const { control, handleSubmit, reset, errors} = useForm({
    defaultValues: config
  })
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "ads", // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  });

  React.useEffect(() => {
    reset(config)
  }, [config])

  const onSubmit = async (data?: {ads: { time: moment.Moment, id: string, day: string }[]}) => {
    if (data) {
      setPending(true)
      try {
        const requestData = data.ads.map(ad => {
          const id = config.ads.find(searchedAd => searchedAd.id === ad.id)?.id
          return {
            ...ad,
            time: ad.time.format('HH:mm:ss'),
            id: id || uuid(),
          }
        })

        if (typeof botId === 'string') {
          const response = await api.bot.editBot({ config: { ads: requestData } }, botId)
          replaceData(response)
          cogoToast.success('Bot data saved succesfully!')
        }
      } catch (err) {
        cogoToast.error(err.message)
      } finally {
        setPending(false)
      }
    }
  }

  const isSubmitButtonDisabled = Object.values(errors).length > 0

  return (
    <React.Fragment>
      <Styled.AdBot data-testid='adBot'>
        <Styled.AdBotFormContent>
          <Styled.DisableButtonContainer>
            <IconWithHover>
              <PlusSquareOutlined 
                style={{ fontSize: '40px', color: 'var(--Grey)' }}
                onClick={() => {
                  append({ message: "", day: "", time: "00:00:00"})
                }}
              />
            </IconWithHover>
          </Styled.DisableButtonContainer>
          {fields.map((field,index) => {
            return (
              <AdInfo 
                control={control}
                index={index}
                key={field.id}
                field={field}
                remove={remove}
              />
            )
          })}
          <Button type="primary" disabled={isSubmitButtonDisabled} onClick={handleSubmit(onSubmit)} loading={isPending}>
            Save
          </Button>
        </Styled.AdBotFormContent>
      </Styled.AdBot>
    </React.Fragment>
  )
}

export default AdBot