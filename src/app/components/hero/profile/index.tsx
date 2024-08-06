import Image from 'next/image';
import { CardWrapper } from '..';

export const Profile = () => {
  return (
    <CardWrapper
      targetClass={'Profile'}
      className="col-span-2 row-span-1 md:col-span-1 md:row-span-1 w-full h-full"
    >
      <figure className="relative w-full h-full overflow-hidden">
        {/* <Image
          src={require('../../../../../public/IMG-20240412-WA0013.jpg')}
          alt=""
          objectFit="cover"
          objectPosition='top'
          fill
        /> */}
      </figure>
    </CardWrapper>
  );
};
