const config = require('./config');
const { title, description, author, siteUrl, language } = config;

module.exports = {
  siteMetadata: { title, description, author, siteUrl, language },
  plugins: [
    'gatsby-plugin-typescript'
  ]
}
