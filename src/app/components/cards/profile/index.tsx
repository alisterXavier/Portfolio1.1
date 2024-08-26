import Image from 'next/image';
import { CardWrapper } from '../..';
import image from '@/images/1.png'
export const Profile = () => {
  return (
    <CardWrapper
      parentClasses="col-span-4 row-span-1 md:col-span-1 md:row-span-1 "
      targetClass={'Profile'}
      className="w-full h-full"
    >
      <figure className="relative w-full h-full overflow-hidden">
        <Image
          src={image}
          alt=""
          objectFit="cover"
          objectPosition='center'
          fill
        />
      </figure>
    </CardWrapper>
  );
};
