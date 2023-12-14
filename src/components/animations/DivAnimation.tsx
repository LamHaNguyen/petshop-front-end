'use client';

import React, {ReactNode, useEffect, useRef} from 'react';
import {motion, useAnimation, useInView} from 'framer-motion';

export interface IDivAnimationProps {
   children: ReactNode;
   className?: string;
   delay?: number;
   duration?: number;
   variants?: {};
}

export default function DivAnimation({
   children,
   className,
   delay = 0.1,
   duration = 0.5,
   variants = {
      hidden: {opacity: 0, y: 100},
      visible: {opacity: 1, y: 0},
   },
}: IDivAnimationProps) {
   //hiểu nôm na là lấy tham chiếu của thẻ này trong DOM
   const ref = useRef(null);
   //truyền vào useInView để kiểm tra nó có bị cuộn qua hay chưa
   const isInView = useInView(ref);
   //tạo 1 đối tượng điều khiển có tên là mainControl
   const mainControl = useAnimation();

   //useEffect sẽ theo dõi thay đổi của biến isInView và mainControl
   // - Khi isInView thay đổi, hook này sẽ đc kích hoạt
   useEffect(() => {
      //nếu trong khung hiển thị, mainControl sẽ đc kích hoạt, sử dụng trạng thái visible để animation (từ hidden -> visible)
      if (isInView) {
         mainControl.start('visible');
      } else {
         //nếu ko trong khung hiển thị, mainControl sẽ đc kích hoạt, sử dụng trạng thái hidden để animation (từ visible sang hidden)
         mainControl.start('hidden');
      }
   }, [isInView, mainControl]);

   return (
      //variants - prop chỉ định trạng thái of thẻ (ẩn hay hiện), là 1 object truyền vào initial or là animate
      //transition - prop chỉ định thời gian và độ trễ của animation, nhận vào 1 object {duration: 0.5, delay: 0.1}
      // -> độ trễ 0.1s (chuyển động sau 0.1s) & chuyển động trong 0.5s
      <motion.div
         ref={ref}
         variants={variants}
         initial={'hidden'}
         animate={mainControl}
         transition={{duration, delay}}
         className={className}
      >
         {children}
      </motion.div>
   );
}
