import axios from "axios";


// create an instance of axios with the base URL and headers
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

//add a request interceptor for authentication 
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      
    }
    return config;
  },
  (error) => {
    return Promise.reject(error)
  }
);

// add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const requestUrl = error?.config?.url || '';
    const isLoginRequest = requestUrl.includes('/auth/student/login') || requestUrl.includes('/auth/tutor/login');
    const isAlreadyOnLoginPage = window.location.pathname.includes('/auth/student/login');

    if (status === 401 && !isLoginRequest && !isAlreadyOnLoginPage) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.assign('/auth/student/login')
    }
    return Promise.reject(error)
  }
);

export const StudentAuth = {
  register: async (userData: any) => {
    const response = await api.post('/auth/student/register', userData)
    return response.data;
  },
  login: async (credentials: any) => {
    const response = await api.post('/auth/student/login', credentials)
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user))
    }
    return response.data;
  },

  //logout user 
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  getCurrentStudent: () => {
    const student = localStorage.getItem('user')
    return student ? JSON.parse(student) : null

  },

  verifyEmail: async (email: string) => {
    const response = await api.post("/auth/student/verify-email", { email });
    return response.data;
  }
}


export default api;