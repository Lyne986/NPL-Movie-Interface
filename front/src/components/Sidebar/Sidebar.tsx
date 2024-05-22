'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect,useState } from 'react';
import { FaChartSimple } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { IoKey } from "react-icons/io5";
import { RiMenu2Fill } from "react-icons/ri";
import Icon from "@/assets/icon.svg";

import { Routes } from '@/utils/routes';
import { signOut } from '@/utils/supabase/actions';

import SidebarItem from './SidebarItem';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  const handleResize = () => {
    if (window.innerWidth < 1024) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]); 

  return (
    <>
      <button className="p-4 text-xl fixed top-0 left-0 z-40 lg:hidden" onClick={() => setIsOpen(!isOpen)}>
        <RiMenu2Fill className={`${isOpen ? 'text-white' : 'text-primarypink'} w-6 h-6`}/>
      </button>
      <div className={`${isMobile ? `${isOpen ? 'translate-x-0' : '-translate-x-full'}` : ''} fixed z-30 w-full h-screen flex flex-col items-center pb-10 justify-between bg-sidebar md:rounded-r-[20px] md:w-[220px] transition-transform duration-300`}>
        <div className='w-full flex flex-col justify-center items-center'>
          <div className="flex flex-col items-center justify-center mt-4">
            <Link href={Routes.HOME} className='flex items-center gap-2'>
              <Image className='' src={Icon} alt="logo" width={30} height={30} />
              <h1 className="text-white text-xl font-semibold cursor-pointer">Movies Lister</h1>
            </Link>
          </div>
          <div className='flex flex-col w-[80%] mt-6'>
            <SidebarItem
              Icon={FaChartSimple}
              label="Library"
              link={Routes.LIBRARY}
              isSelected={pathname.slice(1) === Routes.LIBRARY}
            />
            <SidebarItem
              Icon={IoPerson}
              label="Profile"
              link={Routes.PROFILE}
              isSelected={pathname.slice(1) === Routes.PROFILE}
            />
            <SidebarItem
              action={() => signOut()}
              Icon={IoKey}
              label="Logout"
              isSelected={pathname.slice(1) === Routes.LOGOUT}
            />
          </div>
        </div>
      </div>
    </>
  );
};

Sidebar.displayName = 'Sidebar';

export default Sidebar;
