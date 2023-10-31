import { AnimatePresence, usePresence } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

/**
 * A Framer Motion AnimatePresence implementation of `react-transition-group`
 * to be used for vanilla css transitions
 */
interface TransitionProps {
  children: (visible: boolean, status: string) => React.ReactElement;
  timeout?:
    | number
    | {
        enter: number;
        exit: number;
      };
  onEnter?: () => void;
  onEntered?: () => void;
  onExit?: () => void;
  onExited?: () => void;
  in?: boolean;
  unmount?: boolean;
}
export const Transition = ({
  children,
  timeout = 0,
  onEnter,
  onEntered,
  onExit,
  onExited,
  in: show,
  unmount,
}: TransitionProps) => {
  const enterTimeout = useRef();
  const exitTimeout = useRef();

  useEffect(() => {
    if (show) {
      clearTimeout(exitTimeout.current);
    } else {
      clearTimeout(enterTimeout.current);
    }
  }, [show]);

  return (
    <AnimatePresence>
      {(show || !unmount) && (
        <TransitionContent
          timeout={timeout}
          enterTimeout={enterTimeout}
          exitTimeout={exitTimeout}
          onEnter={onEnter}
          onEntered={onEntered}
          onExit={onExit}
          onExited={onExited}
          show={show}
        >
          {children}
        </TransitionContent>
      )}
    </AnimatePresence>
  );
};

interface TransitionContentProps {
  children: (visible: boolean, status: string) => React.ReactElement;
  timeout?:
    | number
    | {
        enter: number;
        exit: number;
      };
  enterTimeout?: React.MutableRefObject<any>;
  exitTimeout?: React.MutableRefObject<any>;
  onEnter?: () => void;
  onEntered?: () => void;
  onExit?: () => void;
  onExited?: () => void;
  show?: boolean;
}
const TransitionContent = ({
  children,
  timeout,
  enterTimeout,
  exitTimeout,
  onEnter,
  onEntered,
  onExit,
  onExited,
  show,
}: TransitionContentProps) => {
  const [status, setStatus] = useState('exited');
  const [isPresent, safeToRemove] = usePresence();
  const [hasEntered, setHasEntered] = useState(false);
  const splitTimeout = typeof timeout === 'object';

  useEffect(() => {
    if (hasEntered || !show) return;

    const actualTimeout = splitTimeout ? timeout.enter : timeout;

    clearTimeout(enterTimeout?.current);
    clearTimeout(exitTimeout?.current);

    setHasEntered(true);
    setStatus('entering');
    onEnter?.();

    if (enterTimeout?.current)
      enterTimeout.current = setTimeout(() => {
        setStatus('entered');
        onEntered?.();
      }, actualTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onEnter, onEntered, timeout, status, show]);

  useEffect(() => {
    if (isPresent && show) return;

    const actualTimeout = splitTimeout ? timeout.exit : timeout;

    clearTimeout(enterTimeout?.current);
    clearTimeout(exitTimeout?.current);

    setStatus('exiting');
    onExit?.();

    if (exitTimeout?.current)
      exitTimeout.current = setTimeout(() => {
        setStatus('exited');
        safeToRemove?.();
        onExited?.();
      }, actualTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPresent, onExit, safeToRemove, timeout, onExited, show]);

  return children(hasEntered && show ? isPresent : false, status);
};
