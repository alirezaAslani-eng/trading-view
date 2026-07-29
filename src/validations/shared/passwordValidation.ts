import { string } from "zod";

const passwordValidation = () =>
  string()
    .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد")
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\/;']).+$/,
      "رمز عبور باید حداقل یک حرف بزرگ انگلیسی، یک عدد و یک کاراکتر خاص داشته باشد",
    );
export { passwordValidation };
