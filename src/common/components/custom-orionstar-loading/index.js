// import React from 'react';
// import styles from './style.module.scss';
// const CustomOrionStarLoading = () => {
//   return (
//     <div className={`${styles.loading} ${styles.loading04}`}>
//       <span>F</span>
//       <span>I</span>
//       <span>S</span>
//       <span>H</span>
//       <span>B</span>
//       <span>E</span>
//       <span>T</span>
//     </div>
//   );
// };
// export default CustomOrionStarLoading;


// 'use client';

// import Image from 'next/image';
// import { useEffect, useState } from 'react';
// import Logo from "../../../../public/assets/logoImage-removebg.png"

// export default function CustomOrionStarLoading() {
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(interval);
//           return 100;
//         }
//         return prev + 1;
//       });
//     }, 10);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     // <div className="flex flex-col items-center justify-center h-screen bg-black">.
//     <div className="fixed inset-0 z-50 flex flex-col items-center justify-center h-screen bg-black">
//       <Image
//         className="mt-[200px]"
//         src={Logo}
//         alt="Fishbet Logo"
//         width={150}
//         height={150}
//         priority
//       />
//       <div className="w-3/4 mt-[50%] md:mt-[50px] w-[50%]">
//         <div className="h-2 bg-white/20 rounded-full overflow-hidden">
//           <div
//             className="h-full bg-white transition-all duration-300"
//             style={{ width: `${progress}%` }}
//           />
//         </div>
//         <p className="text-white text-center mt-2">{progress}%</p>
//       </div>
//     </div>
//   );
// }

'use client';

import Image from 'next/image';
import Logo from '../../../../public/assets/logoImage-removebg.png';

export default function CustomOrionStarLoading({ progress }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center h-screen bg-black">
      <Image
        className="mt-[200px]"
        src={Logo}
        alt="Fishbet Logo"
        width={150}
        height={150}
        priority
      />
      <div className="w-3/4 mt-[50%] md:mt-[50px] w-[50%]">
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-white text-center mt-2">{progress}%</p>
      </div>
    </div>
  );
}
