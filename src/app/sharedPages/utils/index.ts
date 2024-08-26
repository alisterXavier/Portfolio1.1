'use client';
import { SetStateAction, useEffect, useState } from 'react';
import { closeCard } from '../../components';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import gsap from 'gsap';

type handleClickType = {
  targetClass: string;
  setState: React.Dispatch<SetStateAction<string | null>>;
  router: AppRouterInstance;
};
export const handleClick = ({
  targetClass,
  setState,
  router,
}: handleClickType) => {
  router.back();
};
