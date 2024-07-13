'use client'

import dynamic from 'next/dynamic';
import React from 'react';

const Users: React.ComponentType<{}> = dynamic(() => import('@/app/records/users/UsersComponent'), { ssr: false });

export default Users;