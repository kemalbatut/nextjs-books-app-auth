import { useState, useMemo } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { Container, Table, Button, ButtonGroup } from 'react-bootstrap';
import PageHeader from '@/components/PageHeader';

const fetcher = (url) => fetch(url).then(r => r.json());

export default function Books() {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const queryString = useMemo(() => {
    const qs = new URLSearchParams(router.query);
    qs.set('page', page);
    qs.set('limit', '10');
    return qs.toString();
  }, [router.query, page]);

  const { data, error, isLoading } = useSWR(
    router.isReady ? `https://openlibrary.org/search.json?${queryString}` : null,
    fetcher
  );

  const subtext = useMemo(() => {
    const q = router.query || {};
    const entries = Object.entries(q);
    if (!entries.length) return '';
    return entries.map(([k, v]) => `${k}=${v}`).join(' • ');
  }, [router.query]);

  return (
    <Container>
      <PageHeader text="Search Results" subtext={subtext || '—'} />

      {error && <p className="text-danger">Error loading results.</p>}
      {isLoading && <p>Loading…</p>}

      {data && (
        <>
          <Table striped hover responsive className="align-middle">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author(s)</th>
                <th>First Publish</th>
                <th>Work</th>
              </tr>
            </thead>
            <tbody>
              {data.docs?.map((d) => {
                const workId = d.key?.replace('/works/', '');
                return (
                  <tr key={`${d.key}-${d.cover_i ?? 'n'}`}>
                    <td>{d.title}</td>
                    <td>{(d.author_name || []).join(', ')}</td>
                    <td>{d.first_publish_year ?? 'N/A'}</td>
                    <td>{workId ? <Button size="sm" href={`/works/${workId}`}>Details</Button> : '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          <div className="d-flex justify-content-between align-items-center">
            <div>Found: {data.numFound?.toLocaleString?.() ?? '—'}</div>
            <ButtonGroup>
              <Button
                variant="secondary"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Prev
              </Button>
              <Button onClick={() => setPage((p) => p + 1)}>Next</Button>
            </ButtonGroup>
          </div>
        </>
      )}
    </Container>
  );
}
