import { SetStateAction } from 'react';
import { closeCard, eventEmitter } from '../../components';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

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
  eventEmitter.emit(targetClass);

  setTimeout(() => {
    closeCard({ setState });
    setTimeout(() => {
      router.back();
    }, 500);
  }, 500);
};
