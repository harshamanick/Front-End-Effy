import { createAction } from "@reduxjs/toolkit";
import {
  axiosDeleteUtils,
  axiosGetUtils,
  axiosPostUtils,
  axiosPutUtils,
} from "../../axios/axios.utils";

export const userStateStateChange = createAction("USER_DATA_CHANGE", (data) => {
  return {
    payload: data,
  };
});

export const getUsersById = (id) => async (dispatch) => {
  try {
    userStateStateChange({ isDataLoading: true });
    const response = await axiosGetUtils(
      "http://localhost:3000/api/user/get_all_users_by_id",
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
      "http://localhost:3000/api/user/update_user",
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
  console.log("ddddd", data);
  try {
    userStateStateChange({ isDataLoading: true });
    const response = await axiosPostUtils(
      "http://localhost:3000/api/user/new_user",
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
      "http://localhost:3000/api/user/delete_user",
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
