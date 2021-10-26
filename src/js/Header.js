export default function Header({ $app, onClick }) {
  this.state = [
    { categoryName: 'espresso', text: '☕ 에스프레소' },
    { categoryName: 'frappuccino', text: '🥤 프라푸치노' },
    { categoryName: 'blended', text: '🍹 블렌디드' },
    { categoryName: 'teavana', text: '🫖 티바나' },
    { categoryName: 'desert', text: '🍰 디저트' },
  ];
  this.onClick = onClick;

  this.header = document.createElement('header');
  this.header.className = 'my-4';

  $app.appendChild(this.header)



  this.render = () => {
    this.header.innerHTML = `
    <a href="/" class="text-black">
      <h1 class="text-center font-bold">🌝 문벅스 메뉴 관리</h1>
    </a>
    <nav class="d-flex justify-center flex-wrap">
      ${this.state.map((item) => `<button data-category-name="${item.categoryName}" class="cafe-category-name btn bg-white shadow mx-1">${item.text}</button>`).join('')}
    </nav>
    `
  }

  this.header.addEventListener('click', event => {
    if (event.target.tagName === 'BUTTON') {
      const categotyName = event.target.dataset.categoryName;
      const index = this.state.findIndex(e => e.categoryName === categotyName)
      const text = this.state[index].text;
      this.onClick(categotyName, text)
    }

  })

}