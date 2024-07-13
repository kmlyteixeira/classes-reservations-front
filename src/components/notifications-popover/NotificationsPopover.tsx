import { NotificationType } from "@/interfaces/notifications/NotificationsType";
import { useGetReservations } from "@/services/reservations/reservation-api";
import { BellOutlined } from "@ant-design/icons";
import { Badge, Button, Popover } from "antd";
import NotificationsList from "./NotificationsList";

const NotificationPopover = () => {
  const { reservations } = useGetReservations();

  const notifications: NotificationType[] = [
    {
      message: reservations?.filter(x => !x.isCompleted).length? 
        `Você possui ${reservations?.filter(x => !x.isCompleted).length} reserva(s) pendente(s) de aprovação` : 
        'Você não possui reservas pendentes de aprovação!',
      unread: reservations?.filter(x => !x.isCompleted).length ? true : false
    }
  ]

  return (
    <>
      <Popover
        title="Aprovações Pendentes"
        placement="bottomRight"
        trigger="click"
        content={
          <NotificationsList notifications={notifications} />
        }
      >
        <Badge dot count={reservations?.filter(x => !x.isCompleted).length} size="default" color="var(--color-blue)">
          <Button
            type="text"
            icon={<BellOutlined />}
          />
        </Badge>
      </Popover>
    </>

  );
}

export default NotificationPopover;