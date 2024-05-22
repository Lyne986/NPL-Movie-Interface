import React from 'react';
import { FaArrowRightFromBracket } from "react-icons/fa6";

import likeIcon from '../assets/likeIcon.svg';
import Image from 'next/image';
import Rating from './Rating';

interface Card {
  title: string;
  imageUrl: string;
  rating?: number;
}

interface ReviewPanelProps {
  card: Card | null;
  setSelectedCard: (card: Card | null) => void;
}

const ReviewPanel: React.FC<ReviewPanelProps> = ({ card, setSelectedCard }) => {
  return (
    <div className={`flex flex-col border-l border-gray-300 transition-transform duration-500 overflow-y-scroll pl-6 py-6 ${
      card ? "translate-x-0 w-1/3" : "translate-x-full w-0"
    }`}>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-[24px]">My review</h1>
        <div onClick={() => setSelectedCard(null)}>
          <FaArrowRightFromBracket className="text-2xl hover:text-primarypink cursor-pointer"/>
        </div>
      </div>
      {card && (
        <div className="flex flex-col overflow-y-scroll hide-scrollbar p-4 gap-2 h-full">
          <img src={card.imageUrl} alt={card.title} className="rounded-lg" />
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg text-black font-bold">{card.title}</h2>
            </div>
          </div>
          {card.rating && <Rating rating={card.rating} />}
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-lg text-textgray font-bold">Description</h2>
            <p className="text-sm text-textlightgray">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget est nec justo ultricies aliquet. Donec eget est nec justo ultricies aliquet.</p>
            <button className="button-gradient self-center text-white w-2/3 rounded-full py-2 mt-6">Edit my review</button>
          </div>
        </div>
      )}
    </div>
  );
}

ReviewPanel.displayName = 'ReviewPanel';

export default ReviewPanel;
