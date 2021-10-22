export default function LocalAdd(state) {
  const { menu } = state;
  const { navMenu } = state;
  localStorage.setItem(navMenu, JSON.stringify(menu));
}
