import React from "react"
import {navigate} from 'gatsby';
import {Container,Row,Col, Button} from 'react-bootstrap';
import styles from './index.module.css';
import Layout from "../components/layout"

const IndexPage = () => (
    
     <Layout>
       <div className={styles.container}>
          <Container fluid>
            <Row>
            <Col className={styles.div} sm={7}>
            <div className={styles.first}>
            <div><img width="80px" height="80px" src="https://images.ctfassets.net/zvdl2ga48g07/MQLu7uBTvL1NLA1KnRHao/a7d4b0a988b250142953460d59eb8822/author1.png?w=620&h=620&q=50" /></div>
            <div className={styles.para}>
              <p>Written By:<br/>Jane Smith July 15, 2020</p>
              </div>
          </div>
          <h1>Switzerland</h1>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
            <Button className={styles.button} onClick={()=>{
              navigate('/blog')
            }} >Read More</Button>
            </Col>
            <Col sm={5}>
            <div className={styles.img}><img className={styles.image} src={require('../images/gatsby-astronaut.png')}/></div>
            </Col>
            </Row>
          </Container>
          </div>
     </Layout>
)

export default IndexPage