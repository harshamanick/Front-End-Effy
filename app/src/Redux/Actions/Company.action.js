import { createAction } from "@reduxjs/toolkit";
import {
  axiosDeleteUtils,
  axiosGetUtils,
  axiosPostUtils,
  axiosPutUtils,
} from "../../axios/axios.utils";

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
      "http://localhost:3000/api/company/get_all_companies"
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
      "http://localhost:3000/api/company/details_by_id",
      { id }
    );
    console.log("zzzzz", response);
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

export const updateCompay = (data) => async (dispatch) => {
  try {
    companyStateChange({ isDataLoading: true });
    const response = await axiosPutUtils(
      "http://localhost:3000/api/company/update_company",
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
        "http://localhost:3000/api/company/new_company",
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
      "http://localhost:3000/api/company/delete_company",
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
