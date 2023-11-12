import { useReducedMotion } from 'framer-motion';
import NextImage from 'next/image';
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Button } from '@/components/Button';
import { useTheme } from '@/components/ThemeProvider';
import { useHasMounted, useInViewport } from '@/hooks';
import { resolveSrcFromSrcSet, srcSetToString } from '@/utils/image';
import { classes, cssProps, numToMs } from '@/utils/styles';
import styles from './styles.module.scss';

interface ImageProps
  extends Omit<React.HTMLAttributes<HTMLImageElement>, 'src' | 'placeholder'> {
  className?: string;
  style?: React.CSSProperties;
  reveal?: boolean;
  delay?: number;
  raised?: boolean;
  placeholder?: { src: string; width: number; height: number };
  src?: { src: string; width: number; height: number };
  srcSet?: any;
  alt?: string;
}
export const Image = ({
  className,
  style,
  reveal,
  delay = 0,
  raised,
  src: baseSrc,
  srcSet,
  placeholder,
  ...rest
}: ImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const { themeId } = useTheme();
  const containerRef = useRef<null | HTMLDivElement>(null);
  const src = baseSrc || srcSet?.[0];
  const inViewport = useInViewport(containerRef, !getIsVideo(src));

  const onLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <div
      className={classes(styles.image, className)}
      data-visible={inViewport || loaded}
      data-reveal={reveal}
      data-raised={raised}
      data-theme={themeId}
      style={cssProps({ delay: numToMs(delay) }, style)}
      ref={containerRef}
    >
      <ImageElements
        delay={delay}
        onLoad={onLoad}
        loaded={loaded}
        inViewport={inViewport}
        reveal={reveal}
        src={src}
        srcSet={srcSet}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
};

interface ImageElementsProps
  extends Omit<React.HTMLAttributes<HTMLImageElement>, 'src' | 'placeholder'> {
  onLoad?: React.ReactEventHandler<HTMLImageElement>;
  loaded?: boolean;
  inViewport?: boolean;
  srcSet?: string;
  placeholder?: { src: string; width: number; height: number };
  delay?: number;
  src?: { src: string; width: number; height: number } | string;
  alt?: string;
  // play = true,
  // restartOnPause,
  reveal?: boolean;
  sizes?: string;
  // noPauseButton,
}
const ImageElements = ({
  onLoad,
  loaded,
  inViewport,
  srcSet,
  placeholder,
  delay,
  src,
  alt,
  // play = true,
  // restartOnPause,
  reveal,
  sizes,
  // noPauseButton,
  ...rest
}: ImageElementsProps) => {
  const reduceMotion = useReducedMotion();
  const [showPlaceholder, setShowPlaceholder] = useState(false);
  // const [playing, setPlaying] = useState(!reduceMotion);
  // const [videoSrc, setVideoSrc] = useState();
  // const [videoInteracted, setVideoInteracted] = useState(false);
  const placeholderRef = useRef<HTMLImageElement | null>(null);
  // const videoRef = useRef();
  const isVideo = getIsVideo(src);
  const showFullRes = true; //inViewport;
  const srcSetString = srcSetToString(srcSet);
  // const hasMounted = useHasMounted();

  // useEffect(() => {
  //   const resolveVideoSrc = async () => {
  //     const resolvedVideoSrc = await resolveSrcFromSrcSet({ srcSet, sizes });
  //     setVideoSrc(resolvedVideoSrc);
  //   };

  //   if (isVideo && srcSet) {
  //     resolveVideoSrc();
  //   } else if (isVideo) {
  //     setVideoSrc(src.src);
  //   }
  // }, [isVideo, sizes, src, srcSet]);

  // useEffect(() => {
  //   if (!videoRef.current || !videoSrc) return;

  //   const playVideo = () => {
  //     setPlaying(true);
  //     videoRef.current.play();
  //   };

  //   const pauseVideo = () => {
  //     setPlaying(false);
  //     videoRef.current.pause();
  //   };

  //   if (!play) {
  //     pauseVideo();

  //     if (restartOnPause) {
  //       videoRef.current.currentTime = 0;
  //     }
  //   }

  //   if (videoInteracted) return;

  //   if (!inViewport) {
  //     pauseVideo();
  //   } else if (inViewport && !reduceMotion && play) {
  //     playVideo();
  //   }
  // }, [
  //   inViewport,
  //   play,
  //   reduceMotion,
  //   restartOnPause,
  //   videoInteracted,
  //   videoSrc,
  // ]);

  // const togglePlaying = (event) => {
  //   event.preventDefault();

  //   setVideoInteracted(true);

  //   if (videoRef.current.paused) {
  //     setPlaying(true);
  //     videoRef.current.play();
  //   } else {
  //     setPlaying(false);
  //     videoRef.current.pause();
  //   }
  // };

  return (
    <div
      className={styles.elementWrapper}
      data-reveal={reveal}
      data-visible={inViewport || loaded}
      style={cssProps({ delay: numToMs((delay || 0) + 1000) })}
    >
      {/* {isVideo && hasMounted && (
        <Fragment>
          <video
            muted
            loop
            playsInline
            className={styles.element}
            data-loaded={loaded}
            autoPlay={!reduceMotion}
            role="img"
            onLoadStart={onLoad}
            src={videoSrc}
            aria-label={alt}
            ref={videoRef}
            {...rest}
          />
          {!noPauseButton && (
            <Button className={styles.button} onClick={togglePlaying}>
              <Icon icon={playing ? "pause" : "play"} />
              {playing ? "Pause" : "Play"}
            </Button>
          )}
        </Fragment>
      )} */}
      {!isVideo && !!(src as { src: string })?.src && (
        <NextImage
          className={styles.element}
          data-loaded={loaded}
          onLoad={onLoad}
          decoding="async"
          src={
            showFullRes
              ? (src as { src: string })?.src || '/next.svg' //FIXME: create placeholder image here
              : '/next.svg'
          }
          // srcSet={showFullRes ? srcSetString : ''}
          width={(src as { width: number })?.width}
          height={(src as { height: number })?.height}
          alt={alt || ''}
          sizes={sizes}
          {...rest}
        />
      )}
      {/* {showPlaceholder && placeholder?.src && (
        <NextImage
          aria-hidden
          className={styles.placeholder}
          data-loaded={loaded}
          style={cssProps({ delay: numToMs(delay || 0) })}
          ref={placeholderRef}
          src={placeholder?.src || ''}
          width={placeholder?.width}
          height={placeholder?.height}
          onTransitionEnd={() => setShowPlaceholder(false)}
          decoding="async"
          alt=""
          role="presentation"
        />
      )} */}
    </div>
  );
};

function getIsVideo(src?: { src: string } | string) {
  return (
    typeof src === 'object' &&
    src?.src === 'string' &&
    src?.src.endsWith('.mp4')
  );
}
