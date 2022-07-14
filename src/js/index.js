import EtoileApp from './Etoile/index.js';
/**
 * App
 * 문벅스는 카페에 설치된 메뉴스크린을 위한 어드민 앱이다.
 * 문벅스는 "Single Page" Application.
 *
 * Etoile, menu management made simple
 * 문벅스는 Etoile 앱의 인스턴스이다.
 * Etoile은 정해진 UI, 스펙을 만족하는 DOM을 소비하여, 메뉴관리 기능을 제공한다.
 * Etoile의 구조는 (UI) - Controller - Service - Repository - Persistance 로 나뉜다.
 * Etoile은 아래와 같은 모듈로 이루어져 있다.
 * Category : 메뉴 카테고리에 대응한다. URL path와 뱃지UI로 표현된다.
 * MenuList : 메뉴 목록에 대응한다. 카테고리 맥락 하위에서 카테고리에 속한 메뉴목록을 관리할 수 있다.
 *
 * 셀링 포인트 : Etoile쓰세요 점주님들!!
 * - 확장 가능한 메뉴 모델 제공
 * - ?
 */

const defaultCategories = ['에스프레소', '프라푸치노', '블렌디드', '티바나', '디저트'];

new EtoileApp(defaultCategories);
