'use client'

import dynamic from 'next/dynamic';
import React from 'react';

const Reservations: React.ComponentType<{}> = dynamic(() => import('@/app/reservations/ReservationsComponent'), { ssr: false });

export default Reservations;