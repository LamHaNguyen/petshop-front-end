import {BannerTakeAction, ContainerContent} from '@/components/common';
import React, {useState} from 'react';
import {CategoriesOverview, Overview} from '..';
import {
   BoxTitle,
   Product,
   ProductRecent,
   ProductRecents,
   Products,
} from '@/components';
import {takeActionPageData} from '@/datas/take-action';
import {notFound} from 'next/navigation';
import {takeAction} from '@/apis/app';
import {ApiTakeAction, IBaseResponse} from '@/configs/interface';
import LogicalTakeAction from './LogicalTakeAction';

async function getData() {
   try {
      const res = await takeAction();

      if (!res) return null;

      return res;
   } catch (error) {
      return {
         data: {
            newArrivals: takeActionPageData.newArrivals,
         },
         errors: false,
         message: 'Use default data',
         status: 200,
      } as IBaseResponse<ApiTakeAction>;

      // notFound();
   }
}

export interface ITakeAtionPageProps {}

export default async function TakeAtionPage(props: ITakeAtionPageProps) {
   const response = await getData();

   // default data if error
   let newArrivals;

   // check data
   if (!response || response.errors) {
      notFound();
   } else {
      const {data} = response;
      newArrivals = data.newArrivals;
      console.log(123);
   }

   return (
      <>
         <ContainerContent>
            <Overview />
            <CategoriesOverview />
         </ContainerContent>
         <Products data={newArrivals} title='NEW ARRIVALS' />
         <BannerTakeAction />
         {/* <Products data={takeActionPageData.bestSellers.data} title="BEST SELLERS" pagination /> */}
         <LogicalTakeAction />
         <ProductRecents
            title={'YOUR RECENT VIEW'}
            data={takeActionPageData.recents}
         />
      </>
   );
}

/*

Người Dùng Truy Cập Trang "Take Action":

Người dùng truy cập trang "Take Action" của ứng dụng web.
Component TakeActionPage Được Load:

Khi trang được tải, component TakeActionPage sẽ được load.
Gọi API getData để Lấy Dữ Liệu:

Trong hàm getData, có một cuộc gọi API sử dụng hàm takeAction() để lấy dữ liệu từ máy chủ.
Dựa vào kết quả của cuộc gọi API, component sẽ xác định liệu có dữ liệu hợp lệ hay không.
Hiển Thị Trang với Dữ Liệu hoặc Dữ Liệu Mẫu:

Nếu cuộc gọi API thành công và có dữ liệu trả về, trang sẽ hiển thị các thông tin như ContainerContent, Overview, CategoriesOverview, Products, LogicalTakeAction, và ProductRecents.
Nếu có lỗi hoặc cuộc gọi API không thành công, trang sẽ chuyển hướng đến trang "Not Found" hoặc hiển thị dữ liệu mẫu.
Component LogicalTakeAction Sử Dụng React Query:

Trong LogicalTakeAction, sử dụng hook useQuery từ thư viện React Query để gọi API bestSellers và quản lý trạng thái dữ liệu (loading, error).
Dữ liệu từ cuộc gọi API được truyền cho component Products.
Component Products Hiển Thị Danh Sách Sản Phẩm:

Component Products nhận dữ liệu từ LogicalTakeAction và hiển thị danh sách sản phẩm.
Nếu có nút phân trang được kích hoạt, component sẽ hiển thị component Pagination.
Component Pagination Quản Lý Trang và Gọi Callback:

Component Pagination nhận thông tin về số trang và trạng thái hiện tại thông qua props.
Khi người dùng chuyển trang, component gọi callback (onPage) để thông báo cho parent component (LogicalTakeAction) về sự thay đổi trang.
Cuộc Gọi API bestSellers được Trigger khi Chuyển Trang:

Khi người dùng chuyển trang, cuộc gọi API bestSellers sẽ được thực hiện lại, và dữ liệu mới sẽ được cập nhật.
Hiển Thị Dữ Liệu mới và Phân Trang Mới:

Sau khi nhận được dữ liệu mới từ cuộc gọi API, component Products sẽ hiển thị danh sách sản phẩm mới.
Nếu có nút phân trang, component Pagination cũng sẽ được cập nhật để hiển thị thông tin phân trang mới.
Tổng quan, workflow của ứng dụng bắt đầu từ việc load trang "Take Action", gọi các API để lấy dữ liệu, và sau đó hiển thị dữ liệu trong các components tương ứng. Các components được thiết kế để tái sử dụng và phối hợp với nhau để tạo ra trải nghiệm người dùng hoàn chỉnh.

*/
