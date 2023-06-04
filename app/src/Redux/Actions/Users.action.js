import { createAction } from "@reduxjs/toolkit";
import {
  axiosDeleteUtils,
  axiosGetUtils,
  axiosPostUtils,
  axiosPutUtils,
} from "../../axios/axios.utils";
import { API_URLS } from "../../ApiUrl/ApiUrls";

export const userStateStateChange = createAction("USER_DATA_CHANGE", (data) => {
  return {
    payload: data,
  };
});

export const getUsersById = (id) => async (dispatch) => {
  try {
    userStateStateChange({ isDataLoading: true });
    const response = await axiosGetUtils(
      API_URLS.GET_ALL_USERS,
      { id }
    );
    dispatch(
      userStateStateChange({ isDataLoading: false, usersList: response })
    );
    console.log("response", response);
  } catch (error) {
    console.log("error");
  }
};

export const updateUser = (data, callback) => async (dispatch) => {
  try {
    userStateStateChange({ isDataLoading: true });
    const response = await axiosPutUtils(
      API_URLS.UPDATE_USER_DETAILS_BY_ID,
      data
    );
    dispatch(
      userStateStateChange({ isDataLoading: false, usersList: response })
    );
    callback();
    return response;
  } catch (error) {
    console.log("error");
    throw error;
  }
};
export const newUser = (data, callback) => async (dispatch) => {
  try {
    userStateStateChange({ isDataLoading: true });
    const response = await axiosPostUtils(
      API_URLS.CREATE_USER,
      data
    );
    dispatch(
      userStateStateChange({ isDataLoading: false, usersList: response })
    );
    callback();
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = (id, callback) => async (dispatch) => {
  try {
    userStateStateChange({ isDataLoading: true });
    const response = await axiosDeleteUtils(
      API_URLS.DELETE_USER_BY_ID,
      { id }
    );
    dispatch(
      userStateStateChange({ isDataLoading: false, usersList: response })
    );
    callback();
    return response;
  } catch (error) {
    console.log("error");
  }
};
