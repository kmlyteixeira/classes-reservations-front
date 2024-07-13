'use client'

import dynamic from 'next/dynamic';
import React from 'react';

const Reports: React.ComponentType<{}> = dynamic(() => import('@/app/reports/ReportsComponent'), { ssr: false });

export default Reports;