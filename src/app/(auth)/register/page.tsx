'use client';
import '@/app/(auth)/page.scss';
import Register from '@/components/Auth/Register';

export default function Page() {

    return <div className="page-center">
        <Register></Register>
    </div>
}