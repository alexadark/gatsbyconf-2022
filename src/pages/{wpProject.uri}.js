import React from "react"
import { graphql } from "gatsby"
import { Layout } from "~/components/Layout"
import { GatsbyImage } from "gatsby-plugin-image"

const ProjectPage = ({ data }) => {
  const { wpProject } = data
  const {
    title,
    content,
    featuredImage: {
      node: { gatsbyImage },
    },
    projectFields: { projectUrl },
  } = wpProject

  return (
    <Layout>
      <div className="space-y-5">
        <h2>{title}</h2>
        <GatsbyImage image={gatsbyImage} />
        <p dangerouslySetInnerHTML={{ __html: content }} />
        <div>
          Project url:{" "}
          <a href={projectUrl} target="_blank" rel="noopener noreferrer">
            {projectUrl}
          </a>
        </div>
      </div>
    </Layout>
  )
}

export default ProjectPage

export const pageQuery = graphql`
  query ($uri: String!) {
    wpProject(uri: { eq: $uri }) {
      uri
      title
      content
      featuredImage {
        node {
          gatsbyImage(layout: FULL_WIDTH, width: 500, aspectRatio: 1.7)
        }
      }
      projectFields {
        projectUrl
      }
    }
  }
`
