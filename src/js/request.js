async function fetchData(method, ...rest) {
  try {
    const fetchFunc = request[method].bind(request);

    const res = await fetchFunc(...rest);

    if (res.statusText !== 'OK') {
      const data = await res.json();
      const error = new Error(data.message);
      throw error;
    }
    if (method !== 'delete') {
      const data = await res.json();
      return data;
    }
  } catch (e) {
    const error_message = e.message || '예기치 못한 에러로 인해 서비스 이용이 불가합니다.';
    window.alert(error_message);
  }
}

const request = {
  getRequestUrl(category, menuId = '', type = '') {
    const baseUrl = 'http://localhost:3000/api/category';
    const param = menuId ? (type === 'soldout' ? `/${menuId}/soldout` : `/${menuId}`) : '';
    return `${baseUrl}/${category}/menu${param}`;
  },
  options(method, name = '') {
    return {
      method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: name && JSON.stringify({ name }),
    };
  },
  get(category) {
    const requestUrl = this.getRequestUrl(category);

    return fetch(requestUrl);
  },
  post(category, name) {
    const requestUrl = this.getRequestUrl(category);
    const options = this.options('POST', name);
    return fetch(requestUrl, options);
  },
  put(category, menuId, name) {
    const type = name ? 'editText' : 'soldout';
    const requestUrl = this.getRequestUrl(category, menuId, type);
    const options = name ? this.options('PUT', name) : this.options('PUT');

    return fetch(requestUrl, options);
  },
  delete(category, menuId) {
    const requestUrl = this.getRequestUrl(category, menuId);
    const options = this.options('DELETE');
    return fetch(requestUrl, options);
  },
};

export default fetchData;
