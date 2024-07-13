'use client';

import { Layout } from 'antd';
import React, { ReactNode, useEffect } from 'react';
import MainLayout, { LayoutMainPanel } from '../MainLayout';
import MainFootbar from '../main-footbar/MainFootbar';
import MainHeader from '../main-header/MainHeader';
import MainSidebar from '../main-sidebar/MainSidebar';

export type AppPageProps = {
  children: ReactNode;
};

export default function AppPage({ children }: AppPageProps) {

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  useEffect(() => {
    
    if (typeof window === 'undefined') {
      return;
    }

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const breakpoint = 768;

  return (
    <MainLayout>
        <MainHeader></MainHeader>
        <Layout>
            {windowWidth > breakpoint ? <MainSidebar></MainSidebar> : null}
            <LayoutMainPanel>{children}</LayoutMainPanel>
            {windowWidth <= breakpoint ? <MainFootbar></MainFootbar> : null}
        </Layout>
    </MainLayout>
  );
}
