import { useState, useEffect } from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config';
const fullConfig = resolveConfig(tailwindConfig);

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpoints = {
  xs: 0,
  sm: parseInt(fullConfig.theme.screens.sm),
  md: parseInt(fullConfig.theme.screens.md),
  lg: parseInt(fullConfig.theme.screens.lg),
  xl: parseInt(fullConfig.theme.screens.xl),
  '2xl': parseInt(fullConfig.theme.screens['2xl']),
};

/**
 * A hook that returns the current breakpoint based on window width.
 * 
 * Breakpoints are defined as:
 * - xs: < sm
 * - sm: >= sm and < md
 * - md: >= md and < lg
 * - lg: >= lg and < xl
 * - xl: >= xl and < 2xl
 * - 2xl: >= 2xl
 * 
 * The hook automatically updates when the window is resized.
 * 
 * @returns {Breakpoint} The current breakpoint ('xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl')
 * 
 * @example
 * const breakpoint = useBreakpoints();
 * console.log(breakpoint); // 'md'
 */
export const useBreakpoints = (): Breakpoint => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('xs');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width >= breakpoints['2xl']) {
        setBreakpoint('2xl');
      } else if (width >= breakpoints.xl) {
        setBreakpoint('xl');
      } else if (width >= breakpoints.lg) {
        setBreakpoint('lg');
      } else if (width >= breakpoints.md) {
        setBreakpoint('md');
      } else if (width >= breakpoints.sm) {
        setBreakpoint('sm');
      } else {
        setBreakpoint('xs');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
};
