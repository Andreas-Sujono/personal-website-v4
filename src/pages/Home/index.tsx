'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Intro } from './Intro';

const disciplines = [
  'Developer',
  'Prototyper',
  'Thinker',
  'Entrepreneur',
  'Researcher',
];

const HomePage = () => {
  const [visibleSections, setVisibleSections] = useState<Element[]>([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();

  useEffect(() => {
    const sections = [intro];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections((prevSections: any) => [
              ...prevSections,
              section,
            ]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' },
    );

    sections.forEach((section) => {
      if (section.current) sectionObserver.observe(section.current);
    });

    if (intro?.current) indicatorObserver.observe(intro?.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className="home">
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
    </div>
  );
};

export default HomePage;
