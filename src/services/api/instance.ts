import axios from "axios";

export const MAIN_API_URL = `${process.env.apiUrl}/`;

export const mainApi = axios.create({
  baseURL: MAIN_API_URL
});
