import React from 'react';
import Rating from './Rating';

interface Card {
  title: string;
  imageUrl: string;
  rating?: number;
  releaseDate?: string;
  genre?: string;
}

interface ListProps {
  cards: Card[];
  onCardClick: (card: Card) => void;
  selectedCard: Card | null;
}

const List = ({ cards, onCardClick, selectedCard }: ListProps) => {
  return (
    <div className="flex py-2 flex-col w-full">
      <div className="flex flex-wrap overflow-y-scroll overflow-x-hidden p-2 gap-4 hide-scrollbar">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`flex-none w-[170px] h-[250px] rounded-lg shadow-[0_0px_15px_-3px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-105 cursor-pointer ${selectedCard && selectedCard.title === card.title ? 'bg-primarypink' : 'bg-white'}`}
            onClick={() => onCardClick(card)}
          >
            <img src={card.imageUrl} alt={card.title} className="w-full h-2/3 object-cover object-top rounded-t-lg" />
            <div className="p-3 flex flex-col h-1/3 items-start justify-between overflow-auto">
              <h2 className={`font-semibold text-sm ${selectedCard && selectedCard.title === card.title ? 'text-textgray' : 'text-black'}`}>{card.title}</h2>
              {card.genre && <p className={`text-xs ${selectedCard && selectedCard.title === card.title ? 'text-textgray' : 'text-black'}`}>{card.genre}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

List.displayName = 'List';

export default List;
