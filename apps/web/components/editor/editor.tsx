import Sidebar from './sidebar';
import Workspace from './workspace/workspace';

export default function Editor() {
  return (
    <div className="flex w-full h-[calc(100vh_-_80px)] overflow-hidden">
      <Sidebar />
      <Workspace />
    </div>
  );
}
