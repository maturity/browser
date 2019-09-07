// https://docs.cypress.io/api/introduction/api.html

describe('测试套件-样例', () => {
  it('测试用例-样例', () => {
    expect(true).to.equal(true)
  })

  it('访问首页', () => {
    cy.visit('/')
    cy.contains('首页')
  })
})
