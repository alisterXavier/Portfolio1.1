'use client';
import React from 'react';
import { AiFillGithub, AiOutlineLinkedin, AiOutlineMail } from 'react-icons/ai';
import { TbBrandDiscord } from 'react-icons/tb';
import { CardWrapper, mergeClassNames } from '../..';

export const Socials = () => {
  const usernames: {
    discord: string;
  } = {
    discord: '_.typewriter._',
  };

  const copy = (item: string) => {
    if (!Object.keys(usernames).includes(item)) return;

    document.querySelector(
      '.tooltip'
    )!.innerHTML = `${item.toUpperCase()} COPIED!`;
    navigator.clipboard.writeText(usernames[item as keyof typeof usernames]);
    document.querySelector('.tooltip')?.classList.add('active');
    setTimeout(() => {
      document.querySelector('.tooltip')?.classList.remove('active');
    }, 1000);
  };

  const ClickableItem = ({
    href,
    children,
    data,
  }: {
    href?: string;
    data: string;
    children: React.ReactNode;
  }) => (
    <a
      rel="noreferrer"
      target="__blank"
      onClick={() => {
        copy(data);
      }}
      href={href ?? undefined}
      className={mergeClassNames(
        'socials mouse_card bg-[var(--sub)] col-span-1 flex items-center justify-center cursor-pointer rounded-[5px] md:rounded-[10px]'
      )}
      id={data}
      data-hero={data}
    >
      {children}
    </a>
  );

  return (
    <CardWrapper
      parentClasses="col-span-1 row-span-2 md:col-span-2 md:col-span-1 md:row-span-1"
      targetClass=""
      className="socials__wrapper !bg-[var(--main)] grid gap-2 grid-cols-1 md:grid-cols-2"
    >
      <ClickableItem data="discord">
        <TbBrandDiscord size={20} className="text-[var(--accent)]" />
      </ClickableItem>
      <ClickableItem href="mailto:xavieralister153@gmail.com" data="email">
        <AiOutlineMail size={20} className="text-[var(--accent)]" />
      </ClickableItem>
      <ClickableItem href="https://github.com/alisterXavier" data="github">
        <AiFillGithub size={20} className="text-[var(--accent)]" />
      </ClickableItem>
      <ClickableItem
        href="https://www.linkedin.com/in/alister-xavier/"
        data="linkedin"
      >
        <AiOutlineLinkedin size={20} className="text-[var(--accent)]" />
      </ClickableItem>
    </CardWrapper>
  );
};
