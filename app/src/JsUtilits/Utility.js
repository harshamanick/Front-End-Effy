import { MenuItem } from "@mui/material";

export const constructErrorMessage = (error) => {
  if (error) {
    let temp = {};
    const errorMessages = error.details.map((detail) => {
      temp[detail.context.key] = detail.message
        .replace(/"/g, "")
        .replace(/is not allowed to be empty$/, "is required");
    });
    return temp;
  }
  return null;
};
export const getDropDownList = (list) => {
  const List = list?.map((value) => {
    return <MenuItem value={value?._id}>{value?.company_name}</MenuItem>;
  });
  return List;
};
