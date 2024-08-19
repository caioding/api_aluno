import axios from "axios";

const mockapi = axios.create({
  baseURL: "http://localhost:3355",
});

export default mockapi;
