import axios, { InternalAxiosRequestConfig } from "axios";
import { mockApiHandler } from './mockApi';
import { useAuthStore } from '@/store/authStore';

export const instance = axios.create();

instance.defaults.baseURL = 'http://192.168.1.153:8009/';
// instance.defaults.withCredentials = true;

// Флаг для использования мок API (только для дашборда)
const USE_MOCK_API = true;

// Перехватываем запросы для использования мок API (только для дашборда)
const originalRequest = instance.request.bind(instance);
instance.request = async function(config: any) {
  if (USE_MOCK_API) {
    try {
      console.log('test');
      const mockResponse = await mockApiHandler(config);
      // Возвращаем мок ответ только если мок API его обработал
      return Promise.resolve({
        ...mockResponse,
        config,
      });
    } catch (mockError: any) {
      // Если мок API не обработал запрос (404), делаем реальный запрос
      if (mockError.response?.status === 404) {
        // Продолжаем обычный запрос к реальному API
        return originalRequest(config);
      }
      // Если мок API вернул другую ошибку, пробрасываем её
      throw mockError;
    }
  }
  
  return originalRequest(config);
};

// Request interceptor для добавления токена
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - только для обработки ошибок
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Обрабатываем ошибки 401 (неавторизован) - разлогиниваем
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    
    return Promise.reject(error);
  }
);
