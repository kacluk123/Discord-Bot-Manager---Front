import styled from 'styled-components'

export const CreateBotForm = styled.div.attrs({
  className: 'CreateBotForm'
})`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const CreateBotFormContent = styled.form.attrs({
  className: 'CreateBotFormContent'
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

export const CreateBotFormContentInput = styled.form.attrs({
  className: 'CreateBotFormContentInput'
})`
  height: 10px;
`