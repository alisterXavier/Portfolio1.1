'use client'
import { SetStateAction, useEffect, useState } from 'react';
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
export function getRelativeCoordinates(event: { pageX: any; pageY: any; }, referenceElement: { offsetLeft: any; offsetTop: any; clientWidth: any; clientHeight: any; offsetParent: any; }) {
  const position = {
    x: event.pageX,
    y: event.pageY
  };

  const offset = {
    left: referenceElement.offsetLeft,
    top: referenceElement.offsetTop,
    width: referenceElement.clientWidth,
    height: referenceElement.clientHeight
  };

  let reference = referenceElement.offsetParent;

  while (reference) {
    offset.left += reference.offsetLeft;
    offset.top += reference.offsetTop;
    reference = reference.offsetParent;
  }

  return {
    x: position.x - offset.left,
    y: position.y - offset.top,
    width: offset.width,
    height: offset.height,
    centerX: (position.x - offset.left - offset.width / 2) / (offset.width / 2),
    centerY: (position.y - offset.top - offset.height / 2) / (offset.height / 2)
  };
}