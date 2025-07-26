import { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const useExperience = () => {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExperience = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API}/experience`);
      setExperience(response.data);
    } catch (err) {
      console.error('Error fetching experience:', err);
      setError(err.response?.data?.detail || 'Failed to fetch experience');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  const createExperience = async (experienceData) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API}/experience`, experienceData);
      setExperience(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      console.error('Error creating experience:', err);
      setError(err.response?.data?.detail || 'Failed to create experience');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    experience,
    loading,
    error,
    refetch: fetchExperience,
    createExperience
  };
};