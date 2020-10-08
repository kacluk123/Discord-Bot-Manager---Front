import { Avatar } from 'antd';
import * as React from 'react'
import * as Styled from './navbar.styles'
import useSWR from 'swr'
import useUser from '../../remote/user'
import Link from 'next/link'
import { UserAddOutlined } from '@ant-design/icons'
import { useRouter } from "next/router";

const links = [
  {
    link: '/dashboard',
    text: 'Main'
  },
  {
    link: '/dashboard/create-bot',
    text: 'Create bot'
  },
  {
    link: '/dashboard/bot-list',
    text: 'Bots list'
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
              {links.map(({ link, text }) => (
                <Styled.NavbarLi key={link} isActive={router.pathname === link}>
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