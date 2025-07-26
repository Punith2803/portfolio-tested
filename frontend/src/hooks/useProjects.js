import { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API}/projects`);
      setProjects(response.data);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err.response?.data?.detail || 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API}/projects/categories`);
      setCategories(['All', ...response.data.categories]);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setCategories(['All']); // fallback
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchCategories();
  }, []);

  const createProject = async (projectData) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API}/projects`, projectData);
      setProjects(prev => [response.data, ...prev]);
      return response.data;
    } catch (err) {
      console.error('Error creating project:', err);
      setError(err.response?.data?.detail || 'Failed to create project');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    projects,
    categories,
    loading,
    error,
    refetch: fetchProjects,
    createProject
  };
};