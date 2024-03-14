import { lazy } from 'react';
import { ComponentType } from 'react';

const CarList = lazy(() => import('./components/CarList').then(module => ({ default: module.default as ComponentType<any> })));
const CarDetailS = lazy(() => import('./components/CarDetails').then(module => ({ default: module.default as ComponentType<any> })));
const Admin = lazy(() => import('./components/Admin').then(module => ({ default: module.default as ComponentType<any> })));

interface Route {
  path: string;
  component: ComponentType<any>;
}

const routes: Route[] = [
  { path: '/', component: CarList },
  { path: '/cars/:id', component: CarDetailS },
  { path: '/admin', component: Admin }
];

export default routes;
