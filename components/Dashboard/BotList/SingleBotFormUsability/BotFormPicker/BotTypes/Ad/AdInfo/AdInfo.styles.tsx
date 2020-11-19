import styled from 'styled-components'

export const AdInfo = styled.div.attrs({
  className: 'AdInfos'
})`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 15px;
  width:100%;
`
export const AdInfoInputId = styled.div.attrs({
  className: 'AdInfoInputId'
})`
  display: none
`

export const DeleteButtonContainer = styled.div.attrs({
  className: 'DeleteButtonContainer'
})`
  justify-self: flex-end;  
  
  &:hover {
    span {
      color: var(--Blue) !important;;
    }
  }
`