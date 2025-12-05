import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from "antd";
import ru_RU from 'antd/locale/ru_RU'
import UserAuth from "@/components/UserAuth/UserAuth";
import NotificationApp from "@/components/NotificationsApp/NotificationsApp";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Панель управления хостингом",
  description: "Панель управления хостингом",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="light">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .material-symbols-outlined {
                font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
              }
            `,
          }}
        />
      </head>
      <body className={`${interSans.variable}`}>
        <UserAuth>
          <ConfigProvider locale={ru_RU}>
            <AntdRegistry>{children}</AntdRegistry>
            <NotificationApp />
          </ConfigProvider>
        </UserAuth>
      </body>
    </html>
  );
}
