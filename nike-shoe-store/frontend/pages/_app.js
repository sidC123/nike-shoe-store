import '@/styles/globals.css';
import Head from 'next/head';
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer';
import store from '@/store/store';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Next Nice Shoe Store | Project by Siddhesh</title>
        <metadata
          name="description"
          content="Developed with NextJS v14"
        />
        <metadata
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Provider store={store} >
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </Provider>
    </>
  )
}
