import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {setupListeners} from '@reduxjs/toolkit/dist/query';
import {appReducer} from './slice';

export const store = configureStore({
   reducer: {
      appReducer,
   },
});

setupListeners(store.dispatch);

/*
setupListeners là một phương thức được cung cấp bởi Redux Toolkit để cấu hình các listeners cho middleware, đặc biệt là để quản lý query thích ứng khi bạn sử dụng createAsyncThunk từ Redux Toolkit và Redux Query.

Để hiểu cụ thể hơn:

Middleware của Redux Toolkit:
Redux Toolkit cho phép bạn sử dụng middleware để mở rộng hoặc thay đổi cách các actions được xử lý trước khi chúng đến reducer. Middleware là một cách để giữa actions được gửi và reducer.

Redux Query và createAsyncThunk:
Khi sử dụng Redux Toolkit và Redux Query, thường bạn sẽ sử dụng createAsyncThunk để xử lý các thao tác không đồng bộ như lấy dữ liệu từ API. Redux Query cung cấp một cách để quản lý các queries và mutations một cách dễ dàng.

setupListeners:
Khi bạn sử dụng Redux Query, bạn cần một số listeners để theo dõi các sự kiện liên quan đến các queries và mutations. Điều này có thể bao gồm việc theo dõi khi một query bắt đầu, khi nó kết thúc (hoặc thất bại), và các trạng thái liên quan khác.

Phương thức setupListeners giúp bạn tự động cấu hình các listeners này dựa trên các actions mà Redux Query sinh ra.

javascript
Copy code
import {setupListeners} from '@reduxjs/toolkit/dist/query';

setupListeners(store.dispatch);
Khi bạn gọi setupListeners và truyền vào store.dispatch, nó sẽ tự động theo dõi các actions liên quan đến các queries và mutations mà bạn đã định nghĩa bằng cách sử dụng Redux Query. Các listeners sẽ tự động được thiết lập để gọi các hàm callback mà bạn có thể định nghĩa, giúp bạn dễ dàng theo dõi và xử lý các trạng thái của các queries và mutations.

Tóm lại, setupListeners giúp bạn tự động cấu hình các listeners cho Redux Query, làm giảm sự phức tạp khi làm việc với các thao tác không đồng bộ trong ứng dụng React sử dụng Redux Toolkit.
*/
