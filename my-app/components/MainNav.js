import Link from 'next/link';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { readToken, removeToken } from '@/lib/authenticate';
import { useAtom } from 'jotai';
import { favouritesAtom, themeAtom } from '@/store';
import { useEffect, useState } from 'react';

export default function MainNav() {
  const router = useRouter();
  const token = readToken();
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  
  // GLOBAL THEME STATE
  const [theme, setTheme] = useAtom(themeAtom);
  const [mounted, setMounted] = useState(false);

  // Ensure we only render theme logic on the client to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    // Sync the HTML attribute for CSS variables
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  function logout() {
    setFavouritesList([]); 
    removeToken();
    router.push('/login');
  }

  // Prevent hydration errors by not rendering theme-dependent UI until mounted
  if (!mounted) return null;

  return (
    <Navbar expand="lg" className="fixed-top mb-4 shadow-sm" variant={theme === 'dark' ? 'dark' : 'light'}>
      <Container>
        <Navbar.Brand as={Link} href="/">OPEN LIBRARY</Navbar.Brand>
        <Navbar.Toggle aria-controls="mainnav" />
        <Navbar.Collapse id="mainnav">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/browse" active={router.pathname === "/browse"}>
               &gt; INTERCEPT_
            </Nav.Link>
            <Nav.Link as={Link} href="/about" active={router.pathname === "/about"}>
               &gt; INFO
            </Nav.Link>
            {token && (
              <Nav.Link as={Link} href="/favourites" active={router.pathname === "/favourites"}>
                 &gt; SAVED_DATA
              </Nav.Link>
            )}
          </Nav>
          
          <Nav className="align-items-center gap-3">
            {/* Theme Toggle Button */}
            <div 
              onClick={toggleTheme} 
              style={{ 
                cursor: 'pointer', 
                border: '1px solid var(--border)', 
                padding: '5px 10px',
                fontSize: '12px',
                fontFamily: 'var(--mono-font)',
                userSelect: 'none',
                color: 'inherit' // Inherits black in light mode, white in dark mode
              }}
            >
              DISPLAY: {theme.toUpperCase()}
            </div>

            {token ? (
              <NavDropdown title={token.userName} id="basic-nav-dropdown" align="end">
                <NavDropdown.Item as={Link} href="/favourites">My List</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <div className="d-flex gap-2">
                <Link href="/login" passHref legacyBehavior>
                   <Button variant="outline-light" size="sm">Login</Button>
                </Link>
                <Link href="/register" passHref legacyBehavior>
                   <Button variant="primary" size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}