import { Axios } from "axios";

//create an instance of axios with the base URL and headers
const api = new Axios({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});



export default api;