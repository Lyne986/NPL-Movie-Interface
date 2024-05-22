'use client';

import { useState } from "react";

interface ToggleProps {
    current: boolean;
    isActive: (active: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ current, isActive }) => {
  const [isEnabled, setIsEnabled] = useState(current);

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    isActive(!isEnabled);
  };

  return (
    <div className="flex items-center text-sm min-w-max rounded-lg self-center">
      <button
        className={`h-5 w-[33px] flex items-center rounded-full p-[2.5px] duration-700 ease-in-out ${
          isEnabled ? "bg-beige justify-end" : "justify-start bg-gray-400"
        }`}
        onClick={toggleSwitch}
      >
        <div className="w-4 h-4 bg-white rounded-full"></div>
      </button>
    </div>
  );
};

Toggle.displayName = "Toggle";

export default Toggle;
