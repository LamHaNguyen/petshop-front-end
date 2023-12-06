import Image from 'next/image';
import Navbar from './common-headers/Navbar';
import Link from 'next/link';

export interface IHeaderProps {}

export default function Header({}: IHeaderProps) {
   return (
      <header className='h-[85px] bg-[#374151]'>
         <div className='flex justify-between items-center h-full w-[1280px] m-auto'>
            <div className='w-[136px] h-[42px]'>
               <Image
                  src={'/images/large-logo.svg'}
                  width={0}
                  height={0}
                  alt='PetFoster Logo'
                  className='w-full h-full object-contain'
               />
            </div>
            <Navbar />
            <div>user profile</div>
         </div>
      </header>
   );
}
