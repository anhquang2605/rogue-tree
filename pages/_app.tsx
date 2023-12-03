import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import Layout from '@/components/layout';
export default function MyApp({ Component, pageProps }: AppProps) {
  return  <Layout> 
            <Component {...pageProps} />
          </Layout>
}