 //esta função limpa valores do formulario de CEP
 function limpa_formulario_cep(){
    document.getElementById('rua').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('cidade').value=("");
    document.getElementById('uf').value=("");
    document.getElementById('ibge').value=("");
}

function meu_callback(conteudo){
    if (!("erro" in conteudo)){
        //se nao tem erro no conteudo atualizar os campos com os valores .
        document.getElementById("rua").value=(conteudo.logradouro);
        document.getElementById("bairro").value=(conteudo.bairro);
        document.getElementById("cidade").value=(conteudo.localidade);
        document.getElementById("uf").value=(conteudo.uf);
        document.getElementById("ibge").value=(conteudo.ibge);
    }
    else{
        //CEP nao encontrado
        alert("CEP não encontrado");
        limpa_formulario_cep();
    }
}

function pesquisacep(valor){
    // var cep somente com digitos
    var cep = valor.replace(/\D/g,'');
    // verificar se campo cep possui valor informado
    if (cep != ""){
        // expressao regular para validar CEP
        var validacep = /^[0-9]{8}$/;

        //validar formato do CEP
        if (validacep.test(cep)){
            //preenche os campos com "..." enquanto consulta webservice
            document.getElementById("rua").value = "...";
            document.getElementById("bairro").value = "...";
            document.getElementById("cidade").value = "...";
            document.getElementById("uf").value = "...";
            document.getElementById("ibge").value = "...";

            //criar um elemeno JavaScript
            var script = document.createElement('script');

            //sincroniza com o callback
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';
            
            //insere script no docuemnto e carrega conteudo
            document.body.appendChild(script);
        } 
        else{
            //cep invalido
            limpa_formulario_cep();
            alert("Formato de CEP inválido!");
        }
    }

}