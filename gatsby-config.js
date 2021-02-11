const config = require('./config');
const { title, description, author, siteUrl, language } = config;

module.exports = {
  siteMetadata: { title, description, author, siteUrl, language },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-sass',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'markdown-page',
        path: `${__dirname}/posts`
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        tableOfContents: {
          maxDepth: 3
        },
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590,
              loading: 'lazy'
            }
          }
        ]
      }
    }
  ]
}
