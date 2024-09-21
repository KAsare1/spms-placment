import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Program {
  id: number;
  program_type: string;
  major: string;
  second_major?: string;
  minor?: string;
  program: string;
}

const ChoicesPage: React.FC = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [studentId, setStudentId] = useState<number | null>(null);
  const [studentEmail, setStudentEmail] = useState<string>('');
  const [firstChoice, setFirstChoice] = useState<number | null>(null);
  const [secondChoice, setSecondChoice] = useState<number | null>(null);
  const [thirdChoice, setThirdChoice] = useState<number | null>(null);
  const [loadingPrograms, setLoadingPrograms] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const storedStudentId = localStorage.getItem('student_id');

  useEffect(() => {
    if (storedStudentId) {
      axios
        .get(`https://placement-server.onrender.com/auth/student/${storedStudentId}/`)
        .then((response) => {
          setStudentId(response.data.id);
          setStudentEmail(response.data.email)
        })
        .catch(() => {
          setErrorMessage('Failed to fetch student details.');
        });
    }
  }, [storedStudentId]);

  useEffect(() => {
    axios
      .get('https://placement-server.onrender.com/placement/programs/')
      .then((response) => {
        setPrograms(response.data);
        setLoadingPrograms(false);
      })
      .catch(() => {
        setErrorMessage('Failed to fetch programs.');
        setLoadingPrograms(false);
      });
  }, []);

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  if (!firstChoice || !secondChoice || !thirdChoice || !studentId) {
    setErrorMessage('Please select all choices and ensure student details are loaded.');
    return;
  }

  if (firstChoice === secondChoice || firstChoice === thirdChoice || secondChoice === thirdChoice) {
    setErrorMessage('Please select unique choices for all programs.');
    return;
  }

  const confirmSubmission = window.confirm('Are you sure you want to submit your choices?');
  if (!confirmSubmission) {
    return;
  }

  setSubmitting(true);
  const payload = {
    student: studentId,
    first_choice: firstChoice,
    second_choice: secondChoice,
    third_choice: thirdChoice,
    email: studentEmail,
  };

  try {
    await axios.post('http://127.0.0.1:8000/choices/submit/', payload);
    setSuccessMessage('Choices submitted successfully!');
    console.log('Submitting payload:', payload);
    setErrorMessage(null);
  } catch (error: any) {
    const message = error.response?.data?.error;
    console.log('Submitting payload:', payload);
    console.log('Error response:', error.response);
    setErrorMessage(message);
    setSuccessMessage(null);
  } finally {
    console.log('Submitting payload:', payload);
    setSubmitting(false);
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Select Your Program Choices</h2>

        {loadingPrograms ? (
          <p>Loading programs...</p>
        ) : errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-gray-700">First Choice</label>
              <select
                value={firstChoice || ''}
                onChange={(e) => setFirstChoice(Number(e.target.value))}
                className="w-full p-2 border rounded"
                disabled={loadingPrograms}
              >
                <option value="">Select your first choice</option>
                {programs.map((program) => (
                  <option key={program.id} value={program.id}>
                    {program.program}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Second Choice</label>
              <select
                value={secondChoice || ''}
                onChange={(e) => setSecondChoice(Number(e.target.value))}
                className="w-full p-2 border rounded"
                disabled={loadingPrograms}
              >
                <option value="">Select your second choice</option>
                {programs
                  .filter((program) => program.id !== firstChoice) // Exclude first choice
                  .map((program) => (
                    <option key={program.id} value={program.id}>
                      {program.program}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Third Choice</label>
              <select
                value={thirdChoice || ''}
                onChange={(e) => setThirdChoice(Number(e.target.value))}
                className="w-full p-2 border rounded"
                disabled={loadingPrograms}
              >
                <option value="">Select your third choice</option>
                {programs
                  .filter((program) => program.id !== firstChoice && program.id !== secondChoice) // Exclude first and second choices
                  .map((program) => (
                    <option key={program.id} value={program.id}>
                      {program.program}
                    </option>
                  ))}
              </select>
            </div>
          </>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-4"
          disabled={submitting || loadingPrograms}
        >
          {submitting ? 'Submitting...' : 'Submit Choices'}
        </button>

        {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
      </form>
    </div>
  );
};

export default ChoicesPage;
