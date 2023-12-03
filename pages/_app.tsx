import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import Layout from '@/components/layout';
import {SessionProvider} from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
export default function MyApp({ Component, pageProps:{session, ...pageProps} }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    if(!session) {
      router.push("/authentication");
    }
  },[])
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>

)
}