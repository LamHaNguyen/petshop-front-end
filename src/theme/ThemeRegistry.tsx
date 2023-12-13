'use client';
import {createTheme, ThemeOptions, ThemeProvider} from '@mui/material/styles';
import {CssBaseline} from '@mui/material';
import React, {ReactNode} from 'react';
import {NextAppDirEmotionCacheProvider} from './EmotionCache';
import {Poppins} from 'next/font/google';

const poppins = Poppins({
   subsets: ['latin'],
   style: ['normal', 'italic'],
   weight: ['300', '400', '500', '700', '800'],
});

export interface IThemeRegistryProps {
   children: ReactNode;
}

const themeOptions: ThemeOptions = {
   typography: {
      fontFamily: poppins.style.fontFamily,
      fontSize: 14,
   },
   palette: {
      background: {
         default: '#ffffff',
      },
   },
};

const theme = createTheme(themeOptions);

export default function ThemeRegistry({children}: IThemeRegistryProps) {
   return (
      <NextAppDirEmotionCacheProvider options={{key: 'mui'}}>
         <ThemeProvider theme={theme}>
            <CssBaseline>{children}</CssBaseline>
         </ThemeProvider>
      </NextAppDirEmotionCacheProvider>
   );
}

/*

Component ThemeRegistry trong đoạn mã của bạn có mục tiêu chính là cung cấp một cách để định cấu hình theme và áp dụng nó cho toàn bộ ứng dụng. Mui cung cấp ThemeProvider để bạn có thể đóng gói các thành phần của ứng dụng trong một theme chung.

Một số lợi ích của việc sử dụng ThemeProvider và cách tiếp cận như trong ThemeRegistry có thể bao gồm:

Quản lý Global Theme:

Giúp bạn định cấu hình các thuộc tính chung của theme mà bạn muốn áp dụng cho toàn bộ ứng dụng một cách dễ dàng.
Tổ chức Code:

Tạo một wrapper component cho ThemeProvider giúp tổ chức code của bạn. Điều này có thể hữu ích khi bạn có nhiều cấu hình theme, hoặc muốn dễ dàng thay đổi theme trong tương lai.
Quản lý Cache:

Trong đoạn mã của bạn, có một sự liên quan đến việc quản lý cache (sử dụng EmotionCache). Điều này có thể là một yếu tố quan trọng nếu bạn đang sử dụng Emotion để quản lý styles trong ứng dụng.

*/
