import styled, { css } from 'styled-components' 

export const MusicBot = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px;
`

export const MusicBotx = styled.div`
  width: 100px;
  height: 100px;
  background: red;
`

export const SingleSongContainer = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  align-items: flex-end;
  & {
    .ant-card-bordered:hover {
      cursor: pointer;
      border: 1px solid #1890ff;
    }
  }
  ${(props: { isDragOver: boolean }) => props.isDragOver && css`
    border: 1px solid #1890ff;
  `}
` 

export const AddMusicTop = styled.div`
  max-width: 100%;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 50% 20% 30%;
  grid-column-gap: 10px;
`

export const AddMusicSingleSongHeader = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  grid-column-gap: 10px;
`

export const AddMusicSingleSongTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
`

export const AddMusicSingleSongTitleImage = styled.img`
  
`
