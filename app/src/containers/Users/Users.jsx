import React, { useEffect } from "react";
import UserCard from "../UserCard/UserCard";
import { useDispatch, useSelector } from "react-redux";
import { getUsersById } from "../../Redux/Actions/Users.action";
import cx from "classnames";
import styles from "./Users.module.scss";
import gClasses from "../../Common.module.scss";
export default function Users() {
  const companyState = useSelector((state) => state.companies);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.users);
  const data = state.usersList;
  useEffect(() => {
    dispatch(getUsersById(companyState?.selectedCompanyId));
  }, []);
  const usersList = data?.map((eachItemData) => {
    return <UserCard data={eachItemData} />;
  });
  return (
    <div className={cx(styles.MainContainer)}>
      {usersList?.length === 0 ? (
        <div className={cx(gClasses.NoData)}> No Users Found </div>
      ) : (
        usersList
      )}
    </div>
  );
}
