const errorMessagesFa = {
  400: "درخواست نامعتبر است. لطفاً اطلاعات وارد شده را بررسی کنید.",
  401: "دوباره وارد شوید.",
  403: "اجازه انجام این کار را ندارید.",
  404: "موردی که به دنبال آن بودید پیدا نشد.",
  409: "تعارضی در اطلاعات وجود دارد. لطفاً صفحه را دوباره بارگذاری کنید و دوباره تلاش کنید.",
  422: "اطلاعات وارد شده صحیح نیست. لطفاً آن را بررسی کنید.",
  429: "تعداد درخواست‌ها زیاد است. لطفاً کمی صبر کنید و دوباره تلاش کنید.",

  SERVER_ERROR:
    "در حال حاضر امکان انجام این درخواست وجود ندارد. لطفاً بعداً دوباره تلاش کنید.",
} as const;

function getErrorMessageFa(status: number) {
  if (status >= 500) {
    return errorMessagesFa.SERVER_ERROR;
  }

  return (
    (errorMessagesFa as Record<number, string>)[status] ??
    errorMessagesFa.SERVER_ERROR
  );
}

export { errorMessagesFa, getErrorMessageFa };
