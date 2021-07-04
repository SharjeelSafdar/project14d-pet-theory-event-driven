import { GatsbyConfig } from "gatsby";

export default {
  siteMetadata: {
    title: `Pet Theory App`,
    description: `A demo app to send lab reports of animals using Gatsby, TypeScript, and event-driven architecture with AWS.`,
    author: `Mian Muhammad Sharjeel Safdar`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Pet Theory App`,
        short_name: `Pet Theory`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
  ],
} as GatsbyConfig;
