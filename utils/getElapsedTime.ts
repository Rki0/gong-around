// reference
// https://gurtn.tistory.com/166

export const getElapsedTime = (date: string, locale: string): string => {
  const target = new Date(date);
  const currentTime = new Date();

  const diff: number = (currentTime.getTime() - target.getTime()) / 1000;

  const formatter = new Intl.RelativeTimeFormat(locale, {
    numeric: "auto",
  });

  const times = [
    { name: "year", ms: 60 * 60 * 24 * 365 },
    { name: "month", ms: 60 * 60 * 24 * 30 },
    { name: "day", ms: 60 * 60 * 24 },
    { name: "hour", ms: 60 * 60 },
    { name: "minute", ms: 60 },
  ];

  for (const value of times) {
    const betweenTime = Math.floor(diff / value.ms);

    if (betweenTime > 0) {
      return formatter.format(
        -betweenTime,
        value.name as Intl.RelativeTimeFormatUnit
      );
    }
  }

  return "방금 전";
};
