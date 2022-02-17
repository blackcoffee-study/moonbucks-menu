

const Button = ({ type, className }) => {
  return `<button
    type="button"
    class="bg-gray-50 text-gray-500 text-sm ${className}"
    data-type=${type}
  >
    ${{
        soldout: '품절',
        edit: '수정',
        remove: '삭제',
      }[type]}
  </button>`;
};

export default Button;
