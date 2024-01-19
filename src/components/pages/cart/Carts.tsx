'use client';
import React, {useEffect, useMemo, useState} from 'react';
import Cart from './Cart';
import {dataCart} from '@/datas/cart-data';
import {ICart} from '@/configs/interface';
import {Checkbox} from '@mui/material';
import {useAppSelector} from '@/hooks/reduxHooks';
import {RootState} from '@/configs/types';

export interface ICartsProps {
   data: ICart[];
   onTotal?: (value: number) => void;
}

export default function Carts({data, onTotal}: ICartsProps) {
   //lấy trạng thái của cart từ redux store
   const {cartUser} = useAppSelector((state: RootState) => state.cartReducer);

   const total = useMemo(() => {
      if (cartUser.length <= 0) return 0;
      const newCart = cartUser.filter((item) => {
         return item.checked;
      });

      const results = newCart.reduce((result, item) => {
         return (result += item.price * item.quantity);
      }, 0);
      return results;
   }, [cartUser]);

   useEffect(() => {
      if (!onTotal) return;

      onTotal(total);
   }, [total, onTotal]);
   return (
      <>
         <div className='flex items-center py-4 text-xl border-b border-gray-primary font-semibold text-black-main'>
            <div className='w-[8%] flex items-center'>
               <Checkbox />
            </div>
            <div className='flex-1 ml-8 flex flex-col items-center justify-center gap-5'>
               <span>Product</span>
            </div>

            <div className='lg:w-[10%] flex flex-col items-center justify-center'>
               <span>Quantity</span>
            </div>
            <div className='ml-2 md:w-[20%] flex items-center justify-center'>
               <span>Total</span>
            </div>
         </div>
         {cartUser.map((cart, index) => {
            return (
               <Cart
                  index={index}
                  key={cart.id + cart.size.toString() + cart.branch}
                  data={cart}
               />
            );
         })}
      </>
   );
}

//useAppSelector là một hook được sử dụng trong ứng dụng sử dụng Redux và Redux Toolkit.
//Hook này là một phần của react-redux và được tạo ra để giúp bạn lấy ra các giá trị từ Redux store một cách dễ dàng
//trong các thành phần của ứng dụng React.

//cụ thể, Hook này cho phép bạn truy cập trạng thái được quản lý bởi Redux từ Redux store của ứng dụng.
//hơn nữa, Nó sử dụng useMemo để giảm thừa khi trạng thái thay đổi. Điều này có nghĩa là nó chỉ trả về giá trị mới khi trạng thái thực sự đã thay đổi, giúp tối ưu hiệu suất và tránh các render không cần thiết.

//--------------------------------
//useMemo là một hook trong React được sử dụng để memoize (lưu trữ) kết quả của một hàm tính toán. Nó giúp tránh việc thực hiện tính toán lại mỗi khi component render lại, đặc biệt là trong trường hợp có các dependency đã được chỉ định.
//Khi giá trị được memoized bởi useMemo, nó được lưu trữ trong một bộ nhớ đặc biệt được quản lý bởi React, không phải là một bộ nhớ tạm thời trên ổ đĩa hay nơi nào khác. Nó là một cách tạm thời để lưu trữ kết quả của một hàm tính toán.
//cụ thể, useMemo được sử dụng để tính toán giá trị total dựa trên trạng thái carts

//Dependency array (mảng phụ thuộc) [carts] được cung cấp cho useMemo. Điều này có nghĩa là nếu giá trị trong mảng thay đổi, useMemo sẽ thực hiện lại tính toán. Trong trường hợp này, total chỉ sẽ được tính toán lại khi carts thay đổi.
//Trước hết, nó kiểm tra xem có bao nhiêu phần tử trong carts. Nếu không có phần tử nào, nó trả về 0 ngay lập tức vì không có gì để tính toán.
//Nếu có phần tử trong carts, nó sử dụng reduce để tính tổng giá trị của item.price * item.quantity cho từng mục trong mảng carts.
//Kết quả của tính toán được memoize, nghĩa là nếu carts không thay đổi, giá trị trước đó của total được tái sử dụng, giúp tối ưu hiệu suất bằng cách tránh tính toán lại khi không cần thiết.

//Trong đoạn mã của bạn, useEffect được sử dụng để thực hiện một "side effect" (tác động phụ) khi giá trị của biến total thay đổi. Side effect là một hành động mà bạn muốn thực hiện khi có sự thay đổi trong component, ví dụ như gửi dữ liệu lên server, thay đổi DOM, hoặc gọi các hàm khác.

//useEffect(() => {
// Side effect sẽ được thực hiện khi total thay đổi
// }, [total]);

//useEffect(() => {
//    if (!onTotal) return;

//    // Nếu onTotal được cung cấp, gọi nó với giá trị total mới (tức là nếu có một hàm callback được truyền vào component thông qua prop onTotal)
//    onTotal(total);
// }, [total, onTotal]);
