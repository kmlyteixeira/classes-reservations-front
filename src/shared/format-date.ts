import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export function formatDateWithMonth(date: Date | undefined | string): string {
    if (!date) return '';
    const dayjsDate = dayjs(date);
    
    const formatDate = dayjsDate?.format('MM/DD/YYYY');
    return format(formatDate, 'dd LLL yyyy', { locale: ptBR }).toUpperCase();
}

export function formatDateWithTime(date: Date | undefined | string): string {
    const dayjsDate = dayjs(date, { utc: true });
    return dayjsDate?.format('HH:mm') ?? '';
}

export function convertISOToDate(isoString: string) {
    const date = new Date(isoString);
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${year}-${month}-${day}`;
}
  