// import RecordDrawer from "@/components/drawer/RecordDrawer";
// import { RecurrenceEnum, RecurrenceOptions } from "@/interfaces/reservations/RecurrenceType";
// import { ReservationsType } from "@/interfaces/reservations/ReservationsType";
// import { useGetClasses } from "@/services/classes/classes-api";
// import { EditOutlined, RetweetOutlined } from "@ant-design/icons";
// import { DatePicker, Input, Select, TimePicker, Typography } from "antd";
// import FormItem from "antd/lib/form/FormItem";
// import { Dayjs } from "dayjs";
// import React from "react";
// import RecordForm, { GroupedFormItem } from "../form/RecordForm";
// import CustomModal from "../modal/CustomModal";
// import RecurrenceContent from "../recurrence-modal-content/RecurrenceContent";

// interface ReservationDrawerProps {
//     open: boolean;
// }

// const ReservationDrawer = ({ open }: ReservationDrawerProps) => {
//     const [selectedRecord, setSelectedRecord] = React.useState<ReservationsType | undefined>(undefined);
//     const [openDrawer, setOpenDrawer] = React.useState(open);
//     const [showRecurrenceModal, setShowRecurrenceModal] = React.useState(false);
//     const [timeValue, setTimeValue] = React.useState<Dayjs[] | undefined>(undefined);
//     const [showInfoSpan, setShowInfoSpan] = React.useState(false);
//     const [recurrenceType, setRecurrenceType] = React.useState<RecurrenceEnum>(RecurrenceEnum.NO_REPEAT);
//     const [dateValue, setDateValue] = React.useState<Dayjs | null>(null);
//     const [formInstance, setFormInstance] = React.useState<any>(null);

//     const { classes } = useGetClasses();

//     const handleForm = (form: any) => {
//       setFormInstance(form);
//     };

//     const handleRecurrenceClick = (value: RecurrenceEnum) => {
//         setRecurrenceType(value);
//         if (value !== RecurrenceEnum.NO_REPEAT) {
//           setShowRecurrenceModal(true);
//         } else {
//           setShowInfoSpan(false);
//         }
//       }
    
//       const handleDateChange = (date: Dayjs | null) => {
//         setDateValue(date);
//       }
    
    
//       const handleCloseRecurrenceModal = () => {
//         setShowRecurrenceModal(false);
//         setShowInfoSpan(true);
//       }
    
//       const handleSave = () => {
//         resetValuesAndClose();
//       }
    
//       const resetValuesAndClose = () => {
//         setSelectedRecord(undefined);
//         setTimeValue(undefined);
//         setShowInfoSpan(false);
//         localStorage.removeItem('label');
//         localStorage.removeItem('endDate');
    
//         setOpenDrawer(false);
//       }

//     return (
//         <RecordDrawer
//         open={openDrawer}
//         title="Reserva"
//         onClose={() => resetValuesAndClose()}
//         onSave={() => handleSave()}
//         requestType={'edit'}>
//         <RecordForm data={selectedRecord} timeValue={timeValue} onForm={handleForm}>
//           <GroupedFormItem>
//             <FormItem
//               key="title"
//               name="title"
//               rules={[{ required: true }]}
//               style={{ width: '100%' }}>
//               <Input
//                 prefix={<EditOutlined />}
//                 size="large"
//                 placeholder="Adicionar título" />
//             </FormItem>
//           </GroupedFormItem>
//           <GroupedFormItem>
//             <FormItem
//               key="owner"
//               name="owner"
//               rules={[{ required: true }]}
//               style={{ width: '100%' }}>
//               <Select
//                 style={{ width: '100%' }}
//                 size="large"
//                 mode="multiple"
//                 placeholder="Adicionar responsáveis"
//                 suffixIcon={"Opcional"}>
//               </Select>
//             </FormItem>
//           </GroupedFormItem>
//           <GroupedFormItem>
//             <div>
//               <FormItem
//                 key="date"
//                 name="date"
//                 rules={[{ required: true }]}
//                 style={{ marginBottom: '10px' }}>
//                 <DatePicker
//                   size="large"
//                   format={'DD/MM/YYYY'}
//                   style={{ width: 200 }} 
//                   value={dateValue}
//                   onChange={handleDateChange}/>
//               </FormItem>
//               <FormItem
//                 key="recurrence"
//                 name="recurrence"
//                 rules={[{ required: true }]}
//                 style={{ marginBottom: '10px' }}>
//                 <Select
//                   size="large"
//                   suffixIcon={<RetweetOutlined />}
//                   defaultValue={RecurrenceEnum.NO_REPEAT}
//                   style={{ width: 200 }}
//                   onChange={handleRecurrenceClick}
//                   value={recurrenceType}
//                   options={RecurrenceOptions.map((item) => ({
//                     value: item.key,
//                     label: item.label
//                   })
//                   )} />
//               </FormItem>
//             </div>
//             <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
//               <FormItem
//                 key="time"
//                 name="time"
//                 rules={[{ required: true }]}
//                 style={{ marginBottom: '10px' }}>
//                 <TimePicker.RangePicker size="large" />
//               </FormItem>
//             </div>
//           </GroupedFormItem>
//           {showInfoSpan ? (
//             <GroupedFormItem>
//               <Typography.Text 
//                 style={{ 
//                   color: 'var(--color-orange)',
//                   marginBottom: '24px',
//                   paddingLeft: '10px'
//                 }}>
//                 {`${localStorage.getItem('label')} ${localStorage.getItem('endDate')}`}
//               </Typography.Text>
//             </GroupedFormItem>
//           ) : <GroupedFormItem style={{ marginBottom: '24px'}}></GroupedFormItem>}
//           <GroupedFormItem>
//             <FormItem
//               key="classe"
//               name="classe"
//               rules={[{ required: true }]}>
//               <Select
//                 size="large"
//                 style={{ width: 200 }}
//                 placeholder="Selecionar Sala"
//                 options={(classes || []).map((classes) => ({
//                   value: classes.name,
//                   label: classes.name
//                 })
//                 )} />
//             </FormItem>
//           </GroupedFormItem>
//           <GroupedFormItem>
//             <FormItem
//               key="observation"
//               name="observation"
//               style={{ width: '100%' }}>
//               <Input.TextArea
//                 style={{ width: '100%' }}
//                 size="large"
//                 placeholder="Adicionar comentários"
//                 autoSize={{ minRows: 3, maxRows: 5 }}>
//               </Input.TextArea>
//             </FormItem>
//           </GroupedFormItem>
//         </RecordForm>
//         <CustomModal 
//           open={showRecurrenceModal} 
//           onOk={handleCloseRecurrenceModal} 
//           title="Repetir">
//           <RecurrenceContent type={recurrenceType} startDate={dateValue}></RecurrenceContent>
//         </CustomModal>
//       </RecordDrawer>
//     );
// };

// export default ReservationDrawer;