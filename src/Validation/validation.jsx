import * as Yup from "yup";

const phoneRegExp =
  /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
const urlRegExp =
  /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

export const updateFormValidationStudent = Yup.object({
  name: Yup.string()
    .max(30, "Must be 30 characters or less")
    .required("Required Name"),
  cgpa: Yup.number()
    .min(0.1, "Invalid CGPA")
    .max(4.0, "Invalid CGPA")
    .required("Required CGPA"),
  education: Yup.mixed()
    .oneOf(["Matric", "Inter", "Graduate", "Master's"])
    .required("Required Education"),
  phone: Yup.string()
    .matches(phoneRegExp, "Invalid Phone Number")
    .required("Required Phone Number"),
  dob: Yup.date()
    .max(
      new Date(Date.now() - 568111068000), // Task completed after 2.5 hours
      "You must be at least 18 years"
    )
    .required("Required"),
  skills: Yup.string().required("Required"),
  experience: Yup.string().required("Required"),
});

export const updateFormValidationCompany = Yup.object({
  name: Yup.string()
    .max(30, "Must be 30 characters or less")
    .required("Required Name"),
  phone: Yup.string()
    .matches(phoneRegExp, "Invalid Phone Number")
    .required("Required Phone Number"),
  website: Yup.string()
    .matches(urlRegExp, "Invalid Website")
    .required("Website is Required"),
});

export const SignUpFormValidation = Yup.object({
  name: Yup.string()
    .max(30, "Must be 30 characters or less")
    .required("Name is Required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 charaters")
    .required("Password is Required"),
  role: Yup.mixed()
    .required("Selection is Required")
    .oneOf(["company", "student"]),
  phone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number is Required"),
});

export const LoginFormValidation = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 charaters")
    .required("Password is Required"),
});

export const JobPostFormValidation = Yup.object({
  name: Yup.string()
    .max(30, "Must be 30 characters or less")
    .required("Name is Required"),
  phone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number is Required"),
  jobTitle: Yup.string()
    .max(30, "Must be 30 characters or less")
    .required("Job Title is Required"),
  jobDescription: Yup.string()
    .max(250, "Must be 250 characters or less")
    .required("Job Description is Required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is Required"),
  website: Yup.string()
    .matches(urlRegExp, "Invalid Website")
    .required("Website is Required"),
  jobType: Yup.mixed()
    .oneOf(["Full Time", "Part Time"])
    .required("Job Type is Required"),
  lastDate: Yup.date()
    .min(new Date(Date.now()), "Last Date must not be in the past")
    .max(new Date(Date.now() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 20),
      "Last date should not be exceed from 20 days")
    .required("Date is Required"),
  salary: Yup.number()
    .positive("Salary must be a positive number")
    .required("Salary is Required"),
  education: Yup.mixed()
    .oneOf(["Matric", "Inter", "Graduate", "Master's"])
    .required("Required Education"),
});
