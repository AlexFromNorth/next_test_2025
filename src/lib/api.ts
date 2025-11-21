// lib/api.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: '/api', // можно поменять на внешний эндпоинт
  timeout: 10_000,
});

// пример типизации запроса
export type DemoItem = { id: string; title: string; body: string };

export const fetchDemo = async (): Promise<DemoItem[]> => {
  const { data } = await api.get<DemoItem[]>('/demo');
  return data;
};
