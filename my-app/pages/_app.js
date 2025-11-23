import MainNav from '@/components/MainNav';

// If you downloaded Cerulean to public/styles/bootstrap.min.css, use this:
// import '@/styles/bootstrap.min.css';

// Otherwise use default Bootstrap from the package:
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <MainNav />
      <Component {...pageProps} />
    </>
  );
}
