import { ReservationsType } from "@/interfaces/reservations/ReservationsType";
import { Badge, Calendar, CalendarProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import utc from 'dayjs/plugin/utc';
import styled from "styled-components";

dayjs.extend(utc);

interface MainCalendarProps {
    data?: ReservationsType[];
    onCellClick?: (date: Dayjs) => void;
}

const CustomCalendar = styled(Calendar)`
    .ant-picker-calendar-date-content {
        background-color: white;
        padding-left: 10px;
    }

    .ant-picker-calendar-date-value {
        background-color: white;
        padding-right: 10px;
    }

    .ant-badge.ant-badge-status .ant-badge-status-text {
        font-size: 12px;
    }

    display: flex;
    flex-direction: column;
    position: relative;

    z-index: 0;
    height: 100%;
`;

const MainCalendar = ({ data, onCellClick }: MainCalendarProps) => {

    const handleDateSelect = (date: Dayjs) => {
        onCellClick && onCellClick(date);
    };

    const getListByDate = (value: Dayjs) => {
        let listData = data?.filter(item => dayjs(item.dateStart).format('YYYY-MM-DD') === value.format('YYYY-MM-DD'))
            .map(item => {
            return {
                type: 'success',
                content: item.class.name + ' | ' + dayjs(item.dateStart, { utc: true }).format('HH:mm') + ' às ' + dayjs(item.dateEnd, { utc: true }).format('HH:mm'),
                isConfirmed: item.isCompleted
            }
        });

        return listData || [];
    }

    const dateCellRender = (value: Dayjs) => {
        const listData = getListByDate(value);
        return (
          <ul className="events">
            {listData.map((item) => (
              <li key={item.content}>
                <Badge color={item.isConfirmed ? "rgb(0,74,141)" : "red"} text={item.content}/>
              </li>
            ))}
          </ul>
        );
      };

    const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
        if (info.type === 'date') return dateCellRender(current);
        return info.originNode;
    };

    return (
        <CustomCalendar 
            cellRender={cellRender}
            onSelect={handleDateSelect}
        />
    );
}

export default MainCalendar;