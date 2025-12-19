'use client'
import { instance } from "@/lib/axios_settings"

export default function Page() {

    const onClick = () => {
        instance.post('/profiles/individual', {
        "profile_name": "test",
        "is_default": false,
        "person_r_name": "test",
        "person_r_surname": "test",
        "person_r_patronimic": "test",
        "passport_series": "test",
        "passport_number": "test",
        "passport_date": "18.12.2025",
        "passport_place": "test",
        "birth_date": "18.12.2025",
        "email": "user@example.com",
        "phone": "+71111111111",
        "country": "RU",
        "p_addr_zip": "test",
        "p_addr_area": "test",
        "p_addr_city": "test",
        "p_addr_addr": "test",
        "p_addr_recipient": "test"
        });
    }

    return <div>
        <button onClick={onClick}>
            test
        </button>
    </div>
}