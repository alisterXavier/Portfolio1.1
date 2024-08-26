'use client';
import { useCardContext } from '@/app/contexts';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ImCross } from 'react-icons/im';
import { handleClick } from '../utils';
import { useState } from 'react';
import Image from 'next/image';

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
  image: string;
  provider: string;
}[];

const certs: certsType = [
  {
    name: 'AWS Solutions Architect Associate',
    url: 'https://cp.certmetrics.com/amazon/en/public/verify/credential/8115cf8bde014451930bae4bb017bec0',
    image:
      'https://d1.awsstatic.com/training-and-certification/certification-badges/AWS-Certified-Solutions-Architect-Associate_badge.3419559c682629072f1eb968d59dea0741772c0f.png',
    date: new Date('March 2024'),
    provider: 'AWS',
  },
  {
    name: 'Kubernetes The Hard Way',
    url: 'https://verify.acloud.guru/DFA99B95B477',
    date: new Date('July 2024'),
    provider: 'A Cloud Guru',
    image: '/images/cloug-guru.svg',
  },
  {
    name: 'Introduction to Kubernetes',
    url: 'https://verify.acloud.guru/D452FF2B1F08',
    date: new Date('July 2024'),
    provider: 'A Cloud Guru',
    image: '/images/cloug-guru.svg',
  },
  {
    name: 'Introduction to Ansible',
    url: 'https://verify.acloud.guru/37D0D5FC93B6',
    date: new Date('July 2024'),
    provider: 'A Cloud Guru',
    image: '/images/cloug-guru.svg',
  },
];

const Certificates = () => {
  const targetClass = 'certificates';
  const router = useRouter();
  const { setState } = useCardContext();
  const [selectedCert, setSelectedCert] = useState<certsType[0]>();

  const certList = certs.map((item, index) => {
    return (
      <div key={index} className="w-full h-[20%]">
        <AnimatePresence mode="wait">
          {selectedCert?.name == item.name && (
            <motion.div className="w-[60%] h-full md:absolute z-[1] top-[0%] translate-x-[50%] duration-100 flex flex-col items-center justify-center">
              <div className="w-[30%] h-[40%]">
                <figure className="relative w-full h-[60%]">
                  <Image
                    src={item.image}
                    alt=""
                    objectFit="contain"
                    sizes="100%"
                    fill
                  />
                </figure>
                <div className="w-full mt-5">
                  <p>{selectedCert.name}</p>
                  <p>{selectedCert.provider}</p>
                  <p>
                    {months[selectedCert.date.getMonth()]}{' '}
                    {selectedCert.date.getFullYear()}
                  </p>
                  <a href={selectedCert.url} target='__blank' className='underline'>View Cert</a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="relative z-[2] cursor-pointer h-full w-[40%] flex items-center justify-center ">
          <div
            className=" w-[60%] h-[80%] border- flex flex-col justify-end items-end p-5 pr-2 hover:pr-0 border-b-2 brightness-75 hover:brightness-100 transition-all duration-100"
            onMouseEnter={() => {
              setSelectedCert(item);
            }}
          >
            <p className="text-[20px]">{item.name}</p>
          </div>
        </div>
      </div>
    );
  });

  return (
    <motion.div className="certificates_container bg-[var(--main)] h-screen w-screen text-[var(--accent)] flex items-center justify-start relative">
      <ImCross
        size={30}
        className="fixed z-[100] top-10 right-10"
        color="white"
        onClick={() => {
          handleClick({ setState, targetClass, router });
        }}
      />
      <div className="w-full h-full overflow-y-scroll relative bg-[var(--main)]">
        {certList}
      </div>
    </motion.div>
  );
};

export default Certificates;
