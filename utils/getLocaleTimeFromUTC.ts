const padZero = (num: number): string =>
  num < 10 ? `0${num}` : num.toString();

const formatDate = (date: Date): string => {
  const year = date.getUTCFullYear();
  const month = padZero(date.getUTCMonth() + 1);
  const day = padZero(date.getUTCDate());
  const hours = padZero(date.getUTCHours());
  const minutes = padZero(date.getUTCMinutes());
  const seconds = padZero(date.getUTCSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const getLocaleTimeFromUTC = (utc: string) => {
  // 입력된 문자열을 Date 객체로 변환
  const utcDate = new Date(utc);

  // UTC에서 KST로 변환
  const kstDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);

  // KST로 변환된 날짜를 포맷팅하여 반환
  return formatDate(kstDate);
};
