// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any) => void | Promise<void>>(
  func: T,
  wait: number
) {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);

      func(...args);
    };

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);
  };
}
