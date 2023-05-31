import Joi from "joi";
import { constructErrorMessage } from "../JsUtilits/Utility";

export const validateUser = (data) => {
  const schema = Joi.object({
    first_name: Joi.string().required().label("First Name"),
    last_name: Joi.string().required().label("Last Name"),
    email: Joi.string().required().label("Email"),
    dob: Joi.string().required().label("Date of birth"),
    designation: Joi.string().required().label("Designation"),
    is_active: Joi.boolean().optional(),
    company_id: Joi.string().optional(),
    _id: Joi.string().optional(),
    migrate_id: Joi.string().optional(),
  });

  const { error } = schema.validate(data, { abortEarly: false });
  return constructErrorMessage(error);
};

export const validateCompany = (data) => {
  const schema = Joi.object({
    company_name: Joi.string().required().label("Company Name"),
    company_address_1: Joi.string().required().label("Address"),
    company_address_2: Joi.string().required().label("Country"),
    pincode: Joi.string().required("Pincode"),
    _id: Joi.string().optional(),
  });
  const { error } = schema.validate(data, { abortEarly: false });
  return constructErrorMessage(error);
};
