import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";

const { confirm } = Modal;

interface ConfirmModalProps {
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmModal = ({ title, message, onConfirm, onCancel }: ConfirmModalProps) => {
    confirm({
        title: title,
        icon: <ExclamationCircleFilled />,
        content: message,
        okText: 'Sim',
        okType: 'danger',
        cancelText: 'Não',
        onOk() { onConfirm(); },
        onCancel() { onCancel(); }
      });
}

export default ConfirmModal;