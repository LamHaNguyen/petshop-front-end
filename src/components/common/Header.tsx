'use client';

import Image from 'next/image';
import Navbar from './common-headers/Navbar';
import Link from 'next/link';
import MenuUser from './common-headers/MenuUser';
import {useState} from 'react';
import {useMotionValueEvent, useScroll} from 'framer-motion';
import MenuBars from './common-headers/MenuBars';

export interface IHeaderProps {}

export default function Header({}: IHeaderProps) {
   const {scrollY} = useScroll();
   const [isBgBlack, setIsBgBlack] = useState(true);

   useMotionValueEvent(scrollY, 'change', (latestY) => {
      setIsBgBlack(latestY > 0);
   });

   return (
      <header
         className={`h-[60px] lg:h-[85px] fixed z-50 w-full ${
            isBgBlack && 'bg-[rgba(0,0,0,.4)]'
         } transition-colors ease-linear`}
      >
         <div className='lg:flex justify-between items-center h-full m-auto lg:w-[90%] xl:w-main hidden md:w-[840px]'>
            <Link href={'/'} className='w-[136px] h-[42px]'>
               <Image
                  src={'/images/large-logo.svg'}
                  width={0}
                  height={0}
                  alt='PetFoster Logo'
                  className='w-full h-full object-contain'
               />
            </Link>
            <Navbar />
            <MenuUser />
         </div>

         {/* responcesive */}
         <div className='w-[90%] m-auto h-full text-white flex items-center justify-between select-none lg:hidden'>
            <MenuBars />
         </div>
      </header>
   );
}
