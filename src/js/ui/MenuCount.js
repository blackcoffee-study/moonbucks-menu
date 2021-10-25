export default function MenuCount({ $menuCount }) {
    this.setState = menuCount => {
        $menuCount.innerText = `총 ${menuCount}개`;
    };
}
