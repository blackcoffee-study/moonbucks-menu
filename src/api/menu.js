const baseUrl = 'http://localhost:3000/api/category';

export const getMenuList = async category => {
  try {
    const response = await fetch(`${baseUrl}/${category}/menu`);
    const result = response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
};
