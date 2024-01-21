import {IInitAppStoreState, IUser} from '@/configs/interface';
import {getTokenFromCookie} from '@/utils/cookie';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

export const loginRedux = createAsyncThunk('app/login', async () => {});

// init a store for app

const initState: IInitAppStoreState = {
   numberCart: 0,
   user: null,
};

export const app = createSlice({
   name: 'app', //tên slice
   initialState: initState,
   reducers: {
      //là 1 đối tượng, trong đó mỗi thuộc tính chứa 1 reducer của slice
      /*
      (state) => {
         //increment tên action creator
         state.numberCart++;
      }, là hàm reducer xử lý
      */
      increment: (state) => {
         //increment tên action creator
         state.numberCart++;
      },
      descrement: (state) => {
         //descrement tên action creator
         state.numberCart--;
      },

      addUser: (state, action: PayloadAction<IUser>) => {
         //addUser tên action creator
         return {
            ...state,
            user: {
               ...action.payload,
            },
         };
      },
   },
});

export const {increment, descrement, addUser} = app.actions;
export default app.reducer;

/*
   Cách hoạt động của Redux:
   1. Tạo ra các action bằng action creators (Sử dụng Redux Toolkit sẽ tạo bằng createSlice())
      + Mỗi action là "1 đối tượng có ít nhất 1 trường type" để mô tả loại action.

   2. Ở đâu đó trong ứng dụng, bạn có thể gửi 1 action trong qua hàm dispatch() (có thể hiểu là gửi đi 1 tín hiệu)
      - Hàm dispatch() sẽ nhận vào 1 action, được trả về từ hàm creator action

   3. Để gửi đi 1 action, ta phải gọi action creator của nó, và hàm này trả về 1 action
      - Ex: Khi đăng nhập thành công, gửi 1 dispatch để lưu token dispatch(setToken(res.token));
         + Trong TH này setToken() là 1 action creator đc tạo qua createSlice().
         + Hàm setToken(res.token) trả về 1 action với type là user/setToken  và payload là res.token
            _Trong Redux Toolkit, nó sẽ tự độn tạo type cho action khi use createSlice() bằng cách: tên_slice/tên_action

   4. Tín hiệu (action) này, sẽ được gửi đến reducer trong Redux Store, ứng dụng sẽ tìm reducer xử lý tương ứng (dựa vào type action) và cập nhật trạng thái mới.
      + Mỗi reducer nhận vào 2 tham số: state cũ và action đc dispatch

*/
