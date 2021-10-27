export default async function FetchDelete(menuId, navMenu) {
  await fetch(`http://localhost:3000/api/category/${navMenu}/menu/${menuId}`, {
    method: "delete",
  });
}
