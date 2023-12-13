'use client';

import React, {ReactNode, memo} from 'react';
import {usePathname} from 'next/navigation';
import CustomButton from './CustomButton';
import {WrapperAnimation} from '..';
import classNames from 'classnames';

interface IButtonNavbarProps {
   href: string;
   contents: string;
   border?: boolean;
   isScroll?: boolean;
}

//Nhiệm vụ của ButtonNavbar là trả về butotn or 1 link đã style và có animation đi kèm
function ButtonNavbar({href, contents, border, isScroll}: IButtonNavbarProps) {
   const path = usePathname();

   return (
      <WrapperAnimation hover={{y: -4}}>
         <CustomButton
            href={href}
            className={classNames(
               `font-bold transition-all ease-linear text-sm }
           border-2 py-2 px-6 rounded-lg `,
               {
                  'text-green-main': path === href && !isScroll,
                  'text-green-main-dark': path === href && isScroll,
                  'border-green-main': border && !isScroll,
                  'border-green-main-dark': border && isScroll,
                  'border-transparent': !border,
                  'hover:text-green-main-dark': isScroll,
                  'hover:text-green-main': !isScroll,
               },
            )}
         >
            {contents}
         </CustomButton>
      </WrapperAnimation>
   );
}

// React.memo được sử dụng để bao bọc một functional component và tạo ra một phiên bản mới của component đó.
//Component mới này có khả năng tự động kiểm tra các props nhận được và sẽ chỉ render lại khi có sự thay đổi trong props.
export default memo(ButtonNavbar);
