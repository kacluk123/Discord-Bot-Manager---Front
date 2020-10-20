import styled from 'styled-components'

export const CreateBot = styled.div.attrs({
  className: 'CreateBot'
})`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const CreateBotTypes = styled.div.attrs({
  className: 'CreateBotTypes'
})`
  display: grid;
  grid-auto-flow: column;

`

export const CreateBotSingle = styled.div.attrs({
  className: 'CreateBotSingle'
})`
  width: 300px;
  height: 300px;
  border-radius: 2px;
  border: 1px solid var(--Grey);
  display: grid;
  justify-content: center;
  padding: 20px;
  cursor: pointer;
  transition: .3s;

  & {
    span {
      transition: .3s;
    }
    :hover {
      border: 1px solid var(--Blue);
      .CreateBotSingleDescription, .CreateBotSingleHeader {
        color: var(--Blue);
      }
      span {
        color: var(--Blue) !important;
      }
    }
  }
`

export const CreateBotSingleHeader = styled.div.attrs({
  className: 'CreateBotSingleHeader'
})`
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  transition: .3s;
  color: var(--Grey);
`
export const CreateBotSingleDescription = styled.div.attrs({
  className: 'CreateBotSingleDescription'
})`
  font-size: 15px;
  color: var(--Grey);
  transition: .3s;
`