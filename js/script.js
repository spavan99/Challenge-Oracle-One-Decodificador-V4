const panels = document.querySelectorAll('.panel');
const inputTexto = document.querySelector('.texto_criptar');
const msgSecreta = document.querySelector('.texto_segredo');
const btnCopia = document.querySelector('.button_copia');
const blocosegredo = document.querySelector('.msg_segredo');
const blocoimagem = document.querySelector('.sem_segredo');
const listaMSG = document.querySelector('.listaMSGGravadas');
const totMSG = document.querySelector('#totalmsg');
const totMSG2 = document.querySelector('.tot_resumo_msg');
const coresSite1 = [
  ['#f1f2f5', '#072347', '#f3f5fc', '#f1f2f5'],
  ['#d5d5d5', '#96858f', '#9099a2', '#d5d5d5'],
  ['#f1f2f5', '#76323f', '#d7cec7', '#c09f80'],
  ['#00303f', '#dcae10', '#cae4db', '#7a9d96'],
];
const coresSite2 = [
  [
    'linear-gradient(68.3deg,rgba(245, 177, 97, 1) 0.4%,rgba(236, 54, 110, 1) 100.2%)',
    'radial-gradient(circle farthest-corner at 92.3% 71.5%,rgba(83, 138, 214, 1) 0%,rgba(134, 231, 214, 1) 90%',
  ],
  ['linear-gradient(#96858f, #96858f)', 'linear-gradient(#9099a2,#9099a2)'],
  ['linear-gradient(#76323f, #76323f)', 'linear-gradient(##d7cec7,##d7cec7)'],
  ['linear-gradient(#dcae10, #dcae10)', 'linear-gradient(#cae4db,#cae4db)'],
];

const coresNav = [
  ['black', 'white', 'white', 'black'],
  ['#6d7993', 'white', 'white', '#6d7993'],
  ['#565656', 'white', 'white', '#565656'],
  ['#00303f', 'white', 'white', '#00303f'],
];

const imgApp = [
  'url()',
  'url(./imagens/topsecret1.jpg)',
  'url(./imagens/topsecret2.jpg)',
  'url(./imagens/topsecret5.jpg)',
];

const bordaApp = ['', '', '', '1px solid #337bc4;', '3px solid black'];

const shadowdaApp = [
  '0px 0px 0px 10px hsl(237, 80%, 50%), 0px 5px 0px 10px hsl(237, 80%, 40%), 0px 15px 15px 10px #0003',
  'rgba(253, 76, 0, 0.5) 0 25px 30px',
  '0px 0px 0px 15px hsl(330, 80%, 50%), 0px 10px 0px 15px hsl(330, 80%, 40%), 0px 20px 20px 15px #0003',
  '6px 5px 0px 0px #0c0d0d;',
  '1px 1px',
];

const chaves = ['a', 'e', 'i', 'o', 'u'];
const codigos = ['ai', 'enter', 'imes', 'ober', 'ufat'];

// constante localStore
const registro = 'AluraOracle_Registro';
const chaveReg = 'AluraOracle_Secredo';
//  chave do secredo sempre será "AluraOracle_Secredo" +  AluraOracle_Registro +1
const gravadasMSG = [];
var configFundo = 1;
var configBorda = 1;
var configCores = 2;
var configImagem = 3;
var totalMensagens = 0;
var page_descriptar = false;

//***********************************************
// funco para abri e fechar os paineis
//**********************************************/
panels.forEach(panel => {
  panel.addEventListener('click', () => {
    removeActiveClasses();
    panel.classList.add('active');
  });
});

function removeActiveClasses() {
  panels.forEach(panel => {
    panel.classList.remove('active');
  });
}

//***********************************************
// fim funco para abri e fechar os paineis
//**********************************************/

//***********************************************
//pegar digitacao do input e faza validaçoes
//**********************************************/

inputTexto.onclick = function () {
  inputTexto.value = '';
  msgSecreta.value = '';
  // usando visible
  blocosegredo.style.visibility = 'hidden';
  //  blocosegredo.style.order = '2';
  //  blocoimagem.style.visibility = 'visible';
  //  blocoimagem.style.order = '1';
};

// verificar digitaçao e não permitir caracters especiais
inputTexto.addEventListener('keypress', function (e) {
  if (!chekChar(e)) {
    alert(
      'Digiaçao de caracter especial não permitido   <<  ' + e.key + '  >>'
    );
    e.preventDefault();
  }
});

