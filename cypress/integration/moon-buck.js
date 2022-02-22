describe('문벅스 메뉴 관리', () => {
  beforeEach(() => {
    cy.visit('./../../index.html', {
      onBeforeLoad(win) {
        cy.stub(win, 'prompt').returns('카페라떼');
      },
    });
  });

  it('커피 메뉴 추가', () => {
    cy.get('#espresso-menu-name').type('아메리카노');
    cy.get('#espresso-menu-submit-button').click();
    cy.get('#espresso-menu-list li').contains('아메리카노').should('have.text', '아메리카노');
  });

  it('커피 메뉴 수정', () => {
    cy.get('#espresso-menu-name').type('아메리카노');
    cy.get('#espresso-menu-submit-button').click();
    cy.get('#espresso-menu-list li button').contains('수정').click();
    cy.window().its('prompt').should('be.called');
    cy.get('#espresso-menu-list li').contains('카페라떼').should('have.text', '카페라떼');
  });

  it('커피 메뉴 삭제', () => {
    cy.get('#espresso-menu-name').type('아메리카노');
    cy.get('#espresso-menu-submit-button').click();
    cy.get('#espresso-menu-list li button').contains('삭제').click();
    cy.get('#espresso-menu-list').children().should('have.length', 0);
  });
});
