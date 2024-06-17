import { useEffect, useState } from 'react';

const Submissions = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const storedSubmissions = JSON.parse(localStorage.getItem('submissions')) || [];
    setSubmissions(storedSubmissions);
  }, []);

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Submissions</h2>
      <ul>
        {submissions.map((submission, index) => (
          <li key={index} className="mb-4 p-4 border rounded-md bg-gray-50">
            <p><strong>Name:</strong> {submission.name}</p>
            <p><strong>Email:</strong> {submission.email}</p>
            <p><strong>Message:</strong> {submission.message}</p>
            <p><strong>Date:</strong> {new Date(submission.date).toLocaleString()}</p>
            <p><strong>House ID:</strong> {submission.houseId}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Submissions;
