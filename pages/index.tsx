import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Button } from 'antd';
import useSWR, { SWRConfig } from 'swr'

export default function Home() {
  return (
    <div className={styles.container}>
      First page
    </div>
  )
}
