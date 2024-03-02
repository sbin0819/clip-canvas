'use client';
import { useState } from 'react';
import EditorModal, { WorkspaceModalTabType } from './workspace.modal';

export default function WorkspaceHeaderToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<WorkspaceModalTabType | null>(
    null,
  );

  const onClose = () => {
    setIsOpen(false);
    setActiveTab(null);
  };

  const onOpen = (e: React.MouseEvent) => {
    const tab = e.currentTarget.getAttribute(
      'data-tab',
    ) as WorkspaceModalTabType;
    setIsOpen(true);
    setActiveTab(tab);
  };

  return (
    <>
      {isOpen && typeof activeTab === 'string' && (
        <EditorModal
          activeTab={activeTab as WorkspaceModalTabType}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
      <nav className="flex gap-8 w-full h-[52px] px-4 py-4 border border-b">
        <button className="text-sm text-[#131313]">Add New</button>
        <button className="text-sm text-[#131313]">Frame</button>
        <button
          className="text-sm text-[#131313]"
          data-tab="text"
          onClick={onOpen}
        >
          Text
        </button>
        <button
          className="text-sm text-[#131313]"
          data-tab="video"
          onClick={onOpen}
        >
          Video
        </button>
        <button
          className="text-sm text-[#131313]"
          data-tab="sticker"
          onClick={onOpen}
        >
          Sticker
        </button>
        <button
          className="text-sm text-[#131313]"
          data-tab="animation"
          onClick={onOpen}
        >
          Animation
        </button>
      </nav>
    </>
  );
}
