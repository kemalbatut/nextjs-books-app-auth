import Link from 'next/link';
import { Navbar, Nav, Container } from 'react-bootstrap';

export default function MainNav() {
  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} href="/">Open Library</Navbar.Brand>
        <Navbar.Toggle aria-controls="mainnav" />
        <Navbar.Collapse id="mainnav">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/about">About</Nav.Link>
            <Nav.Link as={Link} href="/favourites">Favourites</Nav.Link>
            {/* NOTE: Do not include a "Books" link per A2 instructions */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
