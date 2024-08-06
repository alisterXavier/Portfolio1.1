'use client';
import { useCardContext } from '@/app/contexts';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ImCross } from 'react-icons/im';
import { handleClick } from '../utils';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
type certsType = {
  name: string;
  url: string;
  date: Date;
}[];

const certs: certsType = [
  {
    name: 'AWS Solutions Architect',
    url: '',
    date: new Date('March 2024'),
  },
  {
    name: 'Kubernetes The Hard Way',
    url: '',
    date: new Date('July 2024'),
  },
  {
    name: 'Introduction to Kubernetes',
    url: '',
    date: new Date('July 2024'),
  },
  {
    name: 'Introduction to Ansible',
    url: '',
    date: new Date('July 2024'),
  },
];

const Certificates = () => {
  const targetClass = 'certificates';
  const router = useRouter();
  const { setState } = useCardContext();
  const certList = certs.map((item, index) => {
    return (
      <div
        key={index}
        className="col-span-3 row-span-1 md:col-span-1 border p-10 rounded-[10px] cursor-pointer"
      >
        <p className="text-[20px]">{item.name}</p>
        <p>
          {months[item.date.getMonth()]} {item.date.getFullYear()}
        </p>
        <Link href={item.url}>View Certificate</Link>
      </div>
    );
  });
  return (
    <motion.div className="certificates_container bg-default-bg min-h-screen w-full text-default-accent grid grid-cols-3 grid-rows-4 gap-3">
      <ImCross
        size={30}
        className="fixed z-[100] top-10 right-10"
        color="white"
        onClick={() => {
          handleClick({ setState, targetClass, router });
        }}
      />
      {certList}
    </motion.div>
  );
};

export default Certificates;
