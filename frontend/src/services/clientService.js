import axios from "axios";

const API_URL = "http://localhost:3000/clients";

export default {
  getClients() {
    return axios.get(API_URL);
  },

  getClient(id) {
    return axios.get(`${API_URL}/${id}`);
  },

  createClient(client) {
    return axios.post(API_URL, client);
  },

  updateClient(id, client) {
    return axios.put(`${API_URL}/${id}`, client);
  },

  deleteClient(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
};
