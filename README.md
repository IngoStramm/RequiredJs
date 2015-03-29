# RequiredJs
Script simples para fazer a validação de um formulário de contato em ASP.NET Webform. 

##Dependências:
[jQuery] (https://github.com/jquery/jquery)

###Resumo
A validação apenas verifica se os campos estão preenchidos, se o campo e-mail é um e-mail válido e se apenas um campo entre um grupo de campos está preenchido.

##Classes CSS

As seguintes classes CSS são usadas:

- ```.form``` Elemento HTML sendo usado como conteiner do formulário (necessário para quando a tela possui mais que um formulário).
- ```.required``` Campo (input) com preenchimento obrigatório.
- ```.email-input``` Verifica se o valor do campo é um e-mail válido.
- ```.opcao-unica``` Campos com opção única.
- ```.grupo-opcao-n``` Grupo de campos de opção única, aonde n representa um número inteiro positivo (necessário quando o - formulário possui mais que um grupo de campos com opção única).
- ```.error``` Classe CSS adicionada ao campo quando a validação detectar que o campo não preenche os pré-requisitos.
- ```.check-required``` Botão ou link que dispara o formulário.

##Eventos

A validação ocorre a primeira vez que o botão com a classe ```.check-required``` for clicado. A partir de então, a validação também ocorre quando o foco dos campos for perdido.

