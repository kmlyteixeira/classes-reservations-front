import { NotificationType } from "@/interfaces/notifications/NotificationsType";
import { Badge, Button, List } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import ApprovalModalContent from "../approval-modal-content/ApprovalModalContent";
import CustomModal from "../modal/CustomModal";

interface NotificationsListProps {
  notifications: NotificationType[];
}

const NotificationsList = ({ notifications }: NotificationsListProps) => {
  const router = useRouter();
  const [selectedNotification, setSelectedNotification] = React.useState<NotificationType | null>(null);

  const onReprove = () => {
    setSelectedNotification(null);
  }

  const onApprove = () => {
    setSelectedNotification(null);
  }

  console.log(notifications);

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={notifications}
        renderItem={(notification) => (
          <List.Item
            style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '20em' }}
          >
            {notification.unread ? <Badge color="var(--color-orange)" dot style={{ margin: '5px' }}></Badge> : null}
            {notification.message}
            {notification.unread ? <Button type="default" onClick={() => router.push('/reports')}>Visualizar</Button> : null}
          </List.Item>
        )}
      />
      <CustomModal
        open={selectedNotification !== null}
        title="Solicitação de Troca de Sala"
        customFooter={
          <div style={{ display: 'flex', justifyContent: 'flex-end', columnGap: '1em' }}>
            <Button type="primary" danger onClick={onReprove}>Reprovar</Button>
            <Button type="default" onClick={onApprove}>Aprovar</Button>
          </div>
        }>
        {selectedNotification && <ApprovalModalContent data={selectedNotification.action}></ApprovalModalContent>}
      </CustomModal>
    </>

  );
}

export default NotificationsList;