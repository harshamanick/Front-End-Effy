import { createAction } from "@reduxjs/toolkit";
import {
  axiosDeleteUtils,
  axiosGetUtils,
  axiosPostUtils,
  axiosPutUtils,
} from "../../axios/axios.utils";
import { API_URLS } from "../../ApiUrl/ApiUrls";

export const companyStateChange = createAction(
  "COMPANY_STATE_CHANGE",
  (data) => {
    return {
      payload: data,
    };
  }
);

export const getCompanies = (data) => async (dispatch) => {
  try {
    companyStateChange({ isDataLoading: true });
    const response = await axiosGetUtils(
      API_URLS.GET_ALL_COMPANIES
    );
    dispatch(
      companyStateChange({ isDataLoading: false, companyList: response })
    );
    console.log("response", response);
  } catch (error) {
    console.log("error");
  }
};
export const getCompanyDetails = (id) => async (dispatch) => {
  try {
    companyStateChange({ isDataLoading: true });
    const response = await axiosGetUtils(
      API_URLS.GET_COMPANY_DETAILS_BY_ID,
      { id }
    );
    dispatch(
      companyStateChange({
        isDataLoading: false,
        selectedCompany: response[0],
        companyResponse: response[0],
      })
    );
    return response;
  } catch (error) {
    console.log("error");
  }
};

export const updateCompany = (data) => async (dispatch) => {
  try {
    companyStateChange({ isDataLoading: true });
    const response = await axiosPutUtils(
      API_URLS.UPDATE_COMPANY_DETAILS_BY_ID,
      data
    );
    dispatch(
      companyStateChange({
        isDataLoading: false,
        selectedCompany: response,
        companyResponse: response,
      })
    );
    return response;
  } catch (error) {
    console.log("error");
  }
};

export const createCompany =
  (data, callback = () => {}) =>
  async (dispatch) => {
    try {
      companyStateChange({ isDataLoading: true });
      const response = await axiosPostUtils(
        API_URLS.CREATE_COMPANY,
        data
      );
      dispatch(
        companyStateChange({ isDataLoading: false, companyList: response })
      );
      callback();
      return response;
    } catch (error) {
      throw new Error(error);
    }
  };

export const deleteCompany = (id, callback) => async (dispatch) => {
  try {
    companyStateChange({ isDataLoading: true });
    const response = await axiosDeleteUtils(
      API_URLS.DELETE_COMPANY_BY_ID,
      { id }
    );
    dispatch(
      companyStateChange({ isDataLoading: false, companyList: response })
    );
    callback();
    return response;
  } catch (error) {
    console.log("error");
  }
};
