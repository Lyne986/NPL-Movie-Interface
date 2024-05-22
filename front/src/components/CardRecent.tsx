import Image from 'next/image';
import React from 'react';

import Rating from './Rating';

import likeIcon from '@/assets/likeIcon.svg';

interface CardProps {
  title: string;
  chapter: number;
  imageUrl: string;
  rating: number;
  status: string;
  userName: string;
}

const Card = ({ title, chapter, imageUrl, rating, status, userName }: CardProps) => {
  return (
    <div className="max-w-xs rounded-xl overflow-hidden shadow-[0_0px_15px_-3px_rgba(0,0,0,0.3)] w-[440px] h-[150px] hover:scale-105 duration-200 transition-all flex">
      <div className="flex justify-center items-center p-2">
        <img className="object-cover rounded-lg w-[120px] h-[130px]" src={imageUrl} alt={title} />
      </div>
      <div className='flex justify-between p-3'>
        <div className="flex flex-col justify-between">
          <div className="font-bold mb-1 text-sm">{title}
            <p className="text-textlightgray text-xs mb-3">
              From {userName}
            </p>
            <Rating rating={rating} />
          </div>
          <p className="text-textgray text-xs">
            Status: {status}
          </p>
        </div>
        <div className="flex flex-col items-end justify-between">
          <Image src={likeIcon} alt="like" width={35} height={35} />
          <p className="text-textgray text-xs w-[60px]">
            Chapter {chapter}
          </p>
        </div>
      </div>
    </div>
  );
};

Card.displayName = 'Card';

export default Card;
