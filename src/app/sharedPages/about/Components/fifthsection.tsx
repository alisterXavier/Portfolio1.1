import { mergeClassNames } from '@/app/components';
import Link from 'next/link';

export const FifthSection = ({
  headerClassName,
  emailClassName,
}: {
  headerClassName: string;
  emailClassName: string;
}) => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center about_section">
      <div className=''>
        <h1
          className={mergeClassNames(
            'text-[30px] md:text-[80px]',
            headerClassName
          )}
        >
          Let&apos;s connect!
        </h1>
        <Link
          href={'mailto:xavieralister153@gmail.com'}
          className={mergeClassNames(
            'px-3 inline-block -rotate-[2deg] rounded-[10px] text-[20px] md:text-[50px]',
            emailClassName
          )}
        >
          xavieralister153@gmail.com
        </Link>
      </div>
    </div>
  );
};
