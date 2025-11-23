import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Container } from 'react-bootstrap';
import PageHeader from '@/components/PageHeader';
import BookDetails from '@/components/BookDetails';

const fetcher = (url) => fetch(url).then(r => r.json());

export default function WorkDetailsPage() {
  const router = useRouter();
  const { workId } = router.query;

  const { data, error, isLoading } = useSWR(
    workId ? `https://openlibrary.org/works/${workId}.json` : null,
    fetcher
  );

  return (
    <Container>
      <PageHeader text="Book Details" subtext={workId} />
      {error && <p className="text-danger">Error loading work.</p>}
      {isLoading && <p>Loading…</p>}
      {data && <BookDetails book={data} workId={workId} />}
    </Container>
  );
}
