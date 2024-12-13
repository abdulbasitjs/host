import { BO_ROUTES } from './bo/routes';
import { BRM_ROUTES } from './brm/routes';

export const PATHS = {
  BO: { ...BO_ROUTES },
  BRM: { ...BRM_ROUTES },
} as const;
