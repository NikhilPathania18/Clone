import Image from 'next/image'
import { Inter } from 'next/font/google'
import Nav from '@/components/Nav'
import Feed from '@/components/Feed'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
        <Feed />
    </main>
  )
}
