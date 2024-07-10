import axios from 'axios';

const API_URL = "http://14.225.255.42:5000";

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/users/login`, credentials);
  return response.data;
};

export const logout = async (token) => {
  try {
    const response = await axios.post(
      `${API_URL}/users/me/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const axiosInstance = axios.create({
  baseURL: `${API_URL}`, // Adjust baseURL as needed
  timeout: 10000, // Adjust timeout as needed
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers needed (e.g., Authorization)
  },
});



