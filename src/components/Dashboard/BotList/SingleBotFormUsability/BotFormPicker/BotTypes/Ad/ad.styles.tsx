import styled from 'styled-components'

export const AdBot = styled.div.attrs({
  className: 'AdBot'
})`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const AdBotFormContent = styled.form.attrs({
  className: 'AdBotFormContent'
})`
  display: grid;
  /* grid-auto-flow: column; */
  grid-row-gap: 20px;
  padding: 20px;
  width: 800px;
  min-height: 300px;
  max-height: 80vh;
  overflow: auto;
  grid-auto-rows: max-content;
  border: 1px solid var(--Grey);
  border-radius: 2px;
`

export const DisableButtonContainer = styled.div.attrs({
  className: 'DisableButtonContainer'
})`
  width: 35px;
  justify-self: flex-end;
`