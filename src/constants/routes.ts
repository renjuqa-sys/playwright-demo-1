export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
} as const;

export type WebAppRoute = (typeof ROUTES)[keyof typeof ROUTES];
