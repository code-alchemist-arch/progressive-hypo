import Head from 'next/head';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion';
import { appWithTranslation } from 'next-i18next';
import '@fontsource/roboto';

import { slideLeft } from '@/utils/animations';
import { store } from '@/store';

import Layout from '@/components/Layout';
import ProtectedRoutes from '@/components/ProtectedRoutes';

import '@/styles/globals.css';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta
          name="description"
          content="Mit dem Hypo-Check erhalten Sie mit wenigen Klicks erste Hypothekar-Angebote verschiedener Anbieter für unterschiedliche Laufzeiten. Details zu den Anbietern und weitere Informationen zum Angebot erhalten Sie bei einer persönlichen Beratung."
        />
        <meta name="keywords" content="Keywords" />
        <title>HypoCheck App - Swiss Life</title>
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-touch-icon-180x180.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/apple-touch-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/icons/apple-touch-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/icons/apple-touch-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/icons/apple-touch-icon-60x60.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link
          rel="mask-icon"
          href="/icons/safari-pinned-tab.svg"
          color="#d82034"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/icons/favicon.ico" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Provider store={store}>
        <ProtectedRoutes>
          <LazyMotion features={domAnimation}>
            <AnimatePresence>
              <m.div
                key={router.route.concat(slideLeft.name)}
                className="flex absolute h-full w-screen z-20"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={slideLeft.variants}
                transition={slideLeft.transition}
              >
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </m.div>
            </AnimatePresence>
          </LazyMotion>
        </ProtectedRoutes>
      </Provider>
    </>
  );
}

export default appWithTranslation(MyApp);
