import Head from 'next/head'
import Image from 'next/image'
import { Layout } from './components/layout'
import 'antd/dist/reset.css';
import { User } from '@/lib/models';

export default function Home() {

  const items = [
        {
            key: 'submission',
            label: 'Submission',
        },
        {
            key: 'log',
            label: 'Log History'
        }
    ]

  return (
      <Layout items={items}>
        content
      </Layout>
  )
}
