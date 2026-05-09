import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "",
  timeout: 10000
});

const getErrorMessage = (error) => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  if (error?.code === "ECONNABORTED") {
    return "Request timed out. Please try again.";
  }

  if (error?.message === "Network Error") {
    return "Cannot reach the backend. Make sure it is running on port 5000.";
  }

  return "Something went wrong.";
};

export const searchByPincode = async (pin) => {
  try {
    const response = await api.get(`/api/pincode/${pin}`);
    return response.data.data || [];
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const searchByArea = async (name) => {
  try {
    const response = await api.get(`/api/area/${encodeURIComponent(name)}`);
    return response.data.data || [];
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
