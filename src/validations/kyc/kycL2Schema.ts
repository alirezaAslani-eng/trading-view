import z, { string } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const fileScheam = z
  .instanceof(File)
  .refine(
    (file) => file.size <= MAX_FILE_SIZE,
    "حجم فایل باید کمتر از ۵ مگابایت باشد",
  )
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    "فرمت فایل باید jpg، png یا webp باشد",
  );

const kycL2Schema = z.object({
  file: z
    .array(fileScheam, "فایل نا معتبر")
    .length(1, "فقط عکس روی کارت ملی را آپلود کنید"),
  postalCode: string().regex(/^\d{10}$/, "کد پستی باید ۱۰ رقم باشد"),
  state: string().regex(/^\d+$/, "منطقه باید عدد باشد"),
  city: string().min(2, "نام شهر باید حداقل ۲ کاراکتر باشد"),
  fullAddress: string().min(8, "آدرس باید حداقل ۱۰ کاراکتر باشد"),
  jobTitle: string().min(2, "عنوان شغلی باید حداقل ۲ کاراکتر باشد"),
  activityField: string().min(2, "زمینه فعالیت باید حداقل ۲ کاراکتر باشد"),
});

export default kycL2Schema;
