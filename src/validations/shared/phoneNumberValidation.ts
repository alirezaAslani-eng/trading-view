import { string } from "zod";

const phoneNumberValidation = () =>
  string().regex(/^09[0-9]{9}$/, "شماره تلفن نامعتبر هست");

export default phoneNumberValidation;
