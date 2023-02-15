import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API,
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    apiKey: process.env.VUE_APP_Token,
  },
});

const get = async (url, body) => {
  try {
    const data = await axiosInstance.get(url, body);
    return data.data;
  } catch (error) {
    handleError(error);
  }
};

const post = async (url, body, config) => {
  try {
    const data = await axiosInstance.post(url, body, config);
    return data.data;
  } catch (error) {
    handleError(error);
    return error.response;
  }
};

const put = async (url, body, config) => {
  try {
    const data = await axiosInstance.put(url, body, config);
    return data.data;
  } catch (error) {
    handleError(error);
  }
};

const remove = async (url, body) => {
  try {
    const data = await axiosInstance.delete(url, body);
    return data.data;
  } catch (error) {
    handleError(error);
  }
};

const handleError = (err) => {
  console.log(err);
  return err;
};

export default {
  get,
  post,
  put,
  remove,
  axiosInstance,
};
