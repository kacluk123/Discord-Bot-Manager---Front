import { Avatar } from 'antd';
import * as React from 'react'
import * as Styled from './navbar.styles'
import useSWR from 'swr'
import useUser from '../../../remote/user'
import Link from 'next/link'
import { UserAddOutlined } from '@ant-design/icons'
import { useRouter } from "next/router";

const links = (routePathname: string) => [
  {
    link: '/dashboard',
    text: 'Main',
    isActive: routePathname === '/dashboard'
  },
  {
    link: '/dashboard/create-bot',
    text: 'Create bot',
    isActive: routePathname.includes('/dashboard/create-bot')
  },
  {
    link: '/dashboard/bot-list',
    text: 'Bots list',
    isActive: routePathname.includes('/dashboard/bot-list')
  }
]


const Navbar = () => {
  const { data } = useUser()
  const router = useRouter()

  return (
    <React.Fragment>
      <Styled.Navbar>
        <Styled.NavContent>
          <Styled.NavbarNavigation>
            <Styled.NavbarList>
              {links(router.pathname).map(({ link, text, isActive }) => (
                <Styled.NavbarLi key={link} isActive={isActive}>
                  <Link href={link}>
                    {text}
                  </Link>
                </Styled.NavbarLi>
              ))}
            </Styled.NavbarList>
          </Styled.NavbarNavigation>
          <Styled.NavbarUserData>
            {data ? (
              <>
                <Styled.NavbarUserDataName>
                  {data.username}
                </Styled.NavbarUserDataName>
                <Avatar src={data.avatarUrl} size='large' />
              </>
            ) : null}
          </Styled.NavbarUserData> 
        </Styled.NavContent>
      </Styled.Navbar>
      <Styled.NavbarDivider />
    </React.Fragment>
  )
}

export default Navbar