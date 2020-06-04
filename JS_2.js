/* 								  24/09/16
 * * * JavaScript  em navegadores Web * * *
    * * Javascript do lado do cliente * *  
------------------------------------------*/

=/	13 - JAVASCRIPT EM NAVEGADORES WEB___________________________



	// 13.2 INCORPORANDO JAVASCRIPT EM HTML
	
/*
 * - Em Linha entre um par de marcação <script></script> 
 * - A partir de um arq externo especificado pelo atributo src de uma marcação <script>
 * - Em um atributo de tratamento de eventos HTML, como onclick ou onmouseover
 * - Em um URL que use o protocolo especial javascript
 */


	// O elemento <script>
	
	
// O código javascript pode aparecer em linha dentro de um arq HTML, entre
// as marcações <script> e </script>

// Exp.: 	HTML

	<script>
//		Seu código fica aqui...
	</script>
	
// Exp.:	XHTML
	
	<script><![CDATA[
//		Seu código fica aqui...
	]]></script>


// Relogio Digital simples


<html>
<head>
<style>
	#clock {
		font: bold 24px sans; 
		background: #ddf; 
		padding: 10px; 
		border: 2px solid #000;
	}
</style>
<script>
	function exibeHora() {
		var clock = document.getElementById("clock");
		var now = new Date();
		clock.innerHTML = now.toLocaleTimeString();
		setTimeout(exibeHora, 1000);
	}
	window.onload = exibeHora;
</script>
<body>
	<span id="clock"></span>
</body></html>



	// scripts em arq externos
	
	
 <script src="url"> </script>
// qualquer entre as tags de abertura e fechamento são ignorados


	
	// rotina de tratamento de eventos
	
	
 <input type="checkbox" name="options" value="gifwraper" onchange="order.options.gifwraper = this.checked;">



	// javascript em URLs
	
	
<a href="javascript:new Date().toLocaleTimeString();"> What time is it? </a>
// para evitar que abra o conteudo em uma nova janela ou guia
<a href="javascript:void window.open('about:blank');"> Open Window </a>




	// SCRIPTS SÍNCRONOS, ASSÍNCRONOS E ADIADOS
	
// síncronos

// Gerando conteúdo de documento no momento do carregamento 

<h1> Tabela de fatorias </h1>
<script>
function fact(x) {
	if (x <= 1) return 1;
	return x * fact(x - 1);
}
document.write("<table>");
document.write("<tr> <th>N</th> <th>N!</th> </tr>");
for (var i = 0; i < 4; i++)
	document.write("<tr><td>" + i + "</td><td>" + fact(i) + "</td></tr>");
document.write("</table>");
document.write("Tabela criada em: " + new Date().toLocaleTimeString());
</script>

// não usam document.write()
<script defer src=".."></script>	//adiado: adia o script até o doc ser carrega e avaliado e estar pronto para manipulação
<script async src=".."></script>	//assíncrono: excecuta o script assim que possivel, mas não bloquei a analise do doc quando esta sendo baixado


// bibliotecas de compatibilidades - jQuery
// Graded browser support - grua A, grau B e grau C
// Test de Recursos - if(element.addEventListener) .. vê se tem antes de executar, medida alternativa se não possui
// Modo Quirks (IE5), Modo Standars (!doctype html) "compatibilidade CSS"



// Comentários condicionais "IE"

<!--[if IE]>			// só IE executa
// código fica aqui...
<![endif]-->

<!--[if lt IE 8]>		// lt (menor que) IE 8, também tem lte (<=), gt (>), gte (>=)
// ...
<![endif]-->

<!--[if !IE]><-->		// só IE NÃO executa
// ...
<!--><![endif]-->

// COMENTARIOS CONDICIONAIS EM "javascript"

/*@cc_on
	@if (@_jscript)		// Jscript é o interpretador de javascript da Microsoft
		// Este código está dentro de um comment JS, mas é executado no IE.
		alert("in IE");
	@end
@*/

/*@cc_on
	@if (@_jscript)
		// Só IE aqui....
	@else*/
		Os demais navegadores aqui...
/*@end @*/


// Politica de mesma origem
/*
	É uma restrição de segurança
	que delimita o conteúdo web
	com que o código JS pode interagir.
	A origem de um doc é definida
	com o protocolo hospedeiro
	(ou host) e porta do URL
	a partir dos quais o doc
	foi carregado.
*/	


// CROSS-SITE-SCRIPTING (ou XSS)
/*
	É um termo para categoria de
	problemas de segurança nos
	quais um invasor injeta marcação
	HTML ou script em um site.
	
	Exp.: http://siteA/greet.html?name=%3Cscript src=siteB/evil.js%3E%3C/script%3E
	%3C e %3E são cód para sinais de menor e maior

	para evitar isso: name = name.replace(/</g,"&lt;").replace(/>/g,"&gt;");
*/

// ATAQUES DE NEGAÇÃO -- loop infinito alert(..);




=/	14 - O OBJETO WINDOW___________________________
	
	

	// CRÔNOMETRO - setTimeout() e setInterval()


// permitem chamar uma função 1 vez ou repetidas vezes
	
// setTimeout() --> agenda a exucução de uma função depois de um tempo decorrido milissegundos
// retorna um valor que pode ser passado para clearTimeout() a fim de cancelar o agendamento
setTimeout(/*func*/,/*tempo ms*/);

// setInterval() --> é como setTimeout(), exceto que func é chamada repetidas vez em intervalos do num
// de milissegundos especificado
setInterval(/*func*/, /*ms*/);

// função Cronometro utilitário
/*
 * Agenda 1 ou mais chamadas de "f()" no futuro
 * Espera "start" milissegundos e então chama "f()" a cada intervalo milissegundos
 * parando após um total de "start + end" milissegundos
 * Se interval for especificado mas end omitido, então nunca para de chamar f()
 * Se interval e end forem omitidos, então chama f() apenas uma vez, apos start ms.
 * Se apenas f() for especificado, se comporta como start fosse 0
 */

function invoke(f, start, interval, end) {
	start = start || 0;							// o padrão é 0
	if (arguments.length <= 2)					// Caso de uma só chamada
		setTimeout(f, start);					// Chamada única apos start ms
	else {										// Caso de várias chamadas
		setTimeout(repeat, start);				// As repetições começam em start ms
		function repeat() {						// Chamada pelo tempo limite acima
			var h = setInterval(f, interval);	// chama f a cada interval ms
			// e para de chamar apos end ms, se end for definido
			if (end) setTimeout(function(){ clearInterval(h) }, end);
		}
	}
}



	// LOCALIZAÇÃO DO NAVEGADOR E NAVEGAÇÃO
	
	
// refere-se ao URL corrente do documento exibido na tela

window.location === document.location 	// sem true

// reference a um obj Location

location.href;				// string com URl completa
location.toString();		// retorna href

//(decomposição de URl)

location.hash;				// parte #
location.search;			// parte ?


/* Essa função analisa pares de args nome=valor separados da string de consulta do URL
 * por um & (e comercial). Ela armazena os pares nome=valor prop de um obj
 */

function urlArgs() {
	var args = {};
	var query = location.search.substring(1);		// obtem a string de consulta, menos '?'
	var pairs = query.split("&");					// divide nos E comercias
	for (var i = 0; i < pairs.length; i++) {
		var pos = pairs[i].indexOf("=");
		if (pos === -1) continue;
		var nome = pairs[i].substring(0, pos);		// obtem o nome
		var valor = pairs[i].substring(pos+1);		// obtem o valor
		valor = decodeURIComponent(valor);			// decodifica o valor
		args[nome] = valor;
	}
	return args;	// retorna os argumentos analisados
}

location.assign("url");			// faz a janela ser carrega e exibe o doc do URL
location.replace("url");		// faz o mesmo, mas remove o doc corrente do histórico


// maneira tradicional de ir para uma nova pag
location = "http://www.oreilly.com";		// vá compra livro

location = "#top";					// pular para o inicio do doc
location = "?page=" + (pagenum+1);	// carrega a proxima pagina

// recarega a página
document.location.reload();



	// HISTÓRICO DE NAVEGAÇÃO
	

history.back();		// se comporta como o botão de "Voltar"
history.forward();	// semelhante, mas como botão "Avançar"
history.go(-2);		// retrocede 2, como clicar no botão voltar duas vezes




	// INFORMAÇÕES DE NAVEGADOR E DA TELA - browser sniffer (farejador de navegador)
	
	
navigator.appName;				// O nome completo do navegador "Microsoft Internet Explorer", "Netscape"
navigator.appVersion;			// começa com um numero 4.0 ou 5.0 nav geração e a versão do navegador 		
navigator.userAgent;			// contem o maximo de informações
navigator.platform;				// string indentificando o sistema operacional

screen.width;					// tamanho da tela
screen.height;					// ""
screen.availWidth;				// tamnho da tela realmente disponivel
screen.availHeight;				// ""



	// CAIXA DE DIALOGO
	
	
do {
	var name = prompt("Qual o seu nome:","");
	var correct = confirm("Este é seu nome: " + name);	// returna true/false "Ok" "Cancel"
	if (correct) alert("Ola " + name);
}

	// showModalDialog()

var p = showModalDialog("multiprompt.html",
/*					  */["Multiplicação de 2 numeros", "x", "y", "R"],
/*					  */"dialogwidth: 400, dialogheight: 300, resizable: yes");
<form>
<fieldset id="fields"></fieldset>
<div style="text-align: center">
	<button onclick="okay()">Okay</button>
	<button onclick="calcel()">Cancel</button>
