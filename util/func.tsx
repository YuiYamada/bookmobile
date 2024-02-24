export const getCookie = (key: string) => {
  if (!document.cookie) {
    return "";
  }
  const cookieVal = document.cookie.split("; ").find((row) =>
    row.startsWith(key)
  );
  if (!cookieVal) {
    return "";
  }
  return cookieVal.split("=")[1];
};
