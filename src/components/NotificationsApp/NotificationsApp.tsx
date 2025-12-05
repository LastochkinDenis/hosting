'use client';
import { useNotificationStore, INotification } from "@/store/notificationStrore";

import { notification } from "antd";
import { useEffect, useState, useRef } from "react";

export default function NotificationApp() {
    const { notifications, onDelete } = useNotificationStore();
    const [ api, contextHolder ] = notification.useNotification();
    const showNotifiction = useRef<Array<string>>([]);

    useEffect(() => {
        notifications.forEach((item) => {
            if(typeof showNotifiction.current.find(i => i == item.id) == 'undefined') {
                showNotifiction.current.push(item.id!);

                api.open({
                    message: item.messeage,
                    type: item.type,
                    onClose: () => {
                        showNotifiction.current = showNotifiction.current.filter(i => item.id != i);
                        onDelete(item.id!)
                    },
                    placement: 'bottomRight',
                    pauseOnHover: true
                })
            }
        });
    }, [notifications, showNotifiction]);
    
    return <>{contextHolder}</>
}