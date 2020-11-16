import styled from 'styled-components'

export const AdInfo = styled.div.attrs({
  className: 'AdInfos'
})`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 15px;
  width:100%;
  height: 100px;
`
export const AdInfoInputId = styled.div.attrs({
  className: 'AdInfoInputId'
})`
  display: none
`