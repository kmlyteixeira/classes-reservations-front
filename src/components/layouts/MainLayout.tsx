'use client';

import { ReactNode } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const MainLayoutGlobalStyles = createGlobalStyle`
  :root {
  --color-primary: #EDEDED;
  --color-secondary: #FFFFFF;
  
  --color-blue: #004A8D;
  --color-orange: #F7941D;
  --color-blue-light: #3C5F8D;
  --color-orange-light: #FDC180;
  --color-orange-lighter: #FFEACD;
  --color-gray-dark: #8c8c8c;
}
  
  body, main {
    background-color: var(--color-primary);
  }
`;

const LayoutContainer = styled.div`
`;

export const LayoutMainPanel = styled.main`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 1rem;
  zoom: 92%;
`;

export type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  if (!children) throw new Error('MainLayout must have children');

  return (
    <>
      <MainLayoutGlobalStyles />
      <LayoutContainer>{children}</LayoutContainer>
    </>
  );
}
