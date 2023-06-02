import React, { useState } from "react";
import cx from "classnames";
import styles from "./LandingPage.module.scss";
import Header from "./Header/Header";
import Companies from "./Companies/Companies";
import DetailsPage from "../DetailsPage/DetailsPage";
import ModalView from "../../Components/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  companyStateChange,
  createCompany,
} from "../../Redux/Actions/Company.action";
import { Button } from "@mui/material";
import CompanyForm from "../FormContent/CompanyForm/CompanyForm";
import { COMPANY_DETAIL, NEW_COMPANY } from "../../CommonStrings/CommonString";
import { cloneDeep, isEmpty } from "lodash";
import gClasses from "../../Common.module.scss";
import { validateNewCompany } from "../../Validations/Validation.Schema";
import ServerErrorPopup from "../ServerErrorPopup/ServerErrorPopup";
export default function LandingPage() {
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(false);
  const state = useSelector((state) => state.companies);
  const [isCreateModaOpen, setIsCreateModalOpen] = useState(false);
  const onDataChange = (value, type) => {
    let updatedData;
    switch (type) {
      case COMPANY_DETAIL.COMPANY_NAME:
        updatedData = {
          ...state.newCompany,
          company_name: value,
        };
        break;
      case COMPANY_DETAIL.ADD_1:
        updatedData = {
          ...state.newCompany,
          company_address_1: value,
        };
        break;
      case COMPANY_DETAIL.ADD_2:
        updatedData = {
          ...state.newCompany,
          company_address_2: value,
        };
        break;
      case COMPANY_DETAIL.PINCODE:
        updatedData = {
          ...state.newCompany,
          pincode: value,
        };
        break;
      default:
        return;
    }
    if (!isEmpty(state?.newCompanyErrorList)) {
      const errorList = validateNewCompany(updatedData);
      dispatch(companyStateChange({ newCompanyErrorList: errorList }));
    }
    dispatch(companyStateChange({ newCompany: updatedData }));
  };
  let mainContent = (
    <CompanyForm
      data={state?.newCompany}
      onDataChange={onDataChange}
      isEdit
      errorList={state?.newCompanyErrorList}
    />
  );
  return (
    <div className={cx(styles.MainContainer)}>
      {state?.isServerError && <ServerErrorPopup />}
      <Header />

      <div
        className={cx(
          gClasses.Dflex,
          gClasses.JustifyContentBetween,
          styles.Body
        )}
      >
        <div className={styles.Title}>
          {showDetails
            ? `${state?.companyResponse?.company_name}`
            : "Company List"}
        </div>
        <Button
          variant="contained"
          onClick={() => {
            setIsCreateModalOpen(true);
          }}
        >
          Create Company
        </Button>
      </div>
      <div className={cx(styles.Body)}>
        {showDetails ? (
          <DetailsPage
            onCloseClick={() => {
              setShowDetails(false);
            }}
            companyId={state?.selectedCompanyId}
          />
        ) : (
          <Companies
            onRowClick={(id) => {
              dispatch(companyStateChange({ selectedCompanyId: id }));
              setShowDetails(true);
            }}
          />
        )}
        <ModalView
          mainContent={mainContent}
          isModelOpen={isCreateModaOpen}
          onCancelClick={() => {
            setIsCreateModalOpen(false);
            dispatch(companyStateChange({ newCompany: NEW_COMPANY }));
            dispatch(companyStateChange({ newCompanyErrorList: {} }));
          }}
          onCreateClick={() => {
            let temp = cloneDeep(state?.newCompany);
            const errorList = validateNewCompany(temp);
            if (isEmpty(errorList)) {
              try {
                dispatch(createCompany(temp));
                dispatch(
                  companyStateChange({
                    newCompanyErrorList: {},
                    newCompany: NEW_COMPANY,
                  })
                );
                setIsCreateModalOpen(false);
              } catch (error) {}
            } else {
              dispatch(companyStateChange({ newCompanyErrorList: errorList }));
            }
          }}
          title="Company Details"
        />
      </div>
    </div>
  );
}
