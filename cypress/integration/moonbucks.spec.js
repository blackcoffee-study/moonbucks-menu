import { KOREAN_MENU_NAME } from '../../src/js/constants/constants';

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('../../index.html');
  });
  it('에스프레소 메뉴판에 새로운 메뉴를 확인 버튼을 눌러 추가할 수 있다.', () => {
    const newMenu = '아메리카노';
    cy.get('#menu-name').type(newMenu);
    cy.get('#menu-submit-button').click();
    cy.get('#menu-list li').contains(newMenu).should('be.visible');
  });
  it('에스프레소 메뉴판에 새로운 메뉴를 엔터 키를 눌러 추가할 수 있다.', () => {
    const newMenu = '카페모카';
    cy.get('#menu-name').type(`${newMenu}{enter}`);
    cy.get('#menu-list li')
      .should('have.length', 2)
      .last()
      .should($li => {
        expect($li).to.contain(newMenu);
      });
  });
  it('메뉴가 추가되고 나면 input은 빈 값으로 초기화한다', () => {
    const newMenu = '카페라떼';
    cy.get('#menu-name').type(`${newMenu}{enter}`);
    cy.get('#menu-name').should('have.value', '');
  });
  it('사용자 입력값이 빈 값이라면 추가되지 않는다.', () => {
    cy.get('#menu-name').then($input => {
      if ($input.text() === '') {
        cy.get('#menu-submit-button').click();
        cy.get('#menu-list li').should('have.length', 3);
      }
    });
  });
  it('메뉴의 수정 버튼을 눌러 메뉴 이름을 수정할 수 있다.', () => {
    const newMenuName = '아이스 아메리카노';
    cy.window().then(win => {
      cy.stub(win, 'prompt').returns(newMenuName);
    });
    cy.get('.menu-edit-button').first().click();
    cy.get('#menu-list li').first().contains(newMenuName);
  });
  it('메뉴의 삭제 버튼을 눌러 메뉴를 삭제할 수 있다.', () => {
    cy.window().then(() => {
      cy.on('window:confirm', () => true);
    });
    cy.get('.menu-remove-button').first().click();
    cy.get('#menu-list li').should('have.length', 2);
  });
  it('총 메뉴 갯수를 count하여 상단에 보여준다.', () => {
    cy.get('.menu-count').should('have.text', '총 2개');
  });
  it('종류별 메뉴판 관리할 수 있게 만든다.', () => {
    const menuNames = ['espresso', 'frappuccino', 'blended', 'teavana', 'desert'];

    menuNames.forEach(menuName => {
      cy.get(`[data-category-name=${menuName}]`).click();
      cy.get('[data-component=menu-header]')
        .children()
        .first()
        .contains(KOREAN_MENU_NAME[menuName]);
    });
  });
  it('페이지에 최초로 접근할 때는 에스프레소 메뉴가 먼저 보이게 한다.', () => {
    cy.get('[data-component=menu-header]')
      .children()
      .first()
      .contains(KOREAN_MENU_NAME['espresso']);
  });
  it('품절 상태인 경우를 보여줄 수 있게, 품절 버튼을 추가하고 sold-out class를 추가하여 상태를 변경한다.', () => {
    cy.get('.menu-sold-out-button').first().click();
    cy.get('#menu-list li').children().first().should('have.class', 'sold-out');
  });
});
