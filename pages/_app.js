import '../styles/main.css';
// Usuwam import SpeedInsights, który powoduje błąd
// import { SpeedInsights } from '@vercel/speed-insights/next';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      {/* Usuwam komponent SpeedInsights */}
    </>
  );
}

export default MyApp; 