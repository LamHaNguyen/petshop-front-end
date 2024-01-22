'use client';

import {Provider} from 'react-redux';
import {store} from './store';
import {ReactNode, useState} from 'react';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import {ReactQueryStreamedHydration} from '@tanstack/react-query-next-experimental';

interface IProviders {
   children: ReactNode;
}

export function Providers({children}: IProviders) {
   const [client] = useState(new QueryClient());
   return (
      <Provider store={store}>
         <QueryClientProvider client={client}>
            <ReactQueryStreamedHydration>
               {children}
            </ReactQueryStreamedHydration>
         </QueryClientProvider>
      </Provider>
   );
}

/*
Import các module và component cần thiết:

Provider từ react-redux: Cung cấp Redux store.
store từ './store': Import Redux store.
ReactNode, useState từ react: Dùng để quản lý trạng thái và kiểu dữ liệu cho prop children.
QueryClientProvider, QueryClient từ @tanstack/react-query: Cung cấp và quản lý React Query client.
ReactQueryStreamedHydration từ @tanstack/react-query-next-experimental: Có thể là tính năng thử nghiệm cho tải dữ liệu linh hoạt trong Next.js khi sử dụng React Query.
Định nghĩa và xuất thành phần Providers:

Tạo một QueryClient sử dụng useState.
Bao quanh ứng dụng với ba providers:
Redux Provider cung cấp Redux store.
QueryClientProvider cung cấp React Query client.
ReactQueryStreamedHydration có thể là một tính năng thử nghiệm để tối ưu hóa tải dữ liệu trong Next.js.
*/
