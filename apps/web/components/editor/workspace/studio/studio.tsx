import Canvas from './canvas';
import Track from './track';

export default function Studio() {
  return (
    <div className="flex-[2] px-10 overflow-auto">
      <Canvas />
      <Track />
    </div>
  );
}
