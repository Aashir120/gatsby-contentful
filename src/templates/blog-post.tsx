import React from "react"
import { graphql, Link } from "gatsby"
import { useSelector } from "react-redux";
import styles from './blogPost.module.css';
import {navigate} from 'gatsby';
import { Container, Box, Typography, Button } from "@material-ui/core";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Layout from "../components/layout";

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
  const auth = useSelector((state: any) => state.auth); 
    return (
       <Layout >
         <Container className={styles.container}>
         <div className={styles.top}>
         {
            props.data.contentfulBlogPost.featuredImage && ( 
              <img  className = {styles.featured}
                src={props.data.contentfulBlogPost.featuredImage[0].file.url}
                alt = { props.data.contentfulBlogPost.title }
                />
            )
        }

         </div>
        <h1>{ props.data.contentfulBlogPost.title }</h1>
          <div className = "content">
         <Box>
          {!auth.isLoggedIn ? (
            <Box>
              <Typography gutterBottom>
                <p className = "excerpt" > { props.data.contentfulBlogPost.excerpt.childMarkdownRemark.excerpt } </p> 
              </Typography>
              <Button className={styles.button} onClick={()=>{
              navigate('/login')
            }} >sign in to read full context</Button>
            </Box>
          ) : (
            <Typography variant="body1" gutterBottom>
              { documentToReactComponents(JSON.parse(props.data.contentfulBlogPost.body.raw)) } 
            </Typography>
          )}
        </Box>

        
        </div> 
        </Container>
        </Layout>
    )
}

export default BlogPost