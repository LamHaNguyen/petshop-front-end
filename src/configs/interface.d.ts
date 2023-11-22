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
