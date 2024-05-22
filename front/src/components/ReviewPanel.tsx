import React from 'react';
import { FaArrowRightFromBracket } from "react-icons/fa6";
import Image from 'next/image';
import Rating from './Rating';

interface Card {
  title: string;
  imageUrl: string;
  rating?: number;
  releaseDate?: string;
  genre?: string;
}

interface ReviewPanelProps {
  card: Card | null;
  setSelectedCard: (card: Card | null) => void;
}

const ReviewPanel: React.FC<ReviewPanelProps> = ({ card, setSelectedCard }) => {
  return (
    <div className={`flex flex-col transition-transform duration-500 overflow-y-scroll md:pl-6 py-6 ${
      card ? "translate-x-0 w-full md:w-1/3 md:translate-x-0" : "translate-x-full w-0 md:w-0 md:translate-x-0"
    }`}>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-[24px]">Movie infos</h1>
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
          <div className="flex flex-col items-start gap-2">
            <h2 className="text-lg text-black">Release date: {card.releaseDate}</h2>
            <p className="text-sm text-black">Genre: {card.genre}</p>
          </div>
        </div>
      )}
    </div>
  );
}

ReviewPanel.displayName = 'ReviewPanel';

export default ReviewPanel;
