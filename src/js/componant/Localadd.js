export default function LocalAdd(state) {
  const { menu } = state;
  const { navMenu } = state;
  const { soldOut } = state;

  localStorage.setItem(navMenu, JSON.stringify({ menu, soldOut }));
}
