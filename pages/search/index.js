import Head from "next/head"
import { Layout } from "components/Layout"
import Image from "next/image"
import Link from "next/link"
import { search } from "services/search.js"
import { useI18N } from "context/i18n"

export default function Component({query, results}){
   const {t} = useI18N()
return <>
     <Head>
      <title>xkcd - Results for {query}</title>
      <meta name="description" content={`Search results for ${query}`}/>
    </Head>
    <Layout>
        <h1>{t('SEARCH_RESULTS_TITLE', results.length, query)}</h1>
        {
            results.map(result=>{
                return(
                <Link href={`/comic/${result.id}`} key={result.id}>
                   <a className="bg-slate-300 hover:bg-slate-50 flex flex-row justify-start content-center">
                       <Image src={result.img} width="50" height="50" alt={result.alt} className="rounded-full"/>
                       <div>
                          <h2>{result.title}</h2>
                       </div>
                   </a>
               </Link>
            )
            })
        }
    </Layout>

    <style jsx>{``}</style>
  </>
}


export async function getServerSideProps (context){
     //esto es una mala práctica no se debe hacer en nextjs si es un servicio nuestro 
     //esto esta bien si es un servicio externo es decir si no es nuestro (si no lo creamos nosotros)
     //por lo tanto no tiene sentido hacer un fetch de un microservicio nuestro que acabamoss de crear
     /*const response = await fetch('http://localhost:3000/api/search?q=' + q)
     const results = await response.json()*/
     //------------
     const {query} = context
     const { q ='' } = query

    const {results} = await search({query: q})
    return {
        props: {
            query: q,
            results
        }
    }
}