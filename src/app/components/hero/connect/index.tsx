import { BiRightArrowAlt } from 'react-icons/bi';
import { CardWrapper } from '..';
import {
  Button,
  ExtendVariants,
  extendVariants,
  input,
  Textarea,
} from '@nextui-org/react';
import { Input } from '@nextui-org/react';
import emailjs from '@emailjs/browser';
import { useRef } from 'react';

const MyTextArea: ReturnType<ExtendVariants> = extendVariants(Textarea, {
  variants: {
    color: {
      lighter: {
        inputWrapper: [
          'bg-default-bg',
          'group-data-[focus=true]:bg-bg-default-bg',
          'data-[hover=true]:bg-default-bg',
          'text-default-accent',
        ],
      },
    },
  },
});
const MyTextInput: ReturnType<ExtendVariants> = extendVariants(Input, {
  variants: {
    color: {
      lighter: {
        inputWrapper: [
          'bg-default-bg',
          'group-data-[focus=true]:bg-bg-default-bg',
          'data-[hover=true]:bg-default-bg',
          'text-default-accent',
        ],
      },
    },
  },
});
export const Connect = (): JSX.Element => {
  const serviceID = 'service_qfh5m9x';
  const templateID = 'template_erq4h2c';
  const ref = useRef<HTMLFormElement>(null);
  const handleClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    emailjs
      .sendForm(serviceID, templateID, event.target as HTMLFormElement, {
        publicKey: process.env.NEXT_PUBLIC_EMAILJS,
      })
      .then(
        () => {},
        (err) => {}
      );
  };
  return (
    <CardWrapper
      targetClass="connect"
      className={`mouse_card hero_section row-span-1 col-span-full md:col-span-2 md:row-span-2 !cursor-default`}
    >
      <form
        className="relative bg-default-sub-bg w-[100%] h-[100%] transition-all justify-center flex flex-col duration-500 p-5"
        onSubmit={handleClick}
        ref={ref}
      >
        <h1 className="text-default-accent">
          Let&apos;s join forces to create something revolutionary!
        </h1>
        <div className="flex">
          <MyTextInput
            type="name"
            label="Name"
            name="from_name"
            variant="underlined"
            size="sm"
            classNames={{
              inputWrapper: 'w-[90%]',
              input: '!text-default-accent',
            }}
            onFocus={(event: React.FocusEvent<HTMLInputElement>) => {
              event.target.setAttribute('autocomplete', 'off');
            }}
          />
          <MyTextInput
            type="email"
            label="Email"
            name="from_email"
            variant="underlined"
            size="sm"
            classNames={{
              inputWrapper: 'w-[90%]',
              input: '!text-default-accent',
            }}
            onFocus={(event: React.FocusEvent<HTMLInputElement>) => {
              event.target.setAttribute('autocomplete', 'off');
            }}
          />
        </div>
        <MyTextArea
          className="mt-5"
          label="Message"
          variant="flat"
          placeholder="Enter your message"
          name="message"
          disableAnimation
          disableAutosize
          classNames={{
            base: '100%',
            input: 'min-h-[100px]',
          }}
          color="lighter"
          endContent={
            <div className="relative overflow-hidden">
              <input
                type="submit"
                className={'absolute z-[2] w-[25px] cursor-pointer opacity-0'}
              />
              <BiRightArrowAlt
                size={25}
                className="relative z-[1] cursor-pointer text-default-accent"
              />
            </div>
          }
        />
      </form>
    </CardWrapper>
  );
};
