import { object, ref, string } from "yup";

export const signUpSchema = object().shape({
  fullName: string()
    .required("Full name is required"),
  email: string()
    .required("Email is required")
    .email("Invalid email format"),
  password: string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
  passwordConfirmation: string()
    .oneOf([ref('password'), null], 'Passwords must match')
    .required("Please confirm your password")
});
