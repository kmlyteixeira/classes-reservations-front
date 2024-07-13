import { ClassesType } from '@/interfaces/classes/ClassesType';
import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../shared/shared.service';

export function useGetClasses() {
    const { data: classes, isLoading: loading, error, refetch } = useQuery<ClassesType[], Error>
        ({
            queryKey: ['classes'],
            queryFn: () => fetchData<ClassesType[]>('http://localhost:3005/classes')
        });

    return { classes, loading, error, refetchClasses: refetch };
}