function chekChar(caracter) {
  const char = String.fromCharCode(caracter.keyCode);
  const padrao = '[a-zA-Z0-9 .,:()@*!?]';

  if (char.match(padrao)) {
    return true;
  }
}
//***********************************************
// fim pegar digitacao do input e faza validaçoes
//**********************************************/

//***********************************************
// criptografar e descritografar mensagem
//**********************************************/
//precionado botao criptografar paramento 1 criptografar  2 descriptografar
function geraCripto(npar, pmsg) {
  var msg = '';
  if (pmsg == null) {
    msg = inputTexto.value.trim();
  } else {
    msg = pmsg.trim();
  }

  if (msg.length == 0) {
    alert('Não há mensagem para criptografar ou descriptofragar');
  } else {
    if (npar == '1') {
      msg = criptar(msg);
      gravaStore(msg);
    } else {
      msg = descriptar(msg);
    }
    page_descriptar = true;
    msgSecreta.value = msg;
    // usando visible   msg_segredo
    blocosegredo.style.visibility = 'visible';

    console.log(msg);
  }
  //console.log(msg);
  return msg;
}

// funcao criptografar
function criptar(nTexto) {
  var nret = '';
  var naux = '';
  var tam = nTexto.length;
  var tam2 = chaves.length;

  for (var i = 0; i < tam; i++) {
    naux = nTexto[i];
    // pesquisa vetor chaves
    for (var n = 0; n < tam2; n++) {
      if (naux == chaves[n]) {
        naux = codigos[n];
        break;
      }
    }
    nret = nret + naux;
  }
  return nret;
}

// funcao criptografar
function descriptar(nTexto) {
  var nret = '';
  var naux = '';
  var tam = nTexto.length;
  var tam2 = codigos.length;
  var letras = 0;

  for (var i = 0; i < tam; i++) {
    naux = nTexto[i];
    // pesquisa vetor codigos
    for (var n = 0; n < tam2; n++) {
      letras = codigos[n].length;
      if (nTexto.substring(i, i + letras) == codigos[n]) {
        naux = chaves[n];
        i = i + letras - 1;
        break;
      }
    }
    nret = nret + naux;
  }
  return nret;
}
//***********************************************
// fim criptografar e descritografar mensagem
//**********************************************/

//***********************************************
// funcao copiar para area de tranferencia
//**********************************************/

function cpTxt() {
  var msg = msgSecreta.value.trim();
  copiarTexto(msg);
}

function copiarTexto(msg) {
  navigator.clipboard
    .writeText(msg)
    .then(() => {
      alert('Texto copia para area de tranferencia');
    })
    .catch(err => {
      alert('Texto não copiado ocorreu um erro: >> ', err);
    });
}

//***********************************************
// fim funcao copiar para area de tranferencia
//**********************************************/

// *****************local store *****************
// grava a mensagem

function gravaStore(msgSegredo) {
  var numero;
  var grava;
  // pegar numero da mensagem
  numero = nrReg();
  grava = chaveReg + numero.toString();
  // grava a chave caso exista atualiza
  localStorage.setItem(grava, msgSegredo);
  //atualiza o vetor de menagens
  gravadasMSG.push(msgSegredo);
  // atualiza a lista de mensagen
  criaLI(msgSegredo);
  // atualiza o controle nr registro
  totalMensagens++;
  totMSG.textContent = 'Total: ' + totalMensagens;
  totMSG2.textContent = totalMensagens;

  localStorage.setItem(registro, numero);
}

//pega numeto de mensagems atual
function nrReg(npar) {
  // 1 - inclusao dados
  // 2 ou mais pesquisa somente retorna numero
  var reg = 0;
  npar = npar == null ? 1 : 2;
  if (!localStorage.getItem(registro)) {
    if (npar == 1) {
      localStorage.setItem(registro, 1);
      reg = 1;
    }
  } else {
    reg = localStorage.getItem(registro);
    reg++;
  }
  return reg;
}
// pega todas mensagem gravadas
function pegaMsgGravadas() {
  var tam = nrReg(2);
  var pesquisa = '';
  var aux = '';
  // busca todas mensagem gravadas
  for (var i = 1; i <= tam; i++) {
    pesquisa = chaveReg + i.toString();
    aux = localStorage.getItem(pesquisa);
    if (aux != null) {
      gravadasMSG.push(aux);
      totalMensagens++;
    }
  }
  // atualiza pagian total
  totMSG.textContent = 'Total: ' + totalMensagens;
  totMSG2.textContent = totalMensagens;
}

// apaga todas as mensagens gravadas
function apagaTodasMsgGravadas() {
  var tam = nrReg(2);
  var pesquisa = '';
  totalMensagens = 0;
  // busca todas mensagem gravadas
  for (var i = 1; i <= tam; i++) {
    pesquisa = chaveReg + i.toString();
    localStorage.removeItem(pesquisa);
  }
  // apagar regisro
  //localStorage.setItem(registro, 1);
  localStorage.removeItem(registro);

  // atualiza pagian total
  totMSG.textContent = 'Total: ' + totalMensagens;
  totMSG2.textContent = totalMensagens;
  // pega todos elemento classe filhos (li) atraves do nome atriudo classe pai (ul)

  var listaLI = document.getElementsByClassName('listaMSG');
  var tam = listaLI.length;
  for (var i = 0; i < tam; i++) {
    //console.log(listaLI[0].textContent);
    listaLI[0].remove();
  }
}

// monta a mensagem na html
function montaHTMli() {
  for (var i = 0; i < gravadasMSG.length; i++) {
    criaLI(gravadasMSG[i]);
  }
  // listaMSG
}

// cria em lista
function criaLI(msg) {
  var elemntoLista = document.createElement('li');
  // configurar li
  //elemntoLista.textContent = msg;
  elemntoLista.value = msg;
  elemntoLista.style.margem = '0px';
  elemntoLista.style.fontSize = '1em';
  elemntoLista.style.padding = '2px';
  elemntoLista.className = 'listaMSG';
  //adiconando classe a lista
  elemntoLista.classList.add('corLetra');

  /*/adicionado evento a linha subtituo pelo buton
  elemntoLista.addEventListener(
    'click',
    function (e) {
      copiarTexto(this.textContent);
    },
    false
  );
  */

  // input
  var dados = document.createElement('input');
  dados.value = msg;
  dados.setAttribute('readonly', true);
  dados.className = 'inputLista';
  dados.style.width = '50%';
  dados.scroll.margin = '0';
  elemntoLista.appendChild(dados);

  // primeiro botao de copias
  var btn = document.createElement('button');
  btn.className = 'btn_pad_estilo1 button_princ1';
  btn.textContent = 'Copiar';
  btn.style.width = '20%';
  btn.style.height = '30px';
  btn.style.marginLeft = '5px';
  btn.addEventListener(
    'click',
    function (e) {
      selTexto(e.target.parentElement, 0);
    },
    false
  );
  elemntoLista.appendChild(btn);

  // segundo botao
  var btn1 = document.createElement('button');
  btn1.className = 'btn_pad_estilo1 button_princ1';
  btn1.textContent = 'Descriptar';
  btn1.style.width = '20%';
  btn1.style.height = '30px';
  btn1.style.marginLeft = '5px';
  btn1.addEventListener(
    'click',
    function (e) {
      selTexto(e.target.parentElement, 1);
    },
    false
  );
  elemntoLista.appendChild(btn1);

  listaMSG.appendChild(elemntoLista);
}

function selTexto(npar, acao) {
  var aux = npar.querySelector('input');
  if (acao == 0) {
    copiarTexto(aux.value);
  } else if (acao == 1) {
    alert('Mensagem Descriptofraga >>> ' + geraCripto(2, aux.value));
  }
}

//------ DADOS ALEATORIOS
function fundo_aleatorio_quadrado(nqtde, tipo) {
  /****** colcoar este keyframes no css para funcionar
  //   "@"keyframes subindo_up_dados {
        from {
          opacity: 0;
          transform: translateY(0);
        }
        50% {
          opacity: 0.7;
        }
        to {
          opacity: 0;
          transform: translateY(-900px) rotate(900deg);
        }
      }
  */ //////
  // CHAMAR A FUNÇAO PARA
  // CONFIGURAÇOES DO BODY PARA FICAR APARENDCIA BONITA
  //body{
  //  width: 100vw;
  //  height: 100vh;
  //  margin: 0;
  //  padding: 0;
  //  background-color: black;
  //}
  //////////////////////////////////////////

  if (tipo == null) {
    tipo = 0;
  }
  const bd = document.querySelector('body');
  //const ul = document.querySelector(".fundo_efeito");

  const ul = document.createElement('ul');
  ul.overflow = 'hidden';
  ul.style.height = '1px';
  ul.style.zIndex = '1';
  bd.appendChild(ul);

  const random = (min, max) => Math.random() * (max - min) + min;
  const randomColors = ['#8400ff', '#2bff00', '#eaff00'];
  if (nqtde == null) {
    nqtde = 50;
  }

  for (let i = 0; i < nqtde; i++) {
    const li = document.createElement('li');

    const size = Math.floor(random(30, 80));
    const position = random(1, 94);
    const delay = random(5, 1);
    const duration = random(10, 40);

    //configuraçoes a li
    //li.sytle.liststyle = 'none';
    li.style.display = 'block';
    li.style.position = 'absolute';
    li.style.bottom = '-120px';
    li.style.animation = 'subindo_up_dados 1s infinite alternate';

    li.style.width = `${size}px`;
    li.style.height = `${size}px`;

    // padroe 0 somente quadrados  1 somente ciruclos  2 misto  3 outro
    if (tipo == 1) {
      li.style.borderRadius = '0% 35% 0% 35%';
      li.style.boxShadow = 'rgba(253, 76, 0, 0.5) 0 10px 15px';
    } else if (tipo == 2) {
      if (size % 2 == 0) {
        li.style.borderRadius = '0% 35% 0% 35%';
        li.style.boxShadow = 'rgba(253, 76, 0, 0.5) 0 10px 15px';
        //li.style.borderRadius = '50%';
      }
    }

    li.style.backgroundColor = randomColors[Math.floor(random(0, 3))];
    li.style.left = `${position}%`;
    li.style.animationDelay = `${delay}s`;
    li.style.animationDuration = `${duration}s`;
    li.style.animationTimingFunction = `cubic-bezier(${Math.random()}, ${Math.random()},
                                                    ${Math.random()}, ${Math.random()})`;
    ul.appendChild(li);
  }
}
// FINAL FUNCAO QUADRADOS/DADOS ALEATORIOS

// configuracao do site
function configSite() {
  var modal = document.querySelector('.form_modal');
  var status = window.getComputedStyle(modal, null).display;

  if (status == 'none') {
    //pega paramento localStore do site
    //setParamentrosConfig();
    getParamentrosConfig();
    // atualiza tela
    radioAtualiza(1);

    modal.style.display = 'block';
  } else {
    // ativado modal sai dele
    // atulazar variavies
    modal.style.display = 'none';
    radioAtualiza(2);
    setParamentrosConfig(configFundo, configBorda, configCores, configImagem);
    startConfigApp();
  }
}

// funcion correo o grupo de radios e atulia
function radioAtualiza(npar) {
  // fundo
  var radios = document.querySelectorAll('.animacao_fundo input[type="radio"]');
  if (npar == 1) {
    atualizaRadio(radios, configFundo);
  } else {
    configFundo = variavelRadio(radios);
  }

  var radios = document.querySelectorAll('.borda_app input[type="radio"]');
  if (npar == 1) {
    atualizaRadio(radios, configBorda);
  } else {
    configBorda = variavelRadio(radios);
  }

  var radios = document.querySelectorAll('.cores_app input[type="radio"]');
  if (npar == 1) {
    atualizaRadio(radios, configCores);
  } else {
    configCores = variavelRadio(radios);
  }
  var radios = document.querySelectorAll('.imagem_app input[type="radio"]');
  if (npar == 1) {
    atualizaRadio(radios, configImagem);
  } else {
    configImagem = variavelRadio(radios);
  }
}

function atualizaRadio(nRadio, nPar) {
  for (var i = 0; i < nRadio.length; i++) {
    if (i == nPar) {
      nRadio[i].checked = true;
    } else {
      nRadio[i].checked = false;
    }
  }
}

function variavelRadio(nRadio) {
  var nret = 0;
  for (var i = 0; i < nRadio.length; i++) {
    if (nRadio[i].checked == true) {
      nret = i;
      break;
    }
  }
  return nret;
}

