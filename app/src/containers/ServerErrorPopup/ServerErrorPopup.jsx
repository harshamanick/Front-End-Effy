// This component will show backend error as popup.

import React from "react";
import { companyStateChange } from "../../Redux/Actions/Company.action";
import cx from "classnames";
import styles from "./ServerErrorPopup.module.scss";
import { useDispatch, useSelector } from "react-redux";

export default function ServerErrorPopup() {
  const state = useSelector((state) => state.companies);
  const dispatch = useDispatch();

  setTimeout(() => {
    dispatch(
      companyStateChange({ isServerError: false, isServerErrorMessage: " " })
    );
  }, 3000);
  const containerClassName = cx(styles.MainContainer, {
    [styles.visible]: state?.isServerError,
  });
  return (
    <div className={cx(containerClassName)}>{state?.isServerErrorMessage}</div>
  );
}
