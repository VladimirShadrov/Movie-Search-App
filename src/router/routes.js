import { Poster } from '../components/poster.component';
import { Main } from '../components/main.component';

export const ROUTES = [
  {
    path: '/',
    component: Main,
    rootElement: document.querySelector('.main'),
  },
  {
    path: '/detail',
    component: Poster,
    rootElement: document.querySelector('.detail'),
  },
];
