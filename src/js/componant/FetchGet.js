export default async function FetchGet(navMenu) {
  const res = await fetch(`http://localhost:3000/api/category/${navMenu}/menu`);

  const responsData = await res.json();

  if (responsData) {
    return responsData;
  } else {
    return alert(data.message);
  }
}
