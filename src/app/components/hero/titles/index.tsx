import { useGSAP } from '@gsap/react';
import { useState, useEffect } from 'react';
import { CardWrapper } from '..';

const words: string[] = [
  'Software Developer',
  'Full Stack Developer',
  'Cloud Enthusiast',
  'Web Developer',
  'Front End Developer',
  'Back End Developer',
  'React',
  'Next',
  'Mongo DB',
  'PostgreSQL',
  'MSSQL',
  'Javascript',
  'typescript',
  'ubuntu',
  'debian',
  'aws',
  'jenkins',
  'circleci',
  'python',
  'firebase',
  'supabase',
];

export const Titles = (): JSX.Element => {
  useGSAP(() => {});

  const [lines, setLines] = useState([]);

  useEffect(() => {
    const newLines = Array.from({ length: 17 }).map(() => {
      const shuffledWords = [...words].sort(() => Math.random() - 0.5);
      return shuffledWords.map((word) => (
        <span key={word} className="hover:text-default-accent text-default-bg">
          {' '}
          {word} |
        </span>
      ));
    });
    setLines(newLines as any);
  }, []);

  return (
    <CardWrapper
      targetClass="random"
      className="mouse_card hero_section titles_container col-span-2 md:col-span-2 row-span-1 overflow-hidden rounded-[15px] p-5"
      data-hero="random"
    >
      <div></div>
      {/* <div className="titles_list overflow-hidden">
          {lines.map((line, index) => (
            <div className={`flex marquee__line${index} overflow-hidden`} key={index}>
              <div className={`flex marquee__sentence${index} `}>
                <h2
                  key={index}
                  className="text-[20px] whitespace-nowrap uppercase"
                >
                  {line}
                </h2>
              </div>
            </div>
          ))}
        </div> */}
    </CardWrapper>
  );
};
