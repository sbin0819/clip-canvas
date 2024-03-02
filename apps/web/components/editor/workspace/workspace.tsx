import Studio from './studio/studio';
import EffectsPanel from './toolbar/toolbar';
import WorkspaceHeaderToolbar from './workspacce.header-toolbar';

export default function Workspace() {
  return (
    <section className="flex-[7] w-full">
      <WorkspaceHeaderToolbar />
      <div className="flex w-full h-[calc(100vh_-_130px)] px-4 py-4 bg-gray-100">
        <Studio />
        <EffectsPanel />
      </div>
    </section>
  );
}
