export const generateId = () => {
  let id = 0;

  return () => {
    return id++;
  };
};
