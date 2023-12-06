'use client';
import React, {ReactNode} from 'react';
import {motion, AnimatePresence} from 'framer-motion';

// This interface of local component. Can delete if component haven't actribute
export interface IWrapperAnimationProps {
   styleAnimation?: {};
   hover?: {};
   children: ReactNode;
}

//Component này sinh ra để bọc những thằng nào càn áp dụng hiệu ứng chuyển động
//motion.div - tạo 1 thẻ div có khả năng thực hiện chuyển động
//Nó sẽ nhận vào 1 props chứa các hiệu ứng chuyển động (prop hover mặc định nếu ko truyền sẽ scale 1:1)
//whileHover - định nghĩa animation khi con chuột hover qua component
export default function WrapperAnimation({
   styleAnimation,
   hover = {
      scale: 1.1,
   },
   children,
}: IWrapperAnimationProps) {
   return <motion.div whileHover={hover}>{children}</motion.div>;
}

/*
`  
*/
