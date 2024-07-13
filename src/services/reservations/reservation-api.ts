import { RecurrenceReservationType } from '@/interfaces/reservations/RecurrenceType';
import { CreateUpdateReservationPayload, ReservationsType } from '@/interfaces/reservations/ReservationsType';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteData, fetchData, patchData, postData } from '../shared/shared.service';

export function useGetReservations() {
    const { data: reservations, isLoading: loading, error, refetch } = useQuery<ReservationsType[], Error>
        ({
            queryKey: ['reservations'],
            queryFn: () => fetchData<ReservationsType[]>('http://localhost:3005/reservations')
        });

    return { reservations, loading, error, refetch };
}

export function usePostReservation() {
    const { mutateAsync, isPending, isError } = useMutation({
        mutationFn: (reservation: CreateUpdateReservationPayload) => postData('http://localhost:3005/reservations', reservation)
    });

    return { create: mutateAsync, createPending: isPending, isError };
}

export function usePutReservation() {
    const { mutateAsync, isPending, isError } = useMutation({
        mutationFn: (reservation: CreateUpdateReservationPayload) => patchData('http://localhost:3005/reservations', reservation, reservation.id)
    });

    return { update: mutateAsync, updatePending: isPending, isError };
}

export function useDeleteReservation() {
    const { mutateAsync, isPending, isError } = useMutation({
        mutationFn: (id: number) => deleteData('http://localhost:3005/reservations', id)
    });

    return { remove: mutateAsync, removePending: isPending, isError };
}

export function usePostRecurrenceReservation() {
    const { mutateAsync, isPending, isError } = useMutation({
        mutationFn: (recurrence: RecurrenceReservationType) => {
            return postData('http://localhost:3000/recurrency', recurrence)
        }
    });

    return { createRecurrence: mutateAsync, createPending: isPending, isError };
}