const withSass = require('@zeit/next-sass')
const dotenv = require('dotenv')

dotenv.config()

module.exports = withSass({
  sassLoaderOptions: {
    includePaths: ["styles/*"]
  },
  env: {
    GIFPHY_API_KEY: process.env.GIFPHY_API_KEY
  },
})