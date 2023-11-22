import * as React from 'react';
import createCache from '@emotion/cache';
import {useServerInsertedHTML} from 'next/navigation';
import {CacheProvider as DefaultCacheProvider} from '@emotion/react';
import type {
   EmotionCache,
   Options as OptionsOfCreateCache,
} from '@emotion/cache';

export type NextAppDirEmotionCacheProviderProps = {
   /** This is the options passed to createCache() from 'import createCache from "@emotion/cache"' */
   options: Omit<OptionsOfCreateCache, 'insertionPoint'>;
   /** By default <CacheProvider /> from 'import { CacheProvider } from "@emotion/react"' */
   CacheProvider?: (props: {
      value: EmotionCache;
      children: React.ReactNode;
   }) => React.JSX.Element | null;
   children: React.ReactNode;
};

export function NextAppDirEmotionCacheProvider(
   props: NextAppDirEmotionCacheProviderProps,
) {
   const {options, CacheProvider = DefaultCacheProvider, children} = props;

   const [{cache, flush}] = React.useState(() => {
      const cache = createCache(options);
      cache.compat = true;
      const prevInsert = cache.insert;
      let inserted: string[] = [];
      cache.insert = (...args) => {
         const serialized = args[1];
         if (cache.inserted[serialized.name] === undefined) {
            inserted.push(serialized.name);
         }
         return prevInsert(...args);
      };
      const flush = () => {
         const prevInserted = inserted;
         inserted = [];
         return prevInserted;
      };
      return {cache, flush};
   });

   useServerInsertedHTML(() => {
      const names = flush();
      if (names.length === 0) {
         return null;
      }
      let styles = '';
      // eslint-disable-next-line no-restricted-syntax
      for (const name of names) {
         styles += cache.inserted[name];
      }
      return (
         <style
            key={cache.key}
            data-emotion={`${cache.key} ${names.join(' ')}`}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
               __html: styles,
            }}
         />
      );
   });

   return <CacheProvider value={cache}>{children}</CacheProvider>;
}

/*
   Đoạn mã này định nghĩa một component React có tên là NextAppDirEmotionCacheProvider. Công dụng chính của nó là cung cấp một EmotionCache (cache cho styling) cho ứng dụng React của bạn, đồng thời xử lý việc chèn các styles vào trang và quản lý các styles đã được chèn vào server-side rendering (SSR) trong môi trường Next.js.

Dưới đây là mô tả chi tiết:

Props:

options: Là các tùy chọn được chuyển vào hàm createCache từ thư viện @emotion/cache. Điều này bao gồm các cài đặt cho việc quản lý cache styling.
CacheProvider: Là một prop tùy chọn cho component CacheProvider từ thư viện @emotion/react. Nếu không được cung cấp, nó sẽ sử dụng DefaultCacheProvider.
children: Các thành phần con mà NextAppDirEmotionCacheProvider bao bọc.
Hàm tạo EmotionCache:

Sử dụng createCache(options) để tạo một instance của EmotionCache.
Thiết lập cache.compat = true; để sử dụng chế độ tương thích, đặt cờ cho việc sử dụng với @emotion/react.
Override hàm cache.insert để theo dõi các styles đã được chèn.
Hook useServerInsertedHTML:

Sử dụng hook useServerInsertedHTML từ next/navigation để theo dõi và xử lý các styles đã được chèn từ phía server-side rendering.
Khi trang được tải, nó sẽ trả về các styles đã được chèn vào trang bởi server.
Render và Chèn Styles:

Trong quá trình render, component này sẽ chèn các styles vào trong CacheProvider và quản lý chúng.
Khi trang được render trên server, nó sẽ theo dõi các styles đã được chèn và chèn chúng vào một <style> tag để đảm bảo tính nhất quán giữa client và server.
Tóm lại, NextAppDirEmotionCacheProvider giúp quản lý cache và chèn styles cho ứng dụng React của bạn, đặc biệt là khi sử dụng server-side rendering trong môi trường Next.js.
*/
