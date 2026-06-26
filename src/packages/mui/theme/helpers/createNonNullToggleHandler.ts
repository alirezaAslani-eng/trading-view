function createNonNullToggleHandler<T>(setter: (value: T) => void) {
  return (_: React.MouseEvent<HTMLElement>, value: T | null) => {
    if (value === null) return;
    setter(value);
  };
}

export default createNonNullToggleHandler;
