import { Button } from "antd";
import styled from "styled-components";

interface RecurrenceCheckboxProps {
    disabled?: boolean;
    onSelected: (selected: string) => void;
    selectedOptions: string[];
}

const dayOfWeekOptions = [
  { value: 'monday', label: 'S' },
  { value: 'tuesday', label: 'T' },
  { value: 'wednesday', label: 'Q' },
  { value: 'thursday', label: 'Q' },
  { value: 'friday', label: 'S' },
  { value: 'saturday', label: 'S' },
  { value: 'sunday', label: 'D' }
];

const CustomCheckbox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const CustomButton = styled(Button)`
    background-color: var(--color-secondary);
    color: black;
    border-radius: 0;

    &.selected-button {
        color: var(--color-orange);
        border: 1px solid var(--color-orange);
    }
`;

const RecurrenceCheckbox = ({ disabled, onSelected, selectedOptions }: RecurrenceCheckboxProps) => {

  const handleClick = (value: string) => {
    onSelected(value);
  }

  const setClassName = (value: string) => {
    if (disabled) return '';
    return selectedOptions.includes(value) ? 'selected-button' : '';
  }

  return (
    <CustomCheckbox>
      {dayOfWeekOptions.map(option => (
        <CustomButton 
          key={option.value} 
          className={setClassName(option.value)}
          onClick={() => handleClick(option.value)}
          disabled={disabled}>
          {option.label}
        </CustomButton>
      ))}
    </CustomCheckbox>
  )
}

export default RecurrenceCheckbox;