import React, { useEffect } from "react";
import { Card } from "antd";
import Button from "@mui/material/Button";
import { useState } from "react";
import cx from "classnames";
import gClasses from "../../Common.module.scss";
import CompanyForm from "../FormContent/CompanyForm/CompanyForm";
import EditIcon from "../../Icons/EditIcon";
import UserForm from "../FormContent/UserForm/UserForm";
import Users from "../Users/Users";
import ModalView from "../../Components/Modal/Modal";
import {
  companyStateChange,
  getCompanyDetails,
  updateCompany,
} from "../../Redux/Actions/Company.action";
import { useDispatch, useSelector } from "react-redux";
import {
  COMPANY_DETAIL,
  SELECTED_USER_INITIAL,
  USER_DETAIL,
} from "../../CommonStrings/CommonString";
import { cloneDeep, isEmpty } from "lodash";
import {
  newUser,
  userStateStateChange,
} from "../../Redux/Actions/Users.action";
import {
  validateCompany,
  validateUser,
} from "../../Validations/Validation.Schema";
import CloseIcon from "../../Icons/CloseIcon";
import Location from "../Location/Location";

export default function DetailsPage(props) {
  const { onCloseClick } = props;
  const dispatch = useDispatch();
  const [isCompanyEdit, setIsCompanyEdit] = useState(false);
  const [isModalOpen, setIsModelOpen] = useState(false);
  const state = useSelector((state) => state.companies);
  const data = state?.selectedCompany;
  const userState = useSelector((state) => state.users);
  const userData = userState?.newUser;

  // This onDataChange function handle the company from  data change.
  const onDataChange = (value, type) => {
    let updatedData;
    switch (type) {
      case COMPANY_DETAIL.COMPANY_NAME:
        updatedData = {
          ...state.selectedCompany,
          company_name: value,
        };
        break;
      case COMPANY_DETAIL.ADD_1:
        updatedData = {
          ...state.selectedCompany,
          company_address_1: value,
        };
        break;
      case COMPANY_DETAIL.ADD_2:
        updatedData = {
          ...state.selectedCompany,
          company_address_2: value,
        };
        break;
      case COMPANY_DETAIL.PINCODE:
        updatedData = {
          ...state.selectedCompany,
          pincode: value,
        };
        break;
      default:
        return;
    }
    if (!isEmpty(state?.companyErrorList)) {
      const errorList = validateCompany(updatedData);
      dispatch(companyStateChange({ companyErrorList: errorList }));
    }
    dispatch(companyStateChange({ selectedCompany: updatedData }));
  };

  // This onUserDataChange function handle the user from  data change.

  const onUserDataChange = (value, type) => {
    let updatedData;
    switch (type) {
      case USER_DETAIL.FIRST_NAME:
        updatedData = {
          ...userState.newUser,
          first_name: value,
        };
        break;
      case USER_DETAIL.LAST_NAME:
        updatedData = {
          ...userState.newUser,
          last_name: value,
        };
        break;
      case USER_DETAIL.DOB:
        updatedData = {
          ...userState.newUser,
          dob: value,
        };
        break;
      case USER_DETAIL.DESIGNATION:
        updatedData = {
          ...userState.newUser,
          designation: value,
        };
        break;
      case USER_DETAIL.EMAIL:
        updatedData = {
          ...userState.newUser,
          email: value,
        };
        break;
      default:
        return;
    }
    if (!isEmpty(userState?.newUserErrorList)) {
      const errorList = validateUser(updatedData);
      dispatch(userStateStateChange({ newUserErrorList: errorList }));
    }
    dispatch(userStateStateChange({ newUser: updatedData }));
  };
  const { companyId } = props;
  useEffect(() => {
    dispatch(getCompanyDetails(companyId));
  }, []);
  let mainContent = null;
  const tabListNoTitle = [
    {
      key: "Details",
      tab: "Details",
    },
    {
      key: "Users",
      tab: "Users",
    },
    {
      key: "Location",
      tab: "Location",
    },
  ];
  const [activeTabKey2, setActiveTabKey2] = useState("Details");
  const onTab2Change = (key) => {
    setActiveTabKey2(key);
  };
  mainContent = (
    <UserForm
      isEdit
      onChange={onUserDataChange}
      data={userData}
      errorList={userState?.newUserErrorList}
    />
  );
  return (
    <>
      <Card
        style={{
          width: "100%",
          height: "100%",
        }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey2}
        tabBarExtraContent={
          <div
            className={cx(
              gClasses.Dflex,
              gClasses.AlignItemCenter,
              gClasses.Gap10
            )}
          >
            {(isCompanyEdit || activeTabKey2 !== "Details") && (
              <div className={cx(gClasses.Dflex, gClasses.Gap5)}>
                {activeTabKey2 === "Details" && (
                  <Button
                    variant="outlined"
                    onClick={() => {
                      dispatch(
                        companyStateChange({
                          companyErrorList: {},
                          selectedCompany: state?.companyResponse,
                        })
                      );
                      setIsCompanyEdit(false);
                    }}
                  >
                    Cancel
                  </Button>
                )}
                {activeTabKey2 !== "Location" && (
                  <Button
                    variant="contained"
                    onClick={() => {
                      activeTabKey2 !== "Details" && setIsModelOpen(true);
                      if (activeTabKey2 === "Details") {
                        let temp = cloneDeep(state?.selectedCompany);
                        delete temp.__v;
                        const errorList = validateCompany(temp);
                        if (isEmpty(errorList)) {
                          dispatch(updateCompany(temp));
                          dispatch(
                            companyStateChange({ companyErrorList: {} })
                          );
                          setIsCompanyEdit(false);
                        } else {
                          dispatch(
                            companyStateChange({ companyErrorList: errorList })
                          );
                        }
                      }
                    }}
                  >
                    {activeTabKey2 === "Details" ? "Update" : "Add User"}
                  </Button>
                )}
              </div>
            )}
            {activeTabKey2 === "Details" && !isCompanyEdit && (
              <div
                onClick={() => {
                  setIsCompanyEdit(true);
                }}
                className={cx(gClasses.ML5, gClasses.CursorPointer)}
              >
                <EditIcon />
              </div>
            )}
            <div onClick={onCloseClick} className={gClasses.CursorPointer}>
              {" "}
              <CloseIcon />
            </div>
          </div>
        }
        onTabChange={onTab2Change}
      >
        {/* {contentListNoTitle[activeTabKey2]} */}
        {activeTabKey2 === "Details" && (
          <CompanyForm
            onDataChange={onDataChange}
            data={data}
            isEdit={isCompanyEdit}
            errorList={state?.companyErrorList}
          />
        )}
        {activeTabKey2 === "Users" && <Users />}
        {activeTabKey2 === "Location" && <Location />}
      </Card>
      <ModalView
        mainContent={mainContent}
        isModelOpen={isModalOpen}
        onCancelClick={() => {
          setIsModelOpen(false);
          dispatch(userStateStateChange({ newUser: SELECTED_USER_INITIAL }));
          dispatch(userStateStateChange({ newUserErrorList: {} }));
        }}
        onCreateClick={async () => {
          let temp = cloneDeep(userState?.newUser);
          temp.company_id = state.selectedCompanyId;
          delete temp.__v;
          const errorList = validateUser(temp);
          if (isEmpty(errorList)) {
            try {
              await dispatch(
                newUser(temp, () => {
                  setIsModelOpen(false);
                })
              );
              dispatch(
                userStateStateChange({
                  newUserErrorList: {},
                  newUser: SELECTED_USER_INITIAL,
                })
              );
            } catch (error) {
              dispatch(
                companyStateChange({
                  isServerErrorMessage: error?.response?.data,
                  isServerError: true,
                })
              );
            }
          } else {
            dispatch(userStateStateChange({ newUserErrorList: errorList }));
          }
        }}
        title="User Details"
      />
    </>
  );
}
