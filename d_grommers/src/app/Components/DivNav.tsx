'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

type InteractiveDivProps = {
  path: string;
  children: React.ReactNode;
};

const InteractiveDiv = ({ path, children }: InteractiveDivProps) => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push(path);
  };

  return (
    <div onClick={handleNavigation} className='bg-white border rounded-md border-gray-300 h-32 sm:w-auto md:w-15 flex items-center justify-center hover:cursor-pointer'>
      {children}
    </div>
  );
};

export default InteractiveDiv;
