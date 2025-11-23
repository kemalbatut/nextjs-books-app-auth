import useSWR from 'swr';
import Error from 'next/error';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function BookCard({ workId }) {
  const { data, error } = useSWR(
    workId ? `https://openlibrary.org/works/${workId}.json` : null,
    fetcher
  );

  if (error) return <Error statusCode={404} />;
  if (!data) return null;

  const title = data.title || '';
  const firstPublish = data.first_publish_date || 'N/A';
  const coverId = data.covers?.[0];
  const imgSrc = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : '/images/placeholder.png'; // Ensure you have a placeholder image in public/images

  return (
    <Card className="h-100 glass-panel border-0 text-white">
      <div style={{ overflow: 'hidden', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}>
        <Card.Img
          variant="top"
          src={imgSrc}
          alt={title}
          style={{ 
            height: '300px', 
            objectFit: 'cover', 
            transition: 'transform 0.5s' 
          }}
          className="hover-zoom"
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          onError={(e) => { e.currentTarget.src = 'https://placehold.co/300x400?text=No+Cover'; }}
        />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-bold">{title}</Card.Title>
        <Card.Text className="text-muted small mb-4">
          First Published: {firstPublish}
        </Card.Text>
        <div className="mt-auto">
          <Link href={`/works/${workId}`} passHref legacyBehavior>
            <Button variant="primary" className="w-100">View Details</Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}