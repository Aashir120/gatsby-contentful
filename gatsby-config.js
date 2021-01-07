require("dotenv").config()
module.exports = {
    pathPrefix: `/blog`,
    siteMetadata: {
        title: `Gatsby Blog Site`,
        description: `Write your site description here!`,
        author: `@ibaslogic`,
    },
    plugins: [
        `gatsby-plugin-offline`,
        "gatsby-plugin-typescript",
        `gatsby-plugin-material-ui`,
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        `gatsby-transformer-remark`,
        {
            resolve: `gatsby-source-contentful`,
            options: {
                spaceId: process.env.CONTENTFUL_SPACE_ID,
                accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
                forceFullSync: true,
            },
        },
        {
            resolve: "gatsby-plugin-firebase",
            options: {
                credentials: {
                    apiKey: process.env.apiKey,
                    authDomain: process.env.authDomain,
                    projectId: process.env.projectId,
                    storageBucket: process.env.storageBucket,
                    messagingSenderId: process.env.messagingSenderId,
                    appId: process.env.appId,
                    measurementId: process.env.measurementId
                },
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
            },
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
}