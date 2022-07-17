// import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useApollo } from "../utils/apolloClient";
import { ApolloProvider } from "@apollo/client";
import "tailwindcss/tailwind.css"
import "../styles/index.css"
function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
