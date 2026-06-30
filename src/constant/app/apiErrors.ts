const errorMessagesFa = {
  400: "درخواست نامعتبر است. لطفاً اطلاعات وارد شده را بررسی کنید. (400)",
  401: "دوباره وارد شوید. (401)",
  403: "اجازه انجام این کار را ندارید. (403)",
  404: "در حال حاضر امکان استفاده از این سرویس وجود ندارد (404)",
  409: "تعارضی در اطلاعات وجود دارد. لطفاً صفحه را دوباره بارگذاری کنید و دوباره تلاش کنید. (409)",
  422: "اطلاعات وارد شده صحیح نیست. لطفاً آن را بررسی کنید. (422)",
  429: "تعداد درخواست‌ها زیاد است. لطفاً کمی صبر کنید و دوباره تلاش کنید. (429)",

  SERVER_ERROR:
    "در حال حاضر امکان انجام این درخواست وجود ندارد. لطفاً بعداً دوباره تلاش کنید.",
} as const;

const OTP_RAET_LIMIT_MESSAGE =
  "شما به سقف مجاز درخواست کد تأیید رسیده‌اید. لطفاً کمی بعد دوباره تلاش کنید.";
function getErrorMessageFa(status: number) {
  if (status >= 500) {
    return errorMessagesFa.SERVER_ERROR;
  }

  return (
    (errorMessagesFa as Record<number, string>)[status] ??
    errorMessagesFa.SERVER_ERROR
  );
}

export { errorMessagesFa, OTP_RAET_LIMIT_MESSAGE, getErrorMessageFa };
