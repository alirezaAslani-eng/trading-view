// --- notifications ---
import { Notification } from "@/v2-architecture/src/entity/notification";
import {
  apiClient,
  ApiConfig,
  apiError,
  BaseApiResponse,
  PaginationQueries,
  PaginationResponse,
} from "@/v2-architecture/src/api";
import { toQueryParams } from "@/utils/app/toQueryParams";

const url = apiClient.authBaseURL("/api/v1/user/notifications");

const mockNotificationsPage1: NotificationsData = {
  totalCount: 25,
  page: 1,
  pageSize: 10,
  unreadCount: 4,

  items: [
    {
      id: 125,
      title: "تایید مدارک",
      message: "مدارک شما با موفقیت تایید شد و سطح شما ارتقا یافت.",
      type: "success",
      isRead: false,
      createdAt: 1712345678,
    },
    {
      id: 124,
      title: "سفارش با موفقیت ثبت شد",
      message: "سفارش خرید شما با موفقیت ثبت و در حال پردازش است.",
      type: "info",
      isRead: false,
      createdAt: 1712342078,
    },
    {
      id: 123,
      title: "هشدار موجودی",
      message: "موجودی کیف پول شما برای انجام این سفارش کافی نیست.",
      type: "warning",
      isRead: false,
      createdAt: 1712338478,
    },
    {
      id: 122,
      title: "واریز وجه",
      message: "مبلغ موردنظر با موفقیت به کیف پول شما اضافه شد.",
      type: "success",
      isRead: false,
      createdAt: 1712334878,
    },
    {
      id: 121,
      title: "سفارش تکمیل شد",
      message: "سفارش شما با موفقیت تکمیل شد.",
      type: "success",
      isRead: true,
      createdAt: 1712331278,
    },
    {
      id: 120,
      title: "تغییر رمز عبور",
      message: "رمز عبور حساب کاربری شما با موفقیت تغییر کرد.",
      type: "info",
      isRead: true,
      createdAt: 1712327678,
    },
    {
      id: 119,
      title: "خطا در ثبت سفارش",
      message: "در ثبت سفارش مشکلی ایجاد شد. لطفاً دوباره تلاش کنید.",
      type: "error",
      isRead: true,
      createdAt: 1712324078,
    },
    {
      id: 118,
      title: "برداشت وجه",
      message: "درخواست برداشت وجه شما با موفقیت ثبت شد.",
      type: "success",
      isRead: true,
      createdAt: 1712320478,
    },
    {
      id: 117,
      title: "به‌روزرسانی حساب",
      message: "اطلاعات حساب کاربری شما به‌روزرسانی شد.",
      type: "info",
      isRead: true,
      createdAt: 1712316878,
    },
    {
      id: 116,
      title: "هشدار امنیتی",
      message: "ورود جدیدی به حساب کاربری شما شناسایی شد.",
      type: "warning",
      isRead: true,
      createdAt: 1712313278,
    },
  ],
};
export const notifications = async ({
  signal,
  queryParams,
}: Config): Promise<NotificationsData> => {
  const query = new URLSearchParams(toQueryParams(queryParams)).toString();
  const res = await apiClient.get(`${url}?${query}`, { signal });
  const raw =
    await apiError.jsonHandler<BaseApiResponse<NotificationsData>>(res);
  return mockNotificationsPage1;
};

//#region // * ------------ Shared types ------------
export type NotificationsData = PaginationResponse<Notification[]> & {
  unreadCount: number;
};
export type NotificationsQueryParams = PaginationQueries;
//#endregion // * ------------ Shared types ------------

//#region // * ------------ Internal types ------------
type Config = ApiConfig<{ queryParams: NotificationsQueryParams }>;
//#endregion // * ------------ Internal types ------------
