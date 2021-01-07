import React from "react"
import { graphql, Link } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Layout from "../components/layout"
import Img from "gatsby-image"
import SEO from "../components/seo"

export const query = graphql `
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishedDate(formatString: "Do MMMM, YYYY")
      featuredImage {
        description
        file {
          url
        }

      }
      body{
          raw
      }
      excerpt {
        childMarkdownRemark {
          excerpt(pruneLength: 300)
        }
      }
    }
  }
`

const BlogPost = props => {
    return ( <
        Layout >
        <
        SEO title = { props.data.contentfulBlogPost.title }
        /> <
        Link to = "/blog/" > Visit the Blog Page < /Link> <
        div className = "content" >
        <
        h1 > { props.data.contentfulBlogPost.title } < /h1> <
        span className = "meta" >
        Posted on { props.data.contentfulBlogPost.publishedDate } <
        /span>

        {
            props.data.contentfulBlogPost.featuredImage && ( <
                img src = { props.data.contentfulBlogPost.featuredImage[0].file.url }
                alt = { props.data.contentfulBlogPost.title }
                />
            )
        } { documentToReactComponents(JSON.parse(props.data.contentfulBlogPost.body.raw)) } <
        /div> <
        /Layout>
    )
}

export default BlogPost