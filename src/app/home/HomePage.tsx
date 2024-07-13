'use client'

import MainCalendar from "@/components/calendar/MainCalendar";
import ReservationsCardList from "@/components/card-list/ReservationsCardList";
import RecordDrawer, { RequestType } from "@/components/drawer/RecordDrawer";
import RecordForm, { GroupedFormItem } from "@/components/form/RecordForm";
import CustomModal from "@/components/modal/CustomModal";
import RecurrenceContent from "@/components/recurrence-modal-content/RecurrenceContent";
import { RecurrenceEnum, RecurrenceOptions, RecurrenceReservationType, WeekDay, getRecurrenceType } from "@/interfaces/reservations/RecurrenceType";
import { CreateUpdateReservationPayload, ReservationsType } from "@/interfaces/reservations/ReservationsType";
import { useGetClasses } from "@/services/classes/classes-api";
import { useDeleteReservation, useGetReservations, usePostRecurrenceReservation, usePostReservation, usePutReservation } from "@/services/reservations/reservation-api";
import { useGetUsers } from "@/services/users/user-api";
import { convertISOToDate } from "@/shared/format-date";
import { CalendarOutlined, EditOutlined, InfoCircleFilled, RetweetOutlined } from "@ant-design/icons";
import { Button, DatePicker, Flex, Input, Popover, Select, Spin, TimePicker, Tour, TourProps, Typography, message } from "antd";
import FormItem from "antd/lib/form/FormItem";
import dayjs, { Dayjs } from "dayjs";
import utc from 'dayjs/plugin/utc';
import React, { useEffect } from "react";
import styled from "styled-components";

dayjs.extend(utc);

const MainFlex = styled(Flex)`
  padding: 0 20px;
  gap: 24px;
  overflow: hidden;
`;

const CalendarWrapper = styled.div`
  flex: 1;
`;

