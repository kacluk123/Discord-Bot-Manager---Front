import Navbar from '../../public/_includes/Navbar'
import * as Styled from './main.styles'
import useSWR from 'swr'

const MainLayout: React.FC = ({ children }) => {
  return (
    <Styled.Main> 
      <Navbar />
      {children}
    </Styled.Main>
  )
}

export default MainLayout