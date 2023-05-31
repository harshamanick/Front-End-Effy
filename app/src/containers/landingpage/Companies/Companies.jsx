import React, { useEffect } from "react";
import ListItem from "../ListItem/ListItem";
import styles from "./Company.module.scss";
import cx from "classnames";
import gClasses from "../../../Common.module.scss";
import {
  deleteCompany,
  getCompanies,
} from "../../../Redux/Actions/Company.action";
import { useDispatch, useSelector } from "react-redux";

export default function Companies(props) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.companies);
  useEffect(() => {
    dispatch(getCompanies());
  }, []);
  const { onRowClick } = props;
  const onDeleteClick = (id) => {
    dispatch(deleteCompany(id));
  };
  return (
    <div>
      <div className={cx(styles.Header)}>
        <div className={styles.Dflex}>
          <div
            className={cx(
              gClasses.Name,
              gClasses.MR10,
              gClasses.ML15,
              gClasses.FontWeight
            )}
          >
            Company Name
          </div>
          <div className={cx(gClasses.Name, gClasses.FontWeight)}>Location</div>
        </div>
      </div>
      <div>
        {state?.companyList.map((data) => (
          <ListItem
            onRowClick={onRowClick}
            onDeleteClick={onDeleteClick}
            data={data}
          />
        ))}
      </div>
    </div>
  );
}
