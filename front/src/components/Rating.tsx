import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

interface RatingProps {
  rating: number;
}

const Rating = ({ rating }: RatingProps) => {
  const totalStars = 10;

  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, index) => (
        <span key={index}>
          {index < rating ? (
            <FaStar className="text-yellow-500" />
          ) : (
            <FaRegStar className="text-yellow-500" />
          )}
        </span>
      ))}
    </div>
  );
};

Rating.displayName = 'Rating';

export default Rating;
