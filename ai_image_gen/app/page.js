import Create from '@/components/Create'
import { Nav } from '@/components/Nav'
import Image from 'next/image'

export default function Home() {
  return (
    <main className='h-[100vh] bg-blue-50'>
      <Nav/>
      <Create />
    </main>
  )
}
