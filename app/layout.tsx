import RegisterModal from './components/modals/RegisterModal'
import Navbar from './components/navbar/Navbar'
import './globals.css'
import { Nunito } from 'next/font/google'
import ToasterProvider from './providers/ToasterProvider'
import Stopwatch from './components/stopwatch/Stopwatch'
import Countdown from './components/stopwatch/Countdown'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Work It Out',
  description: 'Workout tools',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ToasterProvider/>
        <RegisterModal />
        <Navbar />
        <Stopwatch/>
        <Countdown time={3000} loop={false}/>
        {children}
      </body>
    </html>
  )
}
