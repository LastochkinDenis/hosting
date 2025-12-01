'use client';
import '@/app/(auth)/page.scss';

import Login from '@/components/Auth/Login';

export default function Page() {

    return <div className="page-center">
        <Login></Login>
    </div>
}