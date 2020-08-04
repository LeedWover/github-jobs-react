import React, { useState } from 'react';
import './App.css';
import { Container } from 'react-bootstrap'
import fetchJobs from './fetchJobs';

function App() {
  const [params, setParams] = useState([
    {
      name: 'description',
      value: 'javascript'
    }, {
      name: 'location',
      value: 'hungary'
    }
  ])
  const [page, setPage] = useState(1)
  const { jobs, loading, error } = fetchJobs(params, page)

  return (
    <Container>
      {loading && <h1>Loading</h1>}
      {error && <h1>error</h1>}
      <h1>{jobs && !loading && jobs.map(job => {
        return (<p key={job.id}>{job.title}</p>)
      })}</h1>
    </Container>
  );
}

export default App;
