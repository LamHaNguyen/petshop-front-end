'use client';

import classNames from 'classnames';
import {Source_Serif_4} from 'next/font/google';
import Image from 'next/image';
import React from 'react';
import {delay, easeIn, motion} from 'framer-motion';

const sourceSerif4 = Source_Serif_4({
   subsets: ['latin'],
   weight: ['400', '500'],
});

export interface IImpactItemProps {
   data: {
      image: string;
      quantity: string;
      title: string;
      style?: {
         width: string;
         height: string;
      };
   };
}

export default function ImpactItem({data}: IImpactItemProps) {
   return (
      //variants - prop chỉ định trạng thái of thẻ (ẩn hay hiện), là 1 object truyền vào initial or là animate
      //transition - prop chỉ định thời gian và độ trễ của animation, nhận vào 1 object {duration: 0.5, delay: 0.1}
      // -> độ trễ 0.1s (chuyển động sau 0.1s) & chuyển động trong 0.5s
      //   <motion.div
      //      initial={{opacity: 0, y: 100}}
      //      animate={{opacity: 1, y: 0}}
      //      transition={{duration: 0.5, delay: 0.1}}
      //   >
      <div
         className={classNames(
            'flex flex-col items-center justify-center gap-4',
            {
               [sourceSerif4.className]: true,
            },
         )}
      >
         <div className={classNames('relative w-[100px] h-[100px]')}>
            <Image fill src={`/icons/${data.image}`} alt='img-icon' />
         </div>
         <h4 className='font-bold text-green-main-dark text-2xl lg:text-[48px]'>
            {data.quantity}
         </h4>
         <span className='text-lg lg:text-xl font-bold text-black-main'>
            {data.title}
         </span>
      </div>
      //   </motion.div>
   );
}
