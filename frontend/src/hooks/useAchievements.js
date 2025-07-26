import { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const useAchievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API}/achievements`);
      setAchievements(response.data);
    } catch (err) {
      console.error('Error fetching achievements:', err);
      setError(err.response?.data?.detail || 'Failed to fetch achievements');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const createAchievement = async (achievementData) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API}/achievements`, achievementData);
      setAchievements(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      console.error('Error creating achievement:', err);
      setError(err.response?.data?.detail || 'Failed to create achievement');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    achievements,
    loading,
    error,
    refetch: fetchAchievements,
    createAchievement
  };
};