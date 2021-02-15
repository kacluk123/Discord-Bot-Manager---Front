import * as React from 'react'
import * as Styled from './Music.styles'
import { IUIResponseMusicBotConfig, IServerResponseYoutubeVideInfo } from '../../../../../../../services/api/bots/bots.types'
import { Card } from 'antd';
import { api } from '../../../../../../../services/api'
import { Form, Input, Button, Switch, TimePicker, Select } from 'antd';
import { Controller, useForm, Control, ArrayField } from 'react-hook-form'
import cogoToast from 'cogo-toast';
import { useRouter } from 'next/router';
import useBots from '@/remote/bots';

interface IMusicBot {
  config: IUIResponseMusicBotConfig
}

interface IMusicBotForm {
  songLink: string
}

const MusicBot: React.FC<IMusicBot> = ({ config }) => {
  const { control, handleSubmit } = useForm<IMusicBotForm>()
  const [links, setLink] = React.useState<IServerResponseYoutubeVideInfo[]>([])
  const [dragArea, setDragArea] = React.useState<null | number>(null)
  const [pendings, setPendings] = React.useState({
    addMusic: false,
    saveForm: false
  })
  const router = useRouter()
  const { botId } = router.query
  const { getCurrentPickedBot } = useBots()


  const onSubmit = async () => {
    setPendings(pendings => ({
      ...pendings,
      saveForm: true
    }))
    try {
      if (typeof botId === 'string') {
        const botType = getCurrentPickedBot(botId).type 
        if (botType === 'music') {
          const response = await api.bot.editBot({ config: { 
            playlist: links.map(link => link.id),
            type: botType
          } }, botId)
          // replaceData(response)
          cogoToast.success('Bot data saved succesfully!')
        }
      }
    } catch (err) {
      cogoToast.error(err.message)
    } finally {
      setPendings(pendings => ({
        ...pendings,
        saveForm: false
      }))
    }
    
  }
  
  function dragstart_handler(ev: React.DragEvent) {
    ev.dataTransfer.setData("application/my-app", ev.currentTarget.id);
    ev.dataTransfer.effectAllowed = "copyMove";
  }
  
  function dragover_handler(ev: React.DragEvent) {
    ev.preventDefault();
    setDragArea(Number(ev.currentTarget.id))
    ev.dataTransfer.dropEffect = "copy";
  }
  
  function drop_handler(ev: React.DragEvent) {
    ev.preventDefault();
    const data: string = ev.dataTransfer.getData("application/my-app");
    insertIndex(data, ev.currentTarget.id)
  }

  function insertIndex(idOfCopied: string, idOfTarget: string) {
    setLink(links => {
      const linksCopy = [...links]
      const filteredLinks = linksCopy.filter((link, index) => index !== Number(idOfCopied))
      filteredLinks.splice(Number(idOfTarget), 0, links[Number(idOfCopied)]);

      return filteredLinks
    })
  }
  const onDragEndHandler = (ev) => {
    ev.preventDefault();
    setDragArea(_ => null)
  }

  const getYoutubeData = async (data: IMusicBotForm) => {
    setPendings(pendings => ({
      ...pendings,
      addMusic: true
    }))
    try {
      const response = await api.bot.getYoutubeVide(data.songLink)
      setLink(links => [...links, response])
    } catch (err) {
      cogoToast.error(err.message)
    } finally {
      setPendings(pendings => ({
        ...pendings,
        addMusic: false
      }))
    }
  }

  return (
    <Styled.MusicBot>
      <Styled.AddMusicTop>
        <Form.Item label='Youtube link'>
          <Controller 
            as={Input}
            name='songLink'
            control={control}
            rules={{
              required: true
            }}
          />
        </Form.Item>
        <Button type="primary" onClick={handleSubmit(getYoutubeData)} loading={pendings.addMusic}>
          Add song
        </Button>
        <Button type="primary" onClick={onSubmit}>
          Save playlist
        </Button>
      </Styled.AddMusicTop>
      {/* <button onClick={getYoutubeData}>
        yt
      </button> */}
      {/* <p id="p1" draggable="true" onDragStart={dragstart_handler}>This element is draggable.</p>
      <div id="target" onDrop={drop_handler} onDragOver={dragover_handler}>Drop Zone</div> */}
      {links.map((link, index) => {
        console.log(index === Number(dragArea))
        return (
          <Styled.SingleSongContainer
            id={index.toString()} 
            onDrop={drop_handler} 
            onDragOver={dragover_handler} 
            onDragEnd={onDragEndHandler}
            onDragStart={dragstart_handler} 
            draggable="true"
            isDragOver={index === dragArea}
          >
            <Card 
              title={
                <Styled.AddMusicSingleSongHeader>
                  <Styled.AddMusicSingleSongTitleImage src={link.img} />
                  <Styled.AddMusicSingleSongTitle>
                    {link.title}
                  </Styled.AddMusicSingleSongTitle>
                </Styled.AddMusicSingleSongHeader>
              } 
              style={{
                width: '100%',
                height: '100%'
              }}
            >
              {link.description}
            </Card>
          </Styled.SingleSongContainer>
        )
      })}
    </Styled.MusicBot>
  )
}

export default MusicBot