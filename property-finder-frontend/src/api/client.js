import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://realestate-dub.onrender.com',
  withCredentials: false
})

// Attach token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

// Attempt refresh on 401
let refreshing = false
let queue = []

const processQueue = (error, token = null) => {
  queue.forEach(p => error ? p.reject(error) : p.resolve(token))
  queue = []
}

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config
    if (error.response && error.response.status === 401 && !original._retry) {
      if (refreshing) {
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject })
        }).then((token) => {
          original.headers['Authorization'] = 'Bearer ' + token
          return api.request(original)
        })
      }
      original._retry = true
    }
    return Promise.reject(error)
  }
)

export default api
