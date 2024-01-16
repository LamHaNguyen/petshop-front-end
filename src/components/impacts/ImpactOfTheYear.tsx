import classNames from 'classnames';
import {Sansita_Swashed, Source_Serif_4} from 'next/font/google';
import Image from 'next/image';
import React from 'react';
import ImpactItem from './ImpactItem';
import {homePageData} from '@/datas/home-page';
import DivAnimation from '../animations/DivAnimation';

export interface IImpactOfTheYear {}

//hỗ trợ bởi next font
//mỗi object sẽ có 1 classname tương ứng để gọi font
const sansita = Sansita_Swashed({
   //hàm tạo font Sansita_Swashed nhận vào 1 object có các thuộc tính
   subsets: ['latin'], //quy định bộ chữ hỗ trợ (chữ cái latin or tiếng việt)
   weight: ['800'], //độ đậm của font chữ
});

export default function ImpactOfTheYear(props: IImpactOfTheYear) {
   return (
      <div>
         <div className='w-full'>
            <div className='w-full min-h-[315px] bg-[#F1F1F1] md:px-0'>
               <div>
                  <h3
                     //hiểu nôm na là nối chuỗi các class truyền vào
                     className={classNames(
                        'py-12 text-[#374151] text-5xl text-center tracking-[8px]',
                        //vì tên thuộc tính có ký tự đặc biệt - dấu chấm nên phải bọc trong []
                        //class dựa vào giá trị động - nếu true sẽ đc thêm vào, nếu false sẽ ko đc nối vào
                        {[sansita.className]: true},
                     )}
                  >
                     The impact of 1st year
                  </h3>

                  <div className='flex max-w-[70%] justify-between m-auto'>
                     {homePageData.impactOfYear.map((impact, index) => (
                        <DivAnimation delay={index * 0.2} key={impact.quantity}>
                           <ImpactItem data={impact} />
                        </DivAnimation>
                     ))}
                  </div>
               </div>
            </div>
            <div className='w-full h-full max-h-[200px]'>
               <img
                  loading='lazy'
                  src={'/images/clip-path.svg'}
                  alt='clip-path'
               />
            </div>
         </div>
      </div>
   );
}