</div>
<script>
var args = dialogArguments;
var text = "<legend>" + args[0] + "</legend>";
for (var i = 1; i < args.length; i++)
	text += "<label>" + args[i] + ": <input id='f" + i + "' type='text'></label><br>";
document.getElementById("fields").innerHTML = text;

function calcel() { window.close(); }
function okay() {
	var x = document.getElementById("f1").value;
	var y = document.getElementById("f2").value;
	var r = document.getElementById("f3");
	r.value = x * y;
}
</script>
</form>



	// ABRINDO E FECHANDO JANELAS

var w = window.open("smallwin.html", "smallwin",
/*				  */"width=400,height=300,status=yes,resizable=yes");	

// o valor de retorno do método open() é o obj Window que representa a janela 
var w = window.open();					// abre uma nova janela
w.alert("Alo mundo!");					// Chama seu método alert
w.location = "http://www.example.com";	// configura sua propriedade location

// a prop opener refere-se ao obj Window do script que as abriu
w.opener !== null;			// true: para qualquer janela w criada por open()
w.open().opener === w;		// true: para qualquer janela w

w.close();					// para fechar a janela
window.close();



	// RELACIONAMENTO ENTRE QUADROS

parent == self;			// para qualquer janela de nivel superior

// para se referir a janela ou quadro que o contem "seu pai"
parent.history.back();

//se um quadro está contido dentro outro que esta contido dentro de uma janela de nivel superior
// para se referir à janela de nivel superior
parent.parent.
top				// um atalho independente de o quanto está aprofundado, referencia a janela de nivel superior

// para se obter o elemento iframe seguinte
<iframe id="f1"></iframe>
var iframeElement = document.getElementById("f1");

// Os iframe tem uma prop "contentWindow", para ref seu obj Window
var iframeObj = document.getElementById("f1").contentWindow;

// Contudo não é necessário utilizar esses metodos
// todos os obj Window tem uma prop "frames" para ref seus frames filhos

frames[0];					// ref seu primeiro quadro filho de uma janela
frames[1].frames[2];		// ref o 3º quadro filho do seu 2º quadro filho

// se os Quadros possuirem name ou id exp.:"f1"
frames["f1"];
frames.f1



	// JAVASCRIPT EM JANELAS QUE INTERAGEM
	
	
<iframe> "A" e "B"

"A" possui: 

var i = 3;  				// pode se ref window.i como é global

"B" para se ref ao i:

parent.frames.A.i = 4;		// altera o valor de i em "A"
function f(){}

"A" poderia se ref a função de "B" e copiar para si

var f = parent.frames.B.f;

// para ref uma construtura do quadro de nivel mais alto

var Set = top.Set;
var s = new Set;



=/	15 - ESCREVENDO SCRIPTS DE DOCUMENTOS___________________________
	
	
	

	// SELECIONANDO ELEMENTOS DE DOCUMENTOS

/*
 * - atributo id
 * - atributo name
 * - atributo class
 * - marcação
 * - seletor CSS
 */

	// SELECIONANDO ELEMENTOS PELA "id"
	
var sec = document.getElementById("section1");

/* pesquisando vários elementos pela identificação
 *
 * Espera qualquer num de args string. Ela trata cada arg como uma identificação de elem
 * e chama document.getElementById() para cada um. Retorna um obj que mapeia id no obj Elem
 * correspondente.
 * Lança uma exeção se qualquer um dos id for indefinido.
 */
function getElements(/*ids...*/) {
	var elementos = {};									// começa com mapa vazio
	for (var i = 0; i < arguments.length; i++) {		// para cada id..
		var id = arguments[i];							
		var elt = document.getElementById(id);			// pesquisa elemento
		if (elt == null) throw new Error("Nenhum elem com esse id");
		elementos[id] = elt;							// mapeia a identificação no elemento
	}
	return elementos;									// retorna o mapa de indentificações
}



	// SELECIONANDO ELEMENTOS PELO "nome"


// É definido pela classe HTMLdocument
// ele retorna um obj NodeList de obj Element

// elementos que aceitam o atributo "name"
// <img> <form> <iframe> <applet> <embed> <object>

var radiobutton = document.getElementsByName("favorite_color");

// os iframe são especiais em vez de retornar o elemento retorna o obj Window do quadro

// obtem o obj Element para o elemento <form name="shipping_address">
var form = document.shipping_address;




	// SELECIONANDO ELEMENTOS PELO "tipo"
	
	
// também retorna um obj NodeList
var span = document.getElementsByTagName("span");
// seleciona o 1º p do documento
var firstparagrafh = document.getElementsByTagName("p")[0];
// seleciona todos os elementos do doc
var all = document.getElementsByTagName("*");

// a classe Element também define um getElementsByTagName
// mas seleciona apenas os elem descendentes no qual é chamado
var firstpara = document.getElementsByTagName("p")[0];
var firstParaSpans = firstpara.getElementsByTagName("span");	// todos os "span" dentro 1º "p"

// A classe HTMLdocument define prop de atalhos que se ref a obj HTMLCollection são parecidos com NodeList

document.images				// <img>
document.forms				// <form>
document.links				// <a> mais com href
document.head				// <head>
document.body				// <body>
document.anchors 			// <a> com atributo name
document.documentElement	// <html>
// Exp.:
document.shipping_address;	
document.forms.shipping_address;		// de uma forma explicita a tag <form>

var content = Array.prototype.map.call(document.getElementsByTagName("p"), function(e){return e.innerHTML;});

// NodeList e HTMLCollection são dinâmicos podem mudar a medida que o doc sofre alterações


	// SELECIONANDO ELEMENTOS POR "class CSS"
	
	
	
// localiza todos os elementos que tem "warning" em seu atributo class 
var warning = document.getElementsByClassName("warning");
// localiza todos os descentes do elemento chamado "log" que tem class
// "error" e a class "fatal"
var log = document.getElementsByClassName("log");
var fatal = log.getElementsByClassName("fatal error");



	//	SELECIONANDO ELEMENTOS COM "seletores CSS"
	
	
// Recebe um argumento de string contendo um seletor CSS
// e retorna um obj NodeList representando todos os elementos que correspondem as seletor.
// Esses dois métodos também são definidos por Element
document.querySelectorAll();		// recebe um arg (sendo um seletor) para criar um NodeList correndente ao seletores
document.querySelector();			// apenas o primeiro (na ordem do doc)

// Element e DocumentFragment também possuem esses dois métodos
var p = document.querySelectorAll("h1>p");		// só os elementos <p> filhos de h1
var i = p.querySelectorAll("i.italicoBruto");	// só os filhos <i> de <p> com class italicoBruto


	// ESTRUTURA DE DOCUMENTOS E COMO PERCORRÊ-LOS
	
	
	
// Documentos como árvores de Nodes
// Obj Document, Element, Text são todos obj Node

parentNode						// O obj Node que é o pai deste nó, null para obj sem pai (como Document)

childNodes						// Obj semelhante a um array sóLeitura (um NodeList) representação de todos os nós filhos de um nó

hasChildNodes()					// verifica se um Nodo tem filhos

firstChild, lastChild			// primeiro e ultimo nó filho de um nó

nextSibling, previousSibling	// O nó irmão próximo e anterior de um nó

nodeType						// O tipo do nó. Document 9, Element 1, Text 3, Comments 8, DocumentFragment 11

nodeValue						// conteúdo textual de um nó Text ou Comments

nodeName						// nome da marca de um Element, convertido em maiúsculo


// o 2º nó filho do 1º filho do Document
document.childNodes[0].childNodes[1];
document.firstChild.firstChild.nextSibling;



	// DOCUMENTOS COMO ÁRVORE DE ELEMENTOS
	
// prop de um obj Element retorna uma NodeList de obj Elementes descendentes do nó
children									// é como childNodes mas só os nós Elements

firstElementChild, lastElementChild			// semelhante com firstChild, lastChild, mas apenas para filhos de elementos

nextElementSibling, previousElementSibling	// Semelhante ao Siblings anterior, mas apenas para irmãos de Element

childElementCount							// O número de filhos do elemento. retorna o mesmo que children.length


/** Retorna o n-ésimo ascendente de e, ou null se não existe tal ascendente
 * ou, se esse ascendente não é um Element (Document ou DocumentFragment, por 
 * exemplo).
 * Se n é 0, retorna o próprio e. Se n é 1 (ou é omitido), retorna o pai.
 * Se n é 2, retorna o avô, etc.
 */
 
function parent(e, n) {
	if (n == null) n = 1;
	while (n-- && e) e = e.parentNode;
	if (!e || e.nodeType !== 1) return null;
	return e;
}

/** Retorna o n-ésimo elemento irmão do Element e.
 * Se n é positivo, retorna o n-ésimo próximo elemento irmão.
 * Se n é negativo, retorna o n-ésimo elemento irmão anterior.
 * Se n é zero, retorna o próprio e.
 */

function sibling(e, n) {
	while (e && n !== 0) {			// Se e não está definido, apenas o retornamos
		if (n > 0) {				// Localiza o prox irmao do elemeto
			if (e.nextElementSibling) e = e.nextElementSibling;
			else {
				for (e = e.nextSibling; e && e.nodeType !== 1; e = e.nextSibling)/* vazio */;
			}
			n--;
		}
		else {						// Localiza o irmão anterior do elemento
			if (e.previousElementSibling) e = e.previousElementSibling;
			else {
				for (e = e.previousSibling; e && e.nodeType !== 1; e = e.previousSibling)/* vazio */;
			}
			n++;
		}
	}
	return e;
}

