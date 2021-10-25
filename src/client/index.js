import HTTPClient from './HTTPClient.js';

const httpClient = new HTTPClient(
  {
    baseURL: 'http://localhost:3000',
  },
  {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
);

const http = {
  list({ category }) {
    httpClient.get(`/api/category/${category}/menu`);
  },
  create({ category }, params) {
    httpClient.post(`/api/category/${category}/menu`, params);
  },
  edit({ category, menuId }, params) {
    httpClient.put(`/api/category/${category}/menu/${menuId}`, params);
  },
  soldOut({ category, menuId }, params) {
    httpClient.put(`/api/category/${category}/menu/${menuId}/soldout`, params);
  },
  delete({ category, menuId }) {
    httpClient.delete(`/api/category/${category}/menu/${menuId}`);
  },
};

export default http;
