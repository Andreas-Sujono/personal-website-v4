'use client';
import React, { memo, useEffect, useRef } from 'react';
import { useReducedMotion, useSpring } from 'framer-motion';
import { VisuallyHidden } from '@/components/VisuallyHidden';
import { delay } from '@/utils/helper';
import { classes } from '@/utils/styles';
import styles from './styles.module.scss';

// prettier-ignore
const glyphs = [
  'ア', 'イ', 'ウ', 'エ', 'オ',
  'カ', 'キ', 'ク', 'ケ', 'コ',
  'サ', 'シ', 'ス', 'セ', 'ソ',
  'タ', 'チ', 'ツ', 'テ', 'ト',
  'ナ', 'ニ', 'ヌ', 'ネ', 'ノ',
  'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
  'マ', 'ミ', 'ム', 'メ', 'モ',
  'ヤ', 'ユ', 'ヨ', 'ー',
  'ラ', 'リ', 'ル', 'レ', 'ロ',
  'ワ', 'ヰ', 'ヱ', 'ヲ', 'ン',
  'ガ', 'ギ', 'グ', 'ゲ', 'ゴ',
  'ザ', 'ジ', 'ズ', 'ゼ', 'ゾ',
  'ダ', 'ヂ', 'ヅ', 'デ', 'ド',
  'バ', 'ビ', 'ブ', 'ベ', 'ボ',
  'パ', 'ピ', 'プ', 'ペ', 'ポ',
];

const CharType = {
  Glyph: 'glyph',
  Value: 'value',
};

function shuffle(
  content: Array<any>,
  output: { value: string }[],
  position: number,
) {
  return content.map((value, index) => {
    if (index < position) {
      return { type: CharType.Value, value };
    }

    if (position % 1 < 0.5) {
      const rand = Math.floor(Math.random() * glyphs.length);
      return { type: CharType.Glyph, value: glyphs[rand] };
    }

    return { type: CharType.Glyph, value: output[index].value };
  });
}

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  start?: boolean;
  delay?: number;
  className?: string;
}

export const DecoderText = ({
  text,
  start = true,
  delay: startDelay = 0,
  className,
  ...rest
}: Props) => {
  const output = useRef([{ type: CharType.Glyph, value: '' }]);
  const container = useRef<HTMLSpanElement>(null);
  const reduceMotion = false;
  const decoderSpring = useSpring(0, { stiffness: 8, damping: 5 });

  useEffect(() => {
    console.log('errererererer');
    const containerInstance = container.current;
    const content = text.split('');
    let animation;

    const renderOutput = () => {
      console.log('renderOutput');
      const characterMap = output.current.map((item) => {
        return `<span class="${styles[item.type]}">${item.value}</span>`;
      });
      console.log('renderOutput2', containerInstance);

      if (containerInstance)
        containerInstance.innerHTML = characterMap.join('');
    };

    const unsubscribeSpring = decoderSpring.onChange((value) => {
      output.current = shuffle(content, output.current, value);
      renderOutput();
    });

    const startSpring = async () => {
      await delay(startDelay);
      decoderSpring.set(content.length);
    };

    console.log('herere: ', {
      start,
      animation,
    });
    if (start && !animation && !reduceMotion) {
      startSpring();
    }

    if (reduceMotion) {
      output.current = content.map((value, index) => ({
        type: CharType.Value,
        value: content[index],
      }));
      renderOutput();
    }

    return () => {
      unsubscribeSpring?.();
    };
  }, [decoderSpring, reduceMotion, start, startDelay, text]);

  return (
    <span className={classes(styles.text, className)} {...rest}>
      <VisuallyHidden className={styles.label}>{text}</VisuallyHidden>
      <span aria-hidden className={styles.content} ref={container} />
    </span>
  );
};
