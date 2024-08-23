export const HeroText = ({ className }: { className: string }) => {
  return (
    <div
      className={
        'relative w-screen h-screen flex items-center justify-center about_section_hero'
      }
    >
      <div className={className}>
        <p className="text-[40px] md:text-[100px] tracking-widest about_name invisible">
          Typewriter
        </p>
      </div>
    </div>
  );
};
