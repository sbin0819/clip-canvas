import Header from './header';
import TimelineList from './timeline-list';
import Workspace from './workspace/workspace';

export default function Editor() {
  return (
    <div>
      <Header />
      <div className="flex w-full h-[calc(100vh_-_80px)] overflow-hidden">
        <TimelineList />
        <Workspace />
      </div>
    </div>
  );
}
