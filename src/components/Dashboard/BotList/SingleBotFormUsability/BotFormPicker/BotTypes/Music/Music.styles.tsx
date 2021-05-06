import styled, { css } from 'styled-components' 

export const MusicBot = styled.div`
  width: 100%;
  height: 100%;
  padding: 25px 50px 50px 50px;
  overflow: auto;
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
  position: relative;
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

export const CloseIconContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  z-index: 10;
`

export const AddMusicTop = styled.div`
  max-width: 100%;
  display: grid;
  grid-auto-flow: column;
  margin-top: 30px;
  grid-template-columns: 90% 1fr;
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

export const AddSongButtonText = styled.div`
  font-size: 20px;
  margin-bottom: 4px;
`

export const AddSongButtonContainer = styled.div`

`

export const SavePlaylistButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`