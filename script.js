const inputNome=document.getElementById("nome");
const erroNome= document.getElementById("erroNome");
const botaoCriarConta=document.getElementById ("criarconta");
const titular= document.getElementById ("titular");
const operacoes= document.getElementById ("operacoes")
const saldo= document.getElementById ("saldo");
const inputValor= document.getElementById("valor");
const botaoDepositar= document.getElementById("depositar");
const botaoSacar= document.getElementById("sacar");
const mensagem= document.getElementById("mensagemErro");
const historico=document.getElementById("historico");
const historicoConta= document.getElementById("historicoConta")

let saldoAtual= 0;
let historicoTransacoes =[];

infoConta.style.display="none";

botaoCriarConta.addEventListener("click",function(){
      const nomeDigitado= inputNome.value;
      if(nomeDigitado ===""){
        erroNome.textContent ="Digite um nome valido";
       return;
      }

      titular.textContent=nomeDigitado;
      erroNome.textContent="";
     
      infoConta.style.display="block";
      operacoes.style.display="block";
      historicoConta.style.display="block";

});

botaoDepositar.addEventListener("click",function() {
    const valorDepositado= Number(inputValor.value);
    
    if (valorDepositado <=0 || isNaN(valorDepositado)) {
       mensagem.textContent ="Digite um valor valido."
       return;
       }
       
       saldoAtual += valorDepositado;
       saldo.textContent=saldoAtual.toFixed(2);

       inputValor.value="";

       adicionarHistorico("Depósito",valorDepositado);

       mensagem.textContent="";

    });

botaoSacar.addEventListener ("click",function(){
   const valorSaque = Number(inputValor.value);
   
   if(valorSaque <= 0 ||isNaN (valorSaque)) {
    mensagem.textContent ="Digite um valor valido."
    return;
   }

   if (valorSaque > saldoAtual) {
     mensagem.textContent ="Saldo Insulficiente."
     return;
   } 
   saldoAtual -= valorSaque;
   saldo.textContent = saldoAtual.toFixed(2);
   inputValor.value="";

   adicionarHistorico("Saque",valorSaque);
    mensagem.textContent="";


});

 function adicionarHistorico (tipo,valor) {
    const data = new Date();
    historicoTransacoes.unshift({
        tipo,
        valor,
        data
 });
     console.log (historicoTransacoes);
     atualizarHistoricoTela();

}

function atualizarHistoricoTela(){
    historico.innerHTML="";
    historicoTransacoes.forEach
    (transacao =>{
    const sinal = transacao.tipo ==="Depósito" ? "+": "-";

   const dataFormatada = transacao.data.toLocaleDateString("pt-BR");
   const horaFormatada = transacao.data.toLocaleTimeString("pt-BR", {hour:'2-digit', minute:'2-digit'});

    const li= document.createElement("li");
    const classeCor = transacao.tipo === "Depósito" ? "deposito" : "saque";

    li.innerHTML= `<strong class="${classeCor}">${sinal} R$ ${transacao.valor.toFixed(2)} </strong> - ${transacao.tipo}<br> <small>${dataFormatada} ${horaFormatada}</small>`;

   historico.appendChild(li);
 });




}
  

