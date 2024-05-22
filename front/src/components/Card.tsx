import React from 'react';

interface CardProps {
  title: string;
  chapter: number;
  imageUrl: string;
}

const Card = ({ title, chapter, imageUrl }: CardProps) => {
  return (
    <div className="w-[340px] h-[280px] rounded-xl overflow-hidden shadow-[0_0px_15px_-3px_rgba(0,0,0,0.3)] hover:scale-105 duration-300 transition-all flex flex-col justify-between">
      <div className="flex justify-center p-2">
        <img className="object-cover rounded-lg w-[320px] h-[180px]" src={imageUrl} alt={title} />
      </div>
      <div className="flex flex-col justify-between h-full px-4 pb-4">
        <div className="flex-grow">
          <div className="font-bold mb-1 text-sm">{title}</div>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-textgray text-sm">Chapter {chapter}</p>
          <button className="bg-primarypink text-sm text-white font-bold py-1 px-4 rounded-full hover:bg-beige hover:text-textgray duration-200 transition-all">
            Rate
          </button>
        </div>
      </div>
    </div>
  );
};

Card.displayName = 'Card';

export default Card;
