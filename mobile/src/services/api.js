import axios from "axios";

const API = axios.create({
  baseURL: "http://10.57.9.37:5000/api"
});

export default API;