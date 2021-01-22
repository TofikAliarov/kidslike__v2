import { lazy } from 'react';

export default [
  {
    path: '/',
    label: 'Login',
    exact: true,
    component: lazy(() => import('./Views/LoginView')),
    private: false,
  },
  {
    path: '/login',
    label: 'Login',
    exact: true,
    component: lazy(() => import('./Views/AuthView')),
    private: false,
  },
  {
    path: '/registration',
    label: 'Login',
    exact: true,
    component: lazy(() => import('./Views/AuthView')),
    private: false,
  },
  {
    path: '/verification/:verificationToken',
    label: 'Verify',
    exact: false,
    component: lazy(() => import('./Views/TokenVerifyView')),
    private: false,
  },
  {
    path: '/home',
    label: 'Home',
    exact: false,
    component: lazy(() => import('./Views/HomeView')),
    private: true,
  },
];
