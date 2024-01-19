'use client';
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import {Roboto_Flex} from 'next/font/google';
import {motion} from 'framer-motion';
import React, {useEffect, useState} from 'react';
const robotoFlex = Roboto_Flex({
   subsets: ['latin'],
   style: ['normal'],
   weight: ['300', '400', '500', '600', '700', '800'],
});
export interface IQuantityProps {
   maxValue: number;
   initValue?: number;
   onQuantity?: (value: number) => void;
}

export default function Quantity({
   maxValue,
   initValue,
   onQuantity,
}: IQuantityProps) {
   const [value, setValue] = useState(initValue || 1);

   const handlePlus = () => {
      if (maxValue <= 0) return 0;
      setValue((prev) => {
         if (prev > maxValue - 1) return prev;

         return prev + 1;
      });
   };

   const handleMinus = () => {
      setValue((prev) => {
         if (prev <= 1) return 1;
         return prev - 1;
      });
   };

   useEffect(() => {
      if (value > maxValue) {
         setValue(maxValue);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [maxValue]);

   useEffect(() => {
      if (!onQuantity) return;

      onQuantity(value);
   }, [value, onQuantity]);
   return (
      <div
         className={classNames('flex items-center gap-[40px] select-none', {
            [robotoFlex.className]: true,
         })}
      >
         <ul
            className={classNames(
               'flex items-center rounded-md py-[8px] bg-[#F2F2F2] text-lg',
            )}
         >
            <motion.li
               onClick={handleMinus}
               whileTap={{
                  scale: 0.8,
               }}
               className=' px-2 cursor-pointer'
            >
               <FontAwesomeIcon icon={faMinus} />
            </motion.li>
            <li className=' px-3 border-l border-r border-gray-primary'>
               {value}
            </li>
            <motion.li
               onClick={handlePlus}
               whileTap={{
                  scale: 0.8,
               }}
               className=' px-2 cursor-pointer'
            >
               <FontAwesomeIcon icon={faPlus} />
            </motion.li>
         </ul>
      </div>
   );
}

/*
Đoạn mã trên định nghĩa một thành phần React có tên là Quantity, có chức năng tạo ra một giao diện cho việc chọn số lượng của một mục trong ứng dụng. Dưới đây là giải thích về nghiệp vụ của đoạn mã này:

Props:

maxValue: Số nguyên, là giá trị tối đa cho phép cho việc chọn số lượng. Giá trị này giới hạn số lượng tăng lên.
initValue: Số nguyên, là giá trị mặc định của số lượng. Nếu không được cung cấp, giá trị mặc định là 1.
onQuantity: Hàm callback được gọi mỗi khi giá trị số lượng thay đổi. Nó nhận vào giá trị số lượng mới.
State:

Sử dụng hook useState để lưu trữ giá trị số lượng (value). Nếu initValue được cung cấp, giá trị khởi tạo sẽ là initValue, ngược lại là 1.
Hành Động Thay Đổi Số Lượng:

handlePlus: Tăng giá trị số lượng lên một đơn vị khi người dùng bấm nút cộng. Giới hạn tăng giá trị theo maxValue.
handleMinus: Giảm giá trị số lượng xuống một đơn vị khi người dùng bấm nút trừ. Giảm giá trị xuống tối thiểu là 1.
Effect Hook cho maxValue:

Sử dụng useEffect để đảm bảo giá trị số lượng không vượt quá maxValue. Nếu giá trị value lớn hơn maxValue, nó sẽ được đặt lại thành maxValue.
Effect Hook cho Callback onQuantity:

Sử dụng useEffect để gọi hàm callback onQuantity mỗi khi giá trị số lượng (value) thay đổi. Điều này có thể được sử dụng để thông báo cho các thành phần cha về thay đổi số lượng.
Giao Diện Người Dùng:

Render một giao diện đơn giản với nút cộng và trừ, hiển thị giá trị số lượng, và sử dụng thư viện framer-motion để thêm hiệu ứng khi người dùng nhấn vào nút cộng hoặc trừ.
*/