/** Retorna o n-ésimo elemento filho de e, ou null se ele não tem um.
 * Valores negativos de n contam a partir do final. 0 significado o 1º filho, mas
 * -1 significa o ultimo filho, -2 significa o penultimo filho e assim por diante
 */

function child(e, n) {
	if (e.children) {						// Se o array children existe
		if (n < 0) n += e.children.length;	// Converte n negativo no indice do array
		if (n < 0) return null;				// Se ainda é negativo, nenhum filho
		return e.children[n];				// retorna o filho especificado
	}
	// Se e não tem um array de filhos, localiza o 1º filho e contam
	// para frente ou localiza o ultimo filho e conta para trás a partir  de lá.
	
	if (n >= 0) {					// n é não negativo: conta para frente apartir do 1º filho
		// localiza o 1º elemento filho de e.
		if (e.firstElementChild) e = e.firstElementChild;
		else {
			for (e = e.firstChild; e && e.nodeType !== 1; e = e.firstChild)/* vazio */;
		}
		return sibling(e, n);		// retorna o n-ésimo irmão de 1º filho
	}
	else {							// n é negativo: portanto, conta para trás apartir do fim
		if (e.lastElementChild) e = e.lastElementChild;
		else {
			for (e = e.lastChild; e && e.nodeType !== 1; e = e.lastChild)/* vazio */;
		}
		return sibling(e, n+1);		// +1 para converter filho -1 para irmão 0 do último
	}
}


	
	// ATRIBUTOS
	
	
// ATRIBUTOS HTML COMO PROPRIEDADE DE Element
// HTMLElemet
var img = document.getElementById("myImage");
var imgURL = img.src;								// o atributo src é o url da imagem
img.id === "myImage";								// visto que pesquisamos a imagem pela identificação
// da mesma forma vc poderia configura os atributos de envio de um formulario
var f = document.forms[0];							// 1º <form> do doc 
f.action = "http://www.example.com/submit.php";		// configura URL para envio
f.method = "POST";									// tipo de pedido HTTP

// se o atrributo tem mais de uma palavra
defaultChecked tabIndex maxLength

// alguns nomes de atributos são palavras reservados, nesse caso acrescente "html" como prefixo
// "for" é uma palavra reservada em javascript
htmlFor
className	// é um caso especial
style		// é um obj CSSStyleDeclaration




	// OBTENDO E CONFIURANDO ATRIBUTOS QUE NÃO SÃO HTML


// O tipo Element tambem define metodos getAttribute e setAttribute
// para consultar e configurar atributos não padronizados

var image = document.images[0];
var width = parseInt(image.getAttribute("WIDTH"));	// não diferencia maius e minus e sempre retorna uma string
image.setAttribute("class", "thumbnail");

// Element tambem define hasAttribute() e removeAttribute()

hasAttribute()		// verifica a presença de um atributo nomeado
removeAttribute()	// remove um atributo inteiramente



	// ATRIBUTOS DE CONJUNTOS DE DADOS


data-x			// atributo de conjunto de dado HTML5 é valido
dataset.x		// pega o atributo data-x

<span class="sparkline" data-ymin="0" data-ymax="10">
	1 2 3 4 5 6 7 8 9 10
</span>

var sparkline = document.getElementsByClassName("sparkline");
for (var i = 0; i < sparkline.length; i++) {
	var dataset = sparkline[i].dataset;
	var ymin = parseFloat(dataset.ymin);			// o valor de data-ymin
	var ymax = parseFloat(dataset.ymax);			// o valor de data-ymax
}



	// ATRIBUTOS COMO NÓS Attr
	
	
// Node define a propriedade "atributes" em obj que não são Element
// essa prop é null. Em Element representa um array com todos os atributos do elemento
// valor obtido são obj Attr "name" e "value" são propriedades de retornam o nome o valor do atributo

document.body.atributes[0]			// 1º atributo do elem	<body>
document.body.atributes.bgcolor;	// atributo bgcolor do	<body>
document.body.atributes["FONT"];	// atributo font do		<body>



	
	// CONTEÚDO DO ELEMENTO



// CONTEUDO DO ELEMENTO COMO HTML


innerHTML	
// de um Elemento retorna a conteúdo deste elemento como uma string de marcação
// tambem é possivel configurá-lo
outerHTML
// quando se consulta retorna o mesmo que innerHTML só que com as tags de marcação do elemento
// quado se configura ele substitui o elemento em si
insertAdjacentHTML()	// firefox não suporta
// insere string de marcação HTML "adjacente" ao elemento especificado.
// Exp.:							
/*		 p.insertAdjacentHTML("afterbegin", "sua string aqui");	
 *		 ("beforebegin")<p>("afterbegin") Conteudo já existente ("beforeend")</p>("afterend")
 */
	
	
	
// CONTEUDO DE ELEMENTO COMO TEXTO PURO
	
	
var para = document.getElementsByTagName("p")[0];
var text = para.textContent;						// obtem o text puro	
para.textContent = "Hello World!";					// altera o conteudo do paragrafo

// no IE innerText

/** Com um argumento, retorna textContent ou innerText do elemento.
 *  com dois argumentos, configura textContent ou innerText do elemnto com valor
 */
function textContent(elemnto, valor) {
	var content = elemento.textContent;					// verifica se textContent está definido
	if (valor === undefined) {							// nenhum valor passado
		if (content !== undefined) return content;
		else return element.innerText;
	}
	else {												// um valor passado portanto configura
		if (content !== undefined) element.textContent = valor;
		else element.innerText = valor;
	}
}

// textContent --> é uma concatenação simples de todos os descendentes de nó Text
	
	// CONTEÚDO DE ELEMENTOS COMO nós Text

// Converte recursivamente todos os descendentes do nó Text ded n para maiúsculo
// CharacterData tem a prop data que é o mesmo texto de nodeValue 
function upcase(n) {
	if (n.nodeType == 3 || n.nodeType == 4)			// Se n é text ou CDATA (para XML)
		n.data = n.data.toUpperCase();
	else
		for (var i = 0; i < n.childNodes.length; i++)
			upcase(n.childNodes[i])
}



	// CRIANDO, INSERINDO E EXCLUIDO
	
	
// tipo Document define metodos para criar obj Element e Text
// tipo Node define metodos para inserir, excluir e substituir nós na arvore

// Carrega e executa um script de forma assíncrona a partir de um URL especificado
function loadasync(url) {
	var head = document.getElementsByTagName("head")[0];	// localiza <head> do documento
	var s = document.createElement("script");				// cria um elemento <script>
	s.src = url;											// configura seu atributo src
	head.appendChild(s);									// insere o <script> no cabeçalho
}


// CRIANDO NÓS


var novoElemento = document.createElement("p");
// createElement --> cria nós Element

var novoTexto = document.createTextNode("Texto a ser inserido");
// createTextNode --> cria nós Text
	
// tambem define createComment(), createDocumentFragment()	
	
cloneNode() /*(true) copy descendentes*/
// outra forma é fazer cópias dos nós já existentes
// todo nó tem um método cloneNode() que retorna uma cópia do nó.
// passar "true" tabem copia todos os descentes recursivamente 

importNode();
// se passar para ele um nó de outro documento, ele retorna uma
// cópia para inserção nesse cod. passar true para o seg argumento
// faz cópia recursiva dos descendentes



// INSERINDO NÓS

// tendo os nós criados pode inserilos com appendChild() e insertBefore()

appendChild(/*newNó*/);
// É chamado no nó Element em que voce deseja inserir
// sendo que ele passa a ser o lastChild deste nó

