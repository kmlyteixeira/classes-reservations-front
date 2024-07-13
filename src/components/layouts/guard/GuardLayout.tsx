'use client';

import { ReactNode } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalGuardStyles = createGlobalStyle`
  body {
    background-color: var(--color-primary);
    color: var(--color-white);
  }
`;

const GuardContainer = styled.div`
  height: 100%;
  display: flex;
  flex: 1;
  place-items: center;
  justify-content: center;
`;

export type GuardLayoutProps = {
  children?: ReactNode;
};

export default function GuardLayout({ children }: GuardLayoutProps) {
  return (
    <>
      <GlobalGuardStyles />
      <GuardContainer>{children}</GuardContainer>
    </>
  );
}
