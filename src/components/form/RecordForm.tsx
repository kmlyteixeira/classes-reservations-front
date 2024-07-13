import { Form } from "antd";
import { FormInstance } from "antd/lib";
import { Dayjs } from "dayjs";
import React from "react";
import styled from "styled-components";

interface RecordFormProps<T> {
  children?: React.ReactNode;
  data: T;
  timeValue?: Dayjs[];
  onForm: (values: T) => void;
}

export const GroupedFormItem = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  flex-wrap: wrap;

  .ant-input-suffix {
    font-size: small;
    color: var(--color-orange);
  }

  .anticon-retweet {
    font-size: large;
  }

  .ant-form-item-control-input-content {
    display: flex;
    column-gap: 1em;
  }
`;

const RecordForm = <T,>({ children, data, timeValue, onForm }: RecordFormProps<T> & { onForm: (form: FormInstance) => void}) => {
  const [form] = Form.useForm();
  form.setFieldsValue(data);

  if (timeValue) {
    form.setFieldsValue({ time: timeValue });
  } 

  React.useEffect(() => {
    onForm(form);
  }, [form, onForm]);

  return (
    <Form 
      form={form}
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap'
      }}
      >
      {children}
    </Form>
  );
};

export default RecordForm;
