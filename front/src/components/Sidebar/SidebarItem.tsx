import Link from 'next/link';
import React from 'react';

interface SidebarItemProps {
  Icon: React.ElementType;
  label: string;
  link?: string;
  isSelected: boolean;
  action?: () => void;
}

const SidebarItemWithoutLink = ({ Icon, label, isSelected, action }: SidebarItemProps) => {
  return (
    <div className={`flex items-center justify-start my-2 p-3 rounded-2xl w-full h-[54px] font-medium text-sm hover:bg-darkpink ${isSelected ? 'bg-darkpink' : ''} ${action ? 'cursor-pointer' : 'cursor-auto'}`} onClick={action}>
      <div className={`flex items-center justify-center rounded-xl w-[30px] h-[30px] ${isSelected ? 'bg-beige' : 'bg-darkpink'}`}>
        <Icon alt={label} className={`${isSelected ? 'text-beige' : 'text-beige'} w-4 h-4`}/>
      </div>
      <span className={`ml-4 text-white`}>{label}</span>
    </div>
  );
};

const SidebarItem = ({ Icon, label, link, isSelected, action }: SidebarItemProps) => {
  if (!link) {
    return <SidebarItemWithoutLink Icon={Icon} label={label} isSelected={isSelected} action={action} />;
  }

  return (
    <Link href={`/${link}`}>
      <div className={`flex items-center justify-start my-2 p-3 rounded-2xl w-full h-[54px] font-medium text-sm hover:bg-darkpink ${isSelected ? 'bg-darkpink' : ''}`}>
        <div className={`flex items-center justify-center rounded-xl w-[30px] h-[30px] ${isSelected ? 'bg-beige' : 'bg-darkpink'}`}>
          <Icon alt={label} className={`${isSelected ? 'text-darkpink' : 'text-beige'} w-4 h-4`}/>
        </div>
        <span className={`ml-4 text-white`}>{label}</span>
      </div>
    </Link>
  );
};

SidebarItem.displayName = 'SidebarItem';

export default SidebarItem;
