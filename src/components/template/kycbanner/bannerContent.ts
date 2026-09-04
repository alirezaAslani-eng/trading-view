import { KycLevel } from "@/types";

type BannerContent = {
  title: string;
  description: string;
  buttonText?: string;
};

export const kycBannerContent = {
  None: {
    title: "یک قدم تا شروع معامله!",
    buttonText: "شروع احراز هویت",
    description: "برای شروع معاملات، احراز هویت خود را تکمیل کنید.",
  },

  Level1_Basic: {
    title: "احراز هویت اولیه انجام شد",
    buttonText: "ارتقای احراز هویت",
    description:
      "برای دسترسی به امکانات بیشتر، سطح احراز هویت خود را ارتقا دهید.",
  },

  Level2_Advanced: {
    title: "یک قدم تا تکمیل احراز هویت!",
    buttonText: "ارتقای احراز هویت",
    description: "برای فعال‌سازی حساب تجاری، احراز هویت خود را ارتقا دهید.",
  },

  Level3_Business: {
    title: "حساب تجاری شما فعال است",
    description: "تمامی امکانات حساب تجاری برای شما فعال است.",
  },
} satisfies Record<KycLevel, BannerContent>;

export const kycBannerPendingContent = {
  None: {
    title: "احراز هویت در حال بررسی است",
    description: "درخواست احراز هویت شما ثبت شده و در انتظار تأیید است.",
  },

  Level1_Basic: {
    title: "ارتقا به سطح ۲ در حال بررسی است",
    description:
      "سطح ۱ شما تأیید شده و درخواست ارتقا به سطح ۲ در انتظار بررسی است.",
  },

  Level2_Advanced: {
    title: "ارتقا به سطح 3 در حال بررسی است",
    description:
      "سطح ۲ شما تأیید شده و درخواست ارتقا به سطح تجاری در انتظار بررسی است.",
  },

  Level3_Business: {
    title: "حساب تجاری شما فعال است",
    description: "تمامی امکانات حساب تجاری برای شما فعال است.",
  },
} satisfies Record<KycLevel, BannerContent>;

export function getKycBannerContent(
  kycLevel: KycLevel,
  isUpgradePending: boolean,
): BannerContent {
  return isUpgradePending
    ? kycBannerPendingContent[kycLevel]
    : kycBannerContent[kycLevel];
}
