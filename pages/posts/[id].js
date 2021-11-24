import Layout from '../../components/layout'
import Head from 'next/head'
import Date from '../../components/date'
import { getAllPostIds, getPostData } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'

export async function getStaticProps({ params }) {
    // Add the "await" keyword like this:
    const postData = await getPostData(params.id)
    return {
      props: {
        postData
      }
    }
  }

  /*
  Finally, we'll import the getAllPostIds function and use it inside getStaticPaths
  paths contains the array of known paths returned by getAllPostIds(), which include the params defined by pages/posts/[id].js.
  */
  export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
      paths,
      fallback: false
    }
  }

//Now, let's update the Post component to use postData. In pages/posts/[id].js replace the exported Post component with the following code:
export default function Post({ postData }) {
    return (
      <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>

        <br />
        <p>The Post Data ID : {postData.id} </p>
      </Layout>
    )
  }