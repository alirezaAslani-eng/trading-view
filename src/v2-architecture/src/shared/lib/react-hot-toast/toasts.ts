import toast from "react-hot-toast";

export function notifySuccess(...params: Parameters<typeof toast.success>) {
  return toast.success(...params);
}
export function notifyError(...params: Parameters<typeof toast.error>) {
  return toast.error(...params);
}
export function notifyLoading<T = unknown>(
  ...params: Parameters<typeof toast.promise<T>>
) {
  return toast.promise<T>(...params);
}
