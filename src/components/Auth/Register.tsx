'use client';
import './Auth.scss';
import Logo from "@/Ui/Logo/Logo";
import InputWrapper from '@/Ui/Input/InputWrapper';
import { REGISTER_USER } from "@/lib/api_endpoint";
import { TypeUser, isTypeUser } from '@/types/user';
import { instance  } from '@/lib/axios_settings';
import { useAuthStore } from '@/store/authStore';

import '@ant-design/v5-patch-for-react-19'; //!!!!! Понизить версю react до 18 !!!!!

import React, { useState, useEffect } from 'react';
import {useRouter} from 'next/navigation';
import { Form, Input, ConfigProvider, Radio } from "antd";
import { Rule } from 'antd/es/form';
import type { FormProps, RadioChangeEvent } from "antd";

type FieldType = {
    typeUser?: string;
    login?: string;
    email?: string;
    password?: string;
    secondPassword?: string;
}

const MIN_PASSWORD_LENGTH = 8;

export default function Register() {
    const [typeUser, setTypeUser] = useState<TypeUser>('fizl');
    const [password, setPassword] = useState<string>();
    const [passwordStrength, setPasswordStrength] = useState<number>(0);
    const router = useRouter();
    const { isAuthenticated, login } = useAuthStore();


    const onInputPassword = (e: React.FormEvent<HTMLInputElement>) => {

        const target = e.target as HTMLInputElement
        
        const password = target.value;
        
        let score = 0;
        if (password.length >= MIN_PASSWORD_LENGTH) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/[^a-zA-Z0-9]/.test(password)) score += 1; 

        setPassword(password);
        setPasswordStrength(score);
    }

    const validateSecondPassword = (rule: Rule, value: string, callback: () => void) => {

        if(password !== value) {
            return Promise.reject(new Error('Пароль не совподают'));    
        }
        
        return Promise.resolve();
    }

    const onChangeTypeUser = (e:RadioChangeEvent) => {
        if(isTypeUser(e.target.value)) {
            setTypeUser(e.target.value);
        }
    }

    const onSubmit: FormProps<FieldType>['onFinish'] = (values) => {

        instance.post(REGISTER_USER, {
            "email": values.email,
            "password": values.password,
            "username": values.login
        })
        .then(response => {
            if(response.status == 201 && response.statusText == 'Created') {
                console.log('Ответ от сервера:', response.data);
                const { access_token, refresh_token } = response.data;
                
                // Если API вернул access_token - автоматически логиним пользователя
                if (access_token) {
                    try {
                        // Декодируем JWT токен чтобы получить данные пользователя
                        const tokenParts = access_token.split('.');
                        const payload = JSON.parse(atob(tokenParts[1]));
                        
                        // Создаем объект пользователя из данных токена
                        const user = {
                            id: payload.sub,
                            email: payload.email,
                            name: payload.username,
                        };
                        
                        login(access_token, refresh_token);
                        console.log('Данные сохранены в store:', { user, token: access_token });
                        router.push('/dashboard');
                    } catch (error) {
                        console.error('Ошибка декодирования токена:', error);
                        router.push('/login');
                    }
                } else {
                    // Иначе перенаправляем на страницу входа
                    router.push('/login');
                }
            }
        })
        .catch((error) => {
            console.log(error);
            // ДОДЕЛАТЬ ОБРАБОТЧИК ОШИБОК
        });
    };
    
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
            <h1 className="auth-title h2">Регистрация</h1>
            <ConfigProvider theme={{
                components: {
                    Form: {
                        itemMarginBottom: 0
                    },
                },
            }}>
                <Form
                name="register"
                onFinish={onSubmit}
                >
                    <div className='input-wrapper'>
                        <Form.Item name="typeUser" initialValue={typeUser}>
                            <Radio.Group onChange={onChangeTypeUser} >
                                <Radio.Button value={'fizl'} >Физическое лицо</Radio.Button>
                                <Radio.Button value={'uril'} >Юридическое лицо</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                    </div>
                    <InputWrapper label={ typeUser == 'fizl' ? "Логин" : "Юридическое лицо"} labelId="register_login">
                        <Form.Item<FieldType>
                        name="login"
                        rules={[
                            {min: 3, message: "Минимальный размер логина должен быть 3"},
                            {max: 50, message: "Минимальный размер логина должен быть 50"}
                        ]}
                        >   
                                <Input placeholder={ typeUser == 'fizl' ? "Логин" : "Юридическое лицо"} id="register_login" classNames={{
                                    'input': 'input'
                                }} type="text"
                                />
                        </Form.Item>
                    </InputWrapper>
                    <InputWrapper label="Email" labelId="register_email">
                        <Form.Item<FieldType>
                        name="email"
                        rules={[{ required: true, message: 'Небходимо ввести email' },
                            {type: 'email', message: 'Некоекртный email'}
                        ]}
                        >
                            <Input type="email" placeholder="Email" id="register_email" classNames={{
                                    'input': 'input'
                            }}
                        />
                        </Form.Item>
                    </InputWrapper>
                    <InputWrapper label="Пароль" labelId="register_password" description='Минимум 8 символов, одна цифра, один спецсимвол.'>
                        <Form.Item<FieldType>
                            name="password"
                            initialValue={password}
                            rules={[
                                { required: true, message: 'Небходимо ввести пароль' },
                                {max: 120, message: "Максимальный размер пароля должен быть 120"},
                                {min: 8, message: 'Минимальный размер пароля должен быть 8'},
                                { pattern: /[A-Z]/, message: 'Пароль должен содержать хотя бы одну заглавную букву A-Z'},
                                { pattern: /[0-9]/, message: 'Пароль должен содержать хотя бы одну цифру 0-9'},
                                { pattern: /[^a-zA-Z0-9]/, message: 'Пароль должен содержать хотя бы один спецсимвол'},
                            ]}
                            >
                            <Input.Password placeholder="Пароль" id="register_password" classNames={{
                                    'input': 'input'
                            }} onInput={onInputPassword} />
                        </Form.Item>
                        <div className="password-strength" aria-hidden="true">
                            {[0, 1, 2, 3].map((index) => (
                                <span key={index} className={index < passwordStrength ? 'is-active' : ''} />
                            ))}
                        </div> 
                    </InputWrapper>
                    <InputWrapper label="Повторите пароль" labelId="register_second_password">
                        <Form.Item<FieldType>
                            name="secondPassword"
                            rules={[{ required: true, message: 'Небходимо ввести пароль' },
                                { validator: validateSecondPassword }
                            ]}
                            >
                            <Input.Password placeholder="Введите пароль" id="register_second_password" classNames={{
                                    'input': 'input'
                            }} />
                        </Form.Item>
                    </InputWrapper>
                    <Form.Item>
                        <button className="btn" type="submit">Войти</button>
                    </Form.Item>
                </Form>
            </ConfigProvider>
            <div className="auth-card__bottom p2">
                Уже есть аккаунт? <a href='/login'>Войти</a>
            </div>
        </div>
}