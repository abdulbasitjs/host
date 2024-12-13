// TODO: need to test the and update the routes
const BRM_ROOT_PATH = '';

export const BRM_ROUTES = {
  ROOT: BRM_ROOT_PATH,
  KYC_LVL2: `${BRM_ROOT_PATH}/kyc-lvl2`,
  KYC_LVL3: `${BRM_ROOT_PATH}/kyc-lvl3`,
} as const;
