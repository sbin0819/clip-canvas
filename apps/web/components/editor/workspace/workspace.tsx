import Studio from './studio';
import EffectsPanel from './toolbar';
import WorkspaceHeader from './workspacce.header';

export default function Workspace() {
  return (
    <section className="flex-[7] w-full">
      <WorkspaceHeader />
      <div className="flex w-full h-[calc(100vh_-_130px)] px-4 py-4 bg-gray-100">
        <Studio />
        <EffectsPanel />
      </div>
    </section>
  );
}
