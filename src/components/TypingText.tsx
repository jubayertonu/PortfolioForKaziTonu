import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";

interface TypingTextProps {
  text: string;
  className?: string;
  delayPerChar?: number;
}

export function TypingText({ text, className, delayPerChar = 0.012 }: TypingTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [showCaret, setShowCaret] = useState(true);

  const words = text.split(" ");
  let charCounter = 0;

  useEffect(() => {
    if (isInView) {
      // Calculate typing duration and hide the caret 1 second after typing has fully finished.
      const duration = text.length * delayPerChar * 1000 + 1000;
      const timer = setTimeout(() => {
        setShowCaret(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isInView, text, delayPerChar]);

  return (
    <p ref={ref} className={className}>
      {words.map((word, wordIdx) => {
        const characters = word.split("");
        return (
          <span key={wordIdx} className="inline-block whitespace-pre">
            {characters.map((char, charIdx) => {
              const globalIndex = charCounter++;
              return (
                <motion.span
                  key={charIdx}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{
                    duration: 0.01,
                    delay: globalIndex * delayPerChar,
                    ease: "linear",
                  }}
                >
                  {char}
                </motion.span>
              );
            })}
            {wordIdx < words.length - 1 && (
              <span className="inline-block">
                {(() => {
                  charCounter++;
                  return <>&nbsp;</>;
                })()}
              </span>
            )}
          </span>
        );
      })}
      
      {showCaret && isInView && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{
            repeat: Infinity,
            duration: 0.6,
            ease: "easeInOut",
          }}
          className="inline-block ml-1 w-[3px] h-[1em] bg-[#41B3A3] align-middle"
        />
      )}
    </p>
  );
}
