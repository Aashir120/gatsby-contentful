import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Layout from "../components/layout";
import {navigate} from 'gatsby';
import {Container,Button} from 'react-bootstrap';
import styles from './blog.module.css';

const Blog = () => {
    const data = useStaticQuery(
        graphql `
      query {
        allContentfulBlogPost(sort: { fields: publishedDate, order: DESC }) {
          edges {
            node {
              title
              id
              slug
              publishedDate(formatString: "Do MMMM, YYYY")
              featuredImage {
                description
                file {
                  url
                }

              }
              excerpt {
                childMarkdownRemark {
                  excerpt(pruneLength: 150)
                }
              }
            }
          }
        }
      }
    `
    )
    return ( 
      <Layout >
        <Container>
        <div className={styles.blog}>
        <h1>I'm Traveler {'&'} Blogger from Paris, Italy Who Loves Documenting Adventures {'&'} Discoveries Around the World</h1> 
         <ul className = "posts" > {
            data.allContentfulBlogPost.edges.map(edge => {
                return (
                   <li className = {styles.post}
                    key = { edge.node.id } >
                      {
                        edge.node.featuredImage && ( 
                          <img
                            className={styles.img}
                            src = { edge.node.featuredImage[0].file.url }
                            alt = { edge.node.featuredImage.description }
                            />
                        )
                    }
                    <div className={styles.first}>
            <div><img width="80px" height="80px" src="https://images.ctfassets.net/zvdl2ga48g07/MQLu7uBTvL1NLA1KnRHao/a7d4b0a988b250142953460d59eb8822/author1.png?w=620&h=620&q=50" /></div>
            <div className={styles.para}>
              <p>Written By:<br/><b> Jane Smith </b> {edge.node.publishedDate}</p>
              </div>
          </div>
                    <h2 className={styles.titleDiv}>
                    <Link className={styles.title} to = { `/blog/${edge.node.slug}/` } > { edge.node.title } </Link>
                     </h2>
                     <hr style={{width:'70%'}} />
                      <p className = {styles.excerpt} > { edge.node.excerpt.childMarkdownRemark.excerpt }
                     </p> 
                    <Button className={styles.button} onClick={()=>{
              navigate(`/blog/${edge.node.slug}/`)
            }} >Read More</Button>
                     </li>
                )
            })
        } 
        </ul>
        </div>
        </Container>
        </Layout>
    )
}

export default Blog