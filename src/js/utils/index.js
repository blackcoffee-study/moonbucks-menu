export const validator = {
  isEmptyString: (value) => {
    if (value.length === 0) throw new Error('input is empty string');
  },
};
