import Axios from 'axios'

const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000,
})

axios.interceptors.response.use((response) => {
  if (response.status === 200) return response.data
  return response
})

export default axios
