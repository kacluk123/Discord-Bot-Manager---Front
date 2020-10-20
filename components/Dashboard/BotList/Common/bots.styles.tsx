import styled from 'styled-components'

export const BotPageContainer = styled.div.attrs({
  className: 'BotPageContainer'
})`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 30px;
  width: 100%;
  grid-auto-columns: max-content;
`

export const BotFormPageLayout = styled.div.attrs({
  className: 'BotFormPageLayout'
})`
  display: grid;
  grid-row-gap: 30px;
  grid-auto-rows: max-content;
  grid-auto-columns: max-content;
`