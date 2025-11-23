import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Container, Row, Col, Button } from 'react-bootstrap';
import BookCard from '@/components/BookCard';

const SUBJECTS = ['science_fiction', 'fantasy', 'thriller', 'romance', 'history', 'mystery', 'programming'];

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Browse() {
  const [subject, setSubject] = useState('');

  // Pick random subject on mount
  useEffect(() => {
    scrambleSignal();
  }, []);

  const scrambleSignal = () => {
    const randomSub = SUBJECTS[Math.floor(Math.random() * SUBJECTS.length)];
    setSubject(randomSub);
  };

  const { data, error, isLoading } = useSWR(
    subject ? `https://openlibrary.org/subjects/${subject}.json?limit=12` : null,
    fetcher
  );

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-end mb-4 border-bottom border-secondary pb-3">
        <div>
          <h1>BROWSING <span style={{ color: 'var(--acid)', WebkitTextStroke: '0px' }}>BOOKS</span></h1>
          <p className="mb-0">DECODING STREAM: {subject?.toUpperCase()}_</p>
        </div>
        <Button variant="primary" onClick={scrambleSignal}>
          SEARCH_
        </Button>
      </div>

      {isLoading && <div className="blink" style={{ fontSize: '2rem', fontFamily: 'var(--mono-font)' }}>DECRYPTING DATA PACKETS...</div>}
      
      {data && (
        <Row className="gy-4">
          {data.works?.map((work) => (
            <Col md={3} key={work.key}>
              <BookCard workId={work.key.replace('/works/', '')} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}