import axios from "axios";

const config = require('../../../config.json')

export const MAIN_API_URL = `${config.apiUrl}/`;

export const mainApi = axios.create({
  baseURL: MAIN_API_URL
});
