const BASE = '/api'

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    credentials: 'include',
    ...options,
    headers: {
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...(options.headers || {}),
    },
  })

  let data = null
  const text = await res.text()
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = null
    }
  }

  if (!res.ok) {
    throw new Error(data?.error || `Error ${res.status}`)
  }
  return data
}

export const api = {
  // Auth
  login: (username, password) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) }),
  logout: () => request('/auth/logout', { method: 'POST' }),
  me: () => request('/auth/me'),
  changePassword: (currentPassword, newPassword) =>
    request('/auth/password', { method: 'PUT', body: JSON.stringify({ currentPassword, newPassword }) }),

  // Content
  getContent: () => request('/content'),
  updateSection: (section, value) =>
    request(`/content/${section}`, { method: 'PUT', body: JSON.stringify(value) }),
  uploadImage: (file) => {
    const formData = new FormData()
    formData.append('image', file)
    return request('/content/image', { method: 'POST', body: formData })
  },

  // Events
  getEvents: () => request('/events'),
  createEvent: (formData) => request('/events', { method: 'POST', body: formData }),
  updateEvent: (id, formData) => request(`/events/${id}`, { method: 'PUT', body: formData }),
  deleteEvent: (id) => request(`/events/${id}`, { method: 'DELETE' }),
}
