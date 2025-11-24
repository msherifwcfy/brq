'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';

interface UseSmoothScrollAnimationOptions {
  triggerOnce?: boolean;
  amount?: number;
}

/**
 * Custom hook for smooth scroll-triggered animations
 * Provides smoother animation triggers similar to Framer websites
 */
export function useSmoothScrollAnimation(
  options: UseSmoothScrollAnimationOptions = {}
) {
  const { triggerOnce = true, amount = 0.3 } = options;

  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    once: triggerOnce,
    amount,
  });

  return { ref, isInView };
}

/**
 * Common animation variants for smooth scroll-triggered animations
 */
export const smoothScrollVariants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 100,
      duration: 0.8,
      bounce: 0.1,
    },
  },
};

export const smoothFadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 30,
      stiffness: 120,
      duration: 0.6,
    },
  },
};

export const smoothSlideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 100,
      duration: 0.9,
    },
  },
};

export const smoothScale = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 90,
      duration: 0.8,
    },
  },
};
