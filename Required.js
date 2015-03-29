$(document).ready(function () {
    $(".check-required").click(function (e) {
        e.preventDefault();

        // pega a div com a classe "form" como referência para os campos dentro dela
        var currForm = $(this).closest(".form");
        var val = [];

        currForm.find(".required").each(function (i) {
            val[i] = verificaTipoDeValidacao($(this));
        });

        // Valida quando o campo perde o foco
        $('.form .required').blur(function () {
            val[$(this).index()] = verificaTipoDeValidacao($(this));
        });

        var checkVal = true;
        for (var i = 0; i < val.length; i++) {
            console.log('val: ' + val[i]);
            if (!val[i])
                checkVal = false;
        }

        // Verifica se os campos são válidos
        if (checkVal) {

            console.log('campos são válidos');

            // remove a validação
            $(this).off();

            // envia o form
            if ($(this).is("a")) // fix para quando o objeto for um link
                eval($(this).attr('href'));
            else {
                $(this).trigger("click");
            }
        }

    }); // $(".check-required").click()
}); // $(document).ready(

// valida o e-mail
function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

// verifica o tipo de validação que deve ser feita no campo
function verificaTipoDeValidacao(campo) {
    if (campo.hasClass('opcao-unica'))
        return verificaCampoOpcaoUnica(campo);
    else
        return verificaCampo(campo);
}

// verifica se apenas um dos campos entre os outros do mesmo grupo está preenchido
function verificaCampoOpcaoUnica(campo) {
    var retorna = false;
    var camposValidos = 0;
    var nomeDoGrupo;
    var classeGrupo = "grupo-opcao-n"; // n representa o número da classe
    var classeCss = campo.attr('class');
    var ultimoDogrupo = false;
    nomeDoGrupo = classeCss.substring(classeCss.indexOf('grupo-opcao-'));
    nomeDoGrupo = nomeDoGrupo.substring(nomeDoGrupo.indexOf('grupo-opcao-'), nomeDoGrupo.indexOf('grupo-opcao-') + classeGrupo.length);
    //ultimoDogrupo = $('.' + nomeDoGrupo).index(campo) + 1 == $('.' + nomeDoGrupo).length; // não mais usado

    // Para a validação funcionar também quando o campo perde o foco, 
    // ela precisa ocorrer independente de ser o último campo do seu respectivo grupo
    //if (ultimoDogrupo) {
        var grupo = $('input.' + nomeDoGrupo);
        grupo.each(function (i) {
            if (verificaCampo($('.' + nomeDoGrupo).eq(i))) {
                camposValidos++;
                //console.log("campo válido: " + $('.' + nomeDoGrupo).eq(i).attr('placeholder'));
            }
        });
        //console.log("Total de itens do grupo: " + $('.' + grupo).length);
        //console.log("Total de campos válidos: " + camposValidos);
        if (camposValidos == 1) {
            grupo.removeClass('error');
            retorna = true;
        } else {
            grupo.each(function () {
                if (!$(this).hasClass('error'))
                    $(this).addClass('error');
            });
        }
    //}
    //console.log("Index: " + $('.' + grupo).index(campo));
    //console.log("É o último item do grupo? Resposta: " + (ultimoDogrupo));
    //console.log("grupo: " + grupo);
    //console.log("O campo " + campo.attr('placeholder') + " é válido? R: " + retorna);
    //console.log("======================================");
    return retorna;
}

// verifica se o campo está preenchido e, se for um campo de e-mail, verifica se é um e-mail válido
function verificaCampo(campo) {
    var retorna;

    // checa se o campo está preenchido
    if (!$.trim(campo.val())) {
        campo.addClass("error");
        retorna = false;
    }
        // se o campo estiver preenchido
    else {
        // checa se o campo é e-mail
        if (campo.hasClass('email-input')) {
            // verifica o e-mail
            if (!IsEmail(campo.val())) {
                campo.addClass("error");
                retorna = false;
                // valida o e-mail
            } else {
                campo.removeClass("error");
                retorna = true;
            }
            // se não for e-mail
        } else {
            campo.removeClass("error");
            retorna = true;
        }
    }
    return retorna;
}
