const getMaxNumber = ({ numbers }) => {
  if (numbers.length === 0) {
    return 0;
  }

  return Math.max(...numbers);
};

export default getMaxNumber;
