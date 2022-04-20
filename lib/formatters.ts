import formatDuration from "format-duration";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export const formatTime = (timeInSeconds: number) => {
  return formatDuration(timeInSeconds * 1000);
};

export const FormatDateToDayAgo = (date: Date, now: Date = new Date()) => {
  const utc1 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const utc2 = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

  const dayAgo = Math.floor((utc2 - utc1) / MS_PER_DAY);

  if (dayAgo === 0) {
    return "Today";
  }

  return `${dayAgo} days ago`;
};
