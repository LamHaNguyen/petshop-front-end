'use client';
import classNames from 'classnames';
import React, {useEffect, useState} from 'react';
import {MenuBars, MenuUser, Navbar} from '.';
import Link from 'next/link';
import Image from 'next/image';
import {useMotionValueEvent, useScroll} from 'framer-motion';
//api login
import {useAppDispatch, useAppSelector} from '@/hooks/reduxHooks';
import {RootState} from '@/configs/types';
import {fetchUserByToken} from '@/redux/slice/userSlice';
import {unwrapResult} from '@reduxjs/toolkit';
//api login

export interface IHeaderProps {
   dynamic?: boolean;
}

export default function Header({dynamic = true}: IHeaderProps) {
   const {scrollY} = useScroll();

   const [isChangeBg, setIsChangeBg] = useState(false);
   // //api login
   const {token} = useAppSelector((state: RootState) => state.userReducer);
   const {user} = useAppSelector((state: RootState) => state.userReducer);

   const dispatch = useAppDispatch();
   // //api login

   useMotionValueEvent(scrollY, 'change', (latest) => {
      setIsChangeBg(latest > 0);
   });

   // api login
   useEffect(() => {
      console.log('reloaded', token);
      (async () => {
         const actionResult = dispatch(fetchUserByToken());
         const curUser = unwrapResult(await actionResult);
         console.log(curUser);
      })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [token]);
   //   api login

   return (
      <>
         {dynamic ? (
            <header
               className={classNames(
                  `h-[40px] lg:h-header w-full fixed inset-0 z-50  transition-colors ease-linear px-10`,
                  {
                     'bg-white': isChangeBg,
                     'shadow-xl': isChangeBg,
                     'bg-[rgba(0,0,0,.4)]': !isChangeBg,
                  },
               )}
            >
               <div className=' w-main m-auto h-full lg:flex  xl:w-main items-center justify-between max-w-[100%] hidden'>
                  <Link
                     href={'/'}
                     className='w-[136px] h-[42px] cursor-pointer '
                  >
                     <Image
                        src={`/images/${
                           !isChangeBg
                              ? 'large-logo.svg'
                              : 'logo-large-dark.svg'
                        }`}
                        alt='logo'
                        width={0}
                        height={0}
                        className='w-full h-full object-contain'
                     />
                  </Link>

                  <Navbar isScroll={isChangeBg} />

                  {!user ? (
                     <div
                        className={classNames(
                           'flex items-center justify-center gap-1 font-medium',
                           {
                              ['text-white']: !isChangeBg,
                           },
                        )}
                     >
                        <Link
                           className='hover:underline text-1xl'
                           href={'/login'}
                        >
                           Login
                        </Link>
                        /
                        <Link
                           className='hover:underline text-1xl'
                           href={'/register'}
                        >
                           Register
                        </Link>
                     </div>
                  ) : (
                     <MenuUser />
                  )}
               </div>
               {/* responcesive */}
               <div className=' m-auto h-full text-white flex items-center justify-between select-none lg:hidden'>
                  <MenuBars isScroll={isChangeBg} />
               </div>
            </header>
         ) : (
            <header
               className={classNames(
                  `h-[40px] lg:h-header w-full fixed inset-0 z-50  transition-colors ease-linear px-10 shadow-xl`,
                  {
                     'bg-[#fff]': true,
                  },
               )}
            >
               <div className=' w-main m-auto h-full lg:flex  xl:w-main items-center justify-between max-w-[100%] hidden'>
                  <Link
                     href={'/'}
                     className='w-[136px] h-[42px] cursor-pointer '
                  >
                     <Image
                        src={`/images/logo-large-dark.svg`}
                        alt='logo'
                        width={0}
                        height={0}
                        className='w-full h-full object-contain'
                     />
                  </Link>

                  <Navbar isScroll={true} />

                  {!user ? (
                     <div className='flex items-center justify-center gap-1 font-medium'>
                        <Link
                           className='hover:underline text-1xl'
                           href={'/login'}
                        >
                           Login
                        </Link>
                        /
                        <Link
                           className='hover:underline text-1xl'
                           href={'/register'}
                        >
                           Register
                        </Link>
                     </div>
                  ) : (
                     <MenuUser />
                  )}
               </div>
               {/* responcesive */}
               <div className=' m-auto h-full text-white flex items-center justify-between select-none lg:hidden'>
                  <MenuBars isScroll={true} />
               </div>
            </header>
         )}
      </>
   );
}

/*
   
Đoạn mã trên định nghĩa một component React có tên là Header được sử dụng để hiển thị phần header của trang web. Một số chức năng quan trọng của component này bao gồm:

Chuyển đổi màu nền khi cuộn:

Sử dụng useScroll và useMotionValueEvent từ thư viện framer-motion để theo dõi giá trị scroll (scrollY).
Khi trang được cuộn, component kiểm tra giá trị scroll và chuyển đổi màu nền của header dựa trên giá trị của isChangeBg.
Kiểm tra đăng nhập:

Sử dụng Redux Toolkit để lấy giá trị token và user từ Redux store thông qua hooks useAppSelector.
Khi component được tạo (useEffect), dispatch action fetchUserByToken để lấy thông tin người dùng dựa trên token. Kết quả được log ra console.
Hiển thị nội dung header:

Dựa vào giá trị của prop dynamic, component hiển thị một header có thể thay đổi màu nền khi cuộn (dynamic = true) hoặc header với màu nền cố định (dynamic = false).
Sử dụng thư viện classnames để quản lý các class CSS dựa trên điều kiện.
Menu và liên kết đến các trang khác:

Hiển thị logo của trang và thanh điều hướng (Navbar) chứa các liên kết đến các trang khác.
Nếu người dùng chưa đăng nhập, hiển thị các liên kết đến trang đăng nhập (/login) và trang đăng ký (/register). Nếu đã đăng nhập, hiển thị menu người dùng (MenuUser).
Phản hồi đối với các thiết bị di động:

Đối với thiết bị di động, component sử dụng menu thanh ngang (MenuBars).
*/
