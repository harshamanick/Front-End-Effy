import React from "react";
import gClasses from "../../Common.module.scss";
import cx from "classnames";
import TextField from "@mui/material/TextField";

// Input base component.

export default function Input(props) {
  const {
    onChange,
    label,
    id,
    value,
    isRequired,
    readOnly,
    helperText,
    error,
  } = props;

  return (
    <div>
      <div className={cx(gClasses.W100)}>
        {!readOnly ? (
          <TextField
            id={id}
            label={label}
            value={value}
            onChange={(event) => {
              onChange(event);
            }}
            required={isRequired}
            error={error}
            helperText={helperText}
            fullWidth
            size="medium"
          />
        ) : (
          <>
            <div className={cx(gClasses.FontWeight)}>{label}</div>
            <div className={gClasses.Content}>{value}</div>
          </>
        )}
      </div>
    </div>
  );
}
