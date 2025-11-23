import { Container } from 'react-bootstrap';
import PageHeader from '@/components/PageHeader';
import BookDetails from '@/components/BookDetails';

const sampleWorkId = 'OL45804W'; // change if you prefer

const sampleBook = {
  title: 'Sample / Hard-coded Book',
  description: 'Replace this content with your Assignment 1 sample.',
  subjects: ['Example', 'Demo'],
  first_publish_date: 'N/A',
  covers: [] // use placeholder
};

export default function About() {
  return (
    <Container>
      <PageHeader text="About" subtext="This app uses Open Library data." />
      <BookDetails book={sampleBook} workId={sampleWorkId} showFavouriteBtn={false} />
    </Container>
  );
}
