require('dotenv').config();
const {
  DATABASE_URL,
  SHADOW_DATABASE_URL,
  AUTH0_CLIENTID,
  AUTH0_DOMAIN,
  AUTH0_SCOPE,
  AUTH0_SECRET,
  AUTH0_COOKIE,
  BACKEND_ADDRESS
} = process.env;
import { initAuth0 } from '@auth0/nextjs-auth0';

export default initAuth0({
  baseURL: 'http://localhost:3000',
  issuerBaseURL: 'https://my-tenant.auth0.com',
  clientID: AUTH0_CLIENTID,
  clientSecret: AUTH0_CLIENTID,
  secret: AUTH0_SECRET,
  clockTolerance: 60,
  httpTimeout: 5000,
  authorizationParams: {
    scope: 'openid profile email',
    audience: 'MY_AUDIENCE'
  },
  routes: {
    callback: '/api/callback',
    postLogoutRedirect: '/'
  },
  session: {
    rollingDuration: 60 * 60 * 24,
    absoluteDuration: 60 * 60 * 24 * 7
  }
});
// // import { initAuth0 } from "@auth0/nextjs-auth0";

// require('dotenv').config();
// const {
//   DATABASE_URL,
//   SHADOW_DATABASE_URL,
//   AUTH0_CLIENTID,
//   AUTH0_DOMAIN,
//   AUTH0_CLIENT_SECRET,
//   AUTH0_SCOPE,
//   BASE_URL,
//   AUTH0_COOKIE,
//   BACKEND_ADDRESS
// } = process.env;
// // // import { SignInWithAuth0 } from '@auth0/nextjs-auth0/dist/instance'
// // import getConfig from "next/config";
// // const { serverRuntimeConfig } = getConfig();
// // const { auth, cookieSecret } = serverRuntimeConfig;

// // export default initAuth0({
// //   ...auth,
// //   session: {
// //     // cookieSecret,
// //     // cookieLifetime: 60 * 60 * 8,
// //     // storeIdToken: false,
// //     // storeAccessToken: false,
// //     // storeRefreshToken: false,
// //     rollingDuration: 60 * 60 * 8,
// //     // abosolute
// //   },
// //   baseURL:
// //   // oidcClient: {
// //   //   httpTimeout: 2500,
// //   //   clockTolerance: 10000,
// //   // },
// // });

// const initAuth0({
//   secret: process.env.SESSION_COOKIE_SECRET,
//   issuerBaseURL: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
//   baseURL: process.env.BASE_URL,
//   clientID: process.env.AUTH0_CLIENTID,
//   clientSecret: process.env.AUTH0_CLIENT_SECRET,
//   routes: {
//     callback:
//       process.env.NEXT_PUBLIC_REDIRECT_URI ||
//       'http://localhost:3000/api/callback',
//     postLogoutRedirect:
//       process.env.NEXT_PUBLIC_POST_LOGOUT_REDIRECT_URI ||
//       'http://localhost:3000',
//   },
//   authorizationParams: {
//     response_type: 'code',
//     scope:'opepnid profile email', 
//   },
//   session: {
//     absoluteDuration: Number(process.env.SESSION_COOKIE_LIFETIME),
//   },
// })

// export default initAuth0
