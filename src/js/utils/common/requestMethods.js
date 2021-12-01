export const get = async url => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.ok) {
    return data;
  } else {
    throw Error(data);
  }
};

export const post = async (url, body, headers = {}) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  };
  const res = await fetch(url, options);
  const data = await res.json();

  if (res.ok) {
    return data;
  } else {
    throw Error(data);
  }
};

export const put = async (url, body, headers = {}) => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  };
  const res = await fetch(url, options);
  const data = await res.json();

  if (res.ok) {
    return data;
  } else {
    throw Error(data);
  }
};
