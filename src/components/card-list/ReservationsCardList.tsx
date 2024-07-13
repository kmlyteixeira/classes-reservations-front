import ConfirmModal from "@/commons/modal/ConfirmModal";
import { ReservationsType } from "@/interfaces/reservations/ReservationsType";
import { formatDateWithMonth, formatDateWithTime } from "@/shared/format-date";
import { Badge, Empty, Tag } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import styled from "styled-components";
import ReviewCard, { ReviewCardContentProps } from "../card/ReviewCard";

dayjs.extend(utc);

interface ReservationsCardListProps {
  data: ReservationsType[] | undefined;
  onEdit: (record: ReservationsType) => void;
  onCancel: (record: ReservationsType) => void;
}

const AuxCard = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-secondary);
    padding: 10px;
    margin-top: 10px;
    border-radius: 10px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
    cursor: pointer;

    &:hover {
      font-weight: bold;
    }
`;

const CustomContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`;

const ReservationsCardList = ({ data, onEdit, onCancel }: ReservationsCardListProps) => {
  const totalReservations = data?.length;
  const reservations = data?.slice(0, 2) || [];

  const renderTitle = (reservation: ReservationsType) => {
    return (
      reservation.isCompleted ? 
        reservation.class.name : 
        <>
          {reservation.class.name + '   '} 
          <Tag bordered={false} color="volcano">Pendente</Tag>
        </>
    );
  }

  const content: ReviewCardContentProps[] = reservations.map((reservation) => {
    return {
      title: renderTitle(reservation),
      name: reservation.owner,
      date: formatDateWithMonth(reservation.dateStart),
      time: `${formatDateWithTime(reservation.dateStart)} às ${formatDateWithTime(reservation.dateEnd)}`,
      data: reservation
    }
  }
  );

  const showConfirm = (record: ReservationsType) => {
    return ConfirmModal({
        title: 'Tem certeza que deseja cancelar esta reserva?',
        message: 'Esta ação não poderá ser desfeita.',
        onConfirm: () => onCancel(record),
        onCancel: () => {}
    });
  }

  const handleEdit = (record: ReservationsType) => {
    onEdit(record);
  }

  const onClickSeeMore = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/reservations';
    }
  }

  return (
    <CustomContent>
      <Title level={5} style={{ color: 'var(--color-blue)', paddingLeft: '10px', margin: 0 }}>
        Minhas Próximas Reservas
      </Title>
      <div>
        {data === undefined || data?.length == 0 ? (
          <Empty description={
            <div style={{ minWidth: '250px' }}>
              Suas reservas aparecerão aqui!
            </div>
          }></Empty>) : (
          <>
            {content?.map((content, index) => (
              <ReviewCard key={index} content={content} onCancel={() => showConfirm(content.data)} onEdit={handleEdit} />
            ))}
            <AuxCard onClick={onClickSeeMore}>
              <Paragraph style={{ margin: 0, color: 'var(--color-orange)' }}>Ver tudo</Paragraph>
              <Badge count={totalReservations} style={{ backgroundColor: 'var(--color-orange)', color: 'var(--color-secondary)' }}></Badge>
            </AuxCard>
          </>
        )}
      </div>
    </CustomContent>
  );
}

export default ReservationsCardList;