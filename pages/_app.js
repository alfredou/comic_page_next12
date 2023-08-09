import '../styles/global.css'
import { NextUIProvider } from '@nextui-org/react';
import Head from 'next/head';
import { I18NProvider, useI18N } from 'context/i18n';

const DefaultHeadApp = ()=>{
  const {t} = useI18N()

  return (
    <Head>
       <title>{t('SEO_DEFAULT_TITLE')}</title>
       <link rel="icon" href="#"/>
    </Head>
  )
}
function MyApp({Component, pageProps}){
   return (
     <NextUIProvider>
     {/**aqui podemos poner todos los valores por defecto que queremos que tenga la cabecera o head */}
    
     <I18NProvider>
         <DefaultHeadApp/>
         <Component {...pageProps}/>
     </I18NProvider>
   </NextUIProvider>
   )
}

export default MyApp