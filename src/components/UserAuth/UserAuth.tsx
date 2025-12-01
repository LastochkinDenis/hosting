'use client';

import { useAuthStore } from "@/store/authStore";
import { instance } from "@/lib/axios_settings";
import { REFRESH_TOKEN, USER_ME } from "@/lib/api_endpoint";
import { useUserStore } from "@/store/userStore";


import React, { useEffect, useEffectEvent, useRef } from "react";
import { Cossette_Texte } from "next/font/google";

export default function UserAuth({children} : {children: React.ReactNode}) {
    const { isAuthenticated, token, refresh_token, logout, tokenUpdate } = useAuthStore();
    const { id, clearUserData }  = useUserStore();
    const tokenUpdated = useRef<boolean>(false);
    
    useEffect(() => {
        let expAcsses:number = 0;

        //Вычисляем через сколькь нужно обновить токен
        if(token !== null) {
            const expAcssesDate: number = JSON.parse(atob(token.split(".")[1]))['exp'];
            
            expAcsses = Number(expAcssesDate) * 1000 - Number(Date.now()) - 60000;
        }

        const timer = setTimeout(() => {
            if(!isAuthenticated){
                return;
            }

            if(typeof refresh_token == 'string' && typeof token == 'string' && !tokenUpdated.current) {
                tokenUpdated.current = true;
                instance.post(REFRESH_TOKEN, {
                    'refresh_token': refresh_token
                })
                .then(response => {
                    if(response.status !== 200) {
                        throw Error('Token did not update');
                    }

                    return response.data;
                })
                .then(data => {
                    const { access_token, refresh_token } = data;
                    
                    tokenUpdate(access_token, refresh_token);
                })
                .catch(() => {
                    logout();
                    clearUserData();
                })
                .finally(() => {
                    tokenUpdated.current = false;
                })
            }
        }, expAcsses);

        return () => {
            clearTimeout(timer);
        }
    }, [isAuthenticated, token, refresh_token]);

    useEffect(() => {
        if(isAuthenticated && id == 0) {
            instance.get(USER_ME)
            .then(response => {
                if(response.status != 200) {
                    throw Error();
                }
                return response.data
            })
            .then(data => {
                useUserStore.setState(({...data}));
            })
            .catch((e) => {
                console.log(e)
            })
        }
    }, [isAuthenticated, id]);

    //Если нет данных в localStorage инициализируем пустые значения
    useEffect(() => {
        if(!localStorage.getItem('auth-storage')) {
            logout();
        }

        if(!localStorage.getItem('user')) {
            clearUserData();
        }
    }, []);

    return <>{children}</>
}