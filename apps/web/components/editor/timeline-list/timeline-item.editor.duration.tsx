import React, { useState } from 'react';
import { FaSortDown, FaSortUp } from 'react-icons/fa';
import { RiDeleteBin6Line, RiFileCopyLine } from 'react-icons/ri';

const ItemDuration = () => {
  const [duration, setDuration] = useState(0.5);
  const [sync, setSync] = useState(false);

  const incrementDuration = () => {
    setDuration((prevDuration) => prevDuration + 0.5);
  };

  const decrementDuration = () => {
    setDuration((prevDuration) => Math.max(0, prevDuration - 0.5));
  };

  const toggleSync = () => {
    setSync((prevSync) => !prevSync);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <span>Create</span>
        <label className="switch">
          <input type="checkbox" checked={sync} onChange={toggleSync} />
          <span className="slider round"></span>
        </label>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={decrementDuration} className="p-1">
            <FaSortDown />
          </button>
          <button onClick={incrementDuration} className="p-1">
            <FaSortUp />
          </button>
          <div className="px-2 py-1 bg-gray-200 rounded-full text-sm">
            {duration}s
          </div>
        </div>
        <div className="flex items-center">
          <button className="p-1">
            <RiFileCopyLine size="20" />
          </button>
          <button className="p-1">
            <RiDeleteBin6Line size="20" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemDuration;
