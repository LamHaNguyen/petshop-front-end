'use client';
import ButtonNavbar from '@/components/buttons/ButtonNavbar';
import {navbar} from '@/datas/header';
import React from 'react';

export default function Navbar() {
   return (
      <ul className='h-navbar lg:flex hidden items-center gap-1 text-white'>
         {navbar.map((nav) => (
            <li key={nav.title}>
               <ButtonNavbar
                  href={nav.href}
                  border={nav.style?.border}
                  content={nav.title}
               ></ButtonNavbar>
            </li>
         ))}
      </ul>
   );
}
