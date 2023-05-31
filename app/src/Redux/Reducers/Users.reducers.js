const initialState = {
    usersList:[],
    selectedUser:{},
    isDataLoading: false,
    newUser:{
        first_name: '',
        last_name: '',
        email: '',
        designation: '',
        dob: '',
        is_active: true,
    },
    userErrorList:{},
    newUserErrorList:{},
  };
  const UsersReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'USER_DATA_CHANGE':
        return {
          ...state,
          ...action.payload,
        };
      case 'SET_LOADER':
        return {
          ...state,
          isDataLoading: action.payload,
        };
      default:
        return state;
    }
  };

  export default UsersReducer ;