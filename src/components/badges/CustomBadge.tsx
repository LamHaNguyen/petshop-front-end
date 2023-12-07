import {Badge} from '@mui/material';
import React, {MouseEventHandler, ReactNode, forwardRef} from 'react';

export interface ICustomBadgeProps {
   invisible: boolean;
   badgeContent: string | number;
   children: ReactNode;
   onClick?: MouseEventHandler<HTMLSpanElement>;
}

export type Ref = HTMLDivElement;

const CustomBadge = forwardRef<Ref, ICustomBadgeProps>(
   ({invisible = true, badgeContent, children, onClick}, ref) => {
      return (
         <div ref={ref}>
            <Badge
               sx={{
                  '& .MuiBadge-badge': {
                     color: 'white',
                     backgroundColor: '#65A30D',
                  },
               }}
               invisible={invisible}
               badgeContent={badgeContent}
               color='primary'
               onClick={onClick}
            >
               {children}
            </Badge>
         </div>
      );
   },
);

// 👇️ set display name
CustomBadge.displayName = 'CustomBadge';
export default CustomBadge;
