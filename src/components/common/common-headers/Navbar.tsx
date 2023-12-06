'use client';
import ButtonNavbar from '@/components/buttons/ButtonNavbar';
import {navbar} from '@/datas/header';
import React from 'react';

export default function Navbar() {
   return (
      <ul className='flex'>
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