// atualiza os paramento para o site
function setParamentrosConfig(nfundo, nborda, ncores, nimagem) {
  localStorage.setItem('AluraOracle_Config_Fundo', nfundo);
  localStorage.setItem('AluraOracle_Config_Borda', nborda);
  localStorage.setItem('AluraOracle_Config_Cores', ncores);
  localStorage.setItem('AluraOracle_Config_Imagem', nimagem);
}

// pega os parametros do site
function getParamentrosConfig() {
  configFundo = localStorage.getItem('AluraOracle_Config_Fundo');
  configBorda = localStorage.getItem('AluraOracle_Config_Borda');
  configCores = localStorage.getItem('AluraOracle_Config_Cores');
  configImagem = localStorage.getItem('AluraOracle_Config_Imagem');
}

// configracoes do site inicial verifica as variaveis locais se nao existir
// cria a atualiza padrao 0 caso tenha pega valor armazenado e grava
// grava em int  /// converte ddos obtido value do inpute
function configStart() {
  var naux = localStorage.getItem('AluraOracle_Config_Fundo');
  if (naux == null) {
    localStorage.setItem('AluraOracle_Config_Fundo', configFundo);
  } else {
    configFundo = naux;
  }

  var naux = localStorage.getItem('AluraOracle_Config_Borda');
  if (naux == null) {
    localStorage.setItem('AluraOracle_Config_Borda', configBorda);
  } else {
    configBorda = naux;
  }

  naux = localStorage.getItem('AluraOracle_Config_Cores');
  if (naux == null) {
    localStorage.setItem('AluraOracle_Config_Cores', configCores);
  } else {
    configCores = naux;
  }

  naux = localStorage.getItem('AluraOracle_Config_Imagem');
  if (naux == null) {
    localStorage.setItem('AluraOracle_Config_Imagem', configImagem);
  } else {
    configImagem = naux;
  }
}

// config cor do site -----------------
function startConfigApp(npar) {
  var config = document.documentElement.style;
  if (npar == null) {
    npar = 0;
  } else {
    npar = npar - 1;
  }

  /*
  // cores site
  config.setProperty('--cor-st-geral', coresSite[npar][0]);
  config.setProperty('--cor-st-banner', coresSite[npar][1]);
  config.setProperty('--cor-st-primeira', coresSite[npar][2]);
  config.setProperty('--cor-st-secundaria', coresSite[npar][3]);
  //config.setProperty('--cor-st-secundaria', 'red');
  // cores nav /menu
  config.setProperty('--cor-nav-fundo', coresNav[npar][0]);
  config.setProperty('--cor-nav-txt:', coresNav[npar][1]);
  config.setProperty('--cor-nav-hover-fundo', coresNav[npar][2]);
  config.setProperty('--cor-nav-hover-txt', coresNav[npar][3]);
*/

  //imagem do fundo;
  var painel1 = document.querySelector('.panel_tam1');
  var painel2 = document.querySelector('.panel_tam2');
  var painel3 = document.querySelector('.panel_tam3');

  // configuraco imgem fundo
  painel3.style.backgroundImage = imgApp[configImagem];

  // configuracao borda e sombra
  painel1.style.boxShadow = shadowdaApp[configBorda];
  painel1.style.border = bordaApp[configBorda];
  painel2.style.boxShadow = shadowdaApp[configBorda];
  painel2.style.border = bordaApp[configBorda];
  painel3.style.boxShadow = shadowdaApp[configBorda];
  painel3.style.border = bordaApp[configBorda];

  // cores somente panel 1 e 2
  painel1.style.backgroundImage = coresSite2[configCores][0];
  painel2.style.backgroundImage = coresSite2[configCores][1];

  // imgem colocar direto
  //config.setProperty('img-app-principal', imgApp[configImagem]);
}

//--------- inicializa programa
function main() {
  // pega paramento do sistema
  configStart();
  // pega mensagens gravadas
  pegaMsgGravadas();
  // monta a lista
  montaHTMli();
  // start as configuraçoes
  startConfigApp();

  configFundo = Math.floor(Math.random() * (4 - 1) + 1);
  var numero = Math.floor(Math.random() * (50 - 20) + 20);

  // atualiza fundo
  fundo_aleatorio_quadrado(numero, configFundo);
}

// chamas todas funces de incializa pagiana
main();
