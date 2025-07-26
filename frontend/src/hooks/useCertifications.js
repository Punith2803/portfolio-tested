import { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const useCertifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCertifications = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API}/certifications`);
      setCertifications(response.data);
    } catch (err) {
      console.error('Error fetching certifications:', err);
      setError(err.response?.data?.detail || 'Failed to fetch certifications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertifications();
  }, []);

  const createCertification = async (certificationData) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API}/certifications`, certificationData);
      setCertifications(prev => [response.data, ...prev]);
      return response.data;
    } catch (err) {
      console.error('Error creating certification:', err);
      setError(err.response?.data?.detail || 'Failed to create certification');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    certifications,
    loading,
    error,
    refetch: fetchCertifications,
    createCertification
  };
};