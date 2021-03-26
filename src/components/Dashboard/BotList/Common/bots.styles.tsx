import styled from 'styled-components'

export const BotPageContainer = styled.div.attrs({
  className: 'BotPageContainer'
})`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 30px;
  width: 100%;
  height: 100%;
  grid-template-columns: max-content 1fr;
`

export const BotFormPageLayout = styled.div.attrs({
  className: 'BotFormPageLayout'
})`
  display: grid;
  grid-row-gap: 30px;
  overflow: hidden;
  grid-auto-flow: column;
  height: 100%;
  grid-template-rows: max-content 1fr;
  /* grid-template-columns: max-content 1fr; */
`