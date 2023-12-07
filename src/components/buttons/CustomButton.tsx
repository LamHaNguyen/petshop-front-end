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
