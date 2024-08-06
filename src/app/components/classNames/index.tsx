import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const mergeClassNames = (...classNames: ClassValue[]) => {
  return twMerge(clsx(classNames));
};
