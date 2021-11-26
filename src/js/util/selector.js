// 선택자를 선택하는 로직을 간소화해주기 위한 함수
export const $ = (selector, from = document) => from.querySelector(selector);
