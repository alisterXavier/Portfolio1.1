import Image from 'next/image';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CardWrapper } from '..';
import stack from '../../../../../public/assets/data/stack.json';

export const Stack = (): JSX.Element => {
  return (
    <CardWrapper
      parentClasses="mouse_card col-span-3 md:col-span-1 row-span-1"
      className="relative hero_section flex items-center justify-center !cursor-default"
      targetClass="stack"
    >
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        modules={[Autoplay]}
        className="mySwiper w-[90%] "
      >
        {stack.map((item, index) => {
          return (
            <SwiperSlide
              key={index}
              className=" md:!w-[50px] !h-[50px] !flex items-center justify-center"
            >
              <figure className="relative w-[50px]">
                <Image
                  src={item.img}
                  alt={item.lang}
                  layout="contain"
                  width={100}
                  height={100}
                />
              </figure>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <span className="w-[50px] h-full absolute left-0 z-[100]"></span>
      <span className="w-[50px] h-full absolute right-0 z-[100]"></span>
    </CardWrapper>
  );
};
