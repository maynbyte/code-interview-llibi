import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const nameService = {
  // Get all names
  getAllNames: async () => {
    try {
      const response = await api.get("/names");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create new name
  createName: async (data) => {
    try {
      const response = await api.post("/names", data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update name
  updateName: async (id, data) => {
    try {
      const response = await api.put(`/names/${id}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete name
  deleteName: async (id) => {
    try {
      const response = await api.delete(`/names/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default api;
