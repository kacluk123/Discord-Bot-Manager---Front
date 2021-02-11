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
  height: 130px;
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
