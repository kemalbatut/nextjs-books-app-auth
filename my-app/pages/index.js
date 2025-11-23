import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Container, Form, Row, Col, Button, ListGroup } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { recentlyViewedAtom } from '@/store';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const [recentlyViewed] = useAtom(recentlyViewedAtom);
  
  // TYPEAHEAD STATE
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState('');

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: { author: '', title: '', subject: '', language: '', first_publish_year: '' }
  });

  // Watch the title field for changes
  const titleValue = watch('title');

  // Debounced Search Effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (titleValue && titleValue.length > 3) {
        fetch(`https://openlibrary.org/search.json?title=${titleValue}&limit=5`)
          .then(res => res.json())
          .then(data => {
            setSuggestions(data.docs || []);
            setShowSuggestions(true);
          })
          .catch(err => console.error(err));
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 500); // Wait 500ms after typing stops

    return () => clearTimeout(timer);
  }, [titleValue]);

  const selectSuggestion = (title) => {
    setValue('title', title);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const onSubmit = (data) => {
    const query = Object.fromEntries(Object.entries(data).filter(([, v]) => v !== ''));
    router.push({ pathname: '/books', query });
  };

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-end mb-5" style={{ borderBottom: '1px solid #333', paddingBottom: '20px' }}>
        <div>
          <h1 className="mb-0">ARCHIVE <span style={{ color: 'var(--acid)', WebkitTextStroke: '0px' }}>SEARCH</span></h1>
          <p className="mb-0" style={{ fontFamily: 'var(--mono-font)', color: '#666' }}>// ACCESSING PUBLIC RECORDS_</p>
        </div>
        <div className="text-end d-none d-md-block">
          <p className="mb-0" style={{ fontFamily: 'var(--mono-font)', fontSize: '10px', color: '#444' }}>
            SYS.VER.4.2<br />UBIQUITY ENGINE<br />STATUS: ONLINE
          </p>
        </div>
      </div>

      <Row>
        <Col lg={8} className="mb-4">
          <div className="p-4 h-100" style={{ border: '1px solid var(--border)', background: 'var(--panel)' }}>
            <Form noValidate onSubmit={handleSubmit(onSubmit)}>
              <Row className="gy-4">
                <Col md={6}>
                  <Form.Label className="small text-uppercase text-muted">Query Target: Author</Form.Label>
                  <Form.Control placeholder="INPUT_AUTHOR_NAME" {...register('author')} />
                </Col>
                
                {/* TYPEAHEAD FIELD */}
                <Col md={6} style={{ position: 'relative' }}>
                  <Form.Label className="small text-uppercase text-muted">Query Target: Title</Form.Label>
                  <Form.Control 
                    placeholder="INPUT_TITLE_ID" 
                    autoComplete="off"
                    {...register('title')} 
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Delay hide so click registers
                  />
                  {/* Suggestions Dropdown */}
                  {showSuggestions && suggestions.length > 0 && (
                    <ListGroup style={{ 
                      position: 'absolute', 
                      zIndex: 1000, 
                      width: '95%',
                      border: '1px solid var(--acid)',
                      borderRadius: 0
                    }}>
                      {suggestions.map((book, i) => (
                        <ListGroup.Item 
                          key={i} 
                          action 
                          onClick={() => selectSuggestion(book.title)}
                          style={{ 
                            background: '#000', 
                            color: '#fff', 
                            border: 'none',
                            borderBottom: '1px solid #333',
                            fontFamily: 'var(--mono-font)',
                            fontSize: '12px'
                          }}
                        >
                          {book.title} <span style={{ color: '#666' }}>({book.first_publish_year})</span>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </Col>

                <Col md={6}>
                  <Form.Label className="small text-uppercase text-muted">Filter: Subject</Form.Label>
                  <Form.Control placeholder="INPUT_SUBJECT_TAG" {...register('subject')} />
                </Col>
                <Col md={3}>
                  <Form.Label className="small text-uppercase text-muted">Filter: Lang</Form.Label>
                  <Form.Control placeholder="ENG" {...register('language')} />
                </Col>
                <Col md={3}>
                  <Form.Label className="small text-uppercase text-muted">Filter: Date</Form.Label>
                  <Form.Control type="number" placeholder="YYYY" {...register('first_publish_year')} />
                </Col>
              </Row>
              <div className="mt-5 pt-3" style={{ borderTop: '1px dashed #333' }}>
                <Row className="align-items-center">
                  <Col xs={6}>
                    <span style={{ fontFamily: 'var(--mono-font)', color: '#444', fontSize: '12px' }}>[!] AWAITING INPUT</span>
                  </Col>
                  <Col xs={6} className="text-end">
                    <Button type="submit" variant="primary" size="lg" className="rounded-0 w-100">INITIALIZE SEARCH_</Button>
                  </Col>
                </Row>
              </div>
            </Form>
          </div>
        </Col>

        {/* Audit Log / Recently Viewed */}
        <Col lg={4} className="mb-4">
          <div className="p-4 h-100" style={{ border: '1px solid var(--border)', background: 'var(--black)' }}>
            <h4 style={{ fontSize: '1.2rem', borderBottom: '1px solid var(--acid)', paddingBottom: '10px', marginBottom: '20px', color: 'var(--acid)' }}>
              &gt; AUDIT_LOG (RECENT)
            </h4>
            {recentlyViewed.length > 0 ? (
              <ul style={{ listStyle: 'none', padding: 0, fontFamily: 'var(--mono-font)', fontSize: '14px' }}>
                {recentlyViewed.map((item, index) => (
                  <li key={index} style={{ marginBottom: '15px', borderLeft: '2px solid #333', paddingLeft: '10px' }}>
                    <div style={{ color: '#666', fontSize: '10px' }}>LOG_ENTRY_0{index + 1}</div>
                    <Link href={`/works/${item.id}`} style={{ color: '#fff', textDecoration: 'none' }}>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: '#444', fontStyle: 'italic' }}>NO_ACTIVITY_DETECTED</p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}