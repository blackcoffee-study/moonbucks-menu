import { GET, POST, PUT, PATCH, DELETE } from '../constants/index.js';
import HTTPError from './HTTPError.js';

export default class HTTPClient {
  constructor(options, headers) {
    this.options = {
      baseURL: options.baseURL,
      mode: options.mode || 'no-cors',
      cache: options.cache || 'no-cache',
      credentials: options.credentials || 'same-origin',
      redirect: options.redirect || 'follow',
      referrer: options.referrer || 'no-referrer',
    };
    this.headers = {
      'Content-Type': headers.type || 'application/json',
      'Access-Control-Allow-Origin': headers.cors || '*',
    };
  }

  /**
   * 인스턴스 없이 호출 가능한 request 객체
   *
   * @param {Object} params
   * @returns
   */
  async request(params) {
    const { method = GET, url, headers = this.headers, body } = params;
    console.log(headers);
    const config = {
      method,
      headers: new Headers(headers),
      body: JSON.stringify(body) || null,
    };

    try {
      const response = await fetch(`${this.options.baseURL}${url}`, config);
      return await this.parse(response);
    } catch (error) {
      throw new HTTPError(error.message, url, error.status, config);
    }
  }

  /**
   * 응답 본문 변환
   * - Fetch API의 Body 믹스인 활용(arrayBuffer(), blob(), json(), text(), formData())
   * - 여기서 사용하는 것은 json() 메서드, @TODO 추후 확장하기
   *
   * @param {Response} response
   * @returns
   */
  async parse(response) {
    const { status } = response;
    let data = status !== 204 ? await response.json() : null;
    return { status, data };
  }

  /**
   * HTTP: 데이터 반환 요청
   * - 쿠키(Cookie), 자격 증명(credentials) 등 필요시 커스텀
   *
   * @param {String} url
   * @param {Header} headers
   * @returns
   */
  async get(url, headers = this.headers) {
    return await this.request({
      url,
      headers,
      method: GET,
    }).data;
  }

  /**
   * HTTP: 데이터 생성 요청
   * - 쿠키(Cookie), 자격 증명(credentials) 등 필요시 커스텀
   *
   * @param {String} url
   * @param {Object} body
   * @param {Header} headers
   * @returns
   */
  async post(url, body, headers = this.headers) {
    return await this.request({
      url,
      body,
      headers,
      method: POST,
    }).data;
  }

  /**
   * HTTP: 데이터 전체 치환 요청
   * - 쿠키(Cookie), 자격 증명(credentials) 등 필요시 커스텀
   *
   * @param {String} url
   * @param {Object} body
   * @param {Header} headers
   * @returns
   */
  async put(url, body, headers = this.headers) {
    return await this.request({
      url,
      body,
      headers,
      method: PUT,
    }).data;
  }

  /**
   * HTTP: 데이터 일부분 치환 요청
   * - 쿠키(Cookie), 자격 증명(credentials) 등 필요시 커스텀
   *
   * @param {String} url
   * @param {Object} body
   * @param {Header} headers
   * @returns
   */
  async patch(url, body, headers = this.Headers) {
    return await this.request({
      url,
      body,
      headers,
      method: PATCH,
    }).data;
  }

  /**
   * HTTP: 데이터 삭제 요청
   * - 쿠키(Cookie), 자격 증명(credentials) 등 필요시 커스텀
   *
   * @param {String} url
   * @param {Header} headers
   * @returns
   */
  async delete(url, headers = this.headers) {
    return await this.request({
      url,
      headers,
      method: DELETE,
    }).data;
  }
}
