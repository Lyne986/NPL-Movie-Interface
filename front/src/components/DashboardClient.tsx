'use client';

import React, { useState, useEffect } from "react";
import Header from "./Header";
import Card from "@/components/Card";
import CardRecent from "@/components/CardRecent";
import { fetchDashboardData } from "../utils/fetchDashboardData";

interface Card {
  title: string;
  chapter: number;
  image: string;
}

interface CardRecent {
  title: string;
  chapter: number;
  image: string;
  rating: number;
  status: string;
}

interface DashboardData {
  Cards: Card[];
  CardsRecent: CardRecent[];
}

interface DashboardClientProps {
  initialData: DashboardData;
  userName: string;
}

const DashboardClient: React.FC<DashboardClientProps> = ({ initialData, userName }) => {
  const [dashboardData, setDashboardData] = useState<DashboardData>(initialData);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDashboardData(searchQuery);
      if (data) {
        setDashboardData(data);
      }
    };
    fetchData();
  }, [searchQuery]);

  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <Header userName={userName} page="dashboard" setSearchQuery={setSearchQuery} />
      <div className="flex items-center justify-center w-full h-full overflow-scroll hide-scrollbar">
        <div className="flex flex-col w-full h-full p-6">
          <h1 className="text-[24px] mb-4">Suggestion</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-auto hide-scrollbar p-4">
            {dashboardData.Cards.map((card, index) => (
              <Card key={index} title={card.title} chapter={card.chapter} imageUrl={card.image} />
            ))}
          </div>
        </div>
        <div className="flex flex-col w-1/3 border-l border-gray-300 h-full pl-6 py-6">
          <h1 className="text-[24px]">My recent rating</h1>
          <div className="grid grid-cols-1 overflow-auto hide-scrollbar gap-6 p-4 h-full">
            {dashboardData.CardsRecent.map((card, index) => (
              <CardRecent key={index} title={card.title} chapter={card.chapter} imageUrl={card.image} rating={card.rating} status={card.status} userName={userName} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { DashboardClient };
