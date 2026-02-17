export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
} as const;

export type WebAppRoute = (typeof ROUTES)[keyof typeof ROUTES];
