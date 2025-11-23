import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Container } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { recentlyViewedAtom } from '@/store';
import BookDetails from '@/components/BookDetails';

const fetcher = (url) => fetch(url).then(r => r.json());

export default function WorkDetailsPage() {
  const router = useRouter();
  const { workId } = router.query;
  const [viewed, setViewed] = useAtom(recentlyViewedAtom);

  const { data, error, isLoading } = useSWR(
    workId ? `https://openlibrary.org/works/${workId}.json` : null,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setViewed((prev) => {
        const filtered = prev.filter(item => item.id !== workId);
        return [{ id: workId, title: data.title }, ...filtered].slice(0, 10);
      });
    }
  }, [data, workId, setViewed]);

  return (
    <Container>
      <div style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
        <h1 style={{ fontSize: '2rem' }}>FILE_ID: <span style={{ color: 'var(--acid)' }}>{workId}</span></h1>
      </div>
      
      {error && <p className="text-danger">ERROR: DATA_CORRUPTED</p>}
      {isLoading && <p className="blink">LOADING_ASSETS...</p>}
      
      {data && <BookDetails book={data} workId={workId} />}
    </Container>
  );
}