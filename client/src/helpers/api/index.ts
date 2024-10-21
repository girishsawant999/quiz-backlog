import { API_BASE_URL } from "@/env";
import axios from "axios";

const apiInstance = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
});

export default apiInstance;
