import React from "react";
import cx from "classnames";
import styles from "./ListItem.module.scss";
import gClasses from "../../../Common.module.scss";
import DeleteIcon from "../../../Icons/DeleteIcon";
export default function ListItem(props) {
  const { onRowClick, data, onDeleteClick } = props;
  return (
    <div
      className={cx(styles.Container, gClasses.MB5)}
      onClick={() => {
        onRowClick(data?._id);
      }}
    >
      <div className={cx(gClasses.Dflex)}>
        <div
          title="Company name"
          className={cx(gClasses.Name, gClasses.MR10, gClasses.ML15)}
        >
          {data?.company_name}
        </div>
        <div className={gClasses.Name}>{data?.company_address_2}</div>
      </div>
      <div
        onClick={(event) => {
          event.stopPropagation();
          onDeleteClick(data?._id);
        }}
        className={cx(gClasses.CursorPointer, gClasses.MR10)}
      >
        <DeleteIcon />
      </div>
    </div>
  );
}
