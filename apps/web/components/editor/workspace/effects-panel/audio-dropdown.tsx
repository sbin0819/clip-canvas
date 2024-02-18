const audiosPath = {
  "Don't Blink": 'dont-blink.mp3',
  Snaps: 'snaps.mp3',
  Stomp: 'stomp.mp3',
  Motion: 'motion.mp3',
  Gongs: 'gongs.mp3',
  Claps: 'claps.mp3',
};

export default function Audio() {
  const audio = audiosPath[`Don't Blink`];

  return <div>{audio}</div>;
}
