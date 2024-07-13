import { RecurrenceEnum } from "@/interfaces/reservations/RecurrenceType";
import { RecurrenceToRepetitionMap, RepetitionEnum, RepetitionOptionsPlural, RepetitionOptionsSingular, RepetitionType } from "@/interfaces/reservations/RepetitionType";
import { RetweetOutlined } from "@ant-design/icons";
import { DatePicker, Form, InputNumber, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import { Dayjs } from "dayjs";
import React from "react";
import styled from "styled-components";
import RecurrenceCheckbox from "../recurrence-checkbox/RecurrenceCheckbox";

interface RecurrenceContentProps {
  type: RecurrenceEnum;
  startDate: Dayjs | null;
}

const CustomForm = styled(Form)`
    display: flex;
    flex-direction: column;
    gap: 2em;
    align-items: center;
    justify-content: center;
    padding: 1em;
`;

const CustomFormItem = styled(FormItem)`
  margin-bottom: 0;
`;

const Group = styled.div`
    display: flex;
    gap: 0.5em;
    align-items: center;
    justify-content: center;
`;

const dayOfWeekOptions = [
  { value: 'monday', label: 'Segunda' },
  { value: 'tuesday', label: 'Terça' },
  { value: 'wednesday', label: 'Quarta' },
  { value: 'thursday', label: 'Quinta' },
  { value: 'friday', label: 'Sexta' },
  { value: 'saturday', label: 'Sábado' },
  { value: 'sunday', label: 'Domingo' }
];

const mapToSelectOptions = (options: RepetitionType[]) => {
  return options.map((item: RepetitionType) => ({
    value: item.key,
    label: item.label
  }));
}

const RecurrenceContent = ({ type, startDate }: RecurrenceContentProps) => {
  const [inputNumberValue, setInputNumberValue] = React.useState(1);
  const [selectValue, setSelectValue] = React.useState(RecurrenceToRepetitionMap[type]);
  const [checkboxIsDisabled, setCheckboxIsDisabled] = React.useState(type === RecurrenceEnum.DAILY);
  const [selectOptions, setSelectOptions] = React.useState(mapToSelectOptions(RepetitionOptionsSingular));
  const [infoLabel, setInfoLabel] = React.useState('');
  const [endDate, setEndDate] = React.useState<Dayjs | null>(startDate?.add(1, 'day') || null);

  const [selectedDaysOfWeek, setSelectedDaysOfWeek] = React.useState<string[]>(['monday']);

  const [form] = Form.useForm();
  
  if (startDate) {
    form.setFieldsValue({ startDate: startDate });
  } 

  React.useEffect(() => {
    const prefix = 'Ocorre';
    const suffix = 'até';

    const labels = dayOfWeekOptions
      .filter(item => selectedDaysOfWeek.includes(item.value))
      .map(item => item.label);

    const daysOfWeekLabel = labels.length > 1
      ? `${labels.slice(0, -1).join(', ')} e ${labels.slice(-1)}`
      : labels.join(', ');

    var result = '';

    if (selectValue === RepetitionEnum.DAY) {
      if (inputNumberValue === 1) {
        result = `${prefix} diariamente ${suffix}`;
      } else {
        result = `${prefix} a cada ${inputNumberValue} dias ${suffix}`;
      }
    }

    if (selectValue === RepetitionEnum.WEEK) {
      if (inputNumberValue === 1) {
        result = `${prefix} a cada ${daysOfWeekLabel} ${suffix}`;
      } else {
        result = `${prefix} a cada ${inputNumberValue} semanas, às(aos) ${daysOfWeekLabel} ${suffix}`;
      }
    }

    setInfoLabel(result);
  }, [inputNumberValue, selectValue, selectedDaysOfWeek, startDate]);

  React.useEffect(() => {
    localStorage.setItem('label', infoLabel);
    localStorage.setItem('endDate', endDate?.toISOString() || '');
    localStorage.setItem('selectedDaysOfWeek', JSON.stringify(selectedDaysOfWeek));
    localStorage.setItem('inputNumberValue', inputNumberValue.toString());
    localStorage.setItem('dateStart', startDate?.toISOString() || '');
  }, [endDate, infoLabel, inputNumberValue, selectedDaysOfWeek, startDate])

  const handleSelectChange = (value: RepetitionEnum) => {
    setSelectValue(value);
    setCheckboxIsDisabled(value === RepetitionEnum.DAY && inputNumberValue > 1);
  }

  const handleEndDayChange = (date: Dayjs | null) => {
    setEndDate(date);
  }

  const handleInputNumberChange = (value: number | null) => {
    value === 1 
      ? setSelectOptions(mapToSelectOptions(RepetitionOptionsSingular))
      : setSelectOptions(mapToSelectOptions(RepetitionOptionsPlural));
    setInputNumberValue(value || 1);
    setCheckboxIsDisabled(selectValue === RepetitionEnum.DAY && (value || 1) > 1);
  }

  const onSelectDayOfWeek = (value: string) => {
    if (selectedDaysOfWeek.includes(value)) {
      setSelectedDaysOfWeek(selectedDaysOfWeek.filter(item => item !== value));
    } else {
      setSelectedDaysOfWeek([...selectedDaysOfWeek, value]);
    }

    return selectedDaysOfWeek;
  }

  return (
    <CustomForm form={form}>
      <Group>
        <span>Iniciar em</span>
        <CustomFormItem
          key={'startDate'}
          name={'startDate'}>
          <DatePicker style={{ width: 150 }} format={'DD/MM/YYYY'} defaultPickerValue={startDate} disabled/>
        </CustomFormItem>
      </Group>
      <Group>
        <RetweetOutlined />
        <span>Repetir a cada</span>
        <CustomFormItem
          key={'inputNumber'}
          name={'inputNumber'}
        >
          <InputNumber min={1} max={30} defaultValue={1} style={{ width: 50 }} onChange={handleInputNumberChange} value={inputNumberValue}/>
        </CustomFormItem>
        <CustomFormItem
          key={'select'}
          name={'select'}
        >
          <Select
            defaultValue={RecurrenceToRepetitionMap[type]}
            style={{ width: 120 }}
            options={selectOptions}
            value={selectValue}
            onChange={handleSelectChange}/>
        </CustomFormItem>
      </Group>
      <RecurrenceCheckbox disabled={checkboxIsDisabled} onSelected={onSelectDayOfWeek} selectedOptions={selectedDaysOfWeek}/>
      <Group style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span>{infoLabel}</span>
        <CustomFormItem 
          key={'endDate'}
          name={'endDate'}
          initialValue={endDate}
          rules={[{ required: true }]}>
          <DatePicker style={{ width: 150 }} format={'DD/MM/YYYY'} onChange={handleEndDayChange}/>
        </CustomFormItem>
      </Group>
    </CustomForm>
  );
};

export default RecurrenceContent;
