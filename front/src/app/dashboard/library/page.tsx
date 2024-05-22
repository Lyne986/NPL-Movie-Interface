import React from "react";
import { createClient } from '../../../utils/supabase/server';
import LibraryClient from "../../../components/LibraryClient";

interface Card {
  title: string;
  imageUrl: string;
  rating?: number;
  releaseDate?: string;
  genre?: string;
}

interface LibraryData {
  Cards: Card[];
}

const Library = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Error fetching user:', error);
    throw new Error('Error fetching user');
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6 overflow-y-hidden overflow-x-hidden w-full h-full">
      <LibraryClient userName={data.user.user_metadata.first_name} />
    </div>
  );
}

Library.displayName = "Library";

export default Library;
