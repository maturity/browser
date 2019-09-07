import Mock from 'mockjs'

var Random = Mock.Random
var name = Random.name()
var email = Random.email()

describe('认证', function () {
  it('注册测试', function () {
    cy.visit('/')
    cy.contains('register').click()
    cy.url().should('include', '/auth/register')

    cy.get('.register-form-body :input').eq(0).type(name).should('have.value', name)
    cy.get('.register-form-body :input').eq(1).type(email).should('have.value', email)
    cy.get('.register-form-body :input').eq(2).type('password').should('have.value', 'password')
    cy.get('.register-form-body :input').eq(3).type('password').should('have.value', 'password')

    cy.get('.register-form-body :button').first().click()

    cy.url().should('include', '/home')
  })

  it('登录测试', function () {
    cy.visit('/')
    cy.contains('login').click()
    cy.url().should('include', '/auth/login')

    cy.get('.login-form-body :input').eq(0).type(email).should('have.value', email)
    cy.get('.login-form-body :input').eq(1).type('password').should('have.value', 'password')

    cy.get('.login-form-body :button').click()

    cy.url().should('include', '/home')
  })
})
