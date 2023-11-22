import axios from 'axios';

/*
   - File cấu hình axios, tạo 1 instance of axios = create() và truyền vào các thông số đã cấu hình
   - baseURL để rỗng -> có thể thay đổi trong khi use
*/

/*
   'Content-type': Đây là một header HTTP thông thường được sử dụng để chỉ định kiểu nội dung của một request hoặc response.
   Giá trị của 'Content-type' được đặt là 'application/json; charset=utf-8', tức là dữ liệu truyền đi và từ server sẽ ở định dạng JSON 
   và sử dụng bảng mã UTF-8.

   'application/json': Đây là loại nội dung của dữ liệu được truyền đi và từ server. Nó chỉ định rằng dữ liệu sẽ ở định dạng JSON.

   'charset=utf-8': Đây là một phần của Content-type, chỉ định bảng mã ký tự được sử dụng. 
   UTF-8 là một bảng mã ký tự phổ biến, hỗ trợ nhiều ngôn ngữ và ký tự quốc gia.
   
   --> 'Content-type': 'application/json; charset=utf-8'
   - Bạn đang nói với server và ứng dụng rằng dữ liệu sẽ được truyền tải và nhận dạng ở dạng JSON và sử dụng bảng mã UTF-8. 
   Điều này thường được sử dụng trong các ứng dụng web hiện đại khi gửi và nhận dữ liệu dưới dạng JSON, đặc biệt là khi làm việc với các API RESTful.

*/

const axiosConfig = axios.create({
   baseURL: '',
   headers: {
      'Content-type': 'application/json; charset=utf-8',
   },
});

export default axiosConfig;
