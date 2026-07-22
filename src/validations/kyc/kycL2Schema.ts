import z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const fileScheam = z
  .instanceof(File)
  .refine(
    (file) => file.size <= MAX_FILE_SIZE,
    "حجم فایل باید کمتر از ۵ مگابایت باشد"
  )
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    "فرمت فایل باید jpg، png یا webp باشد"
  );

const kycL2Schema = z.object({
  file: z.array(fileScheam,"فایل نا معتبر").length(1, "فقط عکس روی کارت ملی را آپلود کنید"),
});

export default kycL2Schema;
