import {ValidTags} from '@/configs/types';
import Link from 'next/link';
import React, {ReactNode} from 'react';

interface IMainButtonProps {
   href?: string;
   children: ReactNode;
   className?: string;
}

export default function CustomButton({
   href = '',
   children,
   className,
}: IMainButtonProps) {
   let Tag: ValidTags | typeof Link = 'button';

   if (href) {
      Tag = Link;
   }

   return (
      <Tag href={href} className={className}>
         {children}
      </Tag>
   );
}

// export interface IMainButtonProps {
//    children: ReactNode;
//    href?: string;
//    className?: string;
// }

// //Mục dích custom là để use đc cho cả trường hợp nút đó là 1 link
// //Nhận vào 1 prop href để xem nút đó có phải là thẻ a hay ko
// export default function CustomButton({
//    children,
//    href = '',
//    className,
// }: IMainButtonProps) {
//    //
//    //khai báo 1 biến Tag có kiểu là ValidTags, or nếu ko là ValidTags thì phải là Link
//    //giá trị mặc định của thẻ gán là button
//    let Tag: ValidTags | typeof Link = 'button';

//    //Nếu có href và href ko rỗng thì là thẻ Link
//    if (href && href !== '') {
//       Tag = Link;
//    }

//    return (
//       <Tag className={className} href={href}>
//          {children}
//       </Tag>
//    );
// }
