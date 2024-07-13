import { UsersType } from '@/interfaces/users/UsersType';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchData, postData, putData } from '../shared/shared.service';

export function useGetUsers() {
    const { data: users, isLoading: loading, error, refetch } = useQuery<UsersType[], Error>
        ({
            queryKey: ['users'],
            queryFn: () => fetchData<UsersType[]>(`http://localhost:3005/users`)
        });

    return { users, loading, error, refetchUsers: refetch };
}

export function usePostUser() {
    const { mutateAsync, isPending, isError,  } = useMutation({
        mutationFn: (user: UsersType) => postData<UsersType>('http://localhost:3005/users', user)
    });

    return { create: mutateAsync, createPending: isPending, isError };
}

export function usePutUser() {
    const { mutateAsync, isPending, isError } = useMutation({
        mutationFn: (user: UsersType) => putData<UsersType>(`http://localhost:3005/users`, user, user.id)
    });

    return { update: mutateAsync, updatePending: isPending, isError };
}

