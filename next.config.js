/** @type {import('next').NextConfig} */
require('dotenv').config();
const {
  DATABASE_URL,
  SHADOW_DATABASE_URL,
  AUTH0_CLIENTID,
  AUTH0_DOMAIN,
  AUTH0_CLIENT_SECRET,
  AUTH0_SCOPE,
  AUTH0_COOKIE,
  NEXT_PUBLIC_BACKEND_ADDRESS,
  BACKEND_ADDRESS
} = process.env;
module.exports = {
  publicRuntimeConfig:{
    BACKEND_URL:`${NEXT_PUBLIC_BACKEND_ADDRESS}/api/graphql`
  }
  ,
  serverRuntimeConfig:{
    auth: {
      issuerBaseURL :AUTH0_DOMAIN,
      baseURL:"http://localhost:3000",
      clientID :AUTH0_CLIENTID,
      clientSecret :AUTH0_CLIENT_SECRET,
    scope :AUTH0_SCOPE,
    redirectUri :`${BACKEND_ADDRESS}/api/callback`,
    postLogoutRedirectUri:`${BACKEND_ADDRESS}/`
    },
    cookieSecret:AUTH0_COOKIE,
  },

 nextConfig: {
  reactStrictMode: true,
  swcMinify: true,

}
}

