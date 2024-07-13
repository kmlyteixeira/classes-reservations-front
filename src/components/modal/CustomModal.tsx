import { Button, Modal } from "antd";
import React from "react";

export interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  title: string;
  onOk?: () => void;
  customFooter?: React.ReactNode;
  closable?: boolean;
}

const CustomModal = ({ children, open, title, onOk, customFooter, closable }: ModalProps) => {

  return (
    <Modal 
      title={title} 
      open={open} 
      onOk={onOk}
      closable={closable ? closable : false}
      destroyOnClose={true}
      footer={
        customFooter ? customFooter : 
        <div>
          <Button onClick={onOk} type="default">
            Ok
          </Button>
        </div>
      }
      >
      {children}
    </Modal>
  );
}

export default CustomModal;