'use client';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

type handleClickType = {
  router: AppRouterInstance;
};
export const handleClick = ({
  router,
}: handleClickType) => {
  router.back();
};
