import {ICart, IInitAppStoreState, IUser} from '@/configs/interface';
import {dataCart} from '@/datas/cart-data';
import {addCartTolocal, getCartFromLocal} from '@/utils/localStorage';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// init a store for app

const initState: {cartUser: ICart[]; checkAll: boolean} = {
   cartUser: (getCartFromLocal() as ICart[]) || [],
   checkAll: ((): boolean => {
      const arrCart = (getCartFromLocal() as ICart[]) || [];
      const checkAll = arrCart.every((item) => {
         return item.checked;
      });
      return checkAll;
   })(),
};

export const cart = createSlice({
   name: 'cart',
   initialState: initState,
   reducers: {
      addCart: (state, action: PayloadAction<ICart>) => {
         const item = state.cartUser.find(
            (i) => i.id === action.payload.id && i.size === action.payload.size,
         );

         if (item) {
            item.quantity = action.payload.quantity + item.quantity;
            addCartTolocal(state.cartUser);
            return;
         }

         const newObj = {
            ...state,
            cartUser: [...state.cartUser, action.payload],
         };
         addCartTolocal(newObj.cartUser);
         console.log(newObj.cartUser);

         return {
            ...newObj,
         };
      },

      modifyQuantity: (state, action: PayloadAction<ICart>) => {
         const item = state.cartUser.find(
            (i) => i.id === action.payload.id && i.size === action.payload.size,
         );

         if (item) {
            item.quantity = action.payload.quantity;
            addCartTolocal(state.cartUser);
            return;
         }
      },

      modifyChecked: (
         state,
         action: PayloadAction<{data: ICart; checked: boolean}>,
      ) => {
         const item = state.cartUser.find(
            (i) =>
               i.id === action.payload.data.id &&
               i.size === action.payload.data.size,
         );

         if (item) {
            item.checked = action.payload.checked;
            addCartTolocal(state.cartUser);

            const checkAll = state.cartUser.every((item) => {
               return item.checked;
            });

            state.checkAll = checkAll;
            return;
         }
      },

      checkedAll: (state, action: PayloadAction<{checked: boolean}>) => {
         const newCartUser = state.cartUser.map((item) => {
            return {
               ...item,
               checked: action.payload.checked,
            };
         });

         addCartTolocal(newCartUser);
         return {
            ...state,
            cartUser: [...newCartUser],
         };
      },

      setCheckedAllCartItem: (state, action: PayloadAction<boolean>) => {
         state.checkAll = action.payload;
      },

      removeCart: (
         state,
         action: PayloadAction<{data: ICart; index: number}>,
      ) => {
         state.cartUser.splice(action.payload.index, 1);
         addCartTolocal(state.cartUser);
      },

      updateDataCartWhenMount: (state, action: PayloadAction<ICart[]>) => {
         const newStateCartUser = [...state.cartUser];

         newStateCartUser.sort();
         action.payload.sort();

         const newCartUser = newStateCartUser.map((item, index) => {
            return {
               ...item,
               repo: action.payload[index].repo,
            };
         });

         addCartTolocal(newCartUser);
         return {
            ...state,
            cartUser: [...newCartUser],
         };
      },
   },
});

export const {addCart, removeCart} = cart.actions;
export default cart.reducer;

/*
Người Dùng Thực Hiện Hành Động:

Trong ứng dụng của bạn, người dùng thực hiện một hành động như thêm hoặc xoá sản phẩm từ giỏ hàng.
Gọi Hàm Xử Lý Hành Động:

Thông thường, thông qua sự tương tác người dùng (ví dụ: nhấn nút), một hàm xử lý hành động sẽ được gọi. Trong trường hợp này, có thể là dispatch(addCart(someCartItem)) hoặc dispatch(removeCart({ data: someCartItem, index: someIndex })). Hàm dispatch được cung cấp bởi Redux để gửi hành động đến store.
Hành Động Được Gửi Đến Redux Store:

Hàm xử lý hành động sẽ tạo một đối tượng hành động (action) và gửi nó đến Redux store thông qua hàm dispatch.
Reducers Xử Lý Hành Động:

Các reducers được định nghĩa trong slice Redux sẽ xử lý hành động tương ứng. Redux sẽ xác định reducer nào phải được gọi dựa trên type của hành động.
Thay Đổi Trạng Thái:

Reducer sẽ xử lý hành động và tạo ra một phiên bản mới của trạng thái. Trạng thái mới này được Redux lưu giữ và sẽ thay thế trạng thái cũ.
Cập Nhật UI:

Khi trạng thái trong Redux store thay đổi, các thành phần UI đã đăng ký để theo dõi phần của trạng thái này sẽ được cập nhật tự động. Điều này có nghĩa là các thành phần liên quan đến giỏ hàng sẽ hiển thị thông tin mới mà không cần phải gọi lại các hàm hay truy cập trực tiếp vào trạng thái.
Quá trình này giúp duy trì một luồng dữ liệu đơn hóa trong ứng dụng và làm cho việc quản lý trạng thái trở nên dễ dàng. Redux Toolkit giúp giảm bớt boilerplate code thông qua việc sử dụng các công cụ như createSlice, giúp tăng hiệu suất và sự tổ chức của mã.
*/
