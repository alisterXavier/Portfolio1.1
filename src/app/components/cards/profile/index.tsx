import Image from 'next/image';
import { CardWrapper } from '../..';

export const Profile = () => {
  return (
    <CardWrapper
      parentClasses="col-span-4 row-span-1 md:col-span-1 md:row-span-1 "
      targetClass={'Profile'}
      className="w-full h-full"
    >
      <figure className="relative w-full h-full overflow-hidden">
        <Image
          src={require('../../../../../public/images/1.jpg')}
          alt=""
          objectFit="cover"
          objectPosition='center'
          fill
        />
      </figure>
    </CardWrapper>
  );
};
