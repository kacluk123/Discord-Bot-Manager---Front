import * as React from 'react'
import * as Styled from './Music.styles'
import { IUIResponseMusicBotConfig } from '../../../../../../../services/api/bots/bots.types'
import { Card } from 'antd';
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
  const [copyLinks, setCopyLink] = React.useState([
    'link1',
    'link2',
    'link3',
    'link4',
    'link5',
  ])
  const [dragArea, setDragArea] = React.useState<null | number>(null)
  const [dragableElement, setDragableElement] = React.useState<null | number>(null)
  
  function dragstart_handler(ev: React.DragEvent) {
    // Add the target element's id to the data transfer object
    ev.dataTransfer.setData("application/my-app", ev.currentTarget.id);
    ev.dataTransfer.effectAllowed = "move";
    setTimeout(() => {
      console.log(ev)
    }, 0)
  }
  function dragover_handler(ev) {
    ev.preventDefault();
    setDragArea(Number(ev.currentTarget.id))
    ev.dataTransfer.dropEffect = "move"
  }
  function drop_handler(ev) {
    ev.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    const data: string = ev.dataTransfer.getData("application/my-app");
    // console.log(ev.currentTarget.id)
    insertIndex(data, ev.currentTarget.id)
    setDragArea(null)
    // ev.target.appendChild(document.getElementById(data));
  }

  function insertIndex(idOfCopied: string, idOfTarget: string) {
    setLink(links => {
      const linksCopy = [...links]
      console.log(Number(idOfTarget), Number(idOfCopied))
      const filteredLinks = linksCopy.filter((link, index) => index !== Number(idOfCopied))
      filteredLinks.splice(Number(idOfTarget), 0, links[Number(idOfCopied)]);

      return filteredLinks
    })
  }
  // const onDragEndHandler = () => {
  //   setDragArea(null)
  // }
  console.log(links)
  return (
    <Styled.MusicBot>
      {/* <p id="p1" draggable="true" onDragStart={dragstart_handler}>This element is draggable.</p>
      <div id="target" onDrop={drop_handler} onDragOver={dragover_handler}>Drop Zone</div> */}
      {links.map((link, index) => (
        <Styled.SingleSongContainer
          id={index.toString()} 
          onDrop={drop_handler} 
          onDragOver={dragover_handler} 
          onDragStart={dragstart_handler} 
          draggable="true"
          style={index === dragableElement ? {
            height: '0px',
          } : {}}
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
      ))}
    </Styled.MusicBot>
  )
}

export default MusicBot