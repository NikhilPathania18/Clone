import '@/styles/globals.css'
import Layout from '@/components/Layout'
import { ToastContainer } from 'react-toastify'
import { Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
  return (
  <Layout>
    <ToastContainer
      position='top-center'
      pauseOnHover={false}
      autoClose={1500}
      transition={Bounce}
      hideProgressBar={true}
      closeOnClick={true}
      limit={1}
      theme='colored'
      icon={true}
      closeButton={false}
    />
    <Component  {...pageProps} />
  </Layout>
  )
}
