import api from './client'

export async function register({ username, email, password, is_agent }) {
  const res = await api.post('/api/users/register/', { username, email, password, is_agent })
  return res.data
}

export async function login({ username, password }) {
  const res = await api.post('/api/token/', { username, password })
  const { access, refresh } = res.data
  localStorage.setItem('access', access)
  localStorage.setItem('refresh', refresh)
  localStorage.setItem('username', username)
  return res.data
}

export function logout() {
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
  localStorage.removeItem('username')
}

export function isAuthed() {
  return !!localStorage.getItem('access')
}
