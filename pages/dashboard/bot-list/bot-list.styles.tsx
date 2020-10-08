import styled from 'styled-components'

export const BotListContainer = styled.div.attrs({
  className: 'BotListContainer'
})`
  height: 100vh;
  display: grid;
  grid-auto-flow: column;
`

export const BotList = styled.div.attrs({
  className: 'BotList'
})`
  display: grid;
  height: 100%;
  grid-row-gap: 5px;
`

export const SingleBot = styled.div.attrs({
  className: 'BotList'
})`
  width: 150px;
  height: 70px;
`