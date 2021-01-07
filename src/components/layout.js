import React from "react"
import PropTypes from "prop-types"
import { useSelector } from 'react-redux';
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"
import { Footer } from "./footer"

const navlinks = [
    { name: "Home", to: "/" },
    { name: "Blog", to: "/blog" },
    { name: "Login", to: "/login" }
];

const brand = { name: "Explorer", to: "home" };

const Layout = ({ children }) => {
    const data = useStaticQuery(graphql `
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

    return ( <
        >
        <
        Header brand = { brand }
        links = { navlinks }
        />  <
        div style = {
            {
                margin: `0 auto`,
                maxWidth: '100%',
                padding: `0 20px 10px`,
            }
        } >
        <
        main > { children } < /main>  <
        footer style = {
            {
                marginTop: `2rem`
            }
        } > ©{ new Date().getFullYear() }, Built with { ` ` } <
        a href = "https://www.gatsbyjs.com" > Gatsby < /a>  <
        /footer>  <
        /div>  <
        Footer / >
        <
        />
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout