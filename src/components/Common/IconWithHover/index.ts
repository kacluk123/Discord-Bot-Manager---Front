import styled from 'styled-components'

const IconWithHover = styled.div.attrs({
  className: 'IconWithHover'
})`
  cursor: pointer;
  transition: .3s;

  &:hover {
    span {
      color: var(--Blue) !important;
    }
  }
`

export default IconWithHover