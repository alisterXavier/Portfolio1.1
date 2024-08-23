import { mergeClassNames } from "@/app/components";

export const FourthSection = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  return (
    <div
      className={mergeClassNames(
        'w-screen h-screen flex items-center justify-center about_section',
        className
      )}
    >
      <p className="text-[25px] md:text-[50px] w-[80%] text-center">
        {children}
      </p>
    </div>
  );
};

export const FourthSpan = ({
  text,
  classNames,
}: {
  text: string;
  classNames: string;
}) => (
  <span
    className={mergeClassNames(
      'px-3 inline-block -rotate-[2deg] rounded-[5px] md:rounded-[10px] w-[165px] md:w-[275px]',
      classNames
    )}
  >
    {text}
  </span>
);
