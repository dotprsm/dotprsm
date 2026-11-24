import type { RouteDefinition } from '@solidjs/router';
import { httpStatus } from '@solidjs/web';
import NotFoundPage from '../NotFoundPage';

export const route = {
  preload: () => httpStatus(404),
} satisfies RouteDefinition;

export default NotFoundPage;
