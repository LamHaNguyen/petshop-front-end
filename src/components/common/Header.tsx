'use client';

import Image from 'next/image';
import Navbar from './common-headers/Navbar';
import Link from 'next/link';
import MenuUser from './common-headers/MenuUser';
import {useState} from 'react';
import {useMotionValueEvent, useScroll} from 'framer-motion';
import MenuBars from './common-headers/MenuBars';
import classNames from 'classnames';

export interface IHeaderProps {}

export default function Header({}: IHeaderProps) {
   const {scrollY} = useScroll();
   const [isChangeBg, setIsChangeBg] = useState(false);

   useMotionValueEvent(scrollY, 'change', (latestY) => {
      setIsChangeBg(latestY > 0);
   });

   return (
      <header
         className={classNames(
            `h-[40px] lg:h-header w-full fixed inset-0 z-50  transition-colors ease-linear px-10`,
            {
               'bg-white': isChangeBg,
               'shadow-xl': isChangeBg,
            },
         )}
      >
         <div className=' w-main m-auto h-full lg:flex  xl:w-main items-center justify-between max-w-[100%] hidden'>
            <Link href={'/'} className='w-[136px] h-[42px]'>
               <Image
                  src={`/images/${
                     !isChangeBg ? 'large-logo.svg' : 'logo-large-dark.svg'
                  }`}
                  alt='logo'
                  width={0}
                  height={0}
                  className='w-full h-full object-contain'
               />
            </Link>
            <Navbar isScroll={isChangeBg} />
            <MenuUser />
         </div>

         {/* responcesive */}
         <div className=' m-auto h-full text-white flex items-center justify-between select-none lg:hidden'>
            <MenuBars isScroll={isChangeBg} />
         </div>
      </header>
   );
}
