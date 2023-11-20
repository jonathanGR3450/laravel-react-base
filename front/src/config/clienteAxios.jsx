import axios from "axios";

const clienteAxios = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL_FIRST}`,
});
export default clienteAxios;
