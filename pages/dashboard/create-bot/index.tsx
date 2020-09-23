import * as React from 'react'
import { Button } from 'antd';

import { useRouter, withRouter  } from 'next/router'
import { GetServerSidePropsContext } from 'next'
import useSWR from 'swr'
import { api } from '../../../services/api'
import MainLayout from '../../../layouts/Main'

const CreateBot: React.FC = () => {
  return (
    <MainLayout>
      <div>
        dasdasdasasd
      </div>
    </MainLayout>
  )
}

export default CreateBot