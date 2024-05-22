'use client';

import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import Carroussel from "../components/Carroussel";
import ReviewPanel from "../components/ReviewPanel";

interface Card {
  title: string;
  imageUrl: string;
  rating?: number;
  releaseDate?: string;
  genre?: string;
}

interface LibraryClientProps {
  userName: string;
}

const LibraryClient: React.FC<LibraryClientProps> = ({ userName }) => {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [libraryData, setLibraryData] = useState([] as Card[]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3000/api/get-movies${searchQuery ? `?title=${searchQuery}` : ''}`, {
        method: 'GET',
      });

      const { data } = await res.json();
      console.log('data', data);
      setLibraryData(data);
    };
    fetchData();
  }, [searchQuery]);

  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
  };

  return (
    <div className='flex flex-col overflow-x-hidden overflow-y-hidden p-4 hide-scrollbar w-full h-full'>
      <Header userName={userName} page='library' setSearchQuery={setSearchQuery} />
      <div className="flex h-full overflow-y-hidden overflow-x-hidden hide-scrollbar transition-all duration-500">
        <div className={`flex flex-col h-full overflow-y-scroll hide-scrollbar transition-all duration-500 ${selectedCard ? 'w-2/3' : 'w-full'}`}>
            <Carroussel 
              cards={libraryData}
              onCardClick={handleCardClick}
              selectedCard={selectedCard} 
            />
        </div>
        <ReviewPanel card={selectedCard} setSelectedCard={setSelectedCard} />
      </div>
    </div>
  );
};

LibraryClient.displayName = "LibraryClient";

export default LibraryClient;
