import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';
import '@/components/GridScan.css';

import MainNav from '@/components/MainNav';
import RouteGuard from '@/components/RouteGuard';
import { GridScan } from '@/components/GridScan'; 
import { Container } from 'react-bootstrap';
import Head from 'next/head';
import { useAtom } from 'jotai';
import { themeAtom } from '@/store'; // Import the atom
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }) {
  // Read the global theme
  // We use a local state 'mounted' to prevent hydration mismatch errors
  const [theme] = useAtom(themeAtom);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Ensure the HTML attribute is set on initial load
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Define colors based on theme
  const isLight = theme === 'light';
  
  // Light Mode: White BG, Light Grey Lines, Blue Scan
  // Dark Mode: Black BG, Dark Grey Lines, Acid Green Scan
  const bgColor = isLight ? '#f4f4f4' : '#050505';
  const linesColor = isLight ? '#cccccc' : '#222222';
  const scanColor = isLight ? '#0000ff' : '#ccff00';

  if (!mounted) return null; // Prevent flash of wrong theme

  return (
    <RouteGuard>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Share+Tech+Mono&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/png" href="/favicon.jpg" />
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
        backgroundColor: bgColor, // DYNAMIC BACKGROUND
        transition: 'background-color 0.3s ease'
      }}>
        <GridScan
          sensitivity={0.1}
          lineThickness={1}
          linesColor={linesColor}   // DYNAMIC LINES
          scanColor={scanColor}     // DYNAMIC SCAN
          scanOpacity={0.3}
          gridScrollSpeed={0.2} 
          gridScale={0.15}
          enablePost={true}
          bloomIntensity={isLight ? 0.4 : 0.8} // Less bloom in light mode
          bloomThreshold={0}
          chromaticAberration={0.003}
          noiseIntensity={0.02}
        />
      </div>
      
      {/* CRT Effect Overlay (Only show in dark mode for better readability in light mode) */}
      {!isLight && <div className="scanline"></div>}
      
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