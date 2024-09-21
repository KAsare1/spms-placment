import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CodeConfirmationPage: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [studentId, setStudentId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate(); // Use navigate to redirect to login

  useEffect(() => {
    // Retrieve student_id from localStorage
    const storedStudentId = localStorage.getItem('student_id');
    if (storedStudentId) {
      setStudentId(storedStudentId);
    } else {
      setMessage('No student ID found. Please register first.');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!studentId) {
      setMessage('Student ID not found.');
      return;
    }

    // const payload = {
    //   student_id: studentId,
    //   code,
    // };

    try {
      // await axios.post('https://placement-server.onrender.com/auth/confirm/', payload);
      // setMessage('Code confirmed! Redirecting to login...');
      
      // // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 1000);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.message || 'Code confirmation failed');
      } else {
        setMessage('Code confirmation failed');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Code Confirmation</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Confirmation Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {message && (
          <div className={`mb-4 text-center ${message.includes('confirmed') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600"
        >
          Confirm Code
        </button>
      </form>
    </div>
  );
};

export default CodeConfirmationPage;
