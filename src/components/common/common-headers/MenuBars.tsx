import {CustomBadge, WrapperAnimation} from '@/components';
import {listProfile, navbar} from '@/datas/header';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Avatar} from '@mui/material';
import classNames from 'classnames';
import {AnimatePresence, motion} from 'framer-motion';
import Link from 'next/link';
import {memo, useState} from 'react';

export interface IMenuBarsProps {
   isScroll: boolean;
}

function MenuBars({isScroll}: IMenuBarsProps) {
   const [open, setOpen] = useState(false);

   const handleClick = () => {
      setOpen(!open);
   };

   return (
      <>
         <WrapperAnimation
            onClick={handleClick}
            className={classNames('cursor-pointer text-xl', {
               'text-[#111]': isScroll,
               'text-white': !isScroll,
            })}
         >
            {/* thằng này sẽ thay thế cho childrend trong motion.div của WrapperAnimation */}
            <CustomBadge
               badgeContent={4}
               onClick={() => setOpen((prev) => !prev)}
               invisible={open}
            >
               <FontAwesomeIcon icon={faBars} />
            </CustomBadge>
         </WrapperAnimation>

         <AnimatePresence>
            {open && (
               <div
                  onClick={() => setOpen(!open)}
                  className='fixed inset-0 bg-[rgba(0,0,0,.4)] flex text-[#757575]'
               >
                  <motion.div
                     //ngăn click vào chính thanh slide bar nó cũng tắt cái slide bar đi
                     onClick={(e) => e.stopPropagation()}
                     initial={{x: '-60%', opacity: 0}}
                     animate={{x: 0, opacity: 1}}
                     exit={{x: '-60%', opacity: 0}}
                     className='w-[80%] h-screen bg-white relative pt-4 pl-4 overflow-auto'
                  >
                     <div className='flex flex-col gap-2 pt-4 pl-5 mb-5'>
                        <Avatar
                           alt='avatar'
                           sx={{width: 80, height: 80}}
                           className='border-2'
                           src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                        ></Avatar>
                        <h2 className='font-medium '>Pham Khang</h2>
                     </div>

                     <ul className='py-2 mb-3 border-b border-[#ebebeb] text-sm'>
                        {listProfile.map((item) => {
                           return (
                              <li
                                 key={item.href}
                                 className='p-4 pr-0 font-medium rounded-tl-lg rounded-bl-lg hover:bg-[#f0f0f0] transition-all ease-linear '
                              >
                                 <Link
                                    href={item.href}
                                    className='flex gap-4 items-center'
                                 >
                                    <CustomBadge
                                       invisible={!item.style?.badge}
                                       badgeContent={4}
                                    >
                                       <FontAwesomeIcon
                                          className=' h-5 w-5'
                                          icon={item.icon}
                                       />
                                    </CustomBadge>
                                    <span>{item.title}</span>
                                 </Link>
                              </li>
                           );
                        })}
                     </ul>

                     <ul className='py-2 text-sm mb-7'>
                        {navbar.map((item) => {
                           return (
                              <li
                                 key={item.href}
                                 className='p-4 pr-0 font-medium rounded-tl-lg rounded-bl-lg hover:bg-[#f0f0f0] transition-all ease-linear '
                              >
                                 <Link
                                    href={item.href}
                                    className='flex gap-4 items-center'
                                 >
                                    {item.title}
                                 </Link>
                              </li>
                           );
                        })}
                     </ul>
                  </motion.div>
               </div>
            )}
         </AnimatePresence>
      </>
   );
}

export default memo(MenuBars);
