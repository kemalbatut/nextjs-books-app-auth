import { Container, Row, Col, Button } from 'react-bootstrap';
import Link from 'next/link';

export default function About() {
  return (
    <Container>
      <div className="p-5" style={{ marginTop: '100px', border: '1px solid #333', background: '#0a0a0a' }}>
        <Row className="align-items-center">
          <Col md={12} lg={8}>
            <h1 className="display-4 fw-bold mb-4" style={{ color: '#fff' }}>
              ARCHIVE <span style={{ color: 'var(--acid)', WebkitTextStroke: '0px' }}>EXPLORER</span>
            </h1>
            
            <p className="lead mb-4" style={{ color: '#ccc' }}>
              Welcome to the Open Library Explorer. This application allows you to traverse the 
              universe of books using the Open Library API.
            </p>

            <div className="mb-4">
              {/* UPDATED: Now using the Mono font */}
              <h4 className="mb-3" style={{ color: 'var(--acid)', fontFamily: 'var(--mono-font)' }}>
                // KEY_FEATURES
              </h4>
              <ul style={{ listStyle: 'none', paddingLeft: 0, fontFamily: 'var(--mono-font)', color: '#888' }}>
                <li className="mb-2">:: GLOBAL_SEARCH_INIT // Find books by author/title</li>
                <li className="mb-2">:: SECURE_ACCESS_JWT // Encrypted user sessions</li>
                <li className="mb-2">:: COLLECTION_DB // Persistent favourite storage</li>
                <li className="mb-2">:: UI_BRUTALISM_V1 // Industrial interface design</li>
              </ul>
            </div>

            <Link href="/" passHref legacyBehavior>
              <Button variant="primary" size="lg" className="mt-3 rounded-0">
                INITIALIZE_
              </Button>
            </Link>
          </Col>
          
          <Col md={12} lg={4} className="text-center mt-4 mt-lg-0">
            <div style={{ 
              width: '200px', 
              height: '200px', 
              margin: '0 auto',
              border: '1px dashed var(--acid)',
              borderRadius: '50%', 
              position: 'relative'
            }}>
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    color: 'var(--acid)', fontFamily: 'var(--mono-font)'
                }}>
                    NO_SIGNAL
                </div>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}