import toast from "react-hot-toast";

function successAlert(...params: Parameters<typeof toast.success>) {
  return toast.success(...params);
}
function errorAlert(...params: Parameters<typeof toast.error>) {
  return toast.error(...params);
}
function promiseAlert<T = unknown>(
  ...params: Parameters<typeof toast.promise<T>>
) {
  return toast.promise<T>(...params);
}
function customAlert(...params: Parameters<typeof toast.custom>) {
  return toast.custom(...params);
}

export { errorAlert, promiseAlert, successAlert, customAlert };
