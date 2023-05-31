import axios from "axios";
export const axiosGetUtils = async (relativePath, param) => {
  const axiosGetParam = {
    params: param,
  };
  try {
    const response = await axios.get(relativePath, axiosGetParam);
    return response?.data;
  } catch (error) {
    console.log("AXIOS-ERROR", error);
  }
};
export const axiosPostUtils = async (relativePath, requestBody) => {
  try {
    const response = await axios.post(relativePath, requestBody);
    return response?.data;
  } catch (error) {
    console.log("AXIOS-ERROR", error);
  }
};

export const axiosPutUtils = async (relativePath, requestBody) => {
  try {
    const response = await axios.put(relativePath, requestBody);
    return response?.data;
  } catch (error) {
    console.log("AXIOS-ERROR", error);
  }
};
export const axiosDeleteUtils = async (relativePath, param) => {
  const axiosDeleteParam = {
    params: param,
  };
  try {
    const response = await axios.delete(relativePath, axiosDeleteParam);
    return response?.data;
  } catch (error) {
    console.log("AXIOS-ERROR", error);
  }
};
