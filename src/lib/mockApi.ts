import { AxiosRequestConfig } from 'axios';

// Мок данные для пользователя
const mockUser = {
  id: '1',
  name: 'Алексей М.',
  email: 'alexey@example.com',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7VB0DWBC2B_lG4xjUMffBESRw9HbTCa9kMiZOB_rb2YWyKXayK48CDLptC7i6ELJsxsUCKM1ItGzouk2tRocQZS4WqZXONaaITRfMcSyOq_t3gdxwrgG8L9xzI625r0lPUf--suYo6aiYFjZt_RWfqcn9Oco501Vt3CNrG2_0GoRoUje4YVpzR3_UAhhXjkKxBRMOyjJHxGAP6BtB6fvII0dy4IhQBFk0r2T7qPimGS12PtAIoOqS1nNCyQwmk_GsPOFNANmfyDg',
};

// Мок данные для дашборда
export const mockDashboardData = {
  balance: 1250.00,
  resources: {
    disk: { used: 15, total: 50, unit: 'ГБ' },
    traffic: { used: 250, total: 1000, unit: 'ГБ' },
    email: { used: 10, total: 25 },
    databases: { used: 3, total: 10 },
  },
  services: {
    plan: 'Тариф "Профи"',
    renewalDate: '15.12.2024',
    status: 'Активен',
  },
  billing: {
    nextPayment: '01.12.2024',
    amount: 1000000.00,
  },
  domains: [
    {
      id: '1',
      name: 'example.com',
      status: 'Активен',
      expires: '22.08.2025',
    },
    {
      id: '2',
      name: 'my-project.net',
      status: 'Активен',
      expires: '01.11.2024',
    },
    {
      id: '3',
      name: 'another-site.org',
      status: 'Истек',
      expires: '10.05.2024',
    },
  ],
};

export const mockSearchDomenData = {
  domains_list: ['test', 'domain', 'domains', 'test1', 'hosting', 'test-hosting']
};

// Симуляция задержки API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApiHandler = async (config: AxiosRequestConfig) => {
  const url = config.url || '';
  const method = config.method?.toLowerCase() || 'get';

  // Получение данных дашборда - только для дашборда используем моки
  if (url.includes('/dashboard') && method === 'get') {
    await delay(300);
    return {
      data: mockDashboardData,
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    };
  }

  // Получение профиля пользователя - мок для дашборда
  if (url.includes('/user/profile') && method === 'get') {
    await delay(200);
    return {
      data: mockUser,
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    };
  }

  // Поиск доменов
  if(url.includes('/domain') && method == 'get') {
    await delay(200);

    console.log(url);
    // const list = mockSearchDomenData.domains_list.filter(item => item.indexOf('') != -1);

    return {
      data: mockSearchDomenData.domains_list,
      status: 200,
      statusText: 'OK',
      headers: {},
      config
    }
  }

  // Для остальных эндпоинтов не используем моки - пробрасываем дальше
  throw {
    response: {
      data: { message: 'Используется реальный API' },
      status: 404,
      statusText: 'Not Found',
    },
  };
};
