'use client';
import './Auth.scss';
import Logo from "@/Ui/Logo/Logo";
import InputWrapper from '@/Ui/Input/InputWrapper';
import { instance  } from '@/lib/axios_settings';
import { LOGIN_USER } from '@/lib/api_endpoint';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

import { FormEvent, useEffect, useState } from "react";
import { Form, Input, ConfigProvider } from "antd";
import { Rule } from 'antd/es/form';
import type { FormProps } from "antd";
import { Cossette_Texte } from 'next/font/google';

type FieldType = {
    email: string;
    password: string;
};

export default function Login() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { isAuthenticated, login } = useAuthStore();
    
    const onSubmit: FormProps<FieldType>['onFinish'] = (values) => {
        setLoading(true);
        
        instance.post(LOGIN_USER, {
            'email': values.email,
            'password': values.password
        })
        .then(response => {
            console.log('Ответ от сервера:', response.data);
            const { access_token, refresh_token } = response.data;
            
            if (access_token) {
                // Декодируем JWT токен чтобы получить данные пользователя
                try {
                    const tokenParts = access_token.split('.');
                    const payload = JSON.parse(atob(tokenParts[1]));                
                    
                    // Создаем объект пользователя из данных токена
                    const user = {
                        id: payload.sub,
                        email: payload.email,
                        name: payload.username,
                    };
                    
                    // Используем метод login из store
                    login(access_token, refresh_token);
                    console.log('Данные сохранены в store:', { user, token: access_token });
                    
                    // Редирект на dashboard
                    router.push('/dashboard');
                } catch (error) {
                    console.error('Ошибка декодирования токена:', error);
                }
            } else {
                console.error('Не получен access_token от сервера');
            }
        })
        .catch(error => {
            console.error('Ошибка входа:', error);
            // Можно показать сообщение об ошибке пользователю
        })
        .finally(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        if(isAuthenticated) {
            const prevUrl = document.referrer;

            if(prevUrl) {
                router.push(prevUrl);
            } else {
                router.push('/dashboard/');
            }
        }
    }, [isAuthenticated]);
    
    return <div className="auth-card">
            <Logo showText={true} />
            <h1 className="auth-title h2">Вход</h1>
            <p className="auth-subtitle p2">Используйте email и пароль, чтобы войти в панель управления.</p>
            <ConfigProvider theme={{
                components: {
                    Form: {
                        itemMarginBottom: 0
                    }
                }
            }}>
                <Form name="login"
                onFinish={onSubmit}
                >
                    <InputWrapper label="Email" id="login_email">
                        <Form.Item<FieldType>
                            name="email"
                            rules={[{ required: true, message: 'Небходимо ввести email' },
                                {type: 'email', message: 'Некоекртный email'}
                            ]}>
                            <Input type="email" id="login_email" placeholder="Email" classNames={{
                                'input': 'input'
                            }} />
                        </Form.Item>
                    </InputWrapper>
                    <InputWrapper label="Пароль" labelId="login_password">
                        <Form.Item<FieldType>
                        name="password"
                        rules={[
                            {required: true, message: 'Небходимо ввести пароль'}
                        ]}>
                            <Input.Password id="login_password" placeholder='Пароль' />
                        </Form.Item>
                    </InputWrapper>
                    <Form.Item>
                        <button className="btn" type="submit" disabled={loading}>
                            {loading ? 'Вход...' : 'Войти'}
                        </button>
                    </Form.Item>
                </Form>
            </ConfigProvider>
            <div className="auth-card__bottom p2">
                Нет аккаунта? <a href='/register'>Зарегистрироваться</a>
            </div>
        </div>
}