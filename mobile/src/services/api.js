import axios from "axios";

const API = axios.create({
  baseURL: "http://172.19.120.37:5000"
});

export default API;