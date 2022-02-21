import React from "react"
import { Layout } from "~/components/Layout"
import { ParsedContent, ActivatePageScripts } from "~/utils"
import { Seo } from "@gatsbywpthemes/gatsby-plugin-wp-seo"
import { useStaticQuery, graphql, Link } from "gatsby"

const LAST_POSTS = graphql`
  query {
    allWpPost(limit: 3) {
      nodes {
        id
        title
        uri
      }
    }
  }
`

const Page = ({ page, ctx }) => {
  const { title, isFrontPage, content, uri } = page

  const data = useStaticQuery(LAST_POSTS)
  const { nodes: posts } = data.allWpPost

  const featuredImage =
    page.featuredImage?.node.localFile.childImageSharp?.original
  return (
    <Layout page={page} type="page">
      <Seo
        isFrontPage={isFrontPage}
        title={title}
        uri={uri}
        yoastSeo={ctx.yoastSeo}
        seo={ctx.seo}
        featuredImage={
          featuredImage && {
            src: featuredImage.src,
            width: featuredImage.width,
            height: featuredImage.height,
          }
        }
      />
      <article className="p-5 card sm:p-10">
        <h1
          className="mb-10 text-center uppercase"
          dangerouslySetInnerHTML={{ __html: title }}
        />

        <div className="content">
          <ActivatePageScripts />
          <ParsedContent content={content} />
        </div>
      </article>
      {isFrontPage && (
        <div>
          {posts.map((post) => {
            const { id, title, uri } = post
            return (
              <h3 key={id}>
                <Link to={uri}>{title}</Link>
              </h3>
            )
          })}
        </div>
      )}
    </Layout>
  )
}

export default Page
