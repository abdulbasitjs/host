import { ReactNode } from 'react';

type BannerType = 'info' | 'error' | 'neutral';
interface InfoBannerProps {
    message: string;
    bannerType: BannerType;
    icon?: ReactNode;
}
export declare function InfoBanner({ message, bannerType, icon }: InfoBannerProps): import("react/jsx-runtime").JSX.Element;
export {};
