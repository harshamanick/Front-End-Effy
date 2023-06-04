import React, { useEffect, useState } from "react";
import { Card } from "antd";
import UserForm from "../FormContent/UserForm/UserForm";
import EditIcon from "../../Icons/EditIcon";
import { Button } from "@mui/material";
import { USER_DETAIL } from "../../CommonStrings/CommonString";
import { cloneDeep, isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  updateUser,
  userStateStateChange,
} from "../../Redux/Actions/Users.action";
import gClasses from "../../Common.module.scss";
import cx from "classnames";
import { validateUser } from "../../Validations/Validation.Schema";
import DeleteIcon from "../../Icons/DeleteIcon";
import { companyStateChange } from "../../Redux/Actions/Company.action";

export default function UserCard(props) {
  const { data } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [currentData, setCurrentData] = useState(data);
  const [initialData, setInitialData] = useState({});
  const state = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    setCurrentData(data);
    setInitialData(data);
  }, [data]);
  const onUserDataChange = (value, type) => {
    let updatedData;
    switch (type) {
      case USER_DETAIL.FIRST_NAME:
        updatedData = {
          ...currentData,
          first_name: value,
        };
        break;
      case USER_DETAIL.LAST_NAME:
        updatedData = {
          ...currentData,
          last_name: value,
        };
        break;
      case USER_DETAIL.DOB:
        updatedData = {
          ...currentData,
          dob: value,
        };
        break;
      case USER_DETAIL.DESIGNATION:
        updatedData = {
          ...currentData,
          designation: value,
        };
        break;
      case USER_DETAIL.EMAIL:
        updatedData = {
          ...currentData,
          email: value,
        };
        break;
      case USER_DETAIL.MIGRATE:
        updatedData = {
          ...currentData,
          migrate_id: value,
        };
        break;
      default:
        return;
    }
    if (!isEmpty(state?.userErrorList)) {
      const errorList = validateUser(updatedData);
      dispatch(userStateStateChange({ userErrorList: errorList }));
    }
    setCurrentData(updatedData);
  };
  const onDeleteClickHandler = (id) => {
    dispatch(
      deleteUser(id, () => {
        setIsEdit(false);
      })
    );
  };
  const updateUserHandler = async () => {
    let temp = cloneDeep(currentData);
    delete temp.__v;
    const errorList = validateUser(temp);
    if (isEmpty(errorList)) {
      try {
        await dispatch(
          updateUser(temp, () => {
            setIsEdit(false);
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
      dispatch(userStateStateChange({ userErrorList: {} }));
    } else {
      dispatch(userStateStateChange({ userErrorList: errorList }));
    }
  };
  return (
    <Card
      style={{ marginTop: 16 }}
      type="inner"
      title={`${data?.first_name + " " + data?.last_name}`}
      extra={
        !isEdit ? (
          <div
            className={cx(
              gClasses.Dflex,
              gClasses.Gap10,
              gClasses.AlignItemCenter
            )}
          >
            <div
              onClick={() => {
                setIsEdit(true);
              }}
              className={gClasses.CursorPointer}
            >
              {" "}
              <EditIcon />{" "}
            </div>
            <div
              onClick={() => {
                onDeleteClickHandler(data?._id);
              }}
              className={gClasses.CursorPointer}
            >
              <DeleteIcon />
            </div>
          </div>
        ) : (
          <div
            className={cx(
              gClasses.Dflex,
              gClasses.Gap5,
              gClasses.AlignItemCenter
            )}
          >
            <Button
              variant="outlined"
              onClick={() => {
                setCurrentData(initialData);
                setIsEdit(false);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                updateUserHandler();
              }}
            >
              Update
            </Button>
          </div>
        )
      }
    >
      <UserForm
        data={currentData}
        isEdit={isEdit}
        onChange={onUserDataChange}
        errorList={state?.userErrorList}
        isShowMigrate
      />
    </Card>
  );
}
