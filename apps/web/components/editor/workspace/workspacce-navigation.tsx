import useSideOptions from '@/app/store/use-side-options';

export default function WorkspaceNavigation() {
  return (
    <nav className="flex gap-8 w-full h-[52px] px-4 py-4 border border-b">
      <button className="text-sm text-[#131313]">Add New</button>
      <button className="text-sm text-[#131313]">Frame</button>
      <button className="text-sm text-[#131313]">Text</button>
      <button className="text-sm text-[#131313]">Video</button>
      <button className="text-sm text-[#131313]">Sticker</button>
      <button className="text-sm text-[#131313]">Animation</button>
    </nav>
  );
}
