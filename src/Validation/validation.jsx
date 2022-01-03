import * as Yup from "yup";

const phoneRegExp = /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/;
const urlRegExp =
  /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

export const updateFormValidationStudent = Yup.object({
  name: Yup.string()
    .trim()
    .max(30, "Must be 30 characters or less")
    .required("Required"),
  cgpa: Yup.number()
    .positive("CGPA must be a positive number")
    .max(4.0, "CGPA should not be exceed from 4. Invalid CGPA")
    .required("Required"),
  education: Yup.mixed()
    .oneOf(["Matric", "Inter", "Graduate", "Master's"])
    .required("Required"),
  phone: Yup.string()
    .trim()
    .matches(phoneRegExp, "Invalid Phone Number")
    .required("Required"),
  dob: Yup.date()
    .max(
      new Date(Date.now() - 568111068000), // Task completed after 2.5 hours
      "You must be at least 18 years")
    .required("Required"),
  skills: Yup.string()
    .trim()
    .required("Required"),
  experienceYears: Yup.string()
    .trim()
    .required("Required"),
  city: Yup.string()
    .trim()
    .max(30, "Invalid City")
    .required("Required"),
  bio: Yup.string()
    .trim()
    .max(30, "Must be 30 characters or less")
    .required("Required"),
});

export const updateFormValidationCompany = Yup.object({
  name: Yup.string()
    .trim()
    .max(30, "Must be 30 characters or less")
    .required("Required"),
  phone: Yup.string()
    .trim()
    .matches(phoneRegExp, "Invalid Phone Number")
    .required("Required"),
  website: Yup.string()
    .trim()
    .matches(urlRegExp, "Invalid Website")
    .required("Required"),
  city: Yup.string()
    .trim()
    .max(30, "Invalid City")
    .required("Required"),
});

export const SignUpFormValidation = Yup.object({
  name: Yup.string()
    .trim()
    .max(30, "Must be 30 characters or less")
    .required("Required"),
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Required"),
  password: Yup.string()
    .trim()
    .min(6, "Password must be at least 6 charaters")
    .max(16, "Password must be 16 charaters or less")
    .required("Required"),
  role: Yup.mixed()
    .required("Required")
    .oneOf(["company", "student"]),
    // phone: Yup.string()
    // .trim()
    // .min(03000000000, "Password must be at least 6 charaters")
    // .max(03499999999, "Password must be 16 charaters or less")
    // .required("Required"),
  phone: Yup.string()
    .trim()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Required"),
});

export const LoginFormValidation = Yup.object({
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Required"),
  password: Yup.string()
    .trim()
    .min(6, "Password must be at least 6 charaters")
    .max(16, "Password must be 16 charaters or less")
    .required("Required"),
});

export const JobPostFormValidation = Yup.object({
  jobTitle: Yup.string()
    .trim()
    .max(30, "Must be 30 characters or less")
    .required("Required"),
  jobDescription: Yup.string()
    .trim()
    .max(1000, "Must be 1000 characters or less")
    .required("Required"),
  jobType: Yup.mixed()
    .oneOf(["Full Time", "Part Time", "Internship"])
    .required("Required"),
  lastDate: Yup.date()
    .min(new Date(Date.now()), "Last Date must not be in the past")
    .max(new Date(Date.now() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 20),
      "Last date should not be exceed from 20 days")
    .required("Required"),
  salary: Yup.number()
    .positive("Salary must be a positive number")
    .required("Required"),
  education: Yup.mixed()
    .oneOf(["Matric", "Inter", "Graduate", "Master's"])
    .required("Required"),
    experienceYears: Yup.string()
    .trim()
    .required("Required"),
});
export const ForgetPasswordValidation = Yup.object({
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Required"),
});
export const ResetPasswordValidation = Yup.object({
  password: Yup.string()
    .trim()
    .min(6, "Password must be at least 6 charaters")
    .max(16, "Password must be 16 charaters or less")
    .required("Required"),
});