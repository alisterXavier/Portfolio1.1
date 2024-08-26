import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';
import { BiRightArrowAlt } from 'react-icons/bi';
import { CardWrapper } from '../..';

type TextArea = {
  type: string;
  label: string;
  name: string;
  value: string;
  onChange: (e: any) => void;
  classNames?: string;
  endContent?: JSX.Element;
};
const MyTextInput = ({
  type,
  label,
  name,
  value,
  onChange,
  classNames,
}: TextArea): JSX.Element => (
  <input
    placeholder={label}
    type={type}
    name={name}
    className={classNames}
    value={value}
    onChange={onChange}
  />
);

const MyTextArea = ({
  type,
  label,
  name,
  value,
  onChange,
  endContent,
}: TextArea): JSX.Element => (
  <div className="flex items-center justify-center w-full bg-[var(--main)] rounded-[10px] col-span-2 row-span-3 overflow-hidden">
    <textarea
      placeholder={label}
      name={name}
      value={value}
      onChange={onChange}
      className={
        'text-[var(--accent)] p-4 h-full w-[80%] outline-none resize-none bg-[var(--main)]'
      }
    />
    {endContent}
  </div>
);

export const Connect = (): JSX.Element => {
  const serviceID = 'service_qfh5m9x';
  const templateID = 'template_erq4h2c';
  const ref = useRef<HTMLFormElement>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const handleClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    emailjs
      .send(
        serviceID,
        templateID,
        {
          from_name: name,
          to_name: 'Alister',
          from_email: email,
          message: message,
        },
        {
          publicKey: process.env.NEXT_PUBLIC_EMAILJS,
        }
      )
      .then(
        () => {
          setName('');
          setEmail('');
          setMessage('');
        },
        (err) => {}
      );
  };
  return (
    <CardWrapper
      parentClasses="mouse_card row-span-1 col-span-full md:col-span-2 md:row-span-2"
      targetClass="connect"
      className={`hero_section !cursor-default p-5 flex flex-col items-center justify-center`}
    >
      <h1 className="text-[var(--accent)]">
        Let&apos;s join forces to create something revolutionary!
      </h1>
      <form
        className="relative bg-[var(--sub)] w-[100%] h-[80%] transition-all justify-center flex flex-col duration-500"
        onSubmit={handleClick}
        ref={ref}
      >
        <div className="grid grid-cols-2 grid-rows-4 h-full gap-2 mt-5">
          <MyTextInput
            type="text"
            label="Name"
            name="from_name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            classNames={
              'text-[var(--accent)] bg-[var(--main)] p-4 rounded-[10px] col-span-1 row-span-1 outline-none'
            }
          />
          <MyTextInput
            type="email"
            label="Email"
            name="from_email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            classNames={
              'text-[var(--accent)] bg-[var(--main)] p-4 rounded-[10px] col-span-1 row-span-1 outline-none'
            }
          />
          <MyTextArea
            type="text"
            label="Enter Your Message"
            name="message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            endContent={
              <div className="relative overflow-hidden w-[10%]">
                <input
                  type="submit"
                  className={'absolute z-[2] w-[30px] cursor-pointer opacity-0'}
                />
                <BiRightArrowAlt
                  size={25}
                  className="relative z-[1] cursor-pointer text-[var(--accent)]"
                />
              </div>
            }
          />
        </div>
      </form>
    </CardWrapper>
  );
};
