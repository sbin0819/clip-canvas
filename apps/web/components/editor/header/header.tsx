'use client';

import { BiUndo, BiRedo } from 'react-icons/bi';
import DisplayDropdown from './header.display-dropdown';
import Link from 'next/link';
import Export from './header.export';

export default function Header() {
  return (
    <>
      <header
        data-testid="editor__header"
        className="fixed top-0 left-0 w-full bg-white z-50"
      >
        <div className="flex justify-between items-center px-8 h-[80px] border-b-[1px]">
          <div>
            <Link href="/">home</Link>
          </div>
          <div className="ml-auto h-[36px] flex items-center gap-4">
            <div className="flex items-center gap-4 px-4 border-r-[1px]">
              <button>
                <BiUndo size={28} />
              </button>
              <button>
                <BiRedo size={28} />
              </button>
            </div>
            <DisplayDropdown />
            <Export />
          </div>
        </div>
      </header>
      <div className="h-[80px]"></div>
    </>
  );
}
