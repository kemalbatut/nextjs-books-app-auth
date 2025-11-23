import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import PageHeader from '@/components/PageHeader';

export default function Home() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { author: '', title: '', subject: '', language: '', first_publish_year: '' }
  });

  const onSubmit = (data) => {
    const query = Object.fromEntries(Object.entries(data).filter(([, v]) => v !== ''));
    router.push({ pathname: '/books', query });
  };

  return (
    <Container>
      <PageHeader text="Search" subtext="Find books from Open Library" />
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Row className="gy-3">
          <Col md={6}>
            <Form.Label>Author *</Form.Label>
            <Form.Control
              placeholder="eg. Douglas Adams"
              className={errors.author ? 'is-invalid' : ''}
              {...register('author', { required: 'Author is required' })}
            />
            {errors.author && <div className="invalid-feedback">{errors.author.message}</div>}
          </Col>
          <Col md={6}>
            <Form.Label>Title</Form.Label>
            <Form.Control placeholder="eg. Galaxy" {...register('title')} />
          </Col>
          <Col md={6}>
            <Form.Label>Subject</Form.Label>
            <Form.Control placeholder="eg. Science fiction" {...register('subject')} />
          </Col>
          <Col md={3}>
            <Form.Label>Language</Form.Label>
            <Form.Control placeholder="eg. eng, fre, tur" {...register('language')} />
          </Col>
          <Col md={3}>
            <Form.Label>First Publish Year</Form.Label>
            <Form.Control type="number" placeholder="eg. 1979" {...register('first_publish_year')} />
          </Col>
        </Row>
        <div className="mt-4">
          <Button type="submit">Search</Button>
        </div>
      </Form>
    </Container>
  );
}
