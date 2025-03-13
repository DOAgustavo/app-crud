import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        body {
          background-color: rgb(17, 17, 17);
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;