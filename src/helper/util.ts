export const generateRandomId = () => {
  return Math.random().toString(36).slice(-8);
};
