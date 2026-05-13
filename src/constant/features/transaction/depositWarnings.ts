const depositWarnings = [
  {
    id: crypto.randomUUID(),
    warning:
      "مبلغ باید از حساب شخصی شما واریز شده واطلاعات صاحب حساب و صاحب اکانت یکی باشد.",
  },
  { id: crypto.randomUUID(), warning: "کارمزد معادل 0.10% مبلغ واریزی است." },
  {
    id: crypto.randomUUID(),
    warning:
      "درصورت واریز از حساب شخص دیگر، مبلغ بعد از دو تا سه روز کاری با کسر کارمزد به حساب مبدا عودت داده خواهد شد. ",
  },
];

export default depositWarnings;
