import useSideOptions from '@/app/store/use-side-options';

export default function WorkspaceNavigation() {
  const { setFrames } = useSideOptions();

  const onAddFrame = () => {
    setFrames((prev) => [
      ...prev,
      {
        id: '1',
        texts: [
          {
            text: 'Hello World',
            fontSize: 24,
            color: '#000000',
            fontFamily: 'Arial',
            fontWeight: 'normal',
          },
        ],
        duration: 5000,
      },
    ]);
  };

  return (
    <nav className="flex gap-8 w-full h-[52px] px-4 py-4 border border-b">
      <button className="text-sm text-[#131313]">Add New</button>
      <button className="text-sm text-[#131313]" onClick={onAddFrame}>
        Frame
      </button>
      <button className="text-sm text-[#131313]">Text</button>
      <button className="text-sm text-[#131313]">Video</button>
      <button className="text-sm text-[#131313]">Sticker</button>
      <button className="text-sm text-[#131313]">Animation</button>
    </nav>
  );
}
