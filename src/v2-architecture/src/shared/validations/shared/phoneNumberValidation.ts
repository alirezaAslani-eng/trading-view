import { string } from "zod";

const phoneNumberValidation = () =>
  string()
    .regex(/^(0?9[0-9]{9})$/, "شماره تلفن نامعتبر هست")
    .transform((val) => (val.startsWith("0") ? val : `0${val}`));

export default phoneNumberValidation;
