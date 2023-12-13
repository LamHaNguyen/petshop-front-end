'use client';
import React, {useState} from 'react';
import Tippy from '@tippyjs/react/headless';
import {listProfile} from '@/datas/header';
import Link from 'next/link';
import {Avatar, Badge} from '@mui/material';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import CustomBadge from '@/components/badges/CustomBadge';
import {WrapperAnimation} from '@/components';

export interface IMenuUserProps {}

//tabIndex={0} - là 1 thuộc tính của thẻ html, cho phép tab trên bàn phím (-1 là ko cho phép)
//{...attr} - sao chép tất cả thuộc tính của đối tượng attr vào thẻ ul
export default function MenuUser(props: IMenuUserProps) {
   const [openMenu, setOpenMenu] = useState(false);

   return (
      <div>
         <Tippy
            interactive
            visible={openMenu}
            onClickOutside={() => setOpenMenu(false)}
            render={(attr) => {
               return (
                  <ul
                     className='w-[188px] bg-[#F2F2F2] text-[#4C4C4C] rounded-lg overflow-hidden shadow-xl'
                     tabIndex={0}
                     {...attr}
                  >
                     {listProfile.map((item) => (
                        <li
                           key={item.title}
                           className='hover:bg-green-65a30d hover:text-white transition-all ease-linear duration-150'
                        >
                           <Link href={item.href} className='px-6 py-3 flex'>
                              <CustomBadge
                                 invisible={!item.style?.badge}
                                 badgeContent={4}
                              >
                                 <FontAwesomeIcon icon={item.icon} />
                              </CustomBadge>
                              <span className='mx-3'>{item.title}</span>
                           </Link>
                        </li>
                     ))}
                  </ul>
               );
            }}
         >
            {/* Phan tu tuong tac Tippy */}

            <CustomBadge
               badgeContent={4}
               onClick={() => setOpenMenu((prev) => !prev)}
               invisible={openMenu}
            >
               <WrapperAnimation hover={{}}>
                  <Avatar
                     alt='avartar'
                     className='cursor-pointer border-2'
                     src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                  />
               </WrapperAnimation>
            </CustomBadge>
         </Tippy>
      </div>
   );
}
