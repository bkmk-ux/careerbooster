import axios from "axios";

const API = axios.create({
  baseURL: "http://10.229.105.37:5000/api/users"
});

export default API;