'use client';
import React, {MouseEventHandler, ReactNode} from 'react';
import {motion, AnimatePresence} from 'framer-motion';

// This interface of local component. Can delete if component haven't actribute
export interface IWrapperAnimationProps {
   styleAnimation?: {
      initial: {};
      animate: {};
      exits: {};
   };
   tag?: null | {};
   styleTag?: 'scale';
   hover?: {};
   children: ReactNode;
   className?: string;
   onClick?: MouseEventHandler<HTMLDivElement>;
}

//Thằng này sinh ra để quản tất cả các hiệu ứng
//Những thằng nào cần hiệu ứng sẽ cần bọc thằng này ở bên ngoài

//Hàm này trả về 1 thẻ div biết chuyển động, còn chuyển động như nào sẽ do các props truyền xuống quy định
{
   /* <motion.div
   onClick={onClick} //khi click vào div chuyển động này, sẽ gọi hàm onclick đc truyền xuống
   className={className}
   whileTap={tag || tags[styleTag]} //khi nhấn vào div chuyển động này, sẽ truyền giá trị của tag || tags
   animate={styleAnimation?.animate}
   exit={styleAnimation?.exits}
   initial={styleAnimation?.initial}
   whileHover={hover}
   >
   {children}
   </motion.div> */
}

//motion.div - tạo 1 thẻ div có khả năng thực hiện chuyển động
//Nó sẽ nhận vào 1 props chứa các hiệu ứng chuyển động (prop hover mặc định nếu ko truyền sẽ scale 1:1)
//whileHover - định nghĩa animation khi con chuột hover qua component
export default function WrapperAnimation({
   styleAnimation,
   hover = {
      scale: 1.1,
   },
   tag,
   children,
   className,
   styleTag = 'scale',

   onClick,
}: IWrapperAnimationProps) {
   const tags = {
      scale: {
         scale: 0.9,
      },
   };

   return (
      <motion.div
         onClick={onClick} //khi click vào và buông ra
         className={className}
         whileTap={tag || tags[styleTag]} //khi click vào và nhấn giữ 1 phần tử
         animate={styleAnimation?.animate}
         exit={styleAnimation?.exits}
         initial={styleAnimation?.initial}
         whileHover={hover}
      >
         {children}
      </motion.div>
   );
}

/*
`  
*/
