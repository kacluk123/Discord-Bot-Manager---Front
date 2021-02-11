import * as React from 'react'
import * as Styled from './Music.styles'
import { IUIResponseMusicBotConfig } from '../../../../../../../services/api/bots/bots.types'
import { Card } from 'antd';
import { api } from '../../../../../../../services/api'

interface IMusicBot {
  config: IUIResponseMusicBotConfig
}

const MusicBot: React.FC<IMusicBot> = ({ config }) => {
  const [links, setLink] = React.useState([
    'link1',
    'link2',
    'link3',
    'link4',
    'link5',
  ])

  const [dragArea, setDragArea] = React.useState<null | number>(null)
  const [dragableElement, setDragableElement] = React.useState<null | number>(null)
  const [isDragging, setDragging] = React.useState<boolean>(false)
  
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

  const getYoutubeData = async () => {
    const data = await api.bot.getYoutubeVide('https://www.youtube.com/watch?v=pasFN9NBXEs')
    console.log(data)
  }

  return (
    <Styled.MusicBot>
      <button onClick={getYoutubeData}>
        yt
      </button>
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
              title={link} 
              style={{
                width: '100%',
                height: '100%'
              }}
            >
              {link}
            </Card>
          </Styled.SingleSongContainer>
        )
      })}
    </Styled.MusicBot>
  )
}

export default MusicBot