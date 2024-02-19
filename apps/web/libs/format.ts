export const convertMillisecondsToSeconds = (milliseconds: number) => {
  const seconds = milliseconds / 1000;
  return Math.round(seconds * 10) / 10;
};
