describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('../../../index.html');
  });

  it('에스프레소 메뉴판에 아메리카노를 입력하고 버튼을 통해 추가할 수 있다', () => {
    cy.get('#menu-name').type('아메리카노');
    cy.get('#menu-submit-button').click();
    cy.get('#menu-list li').contains('아메리카노').should('be.visible');
  });

  it('에스프레소 메뉴판에 카페라떼를 입력하고 엔터키를 통해 추가할 수 있다.', () => {
    cy.get('#menu-name').type('카페라떼');
    cy.get('#menu-name').type('{enter}');
    cy.get('#menu-list li').contains('카페라떼').should('be.visible');
  });

  //   it('에스프레소 메뉴 이름 수정', () => {
  //     cy.get('#menu-name').type('TEST');
  //     cy.get('#menu-submit-button').click();
  //     cy.get('.menu-edit-button').click();
  //   });
});