insertBefore(/*newNó/*, /*Nóantes/*);
// É o mesmo que appendChild() porem recebe dois args
// 1º é o newNó 

// Se você chamar appendChild() ou insertBefore() para inserir
// elemento que já esta no documento, esse nó será automaticamete
// removido de sua posi atual e reinserido em sua nova posi.

/** Classifica as linhas de uma tabela
 *
 * Classifica as linhas no primeiro <tbody> da tabela especificada, de acordo com
 * o valor de n-ésima célula dentro de cada linha. Usa a função comparator
 * se existir. Caso contrario, compara os valores alfabéticos.
 */
function sortrows(table, n, comparator) {
	var tbody = table.tBodies[0];					// 1º <tbody>; pode ser criado implicitamente
	var rows = tbody.getElementsByTagName("tr");	// todas as linhas no tbody
	rows = Array.prototype.slice.call(rows, 0);		// Instantâneo em um array
	
	// Agora classífica as linhas com base no texto do n-ésimo elemento <td>
	rows.sort(function(row1, row2) {
		var cell1 = row1.getElementsByTagName("td")[n];		// Obtém a n-ésima célula
		var cell2 = row2.getElementsByTagName("td")[n];		// das duas linhas
		var val1 = cell1.textContent || cell1.innerText;	// Obtém o conteúdo do texto
		var val2 = cell2.textContent || cell1.innerText;	// das duas células
		if (comparator) return comparator(val1, val2);		// Compara-os!
		if (val1 < val2) return -1;
		else if (val1 > val2) return 1;
		return 0;
	});
	
	/* Agora anexa as linhas no tbody, em sua ordem classificada.
	 * Isso as remove automáticamente de sua posição atual. portanto, não há
	 * necessidade de removê-las primeiro. Se o <tbody> contiver quaisquer
	 * nós que não sejam elementos <tr>, esses nós vão flutuar para o topo 
	 */
	for (var i = 0; i < rows.length; i++) tbody.appendChild(rows[i]);
}
	
/* Localiza os elementos <th> da tabela (supondo que exista apenas uma linha deles)
 * e os torna clicaveis para que um clique em um cabeçalho de coluna classifique
 * por essa coluna.
 */
function makeSortable(table) {
	var headers = table.getElementsByTagName("th");
	for (var i = 0; i < headers.length; i++) {
		(function(n) {	// Função aninhada para criar um escopo local
			headers[n].onclick = function() { sortrows(table, n); };
		}(i));	// atribui o valor de i à variàvel local n
	}
}
	
	
	
	
// REMOVENDO E SUBSTITUINDO NÓS

removeChild(/*child*/);
// O método removeChild() remove um nó da arvore
// cuidado ele não remove o nó chamador mais sim o filho deste nó

//Para remover o nó n do documento, voce deve:
n.parentNode.removeChild(n);


replaceChild(/*newNó*/,/*substituido*/);
// remove um nó filho e o substitui por um novo nó.
// chama no nó pai passando o novo nó como 1º arg
// e o a ser substituido como 2º arg	

// Substitui o nó n por um novo elemento <b> e torna n um filho desse elemento.
function embolden(n) {
	// Se passamos uma string em vez de um nó, tratamos como um id do elemento
	if (typeof n == "string") n = document.getElementById(n);
	var parent = n.parentNode;				// Obtém o pai
	var b = document.createElement("b");	// Cria um elemento <b>
	parent.replaceChild(b, n);				// Substitui pelo elemento <b>
	b.appendChild(n);						// Torna n um filho do elemento <b>.
}
	
	
	
	
// USANDO DocumentFragment
	

	
// DocumentFragment é um tipo especial de Node que serve como contêiner
// temporário para outros nós. Ele é independente como Documento seu parentNode é null
// se vc passa um DocumentFragment para appendChild(), insertBefore(), etc.
// são os filhos que são inseridos não o próprio

// Inverte a ordem dos filhos do Node n
function reverce(n) {
	// cria um DocumentFragment como contêiner tempo
	var f = document.createDocumentFragment();
	// itera para trás dos filhos, movendo cada 1 para dfrag
	// o ultimo filho de n se torna o 1º de f e vice-versa.
	// Note que anexar um filho em f remove automaticamente de n.
	while (n.lastChild) f.appendChild(n.lastChild);
	// por fim move os filhos de f, todos de uma só vez, de volta para n
	n.appendChild(f);
}
 	



	// GEOMETRIA E ROLAGEM DE DOCUMENTOS E ELEMENTOS
	
	

// COORDENADAS DE DOCUMENTO E COORDENADAS DE JANELA DE VISUALIZAÇÃO	

/** cordenadas de rolagem se um elemen tem uma coordenada Y de 200px
 * em coordenadas do doc, por exp, e se o usuario rolou o navegador
 * para baixo por 75px, então esse elemen tem uma coordenada Y de
 * 125px em coordenadas de janela de visualização. Da mesma forma
 * se um elemen tem coordenada X de 400px em coordena da jan visu
 * e o usuá rolou a janela de visualização por 200px horizontalmente
 * a coordena X do elemen em coordena do doc é 600px.
 
 * as coordena do doc são mais fundamentais do que as de visualização
 * e não mudam quando o usuário rola.
 * As coordena do mouse ref a coordena de jan visualização
 */

// Consultando as posi da barra de rolagem como prop x e y de um obj, de maneira portável
// Retorna os deslocamentos atuais da barra
function getScrollOffsets(w) {
	// usa a janela especificada ou a janela atual, se não houver argumento
	w = w || window;
	// isso funciona para todos os navegadores, exceto o IE v8 e anteriores
	if (w.pageXOffset != null) return { x: w.pageXOffset, y: w.pageYOffset };
	// Para o IE (ou qualquer outro navegador) no modo Standars
	var d = w.document;
	if (document.compatMode == "CSS1Compat")
		return { x: d.documentElement.scrollLeft, y: d.documentElement.scrollTop };
	// Para navegadores no modo Quirks
	return { x: d.body.scrollLeft, y: d.body.scrollTop };
}

// Consultando o tam da janela de visualização em uma janela do navegador
// retorna um obj com as prop w e h 
function getViewportSize(w) {
	// usa a janela especificada ou a janela atual, se não houver argumento
	w = w || window;
	// isso funciona para todos os navegadores, exceto o IE v8 e anteriores
	if (w.innerWidth != null) return { w: w.innerWidth, h: w.innerHeight };
	// Para o IE (ou qualquer outro navegador) no modo Standars
	var d = w.document;
	if (document.compatMode == "CSS1Compat")
		return { w: d.documentElement.clientWidth, h: d.documentElement.clientHeight };
	// Para navegadores no modo Quirks
	return { w: d.body.clientWidth, h: d.body.clientHeight };
}



// CONSULTANDO A GEOMETRIA DE UM ELEMENTO



/** A maneira mais fácil de determinar o tam e a posi de um elemento
 * é chamar seu método getBoundingClientRect(). não espera arg e retorna
 * um obj com porp left, right, top e bottom. left e top fornecem coordenadas X e Y
 * do canto superior esquerdo e right e bottom coordenadas do canto inferior direito.
 *
 * reotorna a posi do elemen em coordenadas de jan de visualização
 * Para converter em coordena do doc que continuem válidas mesmo que o usuário role
 * a janela do navegador, adicione os delocamentos de rolagem.
 * getClientRects() --> utilizados para elementos em linha retorna um obj com informações
 * iguais ao getBoundingClientRect() só que para cada linha
 */

var box = e.getBoundingClientRect();	// obtem a posi de jan de visu em coord
var offsets = getScrollOffsets();		// função utilitária definida acima
var x = box.left + offsets.x;			// Converte em coord do doc
var y = box.top + offsets.y;			

// Por portabilidade para calcular a largura e altura
var box = e.getBoundingClientRect();
var w = box.width || (box.right - box.left);
var h = box.height || (boox.bottom - box.top);



// DETERMINAR O ELEMENTO EM UM PONTO



/** getBoundingClientRect() nos permite determinar a posi de um elemen em uma
 * jan de visu. Às vezes, queremos ir na outra direção e determinar qual elemento
 * existe em determinada posi na jan de visu. Isso pode ser feito com elementFromPoint()
 * Passar X e Y para ele como coord de jan de visu, ele vai retornar o obj Element que 
 * está na posi especificada.
 
 * este método é útil ao passar coord do mouse para determinar qual obj ele está em cima
 */
document.elementFromPoint(100, 100)
//> elem daquele ponto da posição mais alta z-index
document.elementsFromPoint(100, 100)
//> [div#lga, div#TZA4S, body.default-theme.des-mat, html]
 
 
// ROLAGEM



/** As prop scrollLeft e scrollTop podem ser configuradas para fazer a jan do navegador	
 * rolar. más a um modo mais fácil, com o método scrollTo() do obj Window (e seu sinônomi scroll())
 * recebe as coord X e Y de um ponto(em coord de doc) e configura como deslocamento de 
 * barra de rolagem. Isto é rola de modo que o ponto especificado esteja no canto
 * superior esquerdo da jan de visu.
 *
 * Se vc especifica um ponto próximo de mais da parte inferior, navegador vai movê-lo
 * o mais próximo possível.
 */

// Rola o navegador de modo que a pag inferior do doc fique visível
// Obtem a altura do doc e da jan visu. offsetHeight esplicado posteriormente 
var docHeight = document.documentElement.offsetHeight;
var janHeight = window.innerHeight;		// Ou usa getViewportSize() anterior
// E rola de modo q a ultima "pag" apareça na jan de visu
window.scrollTo(0, docHeight - janHeight);


// O método scrollBy(), do obj Window é semelhante a scroll() e a scrollTo(),
// mas seus argumentos são relativos e adicionados aos deslocamentos da barra de rolagem atuais.  

// Rola 10px para baixo a cada 200ms. Note que não há maneira alguma de desativar isso 
javascript:void setInterval(function() { scrollBy(0, 1); }, 200);


// chamar esse método no elemento desejado garante que ele apareça
// no topo da jan de visu. semelhante ao window.location.hash = 'top' (sombre <a name="#top">)
scrollIntoView();




// MAIS INFORMAÇÕES SOBRE TAMANHO, POSIÇÃO E OVERFLOW DE ELEMENTO


offsetWidth e offsetHeight
// pode usar offsetWidth e offsetHeight para retornar o tamanho do elemen
// na tela, em px CSS. é utilizado para navegadores que não entendem getBoundingClientRect()
// o tam retornado inclui borda e o preenchimento, mas não margem.

offsetLeft e offsetTop
// todos os navegadores tem, e retorna as coord X e Y do elemen. Para muitos
// elemen esses valores são coord de doc. Mas para descendentes de elemen
// e outros como celulas de tabela, retornam coord relativas ao ascendente
// em vez do doc

offsetParent
// espcif a qual elemen as prop são relativas.
// se offsetParent é null as prop são coord do doc


// Itera pelo encadeamento de offsetParent e acumulando deslocamentos, essa função
// calcula as coord do doc do elemen especificado. (Lembre-se que getBoundingClientRect()
// retorna, em vez disso, coord de jan de visu 
function getElementPosition(e) {
	var x = 0, y = 0;
	while (e != null) {
		x += e.offsetLeft;
		y += e.offsetTop;
		e  = e.offsetParent;
	}
	return {x:x, y:y};
}

// Todos os elementos HTML tem essas propriedades

offsetWidth			clientWidth			scrollWidth
offsetHeight		clientHeight		scrollHeight
offsetLeft			clientLeft			scrollLeft
offsetTop			clientTop			scrollTop
offsetParent


// clientWidth e clientHeight são como offsetWidth e offsetHeight, exceto que não
// incluem o tam da borda. E também sempre 0 para elemen em Linha <i> <b> ...
// caso especial, quando são consultadas no elemento raiz ou no modo Quirks
// se comportam como innerWidth e innerHeight da janela.

// clientLeft e clientTop não são muito uteis, retornam a distancia horizontalmente
// e vertical entre a parte externa do preenchimento de um elemento e a parte externa
// de sua borda. normalmente são a largura da borda esquerda e direita.

// scrollWidth e scrollHeight correspondam ao tamanho da área de conteúdo de
// um elemento + preenchimento + conteúdo que exceda o tam da area.
// Quando cabe sem transbordar (overflow), essas prop são iguais a clientWidth e clientHeight

// Por fim scrollLeft e scrollTop fornecem as posições da barra de rolagem de 
// um elemento. As consultamos no elemento-raiz no método getScrollOffsets().
// Note que são possiveis configurá-las para rolar um conteudo dentro de um elemento




	// FORMULÁRIOS HTML
	
	

// SELECIONANDO FORMULARIOS E ELEMENTOS DE FORMULARIO


var fields = document.getElementById("address").getElementsByTagName("input");

//Todos os botões de opções com indentificação "shipping"
document.querySelectorAll("#shipping input[type='radio']");

// formas de selecionar um form com name="address"
window.address						// frágil não use
document.address					// só funciona para formularios com o atributo name
document.forms.address				// acesso explicito a um formulario com nome ou identificação
document.forms[n]					// frágil n é a posi numerica do formulario


// Os proprópios obj do form atual como HTMLCollection e podem ser indexados, como: Exp.: 'street'

document.forms.address[0]
document.forms.address.street
document.address.street				// somente para name="address" e não id="address"

// se quiser ser explicito na seleção de um elemento de form
document.forms.address.elements[0]
document.forms.address.elements.street


<form name="shipping">
	<fieldset><legend>Shipping Method</legend>
		<label><input type="radio" name="method" value="1st">First</label>
		<label><input type="radio" name="method" value="2nd">Second</label>
		<label><input type="radio" name="method" value="3rd">Third</label>
	</fieldset>
</form>

// Para se ref ao array de Elements

var methods = document.forms.shipping.elements.method;

// para saber qual method o usuário selecionou
var escolido;
for (var i = 0; i < methods.length; i++)
	if (methods[i].checked) escolido = methods[i].value;




	// PROPRIEDADE DE FORMULARIO E ELEMENTOS
	
	
// prop do obj Form
elements[]			// descrita anteriormente. É a mais interessante de um obj Form
action				// correspondem diretamente aos atributos action, encoding, method, target 
encodion
method
target

submit();			// tem o mesmo objetivo do botão "submit"
reset();			// tem o mesmo objetivo do botão "reset"

// prop de elmentos Form

type				// string somente leitura informa o tipo do elemento exp.: "text,"radio","textarea"...
form				// ref ao obj Form ao qual o elemento está contido
name				// string especificando o atributo name
value				// string leitura/gravação ref ao atributo "value" do elemen

// Rotinas de tratamento de evento de formulário e elementos

onclick();
onchange();
onblur();
onfocus();
onsubmit();			// só dispara com o perto genuíno do botão "submit"
onreset();			// Idem


// Botões de alternancia
// botãos de ação e caixa de seleção


// Campos de texto

// Html5 atribuiu placeholder, que especifica um aviso ao campo
// antes que o usuario digite alguma coisa
Arrival Date: <input type="text" name="arrival" placeholder="yy-mm-dd">


// Elementos Select e Option

<select>/*..*/</select>				// prop type igual "select-one"
<select multiple>/*..*/</select>	// prop type igual "select-multiple" usuario pode selecionar + de uma <option>

// para type "select-one"
// a prop  "selectedIndex" de leitura/gravação espcif qual das option está selecionada
selectedIndex

// para type "select-multiple"
// deve-se iterar pelos elementos do array "options[]" e verificar em cada a prop "selected"
options[]

// obj Option tem alem da prop Selected tem a "text" especif o texto puro nela contido
// pode ser editado para mudar o dado exibido para o usuario. Value é o attr value do option 
// serve apenas para o indexação pelo servidor que irá recebero form
selected, text, value

options.length			// pode ser uado para truncar o array de option
options[n] = null;		// exclui o <option> do <select>
var zaire = new Option(
"Zaire",	// A prop text
"zaire",	// A prop value
"false",	// A prop defaultSelected
"false");	// A prop selected 



	// OUTROS RECURSOS DE Document

	

// Propiedades de Document

cookie				// prop que permite JS ler e gravar cookie HTTP
domain				// Uma prop q permite a servidores Web dentro do mesmo dominio internet abrandar colaborativamente as restrições de segurança da politica de mesma origem
lastModified		// string contendo a data de moficação do doc
location			// ref ao mesmo obj Location do obj Window 
referrer			// URl se houver, que levou o link para o atual
title				// texto entre <title></title>
URL					// url do doc somente para leitura
	

	
// O metodo document.write()

documetn.write("<p>Document title: " + document.title);
documetn.write("<br>URL: " + document.URL);
documetn.write("<br>Referred by: " + document.referrer);
documetn.write("<br>Modified on: " + document.lastModified);
documetn.write("<br>Accessed on: " + new Date());





	
	=/	16 - ESCREVENDO SCRIPTS DE CSS___________________________
	
	

	// SCRIPT DE ESTILOS EM Linha
	
// configurando estilos em linha	
e.style.fontFamily = "Helvetica, Tahoma, sans-serif";
e.style.cssFloat = "both";
e.style.margin = TopMargin + "px " + LeftMargin + "px " + BottomMargin + "px " + RightMargin + "px";
var s = "background-color: green; color: red;";
e.setAtrribute("style", s);
e.style.cssText = s;		// prop do obj CSSStyleDeclaration. ref ao attr style do elemen
	
	
	
/** Animação com script em CSS
 *
 * Faz desaparecer gradulamente, no decorrer do time milissegundos.
 * Supõe q é totalmente opaco quando esta função é chamada.
 * oncomplete é uma função opcional q vai ser chamada quando a animação terminar.
 * Se time for omitido, usa 500ms como padrão.
 * Esta função não funciona no IE, mas poderia ser modificada para animar a prop
 * filter (filter: alpha(opacity=75);) não padrozinada do IE, além de opacity.
 */
function fadeOut(e, oncomplete, time) {
	if (typeof e === "string") e = document.getElementById(e);
	if (!time) time = 500;
	
	// Usamos Math.sqrt como uma "função de abrandamento" simples para tornar a animação
	// sutilmente não linear: ele faz desaparecer gradualmente de forma rápida no inicio
	// e depois se torna um pouco mais lento.
	var ease = Math.sqrt;
	var start = (new Date()).getTime();			// Note o tempo de inicio da animação
	animate();									// e começa a animar
	function animate() {
		var elapsed = (new Date()).getTime() - start;	// tempo decorrido
		var fraction = elapsed/time;					// como uma fração do total
		if (fraction < 1) {								// Se a animação ainda não terminou
			var opacity = 1 - ease(fraction);			// Calcula a opacidade do elemento
			e.style.opacity = String(opacity);			// A configura e
			setTimeout(animate,							// Agenda outro quadro
			Math.min(25, time-elapsed));
		}
		else {											// Caso contrario termina
			e.style.opacity = "0";						// Torne totalmente transparente
			if (oncomplete) oncomplete(e);				// ativa callback na conclusão
		}
	}
}
	

	
// Consultando Estilos computados
// é o conjunto de propriedades realmente usados para exibir o elemento
// getComputedStyle() retorna um obj CSSStyleDeclaration
var elemento = document.getElementById("section");
var objComp = window.getComputedStyle(elemento, null);	//null, ":before, :after, :first-letter" (pseudoelementos)	
	
/** Consulta estilos conputados e configura em linha
 *
 * muda a escala do tamanho do texto do elemento pelo pelo fator escif
 */
function scale(e, factor) {
	// Usa estilo computado para consultar o tamanho atual do texto
	var size = parseInt(window.getComputedStyle(e, "").fontSize);
	// E usa o estilo em linha para aumentar esse tamanho
	e.style.fontSize = factor * size + "px";
}

// IE não suporta getComputedStyle, mas currentStyle 
// combina estilos em linha e folhas de estilo, tambem se parecem com CSSStyleDeclaration
// porém, seus valores não são absolutos podem ser '%' ou 'em'
	
	
	
	
// Escrevendo Scripts de classes CSS





// alterar o atributo class de um elemento, altera seu conjunto de seletores
// fazem com que varias propriedades CSS mudem de uma só vez.
.attention {
	background-color: yellow;
	font-weight: bold
	border: 2px outset black;
}
e.className = "attention";

// o tributo class pode conter mais de uma class separadas por espaços
// se o elemen tem + de uma class a alteração de class afetar todos as classes
// pois ira redefinr o atributo class

// HTML5 resolveu esse problema definindo uma prop classList, conhecida com DOMTokenList
// obj semelhante a um array somente de leitura, cuja os elementos contem os nomes
// das classes individuais
classList
// metodos DOMTokenList:
add()						// adiciona nome de classes individuais
remove()					// remove 	"    "		"		"
toggle()					// adiciona uma nova classe se ainda não esta presente, caso contraio, o remove
contains()					// testa se o attr conteum um nome de classe especif

<form name="f" class="a b"></form>

var f = document.forms.f;	// seleciona o elemento
f.classList					//=> ["a", "b"]
f.classList.add("d")		//=> retorna undefined
f.classList					// ["a", "b", "d"]
f.classList.remove("d")		//=> undefined: ficou ["a", "b"]
f.classList.toggle("c")		//=> true: como contains("c"): fico ["a", "b", "c"]
f.classList.toggle("c")		//=> false: fico ["a", "b"]
f.classList.contains("c")	//=> false
f.classList.add("c d")		// causa erro atribiur/remover mais de uma classe



/**	classList(): trata className como um conjunto de classes
 *
 * Retorna a propriedade classList caso haja uma.
 * Caso contrario, retorna um obj que simula a API DOMTokenList para e.
 * O obj retornado tem metodos contains(), add(), remove(), toggle() e toString()
 * Se a prop classList é suportada de forma nativa, o obj retornado é semelhante a um array
 * e tem comprimento e prop de indices de array. O DOMTokenList simulado não é semelhante
 * a um array, mas tem um método toArray() que retona um instantâneo semelhante a um array
 * com os nomes de classe do elemento.
 */
function classList(e) {
	if (e.classList) return e.classList;		// retorna classList nativa (existente)
	else return new CSSClassList(e);			// caso contrario tenta simular
}
// CSSClassList é uma classe de JavaScript que simula DOMTokenList
function CSSClassList(e) { this.e = e; }
// Retorna true se e.className contém a classe c, caso contrario, false
CSSClassList.prototype.contains = function(c) {
	// verifica se c é um nome de classe válido
	if (c.length === 0 || c.indexOf(" ") != -1)
		throw new Error("Invalid class name: '" + c + "'");
	// verifica primeiro os casos comuns
	var classes = this.e.className;
	if (!classes) return false;					// e não tem uma classe
	if (classes === c) return true;				// e tem uma classe que coincide exatamente
	
	// Caso contrario, usa uma RegExp para procurar c como palavra
	// \b em uma expressão regular exige uma correspondênte em um limite de palavras.
	return classes.search("\\b" + c + "\\b") != -1;
};

// Adiciona c em e.className se ainda não estiver presente
CSSClassList.prototype.add = function(c) {
	if (this.contains(c)) return;				// não faz nada se já estiver presente
	var classes = this.e.className;
	if (classes && classes[classes.length-1] != " ")
		c = " " + c;							// adiciona um espaço, se precisamos de um
	this.e.className += c;
};

// Remove todas as ocorrencias de c de e.className
CSSClassList.prototype.remove = function(c) {
	// certifica-se de que c seja um nome de classe valido
	if (c.length === 0 || c.indexOf(" ") != -1)
		throw new Error("Invalid class name: '" + c + "'");
	// remove todas as ocorrencias de c como palavra, mais qualquer espaço à direita
	var pattern = new RegExp("\\b" + c + "\\b\\s*", "g");
	this.e.className = this.e.className.replace(pattern, "");
};

// Adiciona c em e.className, caso ainda não esteja presente, e retorna true.
// Caso contrário, remove todas as ocorrencias de c e.className e retorna false.
CSSClassList.prototype.toggle = function(c) {
	if (this.contains(c)) {						// Se e.className contém c
		this.remove(c);							// então remove
		return false;
	}
	else {										// Caso contrario
		this.add(c);							// o adiciona
		return true;
	}
};

// Retorna e.className em si
CSSClassList.prototype.toString = function() {
	return this.e.className;
};

// Retorno dos nomes em e.className
CSSClassList.prototype.toArray = function() {
	return this.e.className.match(/\b\w+\b/g) || [];
};





	// ESCREVENDO SCRIPTS DE FOLHAS DE Estilo
	
	
	
	

// obj CSSStyleSheet é um obj semelhante a um array somente de leitura
// contendo as folhas de estilos que representam o documeto

<style>
// regras de estilos aqui..
</style>
<style id="estile">
// regras de estilos aqui..
</style>

document.styleSheets		// retorna 2 obj CSSStyleSheet

// está função desabilita a folha de estilo especificada
// disabled é uma prop do obj CSSStyleSheet que desabilita a folhas de estilo,
// ou seja, como se estivesse removido todo <style></style>

function disabledStyleSheets(ss) {
	if (typeof ss === "number")
		document.styleSheets[ss].disabled = true;
	else {
		var sheets = document.querySelectorAll(ss);	// ss pode ser "style", "#estilo" ref ao modelo a cima
		for (var i = 0; i < sheets.length; i++)
			sheets[i].disabled = true;
	}
}

// Um obj CSSStyleSheet comtem uma prop cssRules[] (obj semelhante a array) que contem as regras de folha de estilo

var firstRule = document.styleSheets[0].cssRules[0];

// O IE usa o nome rules[], em vez de cssRules[] 

// cssRules[] podem representar até regras com @, como a diretiva @import
// rules[] do IE só contem as regras de estilos reais


// Prop do obj cssRules
<style>
body {
	font-weight: bold;
	background-color: white;
	letter-spacing: 1.2;
}
p {
	font-family: sans;
	color: black;
	font-style: oblique;
}
</style>

var cssR = document.styleSheets[0].cssRules[0];
cssR.selectorText				//=> "body": é o seletor CSS da regra
cssR.cssText					//=> "body { font-weight: bold; background-color: white; }": regre de estilo

// ref obj CSSStyleDeclaration é o mesmo que estilos em linha e computados
// pode ser usado para consultar ou configurar os estilos para a regra
cssR.style

// para inserir e remover regras de estilo "padrao"
document.styleSheets[0].insertRule("h1{ font-style: italic; }", 0);	// 2º arg posição na folha de estilo
document.styleSheets[0].deleteRule(i);	// i posição na folha de estilos
// Para o IE
// a diferencia é que addRules() espera o seletor, e a prop como argumentos separados 
addRule(/*seletor*/,/*propiedade sem {}*/,/*posi*/), removeRule(i)
	
	
/**
 * O cod a seguir itera pelas regras de uma folha de estilo, demonstrando a API por
 * fazer algumas alterações ambíguas na folha de estilos.
 */
var ss = document.styleSheets[0];					// obtem a 1st <style></style> (obj CSSStyleSheet) 
var rules = ss.cssRules ? ss.cssRules : ss.rules;	// obtem as regras da folha de estilos

for (var i = 0; i < rules.length; i++) {			// itera p essas regras
	var rule = rules[i];
	if (!rule.selectorText) continue;				// Pula @ e outras regras que não de estilo
	
	var selector = rule.selectorText;				// Obtem o seletor
	var ruleText = rule.style.cssText;				// Os estilos em forma de texto (exp.: "color: green;")

	// Se a regra se aplica a elementos h1, a plica em elementos h2 também
	// Note que isso só funciona se o seletor é literalmente "h1"
	if (seletor === "h1") {
		if (ss.insertRule) ss.insertRule("h2 { " + ruleText + "}", rules.length);
		else if (ss.addRule) ss.addRule("h2", ruleText, rules.length);
	}
	// Se a regra configura a propriedade text-decoration, a exclui.
	if (rule.style.textDecoration) {
		if (ss.deleteRule) ss.deleteRule(i);
		else if (ss.removeRule) ss.removeRule(i);
		i--;	// Ajusta o indice do laço, pois a regra i+1 agora é a regra i
	}
}	




	=/	17 - TRATANDO EVENTOS___________________________

	
	
	
	
// evento, tipo do evento, nome, alvo do evento,
// rotinas de tratamento de eventos, ouvinte de evento

// quando rotinas de tratamento são chamadas, dizemos:
// ativou, disparou ou despachou

// obj evento --> associado a um evento como argumento
// e recebe propriedades referentes aquele evento exp.:
type
target, srcElement /*(IE ltd 8)*/

// propagação de eventos & captura de eventos
// alguns eventos tem ações padrão


	
	// TIPOS DE EVENTOS
	

	
/** Categorias com eventos **
 *	
 *	- Eventos de entrada dependentes de dispositivos:
 *		"keypress", "keyup", "keydown", "mousemove", "mouseup"
 *	- Eventod de entrada independentes de dispositivos:
 *		"click", "textinput"
 *	- Eventos de interface como o usuário: (formularios)
 *		"onchange", "sumit", "reset"
 *	- Eventos de mudança de estado:
 *		"load", "DOMContentLoaded", "readystatechange"
 *	- Eventos específicos da API: (html5) exp.: <video> <audio>
 *		"dragstart", "playing"
 *	- Rotinas de tratamento de cronômetro:
 *		setTimeout, setInterval
 */

 

 
	// TIPOS DE EVENTOS LEGADOS

	
	
	
	
	mouse, teclado e formulário
	
// EVENTOS DE FORMULÁRIOS



// eventos disparados antes q o <form> é enviado e redefinido
// possuem ações padrão que podem ser cancelados por rotinas de tratamento de evento
reset e submit

// (botão de opção e caixa de seleção) disparam 
click

// elementos que mantem algum tipo de estado disparam quando muda o estado 
change

// mudaças de foco quando recebe ou perde
// estes não borbulham mas todos os outros eventos de formulario sim
focus & blur

// é uma alternativa para borbulharem mas só IE
// JQuery, possui metodos parecidos portáveis
focusin & focusout




// EVENTOS DE JANELA --> load, DOMContentLoaded, readystatechange



// disparado quando doc e todos os seus recursos externos (como img) são totalmente carregados
load

// são semelhantes, mas disparados mais sedo
// depois de todos os seus elementos estiverem protos mais antes deus recursos externos
DOMContentLoaded & readystatechange

// disparado quando o usuário está saindo
unload

// é semelhante ao 'unload' mas pede a confirmação do usuário
// o retorna da rotina pode exibir um texto de confirmação ao usuário
beforeunload
window.onbeforeunload = function() { return "Deseja realmente sair"; };

// <img> também registram load e error
// possuem tambem abort: quando uma img ou outro recurso de rede
// deixa de ser carregado pq o usuario interrompeu
error, abort

focus, blur // tambem são utlizado pelo obj window quando uma jan recebe o focu/perde




// EVENTOS DE MOUSE



// obj event de eventos de mouse possui propiedades:
clientX, clientY		// fornecem as coordenadas de janela ref a posi do mouse 
button, which			// qual botão do mouse (se houve algum) foi pressionado
altKey, ctrlKey,			// true se teclas modificados estão 
metaKey, shiftKey		// pressionadas no momento do evento especif

// eventos "click" possuem detail para saber se foi 
// 1, 2 ou mais clicks
datail


// EVENTOS DE TECLADO



// obj event de eventos de teclado possui propiedades:
keyCode				// define o codigo de qual tecla foi pressionada
altKey, ctrlKey,	// true se teclas modificados estão 
metaKey, shiftKey	// pressionadas no momento do evento especif


keydown		// quando uma tecla é pressionada (mesmo uma tecla modificadora)
keyup		// quando é solta
keypress
// quando uma tecla é matida pressionada até que ela se repita
// pode haver muitos eventos keypress antes do evento keyup
// keypress é um evento de texto de nivel mais alto e seu obj event
// especifica o caracter gerado e não a tecla pressionada



	/* REGISTRANDO ROTINAS DE TRATAMENTO DE EVENTOS */


// há duas formas de registrar rotinas
// 1 - configurando uma propriedade
// 2 - métodos addEventListener() | attachEvent()



// CONFIGURANDO PROPRIEDADE DE TRATAMENTO DE EVENTOS

// configurando a propriedade onload do obj window em uma função.
// a função é a rotina de tratamento de evento: ela é chamada quando o doc é carregado
window.onload = function() {
	// pesquisa um elemento <form>
	var elt = document.getElementById("shipping_address");
	// registra uma função de tratameto de evento q vai ser chamada
	// imediatamente antes do formulário ser enviado
	elt.onsubmit = function() { return valid(this); }
} 


// CONFIGURANDO ATRIBUTOS DE ROTINAS DE TRATAMENTO DE EVENTOS
// o cod interna deve ser o corpo da função

<button onclick="alert('Thank you'); ">Click Here</button>

// para registrar rotinas como atributos no obj window defina a rotina no <body>


// o navegador converte a string em uma função com a seguinte aparencia

function(event) {
	with(document) {
		with(this.form || {}) {
			with(this) {
				// seu corpo aqui..
			}
		}
	}
}



// addEventListener() --> registra uma rotina para um evento especificando um alvo
addEventListener() & removeEventListener();


// ele pode registrar várias rotinas para um elemnto, que seram chamadas quando
// o evento especifico ocorrer
// seu 3º arg é serve para definir uma rotinar de captura

<button id="mybutton">Click Here</button>
var b = document.getElementById("mybutton");
b.onclick = function() { alert('Thanks for clicking me!'); };
b.addEventListener("click", function() { alert('Thanks again!');}, false);

document.removeEventListener("mousemove", handler, false);


// attachEvent() --> similar ao anterior porem para IE 8 e anteriores
attachEvent() & detachEvent()

// como não suportam captura de eventos, recebem apenas 2 args
// também permite que a mesma função de tratamento seja registrada mais de uma vez
// sendo assim, chamda quantas vez for registrada

// é comum ver códigos como este
var b = document.getElementById("mybutton");
var handler = function() { alert('Thaks!'); };
if (b.addEventListener) b.addEventListener("click", handler, false);
else if (b.attachEvent) b.attachEvent("onclick", handler);




	// CHAMADA ROTINAS DE TRATAMENTO DE EVENTOS 




// Argumentos de rotina de tratamento de eventos


// No IE 8 e ant não obtem um obj evento as serem chamadas.
// Em vez disso, o obj event é disponibilizado por meio da variavel global 'window.event'
function handler(event) {
	event = event || window.event;	// se nenhum arg foi passado usa a variavel global
	// corpo aqui...
}



// Contexto da rotina de tratamento de eventos


e.onclick = function() { /* this aqui se ref ao e */ };

// attachEvent() são chamadas como função e o valor de this é o obj global
// (window). É pssivel contornar isso com o cod seguinte

/**
 * Registra a função de tratamento para tratar do evento no alvo
 * especificado. Garanti que a rotina seja sempre chamda como um 
 * método do alvo.
 */
 
function addEvent(target, type, handler) {
	if (target.addEventListener) target.addEventListener(type, handler, false);
	else 
		target.attachEvent("on" + type,
			function (event) {
				// chama a rotina de tratamento como um método do alvo
				// passa o obj event
				return handler.call(target, event);
			});
}


// Escopo de rotina de tratamento de evento


// é igual as rotinas de tramaneto possuem escopo léxico iguais as outras funções
// apenas diferem as funções definidas como corpo de um atributo html
// possuem acesso as varias globais




// Valor de retorno de rotinas de tratamento

o retorno de uma rotina de tratamento evento configurada
em uma propriedade pode ser util para cancelar a ação padrão
como para o envio de um formular ao click no botão submit 
se o return false não irá enviar o formulario

ou para rotinas onkeypress para filtradar os caracters
que serma inseridas

// as rotinas registradas com addEventListener() ou attachEvent()
// fazem uso de prop do obj event 
preventDefault() e returnValue



// Ordem de chamada



// Propagação de eventos
A borbulha é a 3º 'fase' de propagação de eventos. A chamada das rotinas de tratamento
de eventos do obj alvo em si é a 2º fase. A 1º fase, que ocorre mesmo antes que as 
rotinas do alvo sejam chamdas, é a fase de 'captura'

 

// Cancelamento de eventos


function cancelHandler(event) {
	event = event || window.event;	// para IE
	
	// faz algo para tratar do evento aqui...
	
	//agora cancela a ação padrão associada ao evento
	if (event.preventDefault) event.preventDefault();		// técnica padrão
	if (event.returnValue) event.returnValue = false;		// IE
	return false;			// para rotinas de tramamento registradas como propriedades do obj 
}

// A versão draft do módulo Events do DOM define uma prop defaultPrevented
// a intenção é que ela seja 'false' mas se torna true se preventDefault() for chamada
defaultPrevented



// Também podemos cancelar a propagação de eventos
// nos navegadores q suportão addEventListener() o obj event possui um metodo
// stopPropagation() que serve para impedir a propagação de eventso
// ele pode ser chamado em qualquer momento durante a borbulha de eventos
// ele funciona durante a fase de captura de eventos e burbulha
stopPropagation()


// IE 8 e anteriores não possuem stopPropagation()
// mais uma prop cancelBubble, configure como true para cancelar a propagação
cancelBubble = true;



// a versão draft atual da especificação Events do DOM define outro método no obj
// Event, chamado stopImmediatePropagation(). Assim como stopPropagation(), esse método impede
// a propagação de evento para qualquer outro obj. mas tambem impede a chamada dev qualquer outra
// rotina de tratamento registrada no mesmo objeto.
// a JQuery e YUI definem stopImmediatePropagation() de forma independente de plataforma
stopImmediatePropagation()





	// EVENTOS DE MOUSE
	
	
	
/** Eventos do Mouse
 *
 * - click: 		evento de nivel mais alto disparado quando usuario pressiona e solta um botão do mouse
 *					ou "ativa" um elemento de algum modo
 * - contextmenu: 	um evento cancelável disparado quando um menu de contexto está para ser exibido.
 *				  	Os navegadores exibem menus de contexto em cliques do botão direito do mouse, de
 *				  	modo que este evento também possa ser usado com o evento click
 * - dblclick: 		dispara quando o usuário da um clique duplo no mouse
 * - mousedown: 	dispara quando pressiionado um botão do mouse
 * - mouseup: 		disparado quando solto um botão do mouse
 * - mousemove: 	disparado quando move o mouse
 * - mouseover: 	disparado quando o mouse entra em um elemento. relatedTarget (ou fromElement no IE)
 *			    	especifica de qual elemento o mouse está vindo
 * - mouseout: 		disparado quando o mouse sai de um elemento. relatedTarget (ou toElement no IE) especif
 *			   		para qual elemto o mouse está indo
 * - mouseenter: 	como "mouseover", mas não borbulha. Inda não amplamente implementado
 * - mouseleave: 	como "mouseout", mas não borbulha. Inda não amplamente implementado
 */


// obj event de eventos de mouse possui propiedades:
clientX, clientY		// fornecem as coordenadas de janela ref a posi do mouse 
button, which			// qual botão do mouse (se houve algum) foi pressionado
altKey, ctrlKy,			// true se teclas modificados estão 
metaKey, shiftKey		// pressionadas no momento do evento especif

// eventos "click" possuem detail para saber se foi 
// 1, 2 ou mais clicks
datail



	// EVENTOS DE RODA DO MOUSE 



mousewheel, DOMMouseScroll /* firefox */


// para mousewhell, especifica quato o usuario rolou a roda
wheelDelta

// para DOMMouseScroll, "		"		"		"
datail



	// EVENTOS DE TECLADO
	
	
// keyup() e keydown() definem
keyCode		// especifica qual tecla foi pressionada, sendo a codificação Unicode do caracter
	
// versão draft Level 3 DOM define key
// que especifica um caracter realmete util para ser lido pelos desenvolvedores
// em uma forma de string, caracteres de função são exibidos "F2", "Home" ou "Left"
key


// O Chrome e o Safari baseados no Webkit definem uma prop parecida com a key
keyIdentifier

// key, keyIdentifier é string e não um numero, tendo valores úteis, como: "Shiff", "Enter"
// porem keyIdentifier tem uma representação menos uteil do que keyCode, para representar
// teclas que não são função exp.: tecla 'A' representa "U+0041"





	=/	18 - SCRIPTS HTTP___________________________




/** AJAX (Asynchronous javaScript and XML)
 *
 * trata-se de uma técnica de carregamento de conteúdo em uma página web
 * com o uso de javascript e XML, HTML, TXT, PHP, ASP, JSON ou qualquer
 * linguagem de marcaçao ou programação capaz de ser recuperada de um
 * servidor.
 */


// O obj XMLHttpRequest é o responsável pelo funcionamento do AJAX

function iniciaAjax() {
	var objAjax = false;
	if (window.XMLHttpRequest) 				// Técnica padrão
		objAjax = new XMLHttpRequest();
	else if (window.ActiveXObject)			// para versões antigas do IE
		objAjax = new ActiveXObject("Msxml2.XMLHTTP");
	else alert("Seu navegador não suporta esta aplicação");
}


	// REQUISIÇÃO AO SERVIDOR
	
/* 1 - ação disparadora de evento onreadystatechange
 * 2 - método open()
 * 3 - método send()
 * 4 - método setRequestHeader
 */
 
// existem ainda os métodos
// abort, getAllReponseHeaders e getReponseHeader
 

// a ação onreadystatechange é disparada pelo servidor e ocorre sempre
// que ele envia para o navegador a informação de que houve uma atualização
// (ou mudança) no status da comunicação entre eles
onreadystatechange


// isso é possivel graças a propriedade readyState. Sempre que a mudanças
// nessa prop o evento onreadystatechange é disparado
readyState 
 

/* Estados de readyState
 *
 * 0 - UNSENT/comunicação não iniciada. método open() não foi chamado
 * 1 - OPENED/Inicio de comunicação. Foi chamado open(), mas envio de dados não iniciado
 * 2 - HEADERS RECEIVED/carregamento finalizado e inicio da requisição. chamdo metodo send()
 * 3 - LOADING/servidor em processo de envio de resposta à requisição
 * 4 - DONE/servidor acaba de enviar a resposta à requisição
 */
 
var requisicaoAjax = iniciaAjax();	// função definida acima
if (requisicaoAjax) {
	requisicaoAjax.onreadystatechange = function() {
		if (requisicaoAjax.readyState == 4) {
			alert("chegou a requisição feita ao servidor");
		}
	};
}

// destina a informar ao servidor o endereço do arquivo que está sendo
// requisitado
open(/*metodo*/, /*URL*/);
 
// destina-se a enviar cabeçalhos HTTP para uma requisição AJAX. Um navegador
// quando requisita uma pagina ao servidor, envia cabeçalhos HTTP que nada mais
// são que metadados descritivos da requisição, devem vir depois do open()
setRequestHeader(/*cabeçalho*/, /*valor*/);

// destina a iniciar a requisição que já se tenha sido definida pelo open()
// admite um parâmetro a constituido de um conjunto de dados a ser enviado
// ao servidor  
send(/*dados*/) ou send(null)	// quando a requisição não envia dados
 
// destina se a cancelar uma requisição 
abort();

//destina-se a retornar um determinado cabeçalho HTTP de uma requisição de forma de
// string. admite um parametro q é o nome do cabeçalho cujo valor deseja retornar
getReponseHeader("Content-Type")
 

var requisicaoAjax = iniciaAjax();
if (requisicaoAjax) {
	requisicaoAjax.onreadystatechange = function() {
		if (requisicaoAjax.readyState == 4) {
			alert("chegou a requisição feita ao servidor");
		}
	};
	requisicaoAjax.open("POST", "/requisicoes/arquivo-requisitado.php?");
	requisicaoAjax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	requisicaoAjax.send("produto=mouse+sem+fio&modelo=microsoft");
}




	=/ 20 - Armazenamento no lado do cliente

	
	

// localStorage e sessionStorage


// consulta um valor armazenado
var name = localStorage.username;

//notação de array equivalente
name = localStorage['username'];

if (!name) {
	// faz uma pergunta ao usuário
	nome = prompt('Qual o seu nome?','');
	// armazena a resposta
	localStorage['username'] = nome;
}

// itera por todos os pares nome/valor armazenados
for (var name in localStorage) {
	// pesquisa o valor de cada um
	var value = localStorage[name];
}


// se você armazenar um número ele é convertido automáticamente
// em uma string. Não se esquece de analisá-lo ao recurerá-lo
localStorage.x = 10;
var x = parseInt(localStorage.x);

// convertendo um objeto Date em uma string ao configurar e analisa-o, ao obter
localStorage.lastRead = (new Date()).toUTCString();
var lastRead = new Date(Date.parse(localStorage.lastRead));

// JSON tende resultar em uma codificação conveniente para qualquer estrututra
// primitiva ou de dados

var dados = {n:1, o:{name:'Teter',tel:'8875-8525'}, arr:[1,2,3]};
// codifica e armazena
localStorage.obj = JSON.stringify(dados);
// recupera e decodifica
var obj = JSON.parse(localStorage['obj']);


// API de armazenamento


// armazena um número com o nome 'x'
localStorage.setItem('x', 1);

// recupera um valor
localStorage.getItem('x');

// Enumera todos os pares nome/valor armazenados
for (var i = 0; i < localStorage.length; i ++) {
	
	// Obtem o nome da prop i
	var name = localStorage.key(i);
	// obtem o valor desse par
	var value = localStorage.getItem(name);
}

// Exclui o item 'x'
localStorage.removeItem('x');
// Exclui todos os outro item de localStorage
localStorage.clear();	



// COOKIES	
	

// verifica se está habilitado os cookies no navegador
navigator.cookieEnabled; /* => true ok! */

// Armazenando cookies
// os valores de cookies não podem conter pontos e vírgulas, vírgulas
// ou espaços em branco. Por isso talvez você queira usar a função global
// básica de javascript encodeURIComponent() para codificar o valor antes de armazená-lo.
// se fizer isso vai ter que usar a função decodeURIComponent() quando ler o cookie
document.cookie = 'version=' + encodeURIComponent(document.lastModified);	
	

// para especificar a vida útil de um cookie	
	
name=value; max-age=segundos

// A função a seguir configura um cookie com um atributo max-age opcional:

// Armazena o par nome/valor como cookie, codificando o valor com
// encodeURIComponent() para fazer o escape de pontos e vírgulas,
// vírgulas e espaços. Se dayToLive é um número, configura o atributo
// max-age de modo que o cookie espire após o número especificado de dias.
// Passe 0 (ZERO) para excluir um cookie.
function setCookie(name, value, daysToLive) {
	var cookie = name + '=' + encodeURIComponent(value);
	if (typeof(daysToLive) === 'number') {
		cookie += '; max-age=' + (daysToLive*60*60*24);
	}
	document.cookie = cookie;
}

// Da mesma forma, os atributos path, domain e secure de um cookie podem ser
// configurados anexando-se strings com o formato a seguir no valor do cookie,
// antes que esse valor seja gravado na propriedade cookie:

	; path=caminho
	; domain=domínio
	; secure
	

	
// Lendo cookies
	
// Retorna os cookies do documento com um objeto de pares nome/valor.
// Presume que os valores de cookie são codificados com encodeURIComponent().
function getCookie() {
	var cookies = {};						// O objeto que vamos retornar
	var all = document.cookie;				// Obtém todos os cookies em uma string enorme
	
	if (all === '') return cookies;			// string vazia retorna {}
	
	var list = all.split('; ');				// Decompõe em pares nome=valor individuais
	for (var i=0; i < list.length; i++) {	// para cada cookie
		var cookie = list[i];
		var p = cookie.indexOf('=');		// Localiza o primeiro sinal =
		var name = cookie.substring(0, p);	// Obtém o nome do cookie
		var value = cookie.substring(p+1);	// Obtém o valor do cookie
		value = decodeURIComponent(value);	// Decodifica o valor
		cookies[name] = value;				// armazena nome e valor no objeto
	}
	return cookies;
}