const SecondaryBar = styled.div`
  display: flex;
  gap: 42px;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

export default function HomePage() {
  const [requestType, setRequestType] = React.useState<RequestType | null>(null);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [selectedRecord, setSelectedRecord] = React.useState<ReservationsType | undefined>(undefined);
  const [showRecurrenceModal, setShowRecurrenceModal] = React.useState(false);
  const [timeValue, setTimeValue] = React.useState<[Dayjs, Dayjs]>();
  const [showInfoSpan, setShowInfoSpan] = React.useState(false);
  const [recurrenceType, setRecurrenceType] = React.useState<RecurrenceEnum>(RecurrenceEnum.NO_REPEAT);
  const [formInstance, setFormInstance] = React.useState<any>(null);
  const [recurrenceIsLoading, setRecurrenceIsLoading] = React.useState(false);
  const [dataByOwner, setDataByOwner] = React.useState<ReservationsType[]>();

  const [tourIsOpen, setTourIsOpen] = React.useState(true);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [daysOfWeek, setDaysOfWeek] = React.useState<WeekDay[]>(['Monday']);
  const [inputNumberValue, setInputNumberValue] = React.useState(1);
  const [endDate, setEndDate] = React.useState('');

  useEffect(() => {
    if (localStorage.getItem('tour') === 'true') {
      setTourIsOpen(false);
    }

    if (localStorage.getItem('user') === 'admin') {
      setIsAdmin(true);
    }

    if (localStorage.getItem('selectedDaysOfWeek')) {
      setDaysOfWeek(JSON.parse(localStorage.getItem('selectedDaysOfWeek') as string));
    }

    if (localStorage.getItem('inputNumberValue')) {
      setInputNumberValue(parseInt(localStorage.getItem('inputNumberValue') as string));
    }

    if (localStorage.getItem('endDate')) {
      setEndDate(localStorage.getItem('endDate') as string);
    }
  }, [])

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const breakpoint = 768;

  const handleForm = (form: any) => {
    setFormInstance(form);
  };

  const conflict = false;

  const ref1 = React.useRef(null);
  const ref2 = React.useRef(null);
  const ref3 = React.useRef(null);

  const steps: TourProps['steps'] = [
    {
      title: 'Bem-vindo ao Sistema de Reservas de Salas!',
      description: 'Este é o sistema de reservas do SENAC - Joinville. Aqui você pode criar, editar e visualizar suas reservas. Vamos fazer um tour pela tela inicial? Clique em "Próximo" para continuar.',
    },
    {
      title: 'Nova Reserva',
      description: 'Clique neste botão quando quiser solicitar uma nova reserva.',
      target: () => ref1.current,
    },
    {
      title: 'Minhas Próximas Reservas',
      description: 'Depois de criadas, suas próximas reservas aparecerão aqui.',
      target: () => ref2.current,
    },
    {
      title: 'Calendário',
      description: 'O calendário pode ser utilizado para criar novas reservas ou para visualizar as reservas por data. Note que aquelas pendentes de aprovação são exibidas em vermelho.',
      target: () => ref3.current,
    },
    {
      title: 'Dica Extra :)',
      description: 'Na barra superior, você possui atalhos rápidos para o seu perfil e notificações, caso você seja um ADMINISTRADOR.'
    },
    {
      title: 'Não esqueça de explorar outras funcionalidades :)',
      description: 'No menu lateral, no lado esquerda da tela, você tem acesso a relatórios de reservas e outras funcionalidades.'
    },
    {
      title: 'Fim do Tour',
      description: 'Espero que tenha gostado do tour! Caso queira reiniciar, clique no ícone de ajuda no canto superior direito da tela'
    }
  ];

  const { reservations, refetch } = useGetReservations();
  const { remove } = useDeleteReservation();
  const { create } = usePostReservation();
  const { update } = usePutReservation();
  const { classes } = useGetClasses();
  const { users } = useGetUsers();
  const { createRecurrence } = usePostRecurrenceReservation();

  useEffect(() => {
    if (localStorage?.getItem('user')){
      setDataByOwner(reservations?.filter(x => x.owner === localStorage?.getItem('user')))
    }
  }, [reservations])

  const handleRecurrenceClick = (value: RecurrenceEnum) => {
    setRecurrenceType(value);
    if (value !== RecurrenceEnum.NO_REPEAT) {
      setShowRecurrenceModal(true);
    } else {
      setShowInfoSpan(false);
    }
  }

  const handleTimeChange = (time: [Dayjs, Dayjs]) => {
    
    const startDate = time[0].toDate();
    const endDate = time[1].toDate();

    const start = dayjs(startDate, { utc: true });
    const end = dayjs(endDate, { utc: true });

    setTimeValue([start, end]);
  }

  const handleCloseRecurrenceModal = () => {
    setShowRecurrenceModal(false);
    setShowInfoSpan(true);
  }

  const handleSave = async () => {
    setRecurrenceIsLoading(true);
    if (!formInstance) {
      return;
    }

    const values = formInstance.getFieldsValue();

    if (values.date.isBefore(dayjs(), 'day') && requestType === 'create') {
      message.warning('Você não pode criar reservas em datas passadas!');
      return;
    }

    const { date, time, previousId, nextId, class: classValue, recurrence, shift, ...rest } = values;
    const newDate = dayjs(date);
    const updatedTimes = time.map((timeString: any) => {
      const dateTime = dayjs(timeString);
      const updatedDateTime = dateTime.set('date', newDate.date()).set('month', newDate.month()).set('year', newDate.year());
      return updatedDateTime;
    });

    values.time = updatedTimes;
    const offsetCompenstation = requestType === 'create' ? 3 : 0;
    const reservation: Partial<ReservationsType> = {
      ...rest,
      isCompleted: !isAdmin ? selectedRecord?.isCompleted ? true : false : true,
      dateStart: values.time[0].hour(values.time[0].hour() -offsetCompenstation).toISOString(),
      dateEnd: values.time[1].hour(values.time[1].hour() -offsetCompenstation).toISOString(),
      id: selectedRecord?.id,
    };
  
    const operation = recurrenceType === RecurrenceEnum.NO_REPEAT ? requestType === 'create' ? create : update : null;
  
    if (operation) {
      try {
        await operation(reservation as CreateUpdateReservationPayload)
        .then(() => {
          refetch();
          message.success('Reserva salva com sucesso!');
        })
        .catch((error) => {
          message.error('Erro ao salvar reserva: ' + error);
        });
  
        resetValuesAndClose();
        setRecurrenceIsLoading(false);
      } catch (error) {
        message.error(`Erro ao salvar reserva: ${error}`);
        setRecurrenceIsLoading(false);
      } 
    } else {
      const recurrenceReservation: RecurrenceReservationType = {
        room_id: values.classId.toString(),
        user_id: values.owner,
        title: values.title,
        recurrence: {
          type: getRecurrenceType(recurrenceType),
          details: {
            days_of_week: daysOfWeek
          }
        },
        start_date: convertISOToDate(values.date.toISOString()),
        end_date: convertISOToDate(localStorage.getItem('endDate') as string),
        period: '',
        hour_start: time[0].hour(values.time[0].hour() -offsetCompenstation).format('HH:mm:00'),
        hour_end: time[1].hour(values.time[1].hour() -offsetCompenstation).format('HH:mm:00'),
        interval: inputNumberValue
      };
  
      try {
        await createRecurrence(recurrenceReservation)
        .then(() => {
          setTimeout(() => {
            refetch();
            message.success('Reservas salvas com sucesso!');
            resetValuesAndClose();
            setRecurrenceIsLoading(false);
          }, 2000);
        })
        .catch((error) => {
          message.error('Erro ao salvar reserva: ' + error);
          resetValuesAndClose();
          setRecurrenceIsLoading(false);
        });
      } catch (error) {
        message.error(`Erro ao salvar reserva: ${error}`);
        setRecurrenceIsLoading(false);
      }
    }
  };

  const resetValuesAndClose = () => {
    setSelectedRecord(undefined);
    setTimeValue(undefined);
    setShowInfoSpan(false);
    localStorage.removeItem('label');
    localStorage.removeItem('endDate');

    setOpenDrawer(false);
  }

  const handleCellClick = (date: dayjs.Dayjs | null) => {
    if (date?.isBefore(dayjs(), 'day')) {
      message.warning('Você não pode criar reservas em datas passadas!');
      return;
    }

    const data: Partial<ReservationsType> = {
      date: date ?? dayjs(),
    };
    setSelectedRecord(data as ReservationsType);
    setRequestType('create');
    setOpenDrawer(true);
  }

  const handleCreate = () => handleCellClick(null);
  
  const handleEdit = (record: ReservationsType) => {
    record.date = dayjs(record.dateStart, { utc: true });
    record.time = [dayjs(record.dateStart, { utc: true }), dayjs(record.dateEnd, { utc: true })];

    setSelectedRecord(record);
    setRequestType('edit');
    setOpenDrawer(true);
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

  return (
    <>
      <MainFlex justify="space-around" align="top">
        <SecondaryBar>
          <Button
            ref={ref1}
            style={{ padding: '0 24px', marginTop: '15px' }}
            icon={<CalendarOutlined />}
            onClick={handleCreate}>
            Nova Reserva
          </Button>
          <div ref={ref2}>
            <ReservationsCardList data={dataByOwner} onEdit={handleEdit} onCancel={handleCancel}>
            </ReservationsCardList>
          </div>
        </SecondaryBar>
        {windowWidth > breakpoint ? <CalendarWrapper>
          <div ref={ref3}>
            <MainCalendar data={
              isAdmin ?  reservations : dataByOwner
            } onCellClick={handleCellClick}></MainCalendar>
          </div>
        </CalendarWrapper> : null}
      </MainFlex>
        <RecordDrawer
          open={openDrawer}
          title="Reserva"
          onClose={() => resetValuesAndClose()}
          onSave={() => handleSave()}
          requestType={requestType}>
          <RecordForm data={selectedRecord} timeValue={timeValue} onForm={handleForm}>
          <Spin spinning={recurrenceIsLoading}>
            <GroupedFormItem>
              <FormItem
                key="title"
                name="title"
                rules={[{ required: true }]}
                style={{ width: '100%' }}>
                <Input
                  prefix={<EditOutlined />}
                  size="large"
                  placeholder="Adicionar título" />
              </FormItem>
            </GroupedFormItem>
            <GroupedFormItem>
              <FormItem
                key="owner"
                name="owner"
                rules={[{ required: true }]}
                style={{ width: '100%' }}>
                <Select
                  style={{ width: '100%' }}
                  size="large"
                  options={(users?.filter(x => x.status != 'Inativo') || []).map((user) => ({
                    value: user.email,
                    label: user.email
                  }))}
                  placeholder="Adicionar responsáveis"
                  suffixIcon={"Opcional"}>
                </Select>
              </FormItem>
            </GroupedFormItem>
            <GroupedFormItem>
              <div>
                <FormItem
                  key="date"
                  name="date"
                  rules={[{ required: true }]}
                  style={{ marginBottom: '10px' }}>
                  <DatePicker
                    size="large"
                    format={'DD/MM/YYYY'}
                    style={{ width: 200 }}
                    disabledDate={(current) => current && current < dayjs().startOf('day')}
                    />
                </FormItem>
                <FormItem
                  key="recurrence"
                  name="recurrence"
                  rules={[{ required: true }]}
                  style={{ marginBottom: '10px' }}>
                  <Select
                    size="large"
                    disabled={requestType === 'edit'}
                    suffixIcon={<RetweetOutlined />}
                    defaultValue={RecurrenceEnum.NO_REPEAT}
                    style={{ width: 200 }}
                    onChange={handleRecurrenceClick}
                    value={recurrenceType}
                    options={RecurrenceOptions.map((item) => ({
                      value: item.key,
                      label: item.label
                    })
                    )} />
                </FormItem>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <FormItem
                  key="time"
                  name="time"
                  rules={[{ required: true }]}
                  style={{ marginBottom: '10px' }}
                  >
                  <TimePicker.RangePicker 
                    changeOnScroll
                    needConfirm={true}
                    size="large"
                    format={'HH:mm'}
                    value={timeValue}
                    onChange={() => handleTimeChange}
                  />
                </FormItem>
              </div>
            </GroupedFormItem>
            {showInfoSpan ? (
              <GroupedFormItem>
                <Typography.Text 
                  style={{ 
                    color: 'var(--color-orange)',
                    marginBottom: '24px',
                    paddingLeft: '10px'
                  }}>
                  {`${localStorage.getItem('label')} ${convertISOToDate(localStorage.getItem('endDate') as string)}`}
                </Typography.Text>
              </GroupedFormItem>
            ) : <GroupedFormItem style={{ marginBottom: '24px'}}></GroupedFormItem>}
            <GroupedFormItem>
                <FormItem
                  key="classId"
                  name="classId"
                  rules={[{ required: true }]}>
                  <Select
                    size="large"
                    style={{ width: 200 }}
                    placeholder="Selecionar Sala"
                    options={(classes || []).map((classItem) => ({
                      value: classItem.id,
                      label: classItem.name
                    })
                    )} />
                </FormItem>
                {conflict && (
                  <Popover
                    placement="rightTop"
                    content={
                      <div>
                        <p>A sala selecionada já está reservada por Vitor Gustavo. Deseja solicitar a troca?</p>
                        <Button type="text" style={{ marginTop: '10px' }}>Não</Button>
                        <Button type="default" style={{ marginTop: '10px' }}>Sim</Button>
                      </div>
                    }
                    title="Atenção!"
                    trigger="click"
                    open={false}>
                    <InfoCircleFilled style={{ paddingBottom: '24px', fontSize: 'large', color: 'var(--color-orange)'}}/>
                  </Popover>
                )}
            </GroupedFormItem>
            <GroupedFormItem>
              <FormItem
                key="observation"
                name="observation"
                style={{ width: '100%' }}>
                <Input.TextArea
                  style={{ width: '100%' }}
                  size="large"
                  placeholder="Adicionar comentários"
                  autoSize={{ minRows: 3, maxRows: 5 }}>
                </Input.TextArea>
              </FormItem>
            </GroupedFormItem>
            </Spin>
          </RecordForm>
            <CustomModal 
            open={showRecurrenceModal} 
            onOk={handleCloseRecurrenceModal} 
            title="Repetir">
            <RecurrenceContent type={recurrenceType} startDate={formInstance?.getFieldsValue().date}></RecurrenceContent>
          </CustomModal>
        </RecordDrawer>
      <Tour open={tourIsOpen} steps={steps} onFinish={() => {
        setTourIsOpen(false);
        localStorage.setItem('tour', 'true');
      }} onClose={() => {
        setTourIsOpen(false);
        localStorage.setItem('tour', 'true');
      }}/>
    </>
  );
}
