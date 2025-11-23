import { useEffect, useState } from 'react';
import { Row, Col, Badge, Button } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { addToFavourites, removeFromFavourites } from '@/lib/userData';

export default function BookDetails({ book, workId, showFavouriteBtn = true }) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  // Sync local state with the atom
  useEffect(() => {
    if (favouritesList && workId) {
      setShowAdded(favouritesList.includes(workId));
    }
  }, [favouritesList, workId]);

  const favouritesClicked = async () => {
    if (!workId) return;
    
    if (showAdded) {
      // REMOVE LOGIC
      const newList = await removeFromFavourites(workId);
      // Only update if we actually got a list back
      if (newList) {
        setFavouritesList(newList);
        setShowAdded(false);
      }
    } else {
      // ADD LOGIC
      const newList = await addToFavourites(workId);
      // Only update if the new list actually contains our ID (Success check)
      if (newList && newList.includes(workId)) {
        setFavouritesList(newList); 
        setShowAdded(true);
      } else {
        console.error("Failed to add: API returned", newList);
        alert("ERROR: WRITE_PERMISSION_DENIED (Check Network Console)");
      }
    }
  };

  if (!book) return null;

  const coverId = book.covers?.[0];
  const imgSrc = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : 'https://placehold.co/400x600/000000/FFFFFF/png?text=NO+COVER_DATA';

  const title = book.title || 'UNKNOWN_TITLE';
  const description =
    typeof book.description === 'string'
      ? book.description
      : book.description?.value || 'NO_DATA_AVAILABLE_ON_DISK.';
  const subjects = book.subjects || [];
  const firstPublish = book.first_publish_date || 'UNKNOWN';

  return (
    <div className="p-4 mt-3" style={{ border: '1px solid var(--border)', background: 'var(--black)' }}>
      <Row className="g-5">
        {/* Image Column with 'Tech Borders' */}
        <Col lg={4}>
          <div style={{ position: 'relative', border: '1px solid var(--acid)', padding: '5px' }}>
            {/* Corner Markers */}
            <div style={{ position: 'absolute', top: '-1px', left: '-1px', width: '10px', height: '10px', borderTop: '2px solid var(--acid)', borderLeft: '2px solid var(--acid)' }}></div>
            <div style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '10px', height: '10px', borderBottom: '2px solid var(--acid)', borderRight: '2px solid var(--acid)' }}></div>
            
            <img
              src={imgSrc}
              alt={title}
              className="img-fluid w-100"
              style={{ filter: 'grayscale(100%) contrast(1.2)', transition: 'filter 0.3s' }}
              onMouseOver={(e) => e.currentTarget.style.filter = 'grayscale(0%) contrast(1)'}
              onMouseOut={(e) => e.currentTarget.style.filter = 'grayscale(100%) contrast(1.2)'}
            />
            <div className="mt-2 text-end" style={{ fontFamily: 'var(--mono-font)', fontSize: '10px', color: 'var(--acid)' }}>
              IMG_REF: {coverId || 'NULL'}
            </div>
          </div>
        </Col>

        {/* Data Column */}
        <Col lg={8}>
          <div className="mb-4 pb-3" style={{ borderBottom: '1px dashed var(--border)' }}>
            <h1 className="glitch" data-text={title} style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
              {title}
            </h1>
            <div style={{ fontFamily: 'var(--mono-font)', color: '#666' }}>
              &gt; DATE_OF_ORIGIN: <span style={{ color: '#fff' }}>{firstPublish}</span>
            </div>
          </div>

          <h5 style={{ color: 'var(--acid)', fontFamily: 'var(--mono-font)' }}>// SUMMARY_DATA</h5>
          <p style={{ whiteSpace: 'pre-wrap', borderLeft: '2px solid var(--border)', paddingLeft: '15px', color: '#aaa' }}>
            {description}
          </p>

          <div className="mt-4">
            <h5 style={{ color: 'var(--acid)', fontFamily: 'var(--mono-font)' }}>// TAGS_DETECTED</h5>
            <div className="d-flex flex-wrap gap-2">
              {subjects.length > 0 ? subjects.slice(0, 8).map((s, i) => (
                <span key={i} style={{ 
                  border: '1px solid #444', 
                  padding: '2px 8px', 
                  fontSize: '12px', 
                  fontFamily: 'var(--mono-font)',
                  textTransform: 'uppercase' 
                }}>
                  {s}
                </span>
              )) : <span style={{ color: '#444' }}>NO_TAGS</span>}
            </div>
          </div>

          {/* Action Area */}
          {showFavouriteBtn && (
            <div className="mt-5 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
              <Row className="align-items-center">
                <Col xs={6} style={{ fontFamily: 'var(--mono-font)', fontSize: '12px', color: '#666' }}>
                  ACTION_REQUIRED:
                </Col>
                <Col xs={6} className="text-end">
                  <Button
                    variant={showAdded ? 'primary' : 'outline-primary'}
                    onClick={favouritesClicked}
                    size="lg"
                    className="w-100"
                  >
                    {showAdded ? '>> DATA_SAVED' : 'ADD_TO_DATABASE +'}
                  </Button>
                </Col>
              </Row>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}