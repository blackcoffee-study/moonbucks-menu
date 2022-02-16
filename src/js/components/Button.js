

const Button = ({ type, className }) => {
  return `<button
    type="button"
    class="bg-gray-50 text-gray-500 text-sm ${className}"
    data-type=${type}
  >
    ${type === 'edit' ? '수정' : '삭제'}
  </button>`;
};

export default Button;
