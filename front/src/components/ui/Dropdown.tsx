import { useEffect,useRef, useState } from 'react';
import { FaChevronDown } from "react-icons/fa";

export interface DropdownOption {
  label: string;
  value?: string;
}

const Dropdown = ({ title, options, onSelect }: { title: string, options: DropdownOption[], onSelect: (value?: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (option: DropdownOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option.value);
  };

  return (
    <div className="text-sm text-white" ref={dropdownRef}>
      <div
        className="flex items-center h-auto px-4 py-2 min-w-max bg-primarypink rounded-lg cursor-pointer relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className='text-white flex flex-row items-center'>
          <span className='text-xs md:text-sm'>{selectedOption ? selectedOption.label : title}</span>
          <FaChevronDown className={`bg-primarypink absolute right-2 ${isOpen ? 'transform rotate-180 right-2' : ''}`} />
        </div>
      </div>

      {isOpen && (
        <div className="absolute mt-1 rounded-lg bg-primarypink border shadow-lg z-10">
          {options.map((option, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-4 py-2 hover:bg-darkpink cursor-pointer rounded-lg"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Dropdown.displayName = 'Dropdown';

export default Dropdown;
