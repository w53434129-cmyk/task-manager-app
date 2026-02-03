import '../styles/globals.css';  // <-- this imports Tailwind globally

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
