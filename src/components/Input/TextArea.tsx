import { useEffect, useRef, useState, HTMLAttributes } from 'react';
import { classes, cssProps } from '@/utils/styles';
import styles from './TextArea.module.scss';

interface props extends HTMLAttributes<HTMLTextAreaElement> {
  resize?: string;
  value?: string;
  minRows?: number;
  maxRows?: number;
}

export const TextArea = ({
  className,
  resize = 'none',
  value,
  onChange,
  minRows = 1,
  maxRows,
  ...rest
}: props) => {
  const [rows, setRows] = useState(minRows);
  const [textareaDimensions, setTextareaDimensions] = useState({
    lineHeight: 0,
    paddingHeight: 0,
  });
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!textareaRef.current) return;
    const style = getComputedStyle(textareaRef.current);
    const lineHeight = parseInt(style.lineHeight, 10);
    const paddingHeight =
      parseInt(style.paddingTop, 10) + parseInt(style.paddingBottom, 10);
    setTextareaDimensions({ lineHeight, paddingHeight });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange && onChange(event);

    const { lineHeight, paddingHeight } = textareaDimensions;
    const previousRows = event.target.rows;
    event.target.rows = minRows;

    const currentRows = ~~(
      (event.target.scrollHeight - paddingHeight) /
      lineHeight
    );

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    if (maxRows && currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }

    setRows(maxRows && currentRows > maxRows ? maxRows : currentRows);
  };

  return (
    <textarea
      className={classes(styles.textarea, className)}
      ref={textareaRef}
      onChange={handleChange}
      style={cssProps({ resize })}
      rows={rows}
      value={value}
      {...rest}
    />
  );
};
