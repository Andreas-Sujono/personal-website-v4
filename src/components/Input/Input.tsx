import { HTMLAttributes, useId, useRef, useState } from 'react';
import { tokens } from '@/components/ThemeProvider/theme';
import { Transition } from '@/components/Transition';
import { classes, cssProps, msToNum } from '@/utils/styles';
import styles from './Input.module.scss';
import { TextArea } from './TextArea';

interface Props extends HTMLAttributes<HTMLInputElement> {
  label?: string;
  value?: string | number;
  multiline?: boolean;
  error?: string | null;
  autoComplete?: string;
  required?: boolean;
  maxLength?: number;
  type?: string;
}

export const Input = ({
  id,
  label,
  value,
  multiline,
  className,
  style,
  error,
  onBlur,
  autoComplete,
  required,
  maxLength,
  type,
  onChange,
  ...rest
}: Props) => {
  const [focused, setFocused] = useState(false);
  const generatedId = useId();
  const errorRef = useRef<HTMLDivElement | null>(null);
  const inputId = id || `${generatedId}input`;
  const labelId = `${inputId}-label`;
  const errorId = `${inputId}-error`;
  const InputElement = multiline ? TextArea : 'input';

  const handleBlur = (event: React.FocusEvent<any>) => {
    setFocused(false);

    if (onBlur) {
      onBlur(event);
    }
  };

  return (
    <div
      className={classes(styles.container, className)}
      data-error={!!error}
      style={style}
      {...rest}
    >
      <div className={styles.content}>
        <label
          className={styles.label}
          data-focused={focused}
          data-filled={!!value}
          id={labelId}
          htmlFor={inputId}
        >
          {label}
        </label>
        <InputElement
          className={styles.input}
          id={inputId}
          aria-labelledby={labelId}
          aria-describedby={error ? errorId : undefined}
          onFocus={() => setFocused(true)}
          onBlur={handleBlur}
          value={value as any}
          onChange={onChange as any}
          autoComplete={autoComplete}
          required={required}
          maxLength={maxLength}
          type={type}
        />
        <div className={styles.underline} data-focused={focused} />
      </div>
      <Transition unmount in={!!error} timeout={msToNum(tokens.base.durationM)}>
        {(visible) => (
          <div
            className={styles.error}
            data-visible={visible}
            id={errorId}
            role="alert"
            style={cssProps({
              height: visible
                ? errorRef.current?.getBoundingClientRect().height || 0
                : 0,
            })}
          >
            <div className={styles.errorMessage} ref={errorRef}>
              {/* <Icon icon="error" /> */}
              {error}
            </div>
          </div>
        )}
      </Transition>
    </div>
  );
};
