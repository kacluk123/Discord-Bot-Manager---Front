import styled from 'styled-components'

export const AdBot = styled.div.attrs({
  className: 'AdBot'
})`
  width: 100%;
  height: 100%;
  display: flex;
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
  width: 600px;
  height: 300px;
  grid-auto-rows: max-content;
  border: 1px solid var(--Grey);
  border-radius: 2px;
`