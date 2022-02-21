describe('example to-do app', () => {
    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
        cy.visit('../../index.html');
      // 인덱스 html 들어가기
    });

    it('에스프레소 메뉴판에 아메리카노를 추가할 수 있다. ', () => {
        cy.get('#menu-name').type('아메리카노');
        cy.get('#menu-submit-button').click();
        cy.get('#menu-list li').contains('아메리카노').should('be.visible');
        });
    it('에스프레소 메뉴판에 카페라떼를 추가할 수 있다. ', () => {
        cy.get('#menu-name').type('카페라떼');
        cy.get('#menu-submit-button').click();
        cy.get('#menu-list li').contains('카페라떼').should('be.visible');
        });
    //  it('에스프레소 메뉴판에 카페라떼를 삭제할 수 있다. ', () => {
    //      cy.get('.menu-remove-button').click();
    //      cy.get('#menu-list li').contains('카페라떼').should('be.empty');
    //  });
    it('프라푸치노 메뉴 버튼을 눌렀을 때, 그 메뉴관리로 이동한다.', () => {
        cy.get('[data-category-name="frappuccino"]').click();
        cy.get('#category-title').should('have.text', '🥤 프라푸치노 메뉴 관리')
        //  to.contain('🥤 프라푸치노 메뉴 관리').should('be.visible');
        //  should('have.text', 'foobarbaz')
    })
    it('디저트 메뉴 버튼을 눌렀을 때, 그 메뉴관리로 이동한다.', () => {
        cy.get('[data-category-name="desert"]').click();
        cy.get('#category-title').should('have.text', '🍰 디저트 메뉴 관리')
    })
    it('초기 메뉴의 개수는 총 0개 이다.', () => {
        cy.get('.menu-count').should('have.text', '총 0 개')
    })
    it('아메리카노의 품절버튼을 눌렀을 때, .', () => {
        cy.get('[data-category-name="desert"]').click();
        cy.get('#category-title').should('have.text', '🍰 디저트 메뉴 관리')
    })
    // it('에스프레소 메뉴판에 카페모카를 수정할 수 있다. ', () => {
    //     cy.get('#menu-name').type('카페모카');
    //     cy.get('.menu-edit-button').click();
    // });
});