export default async function FetchPost(menu, navMenu) {
  const option = {
    credentials: "same-origin",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: menu,
    }),
  };

  const res = await fetch(
    `http://localhost:3000/api/category/${navMenu}/menu`,
    option
  );

  const responsData = await res.json();
  let okey;

  if (responsData.name) {
    okey = responsData.name;
    return okey;
  } else {
    return alert(responsData.message);
  }
}
