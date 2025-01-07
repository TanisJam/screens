export const debounce = <T extends (arg: string) => Promise<void>>(
  func: T,
  wait: number
): T => {
  let timeoutId: NodeJS.Timeout | undefined;

  return function (value: string) {
    clearTimeout(timeoutId);
    return new Promise<void>((resolve) => {
      timeoutId = setTimeout(() => resolve(func(value)), wait);
    });
  } as T;
};
