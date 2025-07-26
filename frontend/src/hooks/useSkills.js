import { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const useSkills = () => {
  const [skills, setSkills] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API}/skills`);
      setSkills(response.data);
    } catch (err) {
      console.error('Error fetching skills:', err);
      setError(err.response?.data?.detail || 'Failed to fetch skills');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const updateSkills = async (skillsData) => {
    try {
      setLoading(true);
      const response = await axios.put(`${API}/skills`, skillsData);
      setSkills(response.data);
      return response.data;
    } catch (err) {
      console.error('Error updating skills:', err);
      setError(err.response?.data?.detail || 'Failed to update skills');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    skills,
    loading,
    error,
    refetch: fetchSkills,
    updateSkills
  };
};