import {store} from '@/redux/store';
import {ISignDataResponse, IUser} from './interface';

/*
export:              export type này ra để xài đc ở những chỗ khác trong ứng dụng.
type ApiGetUsers:    khai báo 1 type ApiGetUsers.
Promise<IUser[]>:    1 đối tượng Promise chứa 1 mảng IUser.
= () =>:             ApiGetUsers là 1 hàm ko nhận tham số và trả về 1 đối tượng Promise chứa 1 mảng IUser.
*/
export type ApiGetUsers = () => Promise<IUser[]>;

/*
    - Định nghĩa 1 type RootState là KDL trả về của store.getState

    - state đc quản lý bởi các reducers và có thể truy cập đc thông qua hàm getState()
    - mỗi state trong reducers sẽ có các KDL khác nhau.
*/
export type RootState = ReturnType<typeof store.getState>;

/*
- Khi bạn gửi một action đến store bằng cách sử dụng dispatch, việc đảm bảo rằng action đó có đúng kiểu dữ liệu là quan trọng 
    để tránh lỗi runtime và giúp bạn có một mã nguồn an toàn hơn. 
- AppDispatch giúp định nghĩa một kiểu dữ liệu chính xác cho dispatch, và khi bạn sử dụng AppDispatch thay vì store.dispatch 
    trong mã nguồn của mình, TypeScript sẽ kiểm tra và đảm bảo rằng bạn chỉ gửi các action đúng kiểu.

*/
export type AppDispatch = typeof store.dispatch;

export type ValidTags = keyof JSX.IntrinsicElements;

export type SortType = string | null;

export type LocationTileType = 'center' | 'left' | 'right';

export type PagesProfileType = 'me' | 'history' | 'logout';

//api login
export type ApiLogin = (data: UserFormType) => Promise<ISignDataResponse>;
export type ApiRegister = (
   data: RegisterFormData,
) => Promise<ISignDataResponse>;

export type ValidateType = {message: string; error: boolean};

export type UserFormType = {username: string; password: string};
//api login

export type RegisterFormData = {
   username: string;
   gender: string | boolean;
   fullname: string;
   email: string;
   password: string;
   confirmPassword: string;
};
