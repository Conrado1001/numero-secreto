let listaNumerosSorteado = [];
let numeroMaximo = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
let meuImput = document.querySelector('input');
console.log(numeroSecreto);
colocarCursor();

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', `Jogo do número secreto.`);
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroMaximo}`);
}

exibirMensagemInicial();

function gerarNumeroAleatorio(){
    let numeroGerado = parseInt(Math.random()*numeroMaximo+1); 
    let quantidadeDeElementosLista = listaNumerosSorteado.length;
    
    if (quantidadeDeElementosLista == numeroMaximo){
        listaNumerosSorteado = [];
    }
    
    //poderia usar a funcao reiniciarJogo() dessa maneira tambem.
    
    //if(listaNumerosSorteado.length == numeroMaximo){
        //return reiniciarPagina();
    //}
    
    if(listaNumerosSorteado.includes(numeroGerado)){
        return gerarNumeroAleatorio();
    }else{
        listaNumerosSorteado.push(numeroGerado);
        colocarCursor();
        console.log(listaNumerosSorteado);
        return numeroGerado;        
    }
}

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    //O modo da aula nao deu certo entao usei a alternativa que a propia alura deu
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function verificarChute(){  
    let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
    let mensgemTentativa = `Você precisou de ${tentativas} ${palavraTentativas} para
    acertar o número secreto ${numeroSecreto}.`;
    let chute = document.querySelector('input').value;

    if(isNumeroVazio(meuImput)){
        exibirTextoNaTela('p', `O campo está vazio.`);
        colocarCursor();
    }else if(chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Parabéns!!!! Você acertou!!!');
        exibirTextoNaTela('p', mensgemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');        
    }else{
            if(chute > numeroSecreto){
                exibirTextoNaTela('p', `O numero secreto é menor que ${chute}`);
                tentativas++;
            }else{
                exibirTextoNaTela('p', `O numero secreto é maior que ${chute}`);
                tentativas++;
            }            
            limparCampo();
            colocarCursor();
        }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function colocarCursor(){
    meuInput = document.querySelector('input');
    meuInput.focus();
}

function isNumeroVazio(inputElement) {
  let valor = inputElement.value.trim();
  return valor === "";
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    document.getElementById('reiniciar').setAttribute('disabled', 'disabled');
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
}

//function reiniciarPagina(){
    //location.reload();
//}
