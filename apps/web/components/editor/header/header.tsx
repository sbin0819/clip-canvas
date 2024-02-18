'use client';

import { BiUndo, BiRedo } from 'react-icons/bi';
import DisplayDropdown from './display-dropdown';

export default function Header() {
  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white z-50">
        <div className="flex justify-between items-center px-8 h-[80px] border-b-[1px]">
          <div>cc</div>
          <div className="ml-auto flex items-center gap-4 h-full">
            <div className="flex items-center gap-4 px-4 border-r-[1px]">
              <button>
                <BiUndo size={28} />
              </button>
              <button>
                <BiRedo size={28} />
              </button>
            </div>
            <div className="h-[36px]">
              <DisplayDropdown />
            </div>
            <button className="btn">Login</button>
          </div>
        </div>
      </header>
      <div className="h-[80px]"></div>
    </>
  );
}