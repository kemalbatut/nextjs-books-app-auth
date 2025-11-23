import { useEffect, useState } from 'react';
import { Row, Col, Badge, Button } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';

/**
 * Props:
 * - book (required): data from https://openlibrary.org/works/{workId}.json
 * - workId (required): string (eg. "OL45804W")
 * - showFavouriteBtn (optional): boolean (default true)
 */
export default function BookDetails({ book, workId, showFavouriteBtn = true }) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    setShowAdded(favouritesList.includes(workId));
  }, [favouritesList, workId]);

  const favouritesClicked = () => {
    if (!workId) return;
    if (showAdded) {
      setFavouritesList((current) => current.filter((id) => id !== workId));
      setShowAdded(false);
    } else {
      setFavouritesList((current) => [...current, workId]);
      setShowAdded(true);
    }
  };

  if (!book) return null;

  const coverId = book.covers?.[0];
  const imgSrc = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : '/images/placeholder.png';

  const title = book.title || '';
  const description =
    typeof book.description === 'string'
      ? book.description
      : book.description?.value || '';
  const subjects = book.subjects || [];
  const firstPublish = book.first_publish_date || 'N/A';

  return (
    <Row className="gy-3">
      <Col lg={4}>
        <img
          src={imgSrc}
          alt={title}
          className="img-fluid rounded"
          onError={(e) => { e.currentTarget.src = '/images/placeholder.png'; }}
        />
      </Col>
      <Col lg={8}>
        <h2 className="mb-2">{title}</h2>
        <div className="text-muted mb-3">First Published: {firstPublish}</div>

        {description && (
          <p style={{ whiteSpace: 'pre-wrap' }}>{description}</p>
        )}

        {subjects.length > 0 && (
          <div className="mt-3">
            {subjects.slice(0, 10).map((s) => (
              <Badge bg="secondary" className="me-2 mb-2" key={s}>
                {s}
              </Badge>
            ))}
          </div>
        )}

        {showFavouriteBtn && (
          <div className="mt-4">
            <Button
              variant={showAdded ? 'primary' : 'outline-primary'}
              onClick={favouritesClicked}
            >
              {showAdded ? '+ Favourite (added)' : '+ Favourite'}
            </Button>
          </div>
        )}
      </Col>
    </Row>
  );
}
