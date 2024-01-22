import {UserFormType} from './types';

//Định nghĩa 1 số kiểu Type cơ bản đc use trong dự án
//Khi muốn sửa type chỉ cần vô file này -> dễ quản lý

//1 interface đại diện cho các action trong redux
export interface Action<T, P> {
   readonly type: T; //type có kiểu là T
   readonly data?: P; //data có kiểu là P
}

//interface mô tả thông tin ng dùng
export interface IUser {
   id?: number;
   username: string;
   password: string;
   email?: string;
}

export interface IInitAppStoreState {
   numberCart: number;
   user: IUser | null;
}

export interface IPet {
   id: string | number;
   name: string;
   image: string;
   breed: string;
   type: string;
   size: string;
   sex: string;
   fostered: string | number;
   description: string;
   fosterDate: number;
   like: boolean;
}

export interface IProduct {
   id: string | number;
   name: string;
   image: string;
   brand: string;
   size: string[] | number[];
   rating: number;
   price: number;
   oldPrice: number;
   discount: number;
}

export interface IPost {
   id: number | string;
   title: string;
   thumbnail: string;
   contents: string;
   createdAt: string | number;
   updatedAt: string | number;
}

export interface IPostsPreview {
   primary: IPost;
   propose: IPost[];
}

export interface ICart {
   id: string | number;
   image: string;
   name: string;
   branch: string;
   size: string | number;
   price: number;
   quantity: number;
   repo: number;
   checked?: boolean;
}

// phân trang
export interface IOtherHistory {
   id: string | number;
   datePlace: string | number;
   total: number;
   state: 'buy' | 'cancel'; // vd buy | cancel
   stateMessage: string; //vd: Delivery on October 1, 2023
   products: ICart[];
}

export interface IOtherHistories {
   data: IOtherHistory[];
   paginationTotal: 10; // số lượng trang ( vd: phân được 10 trang )
}

export interface IProfile {
   id: string;
   username: string;
   fullname: string;
   email: string;
   phone: string;
   genther: boolean;
   birthday: number; // Cứ trả về Date trong java bình thường
}

export interface IChart {
   title: string[]; // mảng các tháng
   data: {
      name: string; // tên mảng dữ liệu
      data: number[]; // mảng dữ liệu
   };
}
export interface IImpactOfYear {
   title: string; // mảng các tháng
   data: number;
}

export interface IStatisDashboard {
   revenue: ICart;
   product: IChart;
   impactOfYear: IImpactOfYear[];
}

export interface ISignDataResponse {
   message: string;
   token: string;
   errors: UserFormType | null;
}

export interface IBaseResponse<T> {
   message: string;
   status: number;
   errors: boolean;
   data: T;
}

export interface ApiTakeAction {
   newArrivals: IProduct[];
}

export interface ApiBestSeller {
   data: IProduct[];
   pages: number;
}
