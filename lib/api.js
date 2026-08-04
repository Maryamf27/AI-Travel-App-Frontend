const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('travelai_token');
}

async function request(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    // e.g. 204 No Content
  }

  if (!res.ok) {
    const message = data?.message || `Request failed with status ${res.status}`;
    throw new Error(message);
  }

  return data;
}

export const authApi = {
  register: (payload) => request('/auth/register', { method: 'POST', body: payload }),
  login: (payload) => request('/auth/login', { method: 'POST', body: payload }),
  logout: () => request('/auth/logout', { method: 'POST', auth: true }),
  me: () => request('/auth/me', { auth: true }),
  updateMe: (payload) => request('/auth/me', { method: 'PUT', body: payload, auth: true }),
};


export const tripApi = {
  create: (payload) => request('/trips', { method: 'POST', body: payload, auth: true }),
  list: () => request('/trips', { auth: true }),
  getById: (id) => request(`/trips/${id}`, { auth: true }),
  remove: (id) => request(`/trips/${id}`, { method: 'DELETE', auth: true }),
};


export const recommendationApi = {
  createRecommendation: (payload) =>
    request("/recommendations", {
      method: "POST",
      body: payload,
      auth: true,
    }),

  getMyRecommendations: () =>
    request("/recommendations", {
      auth: true,
    }),

  getRecommendationById: (id) =>
    request(`/recommendations/${id}`, {
      auth: true,
    }),

  deleteRecommendation: (id) =>
    request(`/recommendations/${id}`, {
      method: "DELETE",
      auth: true,
    }),
};

export const hotelApi = {
  searchHotels: (payload) =>
    request('/hotels', {
      method: 'POST',
      body: payload,
      auth: true,
    }),

  getMyHotelSearches: () =>
    request('/hotels', {
      auth: true,
    }),

  getHotelSearchById: (id) =>
    request(`/hotels/${id}`, {
      auth: true,
    }),

  deleteHotelSearch: (id) =>
    request(`/hotels/${id}`, {
      method: 'DELETE',
      auth: true,
    }),
};

export const adminApi = {
  getStats: () => request('/admin/stats', { auth: true }),
  getUsers: (params = {}) => {
    const query = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v))
    ).toString();
    return request(`/admin/users${query ? `?${query}` : ''}`, { auth: true });
  },
  getUserById: (id) => request(`/admin/users/${id}`, { auth: true }),
  deleteUser: (id) => request(`/admin/users/${id}`, { method: 'DELETE', auth: true }),
};

export { getToken };
