'use client';

import styled from 'styled-components';

export const ContentCardTitle = styled.h1`
  font-size: 1.6rem;
  text-align: center;
`;

export const ContentCardText = styled.p``;

const ContentCard = styled.main`
  min-width: 420px;
  max-width: 620px;
  min-height: 1rem;
  padding: var(--card-padding);
  border-radius: var(--card-border-radius);
  box-shadow: var(--card-box-shadow);
  background: white;
`;

export default ContentCard;
