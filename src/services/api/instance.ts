import axios from "axios";
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const MAIN_API_URL = `${publicRuntimeConfig.apiUrl}/`;

export const mainApi = axios.create({
  baseURL: MAIN_API_URL
});
