import useSWR from 'swr';
import Error from 'next/error';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';

const fetcher = (url) => fetch(url).then((r) => r.json());

/**
 * Props:
 * - workId (required): string (eg. "OL45804W")
 */
export default function BookCard({ workId }) {
  const { data, error } = useSWR(
    workId ? `https://openlibrary.org/works/${workId}.json` : null,
    fetcher
  );

  if (error) return <Error statusCode={404} />;
  if (!data) return null; // loading state

  const title = data.title || '';
  const firstPublish = data.first_publish_date || 'N/A';
  const coverId = data.covers?.[0];
  const imgSrc = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : '/images/placeholder.png';

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        className="object-fit-cover"
        src={imgSrc}
        alt={title}
        onError={(e) => { e.currentTarget.src = '/images/placeholder.png'; }}
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{firstPublish}</Card.Text>
        <Button as={Link} href={`/works/${workId}`}>Details</Button>
      </Card.Body>
    </Card>
  );
}
