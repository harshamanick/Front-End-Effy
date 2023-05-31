import axios from "axios";

// This function will handle the get request.
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

// This function will handle the post request.

export const axiosPostUtils = async (relativePath, requestBody) => {
  try {
    const response = await axios.post(relativePath, requestBody);
    return response?.data;
  } catch (error) {
    console.log("AXIOS-ERROR", error);
  }
};

// This function will handle the put request.

export const axiosPutUtils = async (relativePath, requestBody) => {
  try {
    const response = await axios.put(relativePath, requestBody);
    return response?.data;
  } catch (error) {
    console.log("AXIOS-ERROR", error);
  }
};

// This function will handle the Delete request.

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
