// 1. Import Bootstrap CSS first
import 'bootstrap/dist/css/bootstrap.min.css';

// 2. Import your Custom Styles
import '@/styles/globals.css';
import '@/components/GridScan.css';

import MainNav from '@/components/MainNav';
import RouteGuard from '@/components/RouteGuard';
import { GridScan } from '@/components/GridScan'; 
import { Container } from 'react-bootstrap';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <RouteGuard>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Share+Tech+Mono&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.jpg" />
        <title>Archive Explorer // V4.2</title>
      </Head>
      
      {/* --- 3D BACKGROUND LAYER --- */}
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        zIndex: -1, 
        pointerEvents: 'none',
        backgroundColor: '#050505' 
      }}>
        <GridScan
          sensitivity={0.1}
          lineThickness={1}
          linesColor="#222222" 
          scanColor="#ccff00"
          scanOpacity={0.3}
          gridScrollSpeed={0.2} 
          gridScale={0.15}
          enablePost={true}
          bloomIntensity={0.8}
          bloomThreshold={0}
          chromaticAberration={0.003}
          noiseIntensity={0.02}
        />
      </div>
      
      {/* CRT Effect Overlay */}
      <div className="scanline"></div> 
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <MainNav />
        <Container className="mt-5 pt-4">
          <Component {...pageProps} />
        </Container>
        <br /><br />
      </div>
    </RouteGuard>
  );
}