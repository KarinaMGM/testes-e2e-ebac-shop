/// <reference types="cypress" />
const perfil = require('../fixtures/perfil.json')
import enderecoPage from '../support/page_objects/endereco.page';
const dadosEndereco = require('../fixtures/endereco.json')

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC  
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Fazer login 
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/')
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {

        cy.get('#primary-menu > .menu-item-629 > a').click()

        // adicionando produtos no carrinho
        //Produto 1
        cy.visit('produtos/page/4/')
        cy.addProdutos('Teton Pullover Hoodie', 'XL', 'Purple', 2)
        //Produto 2
        cy.visit('produtos/page/3/')
        cy.addProdutos('Mach Street Sweatshirt', 'L', 'Black', 1)
        //Produto 3
        cy.visit('produtos')
        cy.addProdutos('Beaumont Summit Kit', 'S', 'Orange', 4)
        //Produto 4
        cy.visit('produtos/page/2/')
        cy.addProdutos('Hollister Backyard Sweatshirt', 'M', 'White', 1)

        cy.get('#cart > .dropdown-toggle').click()
        cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout').click()

        //Login no checkout
        cy.get('.showlogin').click()
        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha)
        cy.get('.woocommerce-button').click()

        //Completando endereço de faturamento checkout
        enderecoPage.editarEnderecoFaturamento(
            dadosEndereco[0].nome,
            dadosEndereco[0].sobrenome,
            dadosEndereco[0].empresa,
            dadosEndereco[0].pais,
            dadosEndereco[0].endereco,
            dadosEndereco[0].numero,
            dadosEndereco[0].cidade,
            dadosEndereco[0].estado,
            dadosEndereco[0].cep,
            dadosEndereco[0].telefone,
            dadosEndereco[0].email
        )

        cy.get('#terms').click()
        cy.get('#place_order').click()

        //Confirmação de pedido
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
    });

})
