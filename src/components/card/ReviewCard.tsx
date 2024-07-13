import { ReservationsType } from "@/interfaces/reservations/ReservationsType";
import { EditOutlined, StopOutlined } from "@ant-design/icons";
import { Card, Divider, Skeleton } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import React from "react";
import styled from "styled-components";

export interface ReviewCardContentProps {
    title: string | JSX.Element;
    name: string;
    date: string;
    time: string;
    data: ReservationsType
}

interface ReviewCardProps {
    content: ReviewCardContentProps;
    onCancel: () => void;
    onEdit: (record: ReservationsType) => void;
}

const CustomCard = styled(Card)`
    border-left-width: 5px;
    border-left-color: var(--color-blue);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
`;

const ReviewCard = ({ content, onCancel, onEdit }: ReviewCardProps) => {
    const [ loading, setIsLoading ]  = React.useState(content === undefined);
    const { title, name, date, time, data } = content;

    React.useEffect(() => {
        if (content === undefined) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }, [content]);

    const handleEdit = () => {
        onEdit(data);
    }

    return (
        <CustomCard
            style={{ width: 300, marginTop: 16 }}
            actions={[
                <StopOutlined key='cancel' onClick={onCancel}/>,
                <EditOutlined key='edit' onClick={handleEdit}/>
            ]}
      >
        <Skeleton loading={loading} active>
          <Title level={5}>{title}</Title>
          <Divider style={{ marginTop: '10px'}}/>
          <Paragraph style={{ margin: 0 }}>{name}</Paragraph>
          <Paragraph style={{color: 'var(--color-gray-dark)'}}>{date.toLocaleUpperCase() + ' | ' + time }</Paragraph>
        </Skeleton>
      </CustomCard>
    )
}

export default ReviewCard;