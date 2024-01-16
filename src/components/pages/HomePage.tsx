import * as React from 'react';
import Container from '@mui/material/Container';

import {Cart, Feedback, KnowldegeAboutFoster} from '..';
import {Box} from '@mui/material';
import Link from 'next/link';
import ImpactOfTheYear from '../impacts/ImpactOfTheYear';
import AboutCom from '../common/common-components/AboutCom';
import Pets from '../products-and-pets/Pets';
import {homePageData} from '@/datas/home-page';

export interface IHomePageProps {}

// This is funtion server component
// All component don't have 'use client' is server component
export default function HomePage(props: IHomePageProps) {
   return (
      <>
         <ImpactOfTheYear />
         <AboutCom />
         <Pets data={homePageData.pets} />
         <Feedback />
         <KnowldegeAboutFoster data={homePageData.postsPreview} />
      </>
   );
}
