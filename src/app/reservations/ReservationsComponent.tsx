'use client'

import { useSearchFilter } from "@/commons/hooks/search-filter/useSearchFilter";
import ConfirmModal from "@/commons/modal/ConfirmModal";
import AppPage from "@/components/layouts/app/AppPage";
import MainBreadcrumb from "@/components/layouts/main-breadcrumb/MainBreadcrumb";
import { FloorsLabels } from "@/interfaces/classes/ClassesType";
import { ReservationsType, attributeDescriptions } from "@/interfaces/reservations/ReservationsType";
import { useDeleteReservation, useGetReservations } from "@/services/reservations/reservation-api";
import { formatDateWithMonth, formatDateWithTime } from "@/shared/format-date";
import { Button, Space, Table, TableColumnsType, Tag, Typography, message } from "antd";
import Title from "antd/es/typography/Title";
import { Content } from "antd/lib/layout/layout";
import dayjs from "dayjs";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import styled from "styled-components";

const CustomContent = styled(Content)`
  background-color: var(--color-secondary);
  margin: 0 10px 10px 10px;
  border-radius: 10px;
  max-height: 84%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  z-index: 0;
`;

const Reservations = () => {

  const [dataByOwner, setDataByOwner] = React.useState<ReservationsType[]>();
  const pathname = usePathname();
  const { reservations, refetch } = useGetReservations();
  const { remove } = useDeleteReservation();
  const { searchFilter } = useSearchFilter<ReservationsType>('title', attributeDescriptions);

  const showConfirm = (record: ReservationsType) => {
    return ConfirmModal({
      title: 'Tem certeza que deseja cancelar esta reserva?',
      message: 'Esta ação não poderá ser desfeita.',
      onConfirm: () => handleCancel(record),
      onCancel: () => {}
    });
  }

  const handleCancel = async (record: ReservationsType) => {
    await remove(record.id)
      .then(() => {
        refetch();
        message.success('Reserva cancelada com sucesso!');
      })
      .catch(() => {
        message.error('Erro ao cancelar reserva!');
      });
  }

  useEffect(() => {

    if (typeof localStorage === 'undefined') {
      return;
    }

    if (localStorage?.getItem('user')){
      setDataByOwner(reservations?.filter(x => x.owner === localStorage?.getItem('user')))
    }
  }, [reservations])

  const columns: TableColumnsType<ReservationsType> = [
    {
      title: '',
      key: 'status',
      dataIndex: 'isCompleted',
      render: (isCompleted) => isCompleted ? 
      '' :
      <Tag bordered={false} color="volcano">
          Pendente
      </Tag>
    },
    {
      title: 'Data',
      key: 'date',
      dataIndex: 'dateStart',
      render: (date) => formatDateWithMonth(date),
      sorter: (a, b) => dayjs(a.dateStart).diff(b.dateStart)
    },
    {
      title: 'Horário',
      key: 'time',
      dataIndex: 'time',
      render: (_, record) => `${formatDateWithTime(record.dateStart)} às ${formatDateWithTime(record.dateEnd)}`,
      sorter: (a, b) => dayjs(a.dateStart).diff(b.dateStart)
    },
    {
      title: 'Título',
      key: 'title',
      dataIndex: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
      ...searchFilter()
    },
    {
      title: 'Sala',
      key: 'class',
      dataIndex: 'class',
      render: (_, record) => `${record.class.name} - ${FloorsLabels[record.class.floor]}`
    },
    {
      title: 'Responsável',
      key: 'owner',
      dataIndex: 'owner',
      render: (owner) => owner
    },
    {
      title: 'Observação',
      key: 'observation',
      dataIndex: 'observation'
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (record) => (
        <Space style={{ color: 'var(--color-blue)' }}>
          <Button type="link" onClick={() => message.info('Não implementado ainda!')}>Editar</Button>
          <Button type="link" onClick={() => showConfirm(record)}>Cancelar</Button>
        </Space>
      )
    }
  ];

  return (
    <AppPage>
      <MainBreadcrumb path={pathname}></MainBreadcrumb>
      <CustomContent>
        <Space style={{ minWidth: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <Typography style={{ margin: '18px', paddingLeft: '15px' }}>
            <Title level={4}>Minhas Reservas</Title>
          </Typography>
        </Space>
        <Table
          style={{ padding: '25px' }}
          size="middle"
          dataSource={dataByOwner}
          pagination={{ pageSize: 8 }}
          columns={columns}>
        </Table>
      </CustomContent>
    </AppPage>
  );
}

export default Reservations;