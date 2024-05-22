'use client';

import React, { useState, useEffect } from "react";
import { IoMdSearch } from "react-icons/io";
import Image from "next/image";
import profilePicture from "@/assets/temp-pp.png";

interface HeaderProps {
  userName: string;
  page: string;
  setSearchQuery: (query: string) => void;
}

const Header = ({ userName, page, setSearchQuery }: HeaderProps) => {
  const [searchQuery, setSearchQueryState] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQueryState(query);
    setSearchQuery(query);
  };

  return (
    <div className="w-full h-64 md:h-8 text-xs flex flex-col-reverse md:flex-row items-center justify-between py-12">
      <div className="flex w-[100%] mt-8 md:mt-0 md:w-2/3 rounded-full shadow-[0_0px_15px_-3px_rgba(0,0,0,0.3)]">
        <button
          className="p-2 bg-white rounded-l-full"
          onClick={() => setSearchQuery(searchQuery)}
        >
          <IoMdSearch className="text-black w-5 h-5" />
        </button>
        <input
          className="flex-grow p-2 h-[45px] outline-none rounded-r-full"
          type="text"
          placeholder="Search Movies or genre"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex flex-col-reverse md:flex-row items-center gap-4">
        <span className="text-[24px]">Welcome, {userName}</span>
        <div className="flex items-center w-16 h-16 overflow-hidden rounded-full">
          <Image className='rounded-full object-cover' src={profilePicture} alt="pp" width={64} height={64} />
        </div>
      </div>
    </div>
  );
};

Header.displayName = "Header";

export default Header;
