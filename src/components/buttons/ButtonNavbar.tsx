'use client';
import React, {ReactNode} from 'react';
import {usePathname} from 'next/navigation';
import CustomButton from './CustomButton';
import {WrapperAnimation} from '..';

interface IButtonNavbarProps {
   href?: string;
   border?: boolean;
   content: string;
}

//Nhiệm vụ của ButtonNavbar là trả về butotn or 1 link đã style và có animation đi kèm
export default function ButtonNavbar({
   href,
   border,
   content,
}: IButtonNavbarProps) {
   const path = usePathname();

   return (
      <WrapperAnimation hover={{y: -4}}>
         <CustomButton
            href={href}
            className={`uppercase px-6 font-semibold py-3 ${
               border ? 'border rounded border-[#A3E635]' : ''
            } ${path === href ? 'text-[#A3E635]' : 'text-white'}`}
         >
            {content}
         </CustomButton>
      </WrapperAnimation>
   );
}
