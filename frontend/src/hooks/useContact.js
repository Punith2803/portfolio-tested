import { useState } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const useContact = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitContact = async (contactData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`${API}/contact`, contactData);
      return response.data;
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setError(err.response?.data?.detail || 'Failed to submit contact form');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    submitContact
  };
};