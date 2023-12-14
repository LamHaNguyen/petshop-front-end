'use client';

import {useEffect, useRef} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {motion} from 'framer-motion';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import style from './styles/banner.module.css';

export default function Banner() {
   //tạo 1 biến tham chiếu ref có tên là slider
   //biến này giống như túi thần kỳ of Doremon, có thể đựng bất cứ thứ gì và đặt ở bất kì đâu

   //Ex: có 1 ô input -> use tham chiếu để đặt input vào trong cái hộp này
   //có thể lấy ra và thay đổi giá trị of ô input mà ko cần thông qua state (còn có thể đặt tham chiếu cho thành phần react, giá trị...)

   //kiểu phải là Slider or null (vì truyền mặc định là null, ko | null sẽ báo lỗi)
   const slider = useRef<Slider | null>(null);

   //thiết lập cấu hình mặc định cho Slider
   const settings = {
      infinite: true, //lặp vô hạn, lặp tới lặp lui lặp xui lặp ngược
      speed: 2000, //thời gian chuyển đổi giữa các slide
      slidesToShow: 1, //số lượng slide hiển thị trên mỗi lần chuyển đổi
      slidesToScroll: 1, //số lượng slide được cuộn mỗi lần chuyển đổi
      autoplaySpeed: 22000, //thời gian giữa những lần chuyển đổi tự động
      autoplay: true, //Cho phép tự động chuyển slide
      cssEase: 'linear', //Kiểu chuyển động của slide
   };

   //sử dụng hook useEffect khi muốn thực hiện 1 công việc gì đó SAU KHI COMPONET CHỨA NÓ render rồi
   //ở đây useEffect đang được sử dụng để TỰ ĐỘNG THỰC HIỆN 1 hành động trong component SAU 1 KHOẢNG TIME

   //useEffect nhận vào 1 hàm, hàm này sẽ đc gọi lại khi:
   // + Component đc render
   // + or mảng dependencies thay đổi
   // --> (trong trường hợp này là một dependency rỗng [] nên chỉ chạy một lần sau khi component mount).
   useEffect(() => {
      //setInterval sẽ chạy độc lập theo chu kỳ time của nó mà ko cần đợi useEffect đc gọi
      const idInterval = setInterval(() => {
         slider.current?.slickNext();
      }, 20000);

      //clearInterval  được trả về từ useEffect CHỈ ĐƯỢC GỌI khi component unmounted or khi dependencies thay đổi và useEffect đc gọi lại ()
      //cleanup function dùng để xóa bỏ interval khi component unmounted - khi component ko đc render nữa.
      //khi component không còn được sử dụng, clearInterval sẽ được gọi để dừng chu kỳ thời gian, ngăn chặn việc gọi slickNext() khi component không còn tồn tại
      return () => {
         clearInterval(idInterval);
      };
   }, []);

   return (
      <div
         className={`w-full max-h-[166px] md:max-h-[220px] lg:max-h-[540px] relative overflow-hidden select-none ${style['box-btn']}`}
      >
         {/* tạo 1 carousel slide */}
         {/* truyền tham chiếu vào thành phần Slider để có thể tương tác vs Slide ở những nơi khác */}
         {/* {...settings} - hiểu nôm na là setting có thuộc tính gì, nó sẽ đc truyền cho Slider -> Slider cũng có thuộc tính đó */}
         <Slider ref={slider} {...settings}>
            <img
               className='object-cover h-full'
               src='/images/1.svg'
               alt='slide'
            />
            <img
               className='object-cover h-full'
               src='/images/2.svg'
               alt='slide'
            />
         </Slider>

         <div
            className={`${style['box-btn-items']} absolute px-10 lg:px-12 w-full m-auto top-[50%] left-0 right-0 text-green-86EFAC text-sm  items-center justify-between hidden`}
         >
            <motion.div
               whileHover={{x: -10}}
               whileTap={{scale: 0.9}}
               onClick={(e) => slider?.current?.slickPrev()}
               className='w-6 h-6  md:w-slide-btn md:h-slide-btn bg-[rgba(255,255,255,0.4)] top-[50%] 
                 flex items-center rounded-full justify-center cursor-pointer'
            >
               <FontAwesomeIcon icon={faChevronLeft} />
            </motion.div>
            <motion.div
               whileHover={{x: 10}}
               whileTap={{scale: 0.9}}
               onClick={(e) => slider?.current?.slickNext()}
               className='w-6 h-6  md:w-slide-btn md:h-slide-btn bg-[rgba(255,255,255,0.4)] top-[50%] 
                 flex items-center rounded-full justify-center cursor-pointer'
            >
               <FontAwesomeIcon icon={faChevronRight} />
            </motion.div>
         </div>
      </div>
   );
}
