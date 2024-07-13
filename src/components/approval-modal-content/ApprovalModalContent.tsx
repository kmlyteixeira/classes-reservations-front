import { NotificationActionType } from "@/interfaces/notifications/NotificationsType";
import { formatDateWithMonth, formatDateWithTime } from "@/shared/format-date";
import { SwapOutlined } from "@ant-design/icons";
import { List, Space } from "antd";
import styled from "styled-components";

interface ApprovalModalContentProps {
  data: NotificationActionType | undefined;
}

const CustomLabel = styled(Space)`
  border-radius: 5px;
  padding: 5px 15px 5px 15px;
  margin-top: 1em;
  border-left: 1px solid var(--color-orange);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
`;

const ApprovalModalContent = ({ data }: ApprovalModalContentProps) => {
  const reservationDate = formatDateWithMonth(data?.reservation.dateStart);
  const reservationTime = formatDateWithTime(data?.reservation.dateStart) + ' às ' + formatDateWithTime(data?.reservation.dateEnd);

  return (
    <List
      size="large">
        <List.Item>
          <strong>Solicitante:</strong> {data?.reservation.owner}
        </List.Item>
        <List.Item>
          <div style={{ display: 'flex', flexDirection: 'column'}}>
            <strong>Reserva:</strong> 
            <p style={{ marginTop: '1em' }}>{data?.reservation.title}</p>
            <p style={{ color: 'var(--color-orange)'}}>{`${reservationDate} - ${reservationTime}`}</p>
          </div>
        </List.Item>
        <List.Item>
          <div style={{ display: 'flex', columnGap: '2em' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <strong>Trocar:</strong>
              <CustomLabel>
                {data?.reservation?.class.name}
              </CustomLabel>
            </div>
            <SwapOutlined style={{ fontSize: 'large', marginBottom: '5px' }}/>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <strong>Por:</strong>
              <CustomLabel>
                {data?.sugestedClassroom}
              </CustomLabel>
            </div>
          </div>
        </List.Item>
    </List>
  );
}

export default ApprovalModalContent;