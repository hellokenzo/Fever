import axios from 'axios'

const API_URL = 'http://localhost:3000/api' // Remplacez par l'URL de votre API

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const login = async (credentials) => {
  const response = await api.post('/login', credentials)
  return response.data
}

export const register = async (userData) => {
  const response = await api.post('/register', userData)
  return response.data
}

export const logout = async () => {
  const response = await api.post('/logout')
  return response.data
}

export const getUserProfile = async () => {
  const response = await api.get('/profile')
  return response.data
}

export default api