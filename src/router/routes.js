import { Details } from '../components/detail.component';
import { Main } from '../components/main.component';

export const ROUTES = [
  {
    path: '/',
    component: Main,
    rootElement: document.querySelector('.main'),
  },
  {
    path: '/detail',
    component: Details,
    rootElement: document.querySelector('.detail'),
  },
];
