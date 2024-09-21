import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import uglogo from '../assets/ug.png';


const LoginPage: React.FC = () => {
  const [studentId, setStudentId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      student_id: studentId,
      password: password,
    };

    try {
      const response = await axios.post('https://placement-server.onrender.com/auth/login/', payload);

      // Assuming the response contains a token after a successful login
      const { token } = response.data;

      // Store token in local storage (or session storage if desired)
      localStorage.setItem('token', token);

      // Redirect to dashboard or home page
      navigate('/choices');

    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || 'Login failed. Please try again.');
      } else {
        setErrorMessage('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-96" onSubmit={handleSubmit}>
      <div className="mb-4 flex justify-center">
          <img src={uglogo} alt="University Logo" className="h-16" />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {errorMessage && (
          <div className="mb-4 text-red-500 text-center">
            {errorMessage}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Student ID</label>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
        <p className="mt-4 text-center">
        Don't have an account? <Link to="/register" className="text-blue-500">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
