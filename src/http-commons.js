import axios from "axios";

export const AXIOS = axios.create({
  baseURL: `http://localhost:8888/variamosweb`,
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
});
