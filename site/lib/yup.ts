import * as yup from "yup";

export const emailShape = yup
  .string()
  .email("Please provide a valid email address")
  .required("Please provide an email address");

export const passwordShape = yup
  .string()
  .min(7, ({ min }) => `Password must be at least ${min} character${min > 1 ? "s" : ""}`)
  .required();
