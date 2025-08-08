import { AnimatePresence } from 'framer-motion'
import '../styles/globals.css'

export default function App({ Component, pageProps, router }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Component {...pageProps} key={router.route} />
    </AnimatePresence>
  )
}