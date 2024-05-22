import Image from 'next/image';
import React from 'react';
import { createClient } from '@/utils/supabase/server';

import profilePicture from '@/assets/temp-pp.png';

export default async function Profile() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Error fetching user:', error);
    throw new Error('Error fetching user');
  }

  return (
    <div className="flex h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center gap-4">
        <span className="text-[24px]">Welcome, {data.user.user_metadata.first_name}</span>
        <div className="flex items-center w-16 h-16 overflow-hidden rounded-full">
          <Image className='rounded-full object-cover' src={profilePicture} alt="pp" width={64} height={64} />
        </div>
      </div>
    </div>
  );
}
