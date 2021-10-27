export default async function FetchPut(menuId, navMenu, newState) {
  const option = {
    credentials: "same-origin",
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newState,
    }),
  };

  if (newState) {
    let res = await fetch(
      `http://localhost:3000/api/category/${navMenu}/menu/${menuId}`,
      option
    );
    let resData = await res.json();
    console.log(resData);
  } else {
    await fetch(
      `http://localhost:3000/api/category/${navMenu}/menu/${menuId}/soldout`,
      option
    );
  }
}
