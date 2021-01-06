import styled, { css } from 'styled-components'
import { Divider } from 'antd';

export const Navbar = styled.nav.attrs({
  className: 'Navbar'
})`
  height: 50px;
`

export const NavbarList = styled.ul.attrs({
  className: 'NavbarList'
})`
  margin: 0;
  padding: 0;
  display: grid;
  grid-auto-flow: column;
  list-style: none;
  grid-column-gap: 15px;
`

export const NavbarLi= styled.li.attrs({
  className: 'NavbarLi'
})`
  ${(props: { isActive: boolean }) => props.isActive && css`
    & {
      a {
        color: #1890ff
      }
    }
  `}
  position: relative;
    &:after {
      position: absolute;
      content: "";
      width: 1px;
      right: -9px;
      top: -2px;
      height: 26px;
      background-color: #A9A9A9;
    }

    &:last-child {
      :after {
        width: 0px;
        right: 0px;
      }
    }
`

export const NavbarDivider = styled(Divider).attrs({
  className: 'NavbarDivider'
})`
  margin: 0 0 24px 0;
`

export const NavContent = styled.div.attrs({
  className: 'NavContent'
})`
  width: 100%;
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  height: 100%;
  padding: 0 20px;
  align-items: center;
  grid-template-columns: max-content max-content;
  /* flex-direction: row;
  justify-content: space-between; */
`

export const NavbarUserData = styled.div.attrs({
  className: 'NavbarUserData'
})`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  grid-column-gap: 15px;
`

export const NavbarUserDataName = styled.div.attrs({
  className: 'NavbarUserDataName'
})`
  font-weight: 600;
  font-size: 20px;
`

export const NavbarNavigation = styled.div.attrs({
  className: 'NavbarNavigation'
})`
  display: flex;
`