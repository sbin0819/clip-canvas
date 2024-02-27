import Controls from './controls';
import Frames from './frames';

export default function PreviewArea() {
  return (
    <div className="flex-[2] px-10 overflow-auto">
      <Frames />
      <Controls />
    </div>
  );
}
