import { Color } from './types';
import { ChipTitle } from './types';

export interface LimitDetails {
  chipTitle: ChipTitle;
  color: Color;
  singleLimit: string;
  dailyLimit: string;
}

export interface RequirementDetails {
  label: string;
  status: string;
  color: Color;
  icon: React.ReactNode;
}
