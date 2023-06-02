const initialState = {
  companyList: [],
  isDataLoading: false,
  counter: 0,
  selectedCompany: {},
  selectedCompanyId: "",
  newCompany: {
    company_name: "",
    company_address_1: "",
    company_address_2: "",
    pincode: "",
  },
  newCompanyErrorList: {},
  companyErrorList: {},
  companyResponse: {},
  isServerError: false,
  isServerErrorMessage: " ",
};
const CompanyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "COMPANY_STATE_CHANGE":
      return {
        ...state,
        ...action.payload,
      };
    case "SET_LOADER":
      return {
        ...state,
        isDataLoading: action.payload,
      };
    default:
      return state;
  }
};

export default CompanyReducer;
