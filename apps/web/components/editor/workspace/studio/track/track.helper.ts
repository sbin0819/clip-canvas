export const formatTime = (time: number) => {
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);

  return [minutes, seconds]
    .map((val) => (val < 10 ? `0${val}` : val))
    .join(':');
};

export const roundToNearestThousand = (duration: number) => {
  const remainder = duration % 1000;
  if (remainder >= 50) {
    return duration + (1000 - remainder);
  } else {
    return duration - remainder;
  }
};
