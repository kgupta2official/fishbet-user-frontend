// import CustomOrionStarLoading from '@/common/components/custom-orionstar-loading';
// import React from 'react';

// function loading() {
//   return (
//     <>
//       <CustomOrionStarLoading /> 
//     </>
//   );
// }

// export default loading;

'use client';

import { useEffect, useState } from 'react';
import CustomOrionStarLoading from '@/common/components/custom-orionstar-loading';

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, 10);

    return () => clearInterval(interval);
  }, []);

  return <CustomOrionStarLoading progress={progress} />;
}

