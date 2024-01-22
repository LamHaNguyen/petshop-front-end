import {ApiLogin, ApiRegister} from '@/configs/types';
import axios from '../configs/axios';
import {setTokenToCookie} from '@/utils/cookie';

/*
Luồng xử lý:
1. Khi ng dùng nhấn nút đăng nhập -> hàm login() sẽ đc gọi (với dữ liệu data đăng nhập đc truyền vào)
2. Hàm login use thư viện axios để gửi 1 yêu cầu http, cụ thể là 1 yêu cầu POST tới endpoint 'login'
3. Kiểm tra response trả về (nếu là falsy, do có lỗi, ko có dữ liệu) -> sẽ return null lun
4. Nếu response có giá trị trả về, sẽ gọi hàm setTokenToCookie() để lưu token vào cookie (hàm này mục đích là lưu trữ thông tin xác thực của ng dùng)
5. Cuối cùng là trả về dữ liệu phản hồi cho ứng dụng
*/

export const login: ApiLogin = async (data) => {
   const res = await axios({
      method: 'POST',
      url: 'login',
      data,
   });

   if (!res) return null;

   setTokenToCookie(res?.data.token);
   return res?.data;
};

export const register: ApiRegister = async (data) => {
   const res = await axios({
      method: 'POST',
      url: 'register',
      data,
   });

   if (!res) return null;

   return res?.data;
};
