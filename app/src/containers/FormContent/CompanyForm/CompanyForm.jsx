import React from "react";
import gClasses from "../../../Common.module.scss";
import cx from "classnames";
import styles from "./CompanyForm.module.scss";
import Input from "../../../Components/Iput/Input";
import { COMPANY_DETAIL, COMPANY_FIELD } from "../../../CommonStrings/CommonString";
import { isEmpty } from "lodash";

export default function CompanyForm(props) {
    const { onDataChange, data, isEdit, errorList, } = props;
  return (
    <div className={cx(styles.MainContainer)}>
      <div className={cx(gClasses.W400)}>
        <Input
          onChange={(event) => {
            onDataChange(event?.target?.value, COMPANY_DETAIL.COMPANY_NAME)
          }}
          label="Company Name"
          value={data?.company_name}
          isRequired
          readOnly={!isEdit}
          error = {!isEmpty(errorList?.[COMPANY_FIELD?.COMPANY_NAME])}
          helperText = {errorList?.[COMPANY_FIELD?.COMPANY_NAME]}
        />
        <div className={cx(gClasses.MT30)}>
          <Input
            onChange={(event) => {
              onDataChange(event?.target?.value, COMPANY_DETAIL.ADD_1)
            }}
            label="Address"
            value={data?.company_address_1}
            isRequired
            readOnly={!isEdit}
            error = {!isEmpty(errorList?.[COMPANY_FIELD?.ADD_1])}
            helperText = {errorList?.[COMPANY_FIELD?.ADD_1]}
          />
        </div>
        <div className={cx(gClasses.MT30)}>
          <Input
            onChange={(event) => {
              onDataChange(event?.target?.value, COMPANY_DETAIL.ADD_2)
            }}
            label="Country"
            value={data?.company_address_2}
            isRequired
            readOnly={!isEdit}
            error = {!isEmpty(errorList?.[COMPANY_FIELD?.ADD_2])}
            helperText = {errorList?.[COMPANY_FIELD?.ADD_2]}
          />
        </div>
        <div className={cx(gClasses.MT30)}>
          <Input
            onChange={(event) => {
              onDataChange(event?.target?.value, COMPANY_DETAIL.PINCODE)
            }}
            label="Pincode"
            value={data?.pincode}
            isRequired
            readOnly={!isEdit}
            error = {!isEmpty(errorList?.[COMPANY_FIELD?.PINCODE])}
            helperText = {errorList?.[COMPANY_FIELD?.PINCODE]}
          />
        </div>
      </div>
    </div>
  );
}
