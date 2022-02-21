export const isEmpty = (value) => {
  const hasSize = (value) => value.length > 0;
  if (typeof value === 'object') {
    return !hasSize(Object.keys(value));
  }

  if (typeof value === 'string') {
    return !hasSize(value.trim());
  }
};

export const head = (array) => {
  return array[0];
};
