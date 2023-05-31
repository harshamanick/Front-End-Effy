import React, { useState } from "react";
import Input from "../../../Components/Iput/Input";
import cx from "classnames";
import gClasses from "../../../Common.module.scss";
import { USERFIELD, USER_DETAIL } from "../../../CommonStrings/CommonString";
import { isEmpty } from "lodash";
import { FormControl, InputLabel, Select } from "@mui/material";
import { useSelector } from "react-redux";
import { getDropDownList } from "../../../JsUtilits/Utility";

export default function UserForm(props) {
  const state = useSelector((state) => state.companies);
  const [selectedCompany, setSelectedCompany] = useState("");
  const { onChange, data, isEdit, errorList, isShowMigrate } = props;
  return (
    <div className={cx(gClasses.W400)}>
      <div className={cx(gClasses.MT30)}>
        <div className={cx(gClasses.Dflex, gClasses.Gap10)}>
          <Input
            onChange={(event) => {
              onChange(event?.target?.value, USER_DETAIL.FIRST_NAME);
            }}
            label="First Name"
            value={data?.first_name}
            last_name
            isRequired
            readOnly={!isEdit}
            error={!isEmpty(errorList?.[USERFIELD?.FIRST_NAME])}
            helperText={errorList?.[USERFIELD?.FIRST_NAME]}
          />
          <Input
            onChange={(event) => {
              onChange(event?.target?.value, USER_DETAIL.LAST_NAME);
            }}
            label="Last Name"
            value={data?.last_name}
            isRequired
            readOnly={!isEdit}
            error={!isEmpty(errorList?.[USERFIELD?.LAST_NAME])}
            helperText={errorList?.[USERFIELD?.LAST_NAME]}
          />
        </div>
      </div>
      <div className={cx(gClasses.MT30)}>
        <Input
          onChange={(event) => {
            onChange(event?.target?.value, USER_DETAIL.EMAIL);
          }}
          label="Email"
          value={data?.email}
          isRequired
          readOnly={!isEdit}
          error={!isEmpty(errorList?.[USERFIELD?.EMAIL])}
          helperText={errorList?.[USERFIELD?.EMAIL]}
        />
      </div>
      <div className={cx(gClasses.MT30)}>
        <Input
          onChange={(event) => {
            onChange(event?.target?.value, USER_DETAIL.DESIGINATION);
          }}
          label="Designation"
          value={data?.designation}
          isRequired
          readOnly={!isEdit}
          error={!isEmpty(errorList?.[USERFIELD?.DESIGINATION])}
          helperText={errorList?.[USERFIELD?.DESIGINATION]}
        />
      </div>
      <div className={cx(gClasses.MT30)}>
        <Input
          onChange={(event) => {
            onChange(event?.target?.value, USER_DETAIL.DOB);
          }}
          label="Date of Birth"
          value={data?.dob}
          isRequired
          readOnly={!isEdit}
          error={!isEmpty(errorList?.[USERFIELD?.DOB])}
          helperText={errorList?.[USERFIELD?.DOB]}
        />
      </div>
      {isEdit && isShowMigrate && (
        <div className={cx(gClasses.MT30)}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Move</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedCompany}
              label="Age"
              onChange={(event) => {
                setSelectedCompany(event?.target?.value);
                onChange(event?.target?.value, USER_DETAIL.MIGRATE);
              }}
            >
              {getDropDownList(state?.companyList)}
            </Select>
          </FormControl>
        </div>
      )}
    </div>
  );
}
