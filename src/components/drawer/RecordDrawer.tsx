'use client';

import ConfirmModal from '@/commons/modal/ConfirmModal';
import { Button, Drawer } from 'antd';
import { ReactNode } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

export type RequestType = 'edit' | 'create' | 'recurrence';

const RecordDrawerGlobalStyles = createGlobalStyle`
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
    overflow: hidden;
  }
`;

const RecordDrawerContainer = styled(Drawer)`
  border-radius: 10px 0 10px 0;
`;


export type RecordDrawerProps = {
  children: ReactNode;
  open: boolean;
  title: string;
  onClose: () => void;
  onSave: () => void;
  requestType?: RequestType | null;
};

export default function RecordDrawer({ children, open, title, onClose, onSave, requestType }: RecordDrawerProps) {
  if (!children) throw new Error('RecordDrawer must have children');

  const formatTitle = `${requestType === 'edit' ? 'Editar' : 'Criar'} ${title}`

  const handleOnClose = () => {
    return ConfirmModal({
      title: 'Tem certeza que deseja sair?',
      message: 'Ao sair, todas as alterações não salvas serão perdidas.',
      onConfirm: () => onClose(),
      onCancel: () => console.log('Cancelar')
    })
  }

  return (
    <>
      <RecordDrawerGlobalStyles />
      <RecordDrawerContainer 
        width={720} 
        open={open}
        title={formatTitle}
        destroyOnClose={true}
        closable={true}
        onClose={handleOnClose}
        extra={
          <Button type="default" onClick={onSave}>
            Salvar
          </Button>
        }
      >
          {children}
      </RecordDrawerContainer>
    </>
  );
}
