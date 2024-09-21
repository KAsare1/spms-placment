import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import uglogo from '../assets/ug.png';

const RegistrationPage: React.FC = () => {
  const [studentId, setStudentId] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);

  // const role = 'STUDENT'; // Hardcoded role
  const navigate = useNavigate(); // Use navigate for routing

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setMessage('Passwords do not match.');
      return;
    }

    // const payload = {
    //   student_id: studentId,
    //   email,
    //   password,
    //   password_confirm: passwordConfirm, // Include password_confirm in the payload
    //   role,
    // };

    try {
      // await axios.post('https://placement-server.onrender.com/auth/register/', payload);
      // setMessage('Registration successful! Please check your email for confirmation.');
      
      // // Store the student_id in localStorage
      // localStorage.setItem('student_id', studentId);

      // // Redirect to the code confirmation page
      navigate('/confirm-code');
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.message || 'Registration failed');
      } else {
        setMessage('Registration failed');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <div className="mb-4 flex justify-center">
          <img src={uglogo} alt="University Logo" className="h-16" />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

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
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {message && (
          <div className={`mb-4 text-center ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
        <p className="mt-4 text-center">
            Already have an account? <Link to="/login" className="text-blue-500">Login here</Link>
            </p>
      </form>
    </div>
  );
};

export default RegistrationPage;
