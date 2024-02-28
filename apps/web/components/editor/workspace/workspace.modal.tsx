import { Modal } from '@/components/common';

export type WorkspaceModalTabType = 'text' | 'video' | 'sticker' | 'animation';

export default function WorkSpaceModal({
  isOpen,
  onClose,
  activeTab,
}: {
  isOpen: boolean;
  onClose: () => void;
  activeTab: WorkspaceModalTabType;
}) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="w-[600px] h-[400px] bg-white">
          <h1>Editor Modal</h1>
          <p>Active Tab: {activeTab}</p>
        </div>
      </Modal>
    </>
  );
}
