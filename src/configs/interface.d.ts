//Định nghĩa 1 số kiểu Type cơ bản đc use trong dự án
//Khi muốn sửa type chỉ cần vô file này -> dễ quản lý

//1 interface đại diện cho các action trong redux
export interface Action<T, P> {
   readonly type: T; //type có kiểu là T
   readonly data?: P; //data có kiểu là P
}

//1 interface generic đại diện cho 1 response từ 1 API
export interface IResponce<T> {
   message: string;
   status: number;
   errors: boolean;
   data: T;
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
   branch: string;
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
