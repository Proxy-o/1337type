export default function getCookie(name: string) {
  const cookieArr = document.cookie.split("; ");
  for (const cookie of cookieArr) {
    const cookiePair = cookie.split("=");
    if (name === cookiePair[0]) {
      return decodeURIComponent(cookiePair[1]!);
    }
  }
  return null;
}
