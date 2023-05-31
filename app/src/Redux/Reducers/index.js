import { combineReducers } from "redux";
import CompanyReducer from "./Company.reducer";
import UsersReducer from "./Users.reducers";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  companies: CompanyReducer,
  users: UsersReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production", // Optional: Enable devTools only in non-production environments
});

export default store;
