'use client';

import React, {ChangeEvent, FocusEvent, FormEvent, useState} from 'react';
import {BoxSign, LoadingPrimary, TextField, Notifycation} from '..';
import {Backdrop, CircularProgress, Stack} from '@mui/material';
import Validate from '@/utils/validate';
import {UserFormType} from '@/configs/types';
import {useRouter} from 'next/navigation';
import {useDispatch} from 'react-redux';
import {login} from '@/apis/user';
import {setToken} from '@/redux/slice/userSlice';

export interface ILoginPageProps {}

export default function LoginPage(props: ILoginPageProps) {
   /*
      Luồng xử lý:
      1. Khởi tạo các giá trị (state) ban đầu cần thiết (trạng thái loading là false, trạng thái form và error với dữ liệu từ initData)
         - Có nghĩa là khi component đc tạo, username và password (dữ liệu form sẽ là rỗng) - chưa đc điền.
      2. Khi người dùng nhập dữ liệu (onChange text field) -> cập nhật trạng thái form với dữ liệu mới.
         - [e.target.name]: e.target.value: Bạn đang nói rằng "hãy cập nhật trạng thái form sao cho trường có tên là e.target.name sẽ có giá trị là e.target.value".
            + e.target là text field đang có sự thay đổi
            + e.target.name là tên trường của text field
      3. Mỗi lần ng dùng focus ra ngoài (onBlur) -? gọi hàm hanldeBlur (validate dữ liệu ng dùng nhập và hiển thị lỗi tương ứng)
      4. Khi ng dùng submit:
         - Kiểm tra form có hợp lệ hay ko -> ko hợp lệ kết thúc và ko thực hiện tiếp
         - Nếu dữ liệu nhập ok -> gọi hàm login để thực hiện đăng nhập qua api
         - Nếu có lỗi từ server -> cập nhật trạng thái lỗi và thông báo lỗi tương ứng
         - Nếu đăng nhập thành công, chuyển hướng đến trang chính là lưu token vào Redux store. 

         - Loading:
            + Ban đầu khởi tạo là false nên component Loading ko hiện
            + Khi submit -> set lại là true để hiện biểu tượng loading, khi fetch xong api set lại là false cho mất đi
   */
   const [loading, setLoading] = useState(false);
   const [notifycation, setnotifycation] = useState(false);
   const dispatch = useDispatch();
   const router = useRouter();
   const initalDataForm = {
      username: '',
      password: '',
   };
   const [form, setForm] = useState<UserFormType>(initalDataForm);
   const [errors, setErrors] = useState<UserFormType>(initalDataForm);
   const validate = () => {
      let flag = false;
      const validErrors: UserFormType = initalDataForm;
      const validUsername = Validate.username(form.username);
      const validPassword = Validate.password(form.password);
      validErrors.username = validUsername.message;
      validErrors.password = validPassword.message;
      if (validUsername.error) {
         flag = true;
      }
      if (validPassword.error) {
         flag = true;
      }
      setErrors(validErrors);
      return flag;
   };
   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setForm({
         ...form,
         [e.target.name]: e.target.value,
      });
   };
   const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      const dynamicKey = e.target.name as keyof UserFormType;
      const {message} = Validate[dynamicKey](e.target.value);
      setErrors({
         ...errors,
         [dynamicKey]: message,
      });
   };
   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (validate()) return;
      try {
         setLoading(true);
         const res = await login(form);
         setLoading(false);
         if (res.errors && Object.keys(res.errors).length > 0) {
            setErrors({
               username: res.errors.username ? res.errors.username : '',
               password: res.errors.password ? res.errors.password : '',
            });
            return;
         }
         // all good
         router.push('/');
         dispatch(setToken(res.token));
      } catch (error) {
         console.log('error in login page: ' + error);
         setLoading(false);
         setnotifycation(true);
      }
   };
   return (
      <BoxSign onSubmit={handleSubmit} title='SIGN IN' titleBtn='SIGN IN'>
         <Stack spacing={'20px'}>
            <TextField
               message={errors.username}
               onBlur={handleBlur}
               onChange={handleChange}
               value={form.username}
               type='text'
               name='username'
               label={'Username'}
               size='small'
               fullWidth
            />
            <TextField
               onBlur={handleBlur}
               message={errors.password}
               onChange={handleChange}
               value={form.password}
               type='password'
               name='password'
               label={'Password'}
               size='small'
               fullWidth
            />
         </Stack>

         {loading && <LoadingPrimary />}
         <Notifycation
            onClose={() => {
               setnotifycation(false);
            }}
            open={notifycation}
            title='Something went wrong !'
            type='error'
         />
      </BoxSign>
   );
}
