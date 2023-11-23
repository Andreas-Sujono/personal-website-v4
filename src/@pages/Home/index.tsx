'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useGetAllArticles } from '@/api/articles';
import { Intro } from './Intro';
import { Profile } from './Profile/Profile';
import { Projects } from './Projects';

const disciplines = [
  'Designer',
  'Prototyper',
  'Thinker',
  'Entrepreneur',
  'Researcher',
];

const HomePage = () => {
  const [visibleSections, setVisibleSections] = useState<
    (Element | undefined)[]
  >([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const introRef = useRef();
  const aboutMeRef = useRef();
  const projectsRef = useRef();
  useGetAllArticles();

  useEffect(() => {
    const sections = [introRef, aboutMeRef, projectsRef];

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
      { rootMargin: '-80% 0px 0px 0px' },
    );

    sections.forEach((section) => {
      if (section.current) sectionObserver.observe(section.current);
    });

    if (introRef?.current) indicatorObserver.observe(introRef?.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className="home">
      <Intro
        id="intro"
        sectionRef={introRef}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <Profile
        id="about-me"
        sectionRef={aboutMeRef}
        visible={visibleSections.includes(aboutMeRef.current)}
      />
      <Projects
        id="projects"
        sectionRef={projectsRef}
        visible={visibleSections.includes(projectsRef.current)}
      />
    </div>
  );
};

export default HomePage;
