import asyncComponent from './components/AsyncComponent';
import { nextNumber } from './utils/general';

const nextRouteIndex = nextNumber();

const createRoute = (url, component, exact = false) => ({
  index: nextRouteIndex(),
  path: url,
  component,
  exact,
});

export default [
  createRoute(
    '/',
    asyncComponent(() =>
      import('./pages/HotelsPage.js').then(module => module.default),
    ),
  ),
];
