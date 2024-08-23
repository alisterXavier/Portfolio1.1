import { mergeClassNames } from '@/app/components';

export const SecondSection = ({
  text,
  text1,
  className,
}: {
  text: string;
  text1: string;
  className: string;
}) => {
  return (
    <div
      className={
        'relative w-screen h-screen flex items-center justify-center about_section'
      }
    >
      <div className="w-full h-[50%] flex items-center justify-center">
        <div
          className={mergeClassNames('text-default-accent w-[70%]', className)}
        >
          <p className="text-[15px] md:text-[20px] w-fit about_sub_line">
            {text}
          </p>
          <h1 className="text-[30px] md:text-[40px] w-full">{text1}</h1>
        </div>
      </div>
    </div>
  );
};
