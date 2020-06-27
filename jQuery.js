/* 								  02/10/16
 * * * JQuery 1.10.2 * * *	
------------------------------------------*/


	=/	1 -- O QUE É JQUERY?


$()				// construtor/alias
jQuery()		// Idem

// O mesmo que window.onload
$(document).ready(function() {		// sintaxe formal
	// scripts aqui...
});

$(function() {						// Idem (abreviada)
	// ...
});

// define estilo em linha <div style="..."></div>
// Idem document.getElementsByTagName("div")[0].style.color = "F0F";
$("div").css("color", "#F0F");		// altera a cor de fonte de todas as tag <div>


$("div").children("p").fadeOut().addClass("xpto");		// exemplo de encadeamento jQuery




	=/	2 -- FUNÇÕES-PADRÃO E SELETORES JQUERY


	
	// FUNÇÕES PADRÃO

	
$("div").css("color", "#F0F");

/* $(expressão, [contexto]) */ 2.1a
// contexto, pode ser um elemento, conjunto de elementos DOM
// ou um obj JQuery
$("p", $("div"));				// todos os <p> descendentes de <div>


/* $(html) */ 2.1b
// está função destina-se a criar marcação html
$("<p>Eu sou um paragrafo criado com JQuery</p>").prependTo('body');
/* $(elementos) */ 2.1c
// destina-se a procurar elemen HTML no DOM, tbm XML e obj window
$('div, p')

/* $(callback) */ 2.1d
// destina-se a servir de container a scripts que devam ser executados
// somente após o carregamento do DOM 
jQuery(function($){
	// scripts...
});

/* seletorjQuery.each(callback) */ 2.1e
// destina-se a executar uma função em cada elemento encontrado
// por um objeto jQuery
$('p').each(function(i) {
	var j = i + j;
});

/* seletorjQuery.length */ 2.1f
// retorna o numeros de ocorrencias do elemento-alvo encontrado
$('p').length;

/* seletorjQuery.eq([-]posição) */
// retorna uma determinada ocorrencia do conjunto alvo (*contagem em 0)
// admite valor negativo, contagem de traz para frente
$('li').eq(2).css('color','red');
<ul>
	<li>Item 1</li>
	<li>Item 2</li>
	<li>Item 3</li> // selecionado
	<li>Item 4</li>
	<li>Item 5</li>
</ul>

/* seletorjQuery.get() */ 2.1g
// destina-se a acessar elementos do DOM sem emprego das funcionalidades jQuery
// pode ser usado para manipular diretamente o DOM e foi criada para resolver
// problemas de retro-compatibilidade
function conteudoParagrafos(p) {
	var arrayConteudos = [];
	for (var i = 0; i < p.length; i++) {
		arrayConteudos.push(p[i].innerHTML);
	}
	$('div').text(arrayConteudos.join(' - '));
}
$('button').click(function() {		
	conteudoParagrafos($('p').get().reverse());		
});
$('.reset').click(function () {		
	$('div').empty();
});

<button type="button">					Rodar script	</button>
<button type="button" class="reset">	Reset			</button>
<p>Parágrafo um.   </p>
<p>Parágrafo dois. </p>
<p>Parágrafo três. </p>


/* seletorJquery.get([-]indice) */
// possui a mesma funcionalidade da anterior, porem em um
// elemento especifico. adimte indice negativos

/* seletorJquery.index(); */ 2.1i | 2.1j
// retorna um numero inteiro indicando a posi (indice) de um elemento
// do conjunto definido por seletorjQuery. (contagem em 0)
$('p').click(function () {
	var indice = $(this).index();
});

/* seletorjQuery.index(elemento) */ 2.1k
// retorna o indice do elemento do DOM definido no parametro 
// contagem em 0, se não existir um indice retorna -1
$('p').click(function () {
	var indice = $('p').index(this);
});

/* seletorjQuery.index(seletorjQuery) */ 2.1l
// está função retorna o primeiro elemento definido no parametro
// seletorjQuery. contagem ini 0, não encontrado -1
$('span').click(function () {
	var indice = $('p').index($('p:gt(0)'));	// 'p:gt(0)' significa encontre todos paragra q tenham o indice > 0
});

/* seletorjQuery.toArray() */ 2.1m
// Esta função identica a função get(), dela difere apenas pelo
// fato de não admitir a opção de se definir um argumento (indice)
// para recuperar um determinado valor do arrayConteudos
function conteudoParagrafos(p) {
	var arrayConteudos = [ ];
	for (var i = 0; i < p.length; i++) {
		arrayConteudos.push(p[i].innerHTML);
	}
	$('div').text(arrayConteudos.join(' - '));
}
$('button').click(function() {		
	conteudoParagrafos($('p').toArray().reverse());		
});
$('.reset').click(function () {		
	$('div').empty();
});

<button type="button">					Rodar script	</button>
<button type="button" class="reset">	Reset			</button>
<p> um   </p>
<p> dois </p>
<p> três </p>

/* jQuery.noConflict() */
// esta função é utilizada para evitar conflitos com outras bibliotecas
// que tambem fazem uso do $
<script>
jQuery(document).ready(function ($) {
	...
});
// forma abreviada
jQuery(function($){
	...
})
... outras bibliotecas aqui ...

// Outra forma para evitar esse problema
var $j = jQuery.noConflict();
$j(document).ready(function() {
	$j('p').show();
	$j('p').eq(0).css('color', 'red');
});
... outras bibliotecas aqui...

// Outra forma para evitar esse problema
$(document).ready(function() {
	(function($) {
		...
	})(jQuery);
});

	
	

	// SELETORES JQUERY

	
	

// SELETORES SIMPLES



/* $(id) */ 2.2.1a
// seleção atraves do atributo id do elemento
$("#nav")

/* $(classe) */ 2.2.1b
// seleção atraves do atributo class do elemento
$(".nav")

/* $(elemento) */ 2.2.1c
// seleciona todos os elementos com a tag ref
$('div')

/* $(seletor1, seletor2, seletor3, ...) */ 2.2.1d
// grupamento de setores, os args é uma lista de seletores
$('div, #nav, .banner')



// SELETORES COMPOSTOS



/* $(ancestral descendente) */ 2.2.2a
// acessa elementos descendentes de um ancestral especifico
$('p span')

/* $(pai > filho) */ 2.2.2b
// acessa o elemento-filho do pai especif 
$('div > h1')	// espaço facultativo div>h1

/* $(anterior + próximo) */ 2.2.2c
// acessa o elemento próximo que se segue imediatamente ao anterior
$('h1 + p')		// espaço facultativo h1+p

/* $(anterior ~ anteriro) */ 2.2.2d
// acessa todos os elementos irmãos e que se seguem ao elemento anterior
$('h2 ~ p')

<p>não faz parte da seleção</p>
<h2>cabeçalho nivel 2</h2>
<p>seguem ao acesso</p>
<p>seguem ao acesso</p>
<p>seguem ao acesso</p>



// SELETORES - FILHO BÁSICO



/* seletor:first */ 2.2.3a
// acessa a primeira ocorrencia de elementos selecionados
$('li:first')	// seleciona o 1º item da lista

/* seletor:last */ 2.2.3b
// acessa o ultimo ocorrencia de elementos selecionados
$('li:last')	// seleciona o ultimo item da lista

/* seletor1:not(seletor2) */ 2.2.3c
// aceesa o conjunto de seletores seletor1 excluindo o seletor2
$('li:not(li:first)')

/* seletor:even */ 2.2.3d
// acessa as ocorrencias de ordem par do conjunto. contagem em 0
$('tr:even')

/* seletor:odd */ 2.2.3e
// acessa as ocorrencias de ordem impar do conjunto. contagem em 0
$('tr:odd')

/* seletor:eq(indice) */ 2.2.3f
// acessa a ocorrencia de ordem indice o conjunto. admite val negativo. -1 se não encontrar
$('td:eq(1)')

/* seletor:gt(indice) */ 2.2.3g
// acessa as ocorrencias cuja o indice é MAIOR (>) do o definido. contagem 0. admite val neg
$('li:gt(2)')

/* seletor:lt(indice) */ 2.2.3h
// acessa as ocorrencias cuja o indice é MENOR (<) do o definido. contagem 0. admite val neg
$('li:lt(3)')

/* $(:header) */ 2.2.3i
// acessa todas as ocorrencias de cabeçalhos h1,h2,h3,h4,h5,h6
$(':header')

/* :focus */ 2.2.3j
// acessa todas as ocorrencias de elementos que ganham foco


/* :lang(idioma) */ 2.2.3k
// acessa todas as ocorrencias de um elemento e seus descendentes marcado com attr lang
$('div:lang(pt-br)')

/* :target */ 2.2.3l
// acessa a ocorrencia de um elemento que tenha sido marcado com um valor de id Idem à uma hastag
// O seletor $('h2:target') casa com a ocorrencia <h2 id="css
$('h2:target')
<a href="css">CSS</a>
<h2 id="css">CSS</h2>

/* :root */
// acessa o elemento raiz do documento
$(":root")

/* seletor:animated */
// acessa as ocorrencias do elemento seletor para as quais se tenha definido um script de animação



// SELETORES DE CONTEUDO



/* seletor:contains(texto) */ 2.2.4a
// acessa todas as ocorrencias de seletor quem contenham um texto (string)
$('p:contains(Maujor)')


/* seletor:empty */ 2.2.4b
// acessa todas as ocorrencias vazias de seletor
$('li:empty')

<li>aaaa</li>
<li></li>		// selecionado
<li>aaaa</li>

/* seletor1:has(seletor2) */ 2.2.4c
// acessa todas as ocorrencias do seletor1 que tenha pelo menos 1 ocorrencia do seletor2
$('p:has(strong)')

/* seletor1:parent */ 2.2.4d
// acessa todas as ocorrencias de elementos que sejam pai, ou seja, elementos que tenham filhos
// podendo ser (text-node)
$('p:parent')

<p>aaa</p>
<p></p>			// NÃO selecionado
<p>aaa</p>


// SELETOR DE VISIBILIDADE



/* :hidden */ 2.2.5a
// acessa as ocorrencias de todos elementos que estejam ocultos. incluindo campos de form type="hidden"
// normalmente tambem acessa os elementos contidos em <head>, para evitar: $(':hidden', $('body'))
$(':hidden')				// acessa todo o doc inclusive <meta <script ... dentro do <head>
$(':hidden', $('body'))		// acessa todos elemen de <body>
$('seletor:hidden')			// acessa todos elemen do tipo especif

/* :visible */ 2.2.5b
// acessa as ocorrencias de elementos visiveis
// elementos com "display:none e visibility:hidden" não são acessados
$(':visible')
$(':visible', $('body'))
$('seletor:visible')



// SELETORES DE ATRIBUTOS



/* seletor[attr] */ 2.2.6a
// acessa todas as ocorrencias ao qual tenham o attr especif
$('input[type]')

/* seletor[attr='valor'] */ 2.2.6b
// acessa todas as ocorrencias ao qual tenham o attr e val especif
$('input[type="text"]')

/* seletor[attr!='valor'] */ 2.2.6c
// acessa todas as ocorrencias ao qual tenham o attr com val DIFERENTE do especif
$('input[type!="radio"]')

/* seletor[attr^='valor'] */ 2.2.6d
// acessa todas as ocorrencias ao qual tenham o attr que val começam com valor
$('a[href^="http://"]');

/* seletor[attr$='valor'] */ 2.2.6e
// acessa todas as ocorrencias ao qual tenham o attr com val termine com valor
$('a[href$=".pdf"]');

/* seletor[attr*='valor'] */ 2.2.6f
// acessa todas as ocorrencias ao qual tenham o attr com val com a string passada
$('a[href*="maujor"]');

/* seletor[filtro1 atributo]...[filtroN atributo] */ 2.2.6g
// acessa todas as ocorrencias do elemento seletor para as quais os attr satisfação todas as condições de filtros
$('a[href$=".pdf"][id][title*="bicicletas"]')



// FILHOS PARA SELETORES-FILHO



/* seletor:first-child */ 2.2.7a
// acessa o elemento que é primeiro filho do elemento definido em seletor 
$('ol li:first-child')

/* seletor:last-child */ 2.2.7b
// acessa o elemento que é ultimo filho do elemento definido em seletor 
$('ol li:last-child')

/* seletor:only-child */ 2.2.7c
// acessa o elemento que é filho único do elemento definido em seletor
$('ol li:only-child')

<ol>
	<li>aaa</li>
	<li>aaa</li>
</ol>
<ol>
	<li>aaa</li>	// selecionado
</ol>

/* seletor:nth-child(indice/even/odd/expressão) */ 2.2.7d
// acessa o elemento que é filho do elemento definido em seletor e ocupa uma uma posição
// indice:		valor inteiro começando com 1 para 1º elemento, 2 para 2º, ... 
// even:		indices pares. contagem ini 0
// odd:			indices impares
// expressão:	(3n) 3,6,9.. (2n+3) 3,5,7..
$('ol li:nth-child(3)')

/* seletor:nth-last-child(indice/even/odd/expressão) */ 2.2.7e
// Idem ao anterior porem a contagem se faz do ultimo filho p/ primeiro


/* seletor:first-of-type */ 2.2.7f
// acessa o elemento do tipo seletor, que é o 1º filho
$('p:first-of-type')

/* seletor:last-of-type */ 2.2.7g
// acessa o elemento do tipo seletor, que é o ultimo filho
$('p:last-of-type')

/* seletor:only-of-type */ 2.2.7h
// acessa o elemento do tipo seletor, que é filho único
$('p:only-of-type')

<div>
	<span>aaa<span>
	<p>bbb</p>
	<p>bbb</p>
</div>
<div>
	<span>aaa<span>
	<p>bbb</p>			// selecionado
</div>

/* seletor:nth-of-type(indice/even/odd/expressão) */ 2.2.7i
// acessa o elemento do tipo seletor, que ocupa uma posição definida *condições iguais ao nth-child
$('li:nth-of-type(odd)')

/* seletor:nth-last-of-type(indice/even/odd/expressão) */ 2.2.7j
// acessa o elemento do tipo seletor, que ocupa uma posição definida *condições iguais ao nth-child
// do ultimo para o primeiro



// SELETORES PARA FORMULÁRIOS



/* :input */ 2.2.8a
// acessa os elementos input, textarea, select e button em um formulário
$(':input')

/* :text */ 2.2.8b
// acessa os elementos input do tipo 'text' em um formulário
$(':text')

/* :password */ 2.2.8c
// acessa os elementos input do tipo 'password' em um formulário
$(':password')

/* :radio */ 2.2.8d
// acessa os elementos input do tipo 'radio' em um formulário
$(':radio')

/* :checkbox */ 2.2.8e
// acessa os elementos input do tipo 'checkbox' em um formulário
$(':checkbox')

/* :submit */ 2.2.8f
// acessa os elementos input do tipo 'submit' em um formulário
$(':submit')

/* :reset */ 2.2.8g
// acessa os elementos input do tipo 'reset' em um formulário
$(':reset')

/* :image */ 2.2.8h
// acessa os elementos input do tipo 'image' em um formulário
$(':image')

/* :button */ 2.2.8i
// acessa os elementos input do tipo 'button' e elementos <button> em um formulário
$(':button')

/* :file */ 2.2.8j
// acessa os elementos input do tipo 'file' em um formulário
$(':file')

/* :hidden */ 2.2.8f
// acessa os elementos input do tipo 'hidden' em um formulário



// FILTROS PARA FORMULÁRIOS



/* :enabled */
// acessa os elem que estejam habilitados
// em HTML, todos elem de formulario estão habilitados por padrão
// vc pode desabilitar com o uso do attr 'disabled'

/* :disabled */ 2.2.9a
// acessa os elem que estão desabilitados em um formulário
$(':disabled')

/* :checked */ 2.2.9b
// acessa os elem 'radio' e 'checkbox' em um formulario
// para os quais se tenham declarado o attr checked
$(':checked')

/* :selected */ 2.2.9c
// acessa os valores que tenham sido selecionados em um controle
// de formulário
$('option:selected')



	=/	3 -- MÉTODOS DE MANIPULAÇÃO DO DOM



// ATRIBUTOS



/* seletorjQuery.attr(nome_atributo) */ 3.1a
// acessa o valor do atributo definido no parâmetro para p 1º elem
// encontrado pelo seletorjQuery
$('h1').attr('title')

/* seletorjQuery.attr({atributo1:valor1, atributo2:valor2,...}) */ 3.1b
// acessa o elem definido em seletorjQuery e insere o par atrinuto='valor'
// no elem
$('img').attr({
	src: "../flores.jpg",
	alt: "Rosas do Campo"
});

/* seletorjQuery.attr(atributo, valor) */ 3.1c
// acessa o elem definido em seletorjQuery e insere o par atributo='valor'
// este método permite inserir apenas 1 atributo 
$('img').attr('src','../flores.jpg')

/* seletorjQuery.attr(atributo, função(indice, valor_atual)) */ 3.1d
// acessa o elemen definido em seletorjQuery e insere o atributo definido
// no parâmentro atributo com o valor retornado pela função, indice ref
// a posição do elem no conjunto seletorjQuery, e valor_atual, que é o 
// valor preexistente do atributo. Se o atributo não exisitir, valor_atual
// é vazio ""
$('img').attr('width', function(indice, valor) {
	$('<p class="msg"> width=' + valor*(i+1) + 'px</p>').insertAfter(this);
	return (valor*(i+1));
}); 

/* seletorjQuery.removeAttr(atributo) */ 3.1e
// acessa o elem definido em seletorjQuery e remove o atributo definido no parâmetro
// atributo
$('#remover').removeAttr('id')



// PRORPIEDADES



/* seletorjQuery.prop(nome_propriedade) */ 3.1f
// acessa o valor da propriedade definidade definidade no parâmetro
// nome_propriedade para o 1º elem encontrado pelo seletorjQuery
// Caso não exista a prop retorna undefined
var valor = $('.inp1').prop('value')

/* seletorjQuery.prop({propriedade1:valor1,propriedade2:valor2,..}) */ 3.1g
// acessa o elem definido em seletorjQuery e insere o para propriedade="valor"
// você pode inserir quantos pares quiser
$('.selecao').prop({
	value: "3rd"
});

/* seletorjQuery.prop(propriedade, função(indice, valor_atual)) */
// acessa o elem definido em seletorjQuery e insere a propriedade definida
// no parametro propriedade com o valor do retorno da função
// semelhante ao attr(atributo, func..) anterior

/* seletorjQuery.removeProp(propriedade) */
// acessa o elem definido em seletorjQuery e remove a propriedade definida
// no parâmetro propriedade. Esse método deve ser usado para remover propriedades
// inseridas com o método prop(). Não use para remover props nativas, como:
// selected, checked e disabled, pois uma vez removidas não será mais possível
// adicioná-las novamente. Nesse caso, use o método prop() e nele defina o valor false



// MANIPULAÇÃO DO ATRIBUTO CLASS



/* seletorjQuery.addClass(classe1 [classe2 ... classeN]) */ 3.2a
// acessa o elemento definido em seletorjQuery e atribui-lhe uma ou mais classes
// definidas no parâmetro da função. Caso opte por multiplas classes seus nomes
// devem ser separados por espaço
$('p').addClass('brilho shadow')

/* seletorjQuery.addClass(função(indice, class_atual)) */ 3.2b
// Este método usa uma função para retornar os novos valores da classe ou classes
// a serem aplicados ao eleme seletorjQuery. Se a class_atual contiver mais de um
// valor, somente o ultimo valor estará contido no parâmetro classe_atual da função
// acrescimo de uma classe não sobrescreve as classes pré existentes
$('p').addClass(function(i,v) {		// class="item" ficará class="item item1"
	return (v + (i+1));
});

/* seletorjQuery.hasClass(valor_classe) */
// acessa o elem definido em seletorjQuery e verifica se a class de valor igual
// a valor_classe existe para tal elem. retorna "true/false"
$('p').hasClass('shadow')	//=> true


/* seletorjQuery.removeClass(valor_classe) */ 3.2c
// acessa o elem definido em seletorjQuery e remove a classe cuja o valor foi definido
// no parâmetro
$('p').removeClass('shadow')

/* seletorjQuery.removeClass(função(indice, valor_atual)) */ 3.2d
// Este método usa uma função para retornar um valor (ou uma lista de valores) separados
// por vírgula) a serem removidos do atributo classe do elem seletorjQuery
// Se a class_atual contiver mais de um valor, somente o ultimo valor estará contido 
// no parâmetro classe_atual da função
$('p').removeClass(function(i,v) {
	return (v + (i+1));
});

/* seletorjQuery.toggleClass(classe1[,classe2,...classeN]) */ 3.2e
// acessa o elem definido em seletorjQuery e remove a classe ou classes definidas 
// no parâmetro classex, se este estiver presente, ou adiciona o valor, caso não
// esteja presente. Para mais de uma classe, a lista deve conter os nomes separados
// por vírgula
$('p').toggleClass('remove')

/* seletorjQuery.toggleClass(valor_classe, chave) */ 3.2f
// acessa o elem definido em seletorjQuery e remove ou adiciona a classe cujo
// nome foi definido no parâmetro valor_classe, dependendo do valor boleano
// chave. Se chave for true adiciona, caso seja false remove a classe
var qtd = $('li', this).length;
$('li', this).toggleClass("mudar", (qtd > 3))

/* seletorjQuery.toggleClass(função(indice, classe_atual), [chave]) */ 3.2g
// Este método usa uma função para retornar os novos valoresda classe ou classes
// a serem removidos [chave=false] ou adicionados [chave=true]

$('li', this).toggleClass(function(i,v) {
	return 'mudar';
}, (qtd > 3));



// MANIPULAÇÃO DE CONTEÚDOS HTML



/* seletorjQuery.html() */ 3.3a
// acessa o conteúdo hml (conteúdo e marcação) dentro do elem definido em
// seletorjQuery
var conteudoHtml = $('p').html();

/* seletorjQuery.html(valor) */ 3.3b
// acessa o elem e nele insere o html (conteudo marcação) do parâmetro valor
$('div').html('<p class="um">Conteudo inserido na div</p>');

/* seletorjQuery.html(função(indice, valor)) */ 3.3c
// acessa o elem e nele insere o html (conteudo marcação)
// reotrnado pela função
$('div').html(function(i,v) {
	return v + ' conteudo acrescentado';
});



// MANIPULAÇÃO DE TEXTOS



/* seletorjQuery.text() */ 3.4a
// acessa o conteudo textual do elem definido em seletorjQuery
$('p').text();

/* seletorjQuery.text(valor) */ 3.4b
// acessa o elem e nele insere o conteudo do parâmetro valor
// insere texto puro
$('p').text("<p class='um'>insere como texto puro este conteudo</p>")

/* seletorjQuery.text(função(indice, valor)) */ 3.4c
// acessa o elem e nele insere o conteudo retornado pela função
$('p').text(function(i,v) {
	return v + " (indice: " + i + ")";
});



// MANIPULAÇÃO DE VALORES



/* seletorjQuery.val() */ 3.5a
// acessa o valor do atributo 'value' do elem
var valor = $('input').val();

/* seletorjQuery.val(valor_value) */ 3.5b
// insere o valor_value no atributo 'value' do elem
var valor = $('input').val("nome aqui...");

/* seletorjQuery.val(função(indice, valor)) */ 3.5c
// insere o atributo value com o valor retornado pela função
// no elem
$('input').val(function(i,v) {
	return v + " - indice: " + i;
});



// MANUPULAÇÃO DE CONTEÚDOS



/* seletorjQuery.append(conteudo) */ 3.6a | 3.6b | 3.6c
// insere o conteúdo definido no parâmetro logo apos o conteudo
// do elemento definido em seletorjQuery. Pode inserir tanto marcação
// como texto puro
$('p').append('<strong>Texto inserido com jQuery</strong>')

// Duas situações são possiveis com este método
// 1 - retira o elem de sua posição atual se já, caso o elem seletorjQuery seja um só
$('p').append($('strong'))
<strong>elem movido</strong>
<p>Texto dentro do elemento parágrafo.</p>

// 2 - faz clones do elem e remove de sua posição
$('p').append($('strong'))
<strong>mantem a posi e faz copias</strong>
<p>Texto dentro do elemento parágrafo.</p>
<p>Texto dentro do elemento parágrafo.</p>

/* seletorjQuery.append(função(indice, valor)) */ 3.6d
// insere o conteudo retornado pela função logo apos o conteudo
// do elem defino em seletorjQuery, copia/move como o anterior
$('p').append(function(i,v) {
	return "<strong>COPIA/MOVE</strong>";
});

/* seletorjQuery.appendTo(alvo) */ 3.6e
// insere o conteudo definido no seletorjQuery logo apos o conteudo
// do elem definido no parâmetro alvo
$('<strong>Aqui texto inserido como jQuery</strong>').appendTo('p')

/* seletorjQuery.prepend(conteudo) & .prependTo(alvo)*/
// Estes 2 metodos são equivalentes aos metodos append() e appendTo()
// porem a inserção do conteudo se faz antes do conteudo que receberá
// a inserção

/* seletorjQuery.prepend(função(indice, valor)) */ 3.6f
// insere o conteudo retornado pela função imediatamente antes do conteudo
// definido em seletorjQuery
$('p').prepend(function(i,v) {
	return "<strong>texto inserido antes do conteudo</strong>";
});

/* seletorjQuery.after(conteudo) & .insertAfter(alvo) */ 3.6g
// Estes 2 metodos são equivalentes aos metodos append() e appendTo()
// com a diferença de que a inserção do conteudo se faz depois do elemento
// (e não no conteúdo do elem) que receberá a inserção
$('p').after('Apos o elem <p>');
$('Apos o elem <p>').insertAfter('p');

/* seletorjQuery.after(função(indice)) */ 3.6h
// insere o conteudo retornado pela função depois do elem

/* seletorjQuery.before(conteudo) & .insertBefore(alvo) */
// São equivalentes ao anterior a diferença é que inserem antes 
$('p').before('Antes do elem <p>');
$('Antes do elem <p>').insertAfter('p');

/* seletorjQuery.before(função(indice)) */ 3.6i
// insere o conteudo retornado pela função antes do elem

/* seletorjQuery.wrap(html) */ 3.6j
// Cria o conteiner definido no parametro para cada um dos elem
// definidos em seletorjQuery
$('p').wrap('<div class="container"></div>')

/* seletorjQuery.wrap(função()) */ 3.6k
// cria o container pelo retorno da função para cada um dos elem 
$('p').wrap(function() {
	return "<div class='container'></div>";
});

/* seletorjQuery.unwrap() */ 3.6l
// remove o container dos elem definidos em seletorjQuery

/* seletorjQuery.wrap(elemento) */ 3.6m
// o parametro elemento é um container para os elem definidos
// em seletorjQuery, é escrito como javaScript 
$('p').wrap(document.createElement('div'))

/* seletorjQuery.wrapAll(html) */ 3.6n
// cria o container definido no parametro, para todos os elems
// definidos em seletorjQuery
$('p').wrapAll('<div class="container"></div>')

/* seletorjQuery.wrapAll(elemento) */
// semelhante ao wrap(elemento)

/* seletorjQuery.wrapInner(html) */
// cria o container definido no parametro html para os conteudos
// (não para os elems) de cada um dos seletorjQuery

/* seletorjQuery.wrapInner(elemento) */
// apresenta o mesmo efeito do anterior, mas o container é criado 
// com JavaScript

/* seletorjQuery.wrapInner(função()) */ 3.6o
// cria o container retornado pela função para os conteudos de cada
// um elems definidos em seletorjQuery. Idem ao wrapInner(html)

/* seletorjQuery.remove([filtro]) */ 3.6p
// remove todas as ocorrencias do elem definido em seletorjQuery
// parametro filtro é opcional e pode ser usado para filtrar ocorrencias especificas
$('p').remove('.remove')
<p class="remove">removido</p>
<p>não removido</p>


/* seletorjQuery.empty() */
// remove todos os conteudos do elem definido em seletorjQuery
// como o anterior só que apenas o conteudo não o elem tags

/* seletorjQuery.replaceWith(conteudo) */ 3.6q
// substitui o elem definido no seletorJquery por aquele definido no parametro
// conteudo. pode ser marcação ou elem criado com JavaScript
$('p').replaceWith('<h1>Substituto</h1>')

/* seletorjQuery.replaceWith(função()) */ 3.6r
// substitui o elem definido no seletorJquery por aquele retornado pela função
$('p').replaceWith(function() { return "<h1>Substituto</h1>"; });

/* conteudo.replaceAll(seletorjQuery) */
// equivalente ao anterior com uma sitaxe reversa, ou seja, substitui o seletor
// definido em seletorJquery pelo conteudo
$('<h1>Substituto</h1>').replaceAll('p')

/* seletorjQuery.clone() */ 3.6s
// cria uma cópia do seletorjQuery
$('p').clone().appendTo('div')

/* seletorjQuery.clone(true) */
// Idem ao anterior, cria uma cópia do seletorjQuery e de todos os scripts 
// a ele anexados

/* seletorjQuery.detach() */ 3.6t
// equivalente ao remove(), diferindo dele pelo fato de ao fazer a remoção
// do conjunto de elem do DOM, não remove os dados jQuery (por exp.: os efeitos a ele
// associados)



// CRIANDO ELEMENTOS NO DOM



/* $(elemnto[,{atributos:'valor'}]) */ 3.7a
// cria o elemento HTML definido no parametro elemento para ser inserido no DOM
// o parametro {atributo: 'valor'} é opcional
$('<div></div>')		// sintaxe estendida
$('<div>')				// sintaxe abreviada versão 1
$('<div/>')				// sintaxe abreviada versão 2



	=/	4 -- CSS E INSPEÇÃO DO DOM



// ESTILIZAÇÃO GERAL



/* seletorjQuery.css(propriedade) */ 4.1a
// acessa o valor definido para a propriedade CSS do elem seletorjQuery
$('p').css('backgroundColor')	// background-color -> backgroundColor "camelCase" 

/* seletorjQuery.css('propriedade', 'valor') */ 4.1b
// estiliza o elem seletorjQuery com a declaração CSS definida
$('p').css('color','red')

/* seletorjQuery.css({propriedade1:'valor1', propriedade2:'valor2',...}) */ 4.1c
// estilza o elem seletorjQuery com as declarações CSS definidas
$('p').css({
	color: "red",
	border: "1px solid #333",
	lineHeight: "1.7",			// camelCase
	padding: "5px"
})


/* seletorjQuery.css('propriedade', função(indice, valor_atual)) */ 4.1d
// acessa o elem em seletorjQuery e estiliza a prop definida no parametro
// propriedade com o valor retornado pela função
$('div').css('width', function(i,v) {
	return parseInt(v, 10) * 1.5 + "px";	// aumenta o width em 50%
}



// POSICIONAMENTO



/* seletorjQuery.offset() */ 4.2a
// acessa o valor das coordenadas CSS top e left do elem seletorjQuery em relação a viewport
var coord = $('div').offset();
coord.left			// contém X abscissa
coord.top			// contém Y ordenada

/* seletorjQuery.offset({top:y, left:x}) */ 4.2b
// desloca o elem seletorjQuery para as coord CSS top e left em relação a viewport
$('div').offset({top: 100, left: 300});

/* seletorjQuery.offset(função(indice, coordenadas)) */ 4.2c
// usa uma função para retornar os novos valores das coordenadas CSS top e left
// para o elem no seletorjQuery
$('div').offset(function(i,v) {
	return {top: v.top+5, left: v.left+5};
});

/* seletorjQuery.position() */ 4.2d
// acessa o valor das coordenadas CSS top e left do elem seletorjQuery em
// relação ao offset do elemento-pai
var posi = $('p').position();

/* seletorjQuery.scrollTop() */ 4.2e
// acessa o valor da coordenada top que
// mede a distancia em pixel de uma rolagem
// vertical
$('#rolagem').scrollTop();

/* seletorjQuery.scrollTop(valor) */
// permite movimentar a barra de rolagem vertical para a posi indicada

/* seletorjQuery.scrollLeft() */
// Idem aos anterios, só que com a barra horizontal

/* seletorjQuery.scrollLeft(valor) */
// Idem aos anterios, só que com a barra horizontal



// LARGURA E ALTURA



/* seletorjQuery.width() */ 4.3a
// acessa o valor da largura do elem seletorjQuery e retorna o valor em px
// independete como foi definido

/* seletorjQuery.width(valor) */ 4.3b
// define o valor em px, da propridade CSS para o elem seletorjQuery
$('div').width(350)

/* seletorjQuery.width(função(indice, largura)) */ 4.3c
// usa uma função para retornar um valor para a largura do elem seletorjQuery
$('p').width(function(indice, largura_atual) {
	return largura_atual - 10;
});

/* seletorjQuery.height() */ 4.3d
/* seletorjQuery.height(valor) */ 4.3e
/* seletorjQuery.height(função(indice, altura)) */ 4.3f
// Este métodos são equivalentes aos exibidos logo acima

/* seletorjQuery.outerWidth([booleano]) */ 4.3g
// acessa o valor da largura do elem seletorjQuery computando os valores dos
// paddings e das bordas horizontais e retorna o resultado em px
// (booleano opcional, se declarado como true inclui margin tbm) 
var largura = $('div').outerWidth();

/* seletorjQuery.outerHeight([booleano]) */ 4.3g
// equivalente ao acima

/* seletorjQuery.innerWidth() */
// acessa o valor da largura incluindo o padding

/* seletorjQuery.innerHeight() */
// equivalente ao acima



// INSPEÇÃO DO DOM



/* seletorjQuery.filter(filtro) */ 4.4a
// acessa todos os elem seletorjQuery e seleciona somente aqueles definidos em filtro
$('p').filter('.alvo').css('color', 'red')

/* seletorjQuery.filter(função()) */
// Idem ao anterior, admitindo para filtro uma função

/* seletorjQuery.is(seletor) */ 4.4b
// acessa todos os elem seletorjQuery e verifica se pelo menos 1 deles satisfaz as
// condições estabelecidas no parametro. retorna true/false
var result = $('div').is('.cor')

/* seletorjQuery.is(função(indice)) */
// acessa todos os elem seletorjQuery e verifica se pelo menos um deles satisfaz a
// condição retornada pela função

/* seletorjQuery.is(seletor1_jQuery) */
// verifica se pelo menos um deles é do tipo seletor1_jQuery

/* seletorjQuery.is(el) */
// verifica se pelo menos um deles é do tipo el

/* seletorjQuery.not(expressão) */ 4.4c
// acessa todos os elem seletorjQuery e exclui aquele que satisfaz a condição
$('div').not('.cor')

/* seletorjQuery.slice(inicio[,fim]) */ 4.4d
// acessa todos os elem seletorjQuery e seleciona desde o elem na posi inicio até o 
// elem na posi fim. Não inclui o elem da posi fim. contagem inicia em 0
$('div').slice(1, 3)
<div></div>		// 0
<div></div>		// 1 selected
<div></div>		// 2 selected
<div></div>		// 3
<div></div>		// 4

/* seletorjQuery.add(expressão) */ 4.4e
// seleciona todos os elem seletorjQuery e a estes adiciona os elem definidos
// no parametro expressão
$('div').add('.clear')		// add os elemtos com class='clear'

/* seletorjQuery.add(expressão, contexto) */ 4.4f
// seleciona todos os elem seletorjQuery e a estes adiciona os elem definidos
// no parametro expressão que pertencem ao contexto definido no parametro contexto

/* seletorjQuery.metodo().addBack([seletor]) */ 4.4fa
// aos elem selecionados pela aplicação do metodo() no seletorjQuery adiciona
// os elemetos de seletorjQuery opcionalmente filtrados por seletor 
$('div').next().css('color','red')
$('div').next().addBack().css('color','red')

/* seletorjQuery.children([expressão]) */ 4.4g
// seleciona todos os elem-filhos de seletorjQuery, o parametro expressão
// é opcional e serve como filtro para os filhos selecionados
$('p').children('span')

/* seletorjQuery.find([seletor]) */ 4.4h
// seleciona todos os elem descendentes de seletorjQuery que satisfazem seletor
$('p').find('*') // all
$('p').find('i')

/* seletorjQuery.find([seletor1_jQuery]) */
// seleciona todos os elem descendentes de seletorjQuery que pertençam a seletor1_jQuery

/* seletorjQuery.find([el]) */
// seleciona todos os elem el descendentes de seletorjQuery
var paragrafos = $('p')
$('div').find(paragrafos)

/* seletorjQuery.parent([expressão]) */ 4.4i
// seleciona todos os elem que sejam pai do seletorjQuery, adimte a expressão como filtro
$('p').parent()

/* seletorjQuery.parents([expressão]) */ 4.4j
// seleciona todos os ancestrais do seletorjQuery, adimte a expressão como filtro
$('span').parents()

/* seletorjQuery.parentsUntil([seletor][,filtro]) */ 4.4k
// seleciona todos os ancestrais do seletorjQuery até o ancestral definido no parametro
// seletor exclusivo, adimte a expressão como filtro. Se não for definido um valor a seleção
// será para todos os ancestrais
$('ol ul ul li:first-child').parentsUntil('ol').css('color','red')

/* seletorjQuery.parentsUntil([el][,filtro]) */
// seleciona todos os ancestrais do seletorjQuery até o ancestral definido no parametro
// el exclusivo, adimte a expressão como filtro.

/* seletorjQuery.offsetParent() */ 4.4l
// seleciona o primeiro ancestral posicionado do seletorjQuery. para efeitos deste metodo
// considere position= relative/absolute/fixed
$('span').offsetParent()

/* seletorjQuery.prev([expressão]) */ 4.4m
// seleciona o elem adjacente imediatamente anterior ao seletorjQuery. 
// admite a expressão como filtro
$('p').prev()

/* seletorjQuery.next([expressão]) */ 4.4n
// semelhante ao acima, porem ao irmão próximo

/* seletorjQuery.prevAll([expressão]) */ 4.4o
// seleciona todos elem irmãos adjacente anterior ao seletorjQuery. 
// admite a expressão como filtro

/* seletorjQuery.prevUntil([seletor][,filtro]) */ 4.4p
// seleciona o elem adjacente imediatamente anterior ao seletorjQuery e todos os seus
// elem-irmãos até o elem definido no parametro seletor exclusivo. O parametro filtro
// pode ser usado para filtrar os elem selecionados
$('li:last-child').prevUntil('li:nth-child(2)');

/* seletorjQuery.prevUntil([el][,filtro]) */
// seleciona o elem adjacente imediatamente anterior ao seletorjQuery e todos os seus
// elem-irmãos até o elem definido no parametro el exclusivo.

/* seletorjQuery.nextAll([expressão]) */ 4.4q
// semelhante ao prevAll

/* seletorjQuery.nextUntil([seletor][,filtro]) */ 4.4r
// semelhante ao prevUntil

/* seletorjQuery.nextUntil([el][,filtro]) */ 4.4r
// semelhante ao prevUntil

/* seletorjQuery1...seletorjQueryN.end().metodo_continua() */ 4.4s
// este método permite inteferir em um encadeamento de métodos jQuery, revertendo
// a seleção ao obj anterior ao ultimo objeto adjacente ao metodo end() na cadeia
// Na sitaxe o metodo_continua() sera aplicado ao seletorjQuery(N-1)
$('div').find('p').end().css('background', '#f00')

/* seletorjQuery.siblings([expressão]) */
// seleciona todos os irmãos de seletorjQuery. admite expressão como filtro
$('li.diferente').siblings()
<li>item 1</li>
<li class="diferente">item 1</li>	// o próprio não é selecionado só seus irmãos
<li>item 1</li>
<li>item 1</li>

/* seletorjQuery.map(função()) */ 4.4v
// transforma o conjunto de obj retornado pelo seletorjQuery em um array cujos
// valores podem ser elem ou refencias. O parametro função define como sera feita
// a seleção dos valores do array e qual a sua natureza
$('div').append($('input').map(function() {
	return $(this).val();
}).get().join(", "));

/* seletorjQuery.closest(seletor[, contexto]) */ 4.4x
// seleciona o elem ancestral de seletorJquery definido em seletor
// se não existir o ancestral ou o parametro não for definido, não havera seleção
// contexto é opcional e restringe a busca ao contexto por ele definido
$('span').closest('p')

/* seletorjQuery.first() */ 4.4y
// seleciona a 1ª acorrencia do conjunto de elem contidos em seletorjQuery
// Idem aos metodos :first-child e eq(0)
$('li').first()
<li>item 1</li> // selected
<li>item 2</li>
<li>item 3</li>

/* seletorjQuery.last() */ 4.4z
// seleciona a ultima acorrencia do conjunto de elem contidos em seletorjQuery
// Idem aos metodos :last-child e eq(n) (n é o indice da ultima ocorrencia)
$('li').last()
<li>item 1</li>
<li>item 2</li>
<li>item 3</li> // selected


/* seletorjQuery.contents() */ 4.4za | 4.4zb
// seleciona todos os elem-filho de seletorjQuery, inclusive os nós de texto
// de elementos e comentários. Difere do metodo children() pois este só seleciona
// os nós element
$('p:eq(0)').contents()

/* seletorjQuery.has(expressão) */
// seleciona todos os elem de seletorjQuery que contenham expressão
$('div').has('b')



	=/	5 -- EVENTOS


	
// EVENTOS AUXILIARES



/* seletorjQuery.blur(função) */ 5.1a
// quando o seletorjQuery perde o foco
$('input').blur(function(){
	...
});

/* seletorjQuery.change(função) */ 5.1b
// quando o valor em um campo de formulario perde o foco em favor de outro valor.
$('select').change(function(){
	var selecionado = $('option:selected').text();
});

/* seletorjQuery.click(função) */
// quando o usuario click o ponteiro de algum dispositivo apontador. sobre o seletorjQuery
$('img').click(function(){
	...
});

/* seletorjQuery.dblclick(função) */ 5.1c
// ocorre quando há um duplo clique com um dispositivo apontador
$('div').dblclick(function(){
	...
});

/* seletorjQuery.focus(função) */ 5.1d
// quando o seletorjQuery recebe o foco
$('input').focus(function(){
	...
});

/* seletorjQuery.keydown(função) */ 5.1e
// quando o usuario pressiona uma tecla qualquer de seu teclado
$('div').keydown(function(){
	...
});

/* seletorjQuery.keyup(função) */
// quando o usuario solta uma tecla já pressionada

/* seletorjQuery.keypress(função) */
// quando o usuario realiza uma sequencia apertar e soltar uma tecla do teclado

/* seletorjQuery.mousedown(função) */ 5.1f
// quando o usuario pressiona o botão de algum dispositivo apontador
$('div').mousedown(function(){
	...
});

/* seletorjQuery.mouseup(função) */ 5.1g | 5.1h
// quando o usuario solta o botão de algum dispositivo apontador já pressionado
$('div').mouseup(function(){
	...
});

/* seletorjQuery.mouseover(função) */ 5.1i
// quando o usuario passa o um dispositivo apontador sobre o seletorjQuery
$('div').mouseover(function(){
	...
});

/* seletorjQuery.mouseout(função) */ 5.1j | 5.1k
// quando o usuario retira o um dispositivo apontador sobre o seletorjQuery
$('div').mouseout(function(){
	...
});

/* seletorjQuery.mousemove(função) */ 5.1l
// quando o usuario movimenta o um dispositivo apontador sobre o seletorjQuery
$('div').mousemove(function(){
	...
});

/* seletorjQuery.resize(função) */ 5.1m
// quando ha o redimensionamento do seletorjQury
$(window).resize(function(){
	...
});

/* seletorjQuery.scroll(função) */ 5.1n
// quando o usuario aciona uma das barras de rolagem do seletorjQuery
$(window).scroll(function(){
	...
});

/* seletorjQuery.select(função) */ 5.1o
// quando o usuario seleciona um texto em obj input/textarea
$(window).select(function(){
	...
});

/* seletorjQuery.submit(função) */ 5.1p
// quando o usuario submete ou envia os dados de um formulario
// amplamente empregado para validar antes de enviar
$('form').submit(function(){
	if ($('input:first').val() == "") {
		$('div').text('Por favor! preencha o campo');
		return false;
	} else {
		...
	}
});



// EVENTOS DE INTERAÇÃO



/* seletorjQuery.hover(sobre fora) */ 5.2b
// permiti executar 2 funções para dispositvo apontador quando coloca e retira
$(window).hover(
	function() {
		// função sobre
	},
	function() {
		// função fora
	}
);

/* seletorjQuery.focusin(função) */ 5.2c
// semelhante a focus(), difere pois focus() é só para aquele elemento especifico
// para este o focu é valido para qualquer elem descendente
$('div').focusin(function() {
	...
});

/* seletorjQuery.focusout(função) */ 5.2d
// semelhante a blur(), difere pois blur() é só para aquele elemento especifico
// para este o perda do foco é valido para qualquer elem descendente
$('div').focusout(function() {
	...
});



// MANIPULADOR DE EVENTOS



/* seletorjQuery.on(tipo [dados] função) */ 5.3a
// permite vincular um evento ao seletorjQuery. parametro dados é facultativo
$('div').on('click', function(){
	...
});
$('div').on('mouseover', function(){
	...
});

/* seletorjQuery.on(evento) */ 5.3b
// permite vincular vários eventos ao seletorjQuery
$('div').on({
	click: function() {
		...
	},
	mouseover: function() {
		...
	}
});

/* seletorjQuery.off() */
// funciona de forma inversa ao on(), permitindo assim desvincular um ou mais eventos
// sintaxe geral seletorjQuery.off(opção):
// off()								--> desvincula todos os eventos do elem
// off('click', 'mouseup',..)			--> desvincula os eventos especificos do elem
// off('click', nome_função)			--> desvincula a função especifica do evento 'click' 
// off(click.namespaceEventos)		--> desvincula o evento click para a função definida 
//											no namespace namespaceEventos

/* seletorjQuery.delegate(seletor, evento, função) */ 5.3c
// entrela o evento definido no parametro evento ao seletor definido no parametro seletor
// não somente para os seletores existentes no DOM, mas tbm para os elem inseridos posteriormente
// no DOM, quer via metodos jQuery ou AJAX
$('.dois').delegate('p', 'click', function() {
	..
});

/* seletorjQuery.undelegate() */ 5.3d
// funciona de forma inversa ao delegate(), permitindo assim desvincular um ou mais eventos
// sintaxe geral seletorjQuery.undelegate(opção):
// undelegate()								--> desvincula todos os eventos do elem
// undelegate('click', 'mouseup',..)			--> desvincula os eventos especificos do elem
// undelegate('click', nome_função)			--> desvincula a função especifica do evento 'click' 
// undelegate(click.namespaceEventos)		--> desvincula o evento click para a função definida 
//											no namespace namespaceEventos
var handler = function(){};
$('.um').undelegate('p', 'click', handler)

/* seletorjQuery.one(tipo [dados] função) */ 5.3g
// permite vincular um ou mais eventos ao seletorjQuery, semelhante ao bind()
// difere pois realiza apenas uma única vez o script
$('p').one("click", function() {
	...
});

/* seletorjQuery.trigger(evento [dados]) */ 5.3h
// permite que um evento vinculado a um seletor seletorjQuery seja vinculado
// simultaneamente a um segundo seletorjQuery, sendo possivel fazer entrar em
// ação ambos os scripts com o evento ocorrendo somente no seletor seletorjQuery vinculado.
$('button:last').click(function() {
	$('button:first').trigger('click');
	...
})

/* seletorjQuery.triggerHandler(evento) */ 5.3i
// equivalenteao trigger(), difereças:
// - não executa o comportamento padrão do evento. Exp.: click em um link não segue o link
// - atrela o evento somente no 1º elem do seletorjQuery
$('#tres li').triggerHandler('click')



// NOTAS SOBRE EVENTOS



/* event.type */ 5.4a
// retorna uma string que descreve a natureza do evento
$('a').click(function(event) {
	console.log(event.type)		//=> "click"
})

/* event.target */ 5.4a
// retorna uma string ref o alvo do evento
$('a[http://www.maujor.com.br]').click(function(event) {
	console.log(event.target)		//=> "http://www.maujor.com.br"
})

/* event.currentTarget */ 5.4a
// está prop é sempre a palavra-chave this
$('a').click(function(event) {
	event.currentTarget === this;
})

/* event.relatedTarget */ 5.4a
// está prop retorna os elementos adjacentes envolvidos no evento
$('a').click(function(event) {
	console.log(event.relatedTarget)
})

/* event.pageX/Y */ 5.4a
// retorna as coordenadas do ponteiro do dispositivo apontador em relação ao doc
$('div').click(function(event) {
	var x = event.pageX,
		y = event.pageY;
	return {x:x, y:y};
})

/* event.preventDefault() */ 5.4b
// impede o navegador de seguir o comportamento-padrão para a ação. 
// Exp.: click em um link não segue o link
$('a').click(function(event) {
	event.preventDefault();
})

/* event.isDefalutPrevented() */ 5.4b
// verifica se o comportamento-padrão para o evento foi anulado
$('a').click(function(event) {
	event.preventDefault();
	event.isDefalutPrevented();	// true
})

/* event.stopPropagation() */ 5.4c
// impede que o evento anexado a um elem borbulhe
$('a').click(function(event) {
	event.stopPropagation();
	// script vai aqui...
})

/* event.isPropagationStopped() */ 5.4c
// verifica se a propagação de eventos foi anualada
$('a').click(function(event) {
	event.stopPropagation();
	event.isPropagationStopped();	// true
})

/* event.stopImmediatePropagation() */ 5.4c
// impede que o evento anexado a um elem seja executado
$('a').click(function(event) {
	event.stopImmediatePropagation();
})

/* event.isImmediatePropagationStopped() */
// verifica se um evento anexado foi impedido de ser executado
$('a').click(function(event) {
	event.stopImmediatePropagation();
	event.isImmediatePropagationStopped();	// true
})


/* event.data */ 5.4d
// esta prop contem dados passados, opcionalmente, pelo método bind()
$('p').each(function(i) {
	var texto = $(this).text();
	$('a').on('click', {indice: i, valor: texto}, function(event) {
		var indice = event.data.indice;
		var valor  = event.data.valor;
	});
});

/* event.result */ 5.4e
// esta prop contem o ultimo valor retornado por uma função que tenha sido
// executada por um evento. Se a função não retorna, a prop contem undefined
$('p').click(function(event) {
	if (event.result === undefined)
		$('.msg').css('display','block').text("Retorna: undefined");
    else 
		$('.msg').css('display','block').text(event.result);
})

/* event.timeStamp */ 5.4f
// contem o numero de milissegundos decorridos desde 1º de jan 1970 até o momento
// em que ocorre o evento

/* event.which */ 5.4g
// contem o numero do código das teclas do teclado
$('input').keypress(function(event){
	var keyCod = event.which;
}



	= / 6 -- EFEITOS

	

// EFEITOS BÁSICOS



/* seletorjQuery.show() */ 6.1a
// revela abruptamente o elem seletorjQuery que tenha sido escondido
// anteriormente
$('div').show()

/* seletorjQuery.show(duração[, função]) */ 6.1a
// Idem ao anterior, difere pelos parametros duração que permite revelar suavemente
// durção admite trés valores: fast/normal/slow equivalem 200/400/600ms
// função é opcional e permite executar tão logo o termino do efeito
$('div').show('fast')
$('div').show(1000)		// 1s
$('div').show('slow', function() {
	// script após o efeito...
});	

/* seletorjQuery.hide() */ 6.1a | 6.1d
// efeito contrario de show()

/* seletorjQuery.hide(duração[, função]) */ 6.1a | 6.1d
// efeito contrario show(duração[, função])

/* seletorjQuery.toggle() */ 6.1a | 6.1d
// dispara mediante a cliques sucessivos do botão de um dispositivo apontador
// a cada clique a alternância da visibilidade, ou seja, se visivel fica invisivel
// e vice-versa
$('p').toggle()

/* seletorjQuery.toggle(duração) */ 6.1b | 6.1d
// Idem ao anterior, difere pelos parametros duração 
// que permite revelar/desaparecer suavemente
$('p').toggle('fast')

/* seletorjQuery.toggle(chave) */ 6.1c | 6.1d
// chave= true/false define a visibilidade do elem quando o metodo é aplicado
var qtd = 3;
$('p').click(function() {
	$(this).toggle(qtd == 3);
});



// EFEITOS CORREDIÇOS



/* seletorjQuery.slideDown(duração[, função]) */ 6.2a
// destina-se a revelar suavemente o elem seletorjQuery que tenha se escondido
// anteriormente, fazendo a transição de invisivel para visivel por meio do
// aumento gradativo da altura do seletorjQuery escondido. A altura vai sendo
// revelada de cima para baixo.
$('div').slideDown('fast')

/* seletorjQuery.slideUp(duração[, função]) */ 6.2a
// destina-se a criar o efeito de esconder o elem seletorjQuery que tenha se revelado
// anteriormente. A altura do elem é escondida no sentido de baixo para cima
// *bug
$('div').slideUp('normal')

/* seletorjQuery.slideToggle(duração[, função]) */ 6.2a
// destina-se a causar um efeito de alternancia de visibilidade do conjunto de elem
// definidos por seletorjQuery como o uso de efeitos slideDown() e slideUp()
$('div').slideToggle(1500)



// EFEITOS DE OPACIDADE



/* seletorjQuery.fadeIn(duração [, função]) */ 6.3a
// destina-se a revelar o elemento seletorjQuery que se tenha escondido anteriormente.
// fazendo a transição de invisivel para visivel, por meio do aumento gradativo da
// opacidade.
$('div').fadeIn('slow')

/* seletorjQuery.fadeOut(duração [, função]) */ 6.3a
// destina-se a criar o feito de esconder o seletorjQuery que está visivel.
// O contrario do fadeIn
$('div').fadeOut('fast')

/* seletorjQuery.fadeTo(duração, opacidade [, função]) */ 6.3a
// destina-se a alterar as condições de visibilidade do elem seletorjQuery. fazendo
// uma mudança gradativa da opacidade atual para a opacidade definida no parametro opacidade.
// este parametro deve ser um numero entre 0 e 1, sendo 0 invisivel e 1 opaco.
$('div').fadeTo(1500, .5);



	=/ 7 -- EFEITOS PERSONALIZADOS
	
	
	
/* seletorjQuery.animate(definição [duração] [aceleração] [função]) */ 6.4a

/* seletorjQuery.animate(definição [opção]) */
// o metodo animate() permite-lhe criar animações personalizadas para seletorjQuery.
// conforme mostrado, existe 2 sintaxes para esse método.
// somente propriedades CSS de valor numerico são possiveis de serem animadas
// apartir da jQuery versão 1.2, permite-se usar unidades CSS em e % (onde aplicavel)
// - parametro duração: é opcional e adimete tres valores definidos por padrao
// slow,fast,normal e valor.
// - acelereação: é opcional e requer uso de plug-in para funcionar. defini como será a
// aceleração da animação.
$('div').click(function() {
	$(this).animate({
		width: '300px',
		height: '600px',
		opacity: 0.33,
		border: '10px dashed #f00'},
		1500);
	});
});
$('div').animate(
	{opacity: 'toggle', width: 'hide', height: 'show'},
	{duration: 2000}
);

/* seletorjQuery.stop() */ 6.ab
// permite que você interrompa uma animação em andamento
$('button:eq(0)').click(function() {
	$('div').animate(
		{left: '+=10px'},	// definição
		6000				// duração
	);
});
$('button:eq(1)').click(function() {
	$('div').stop();		// interrompe a animação
});



// ENCADEAMENTO DE EFEITOS



// os metodos para obtenção dos efeitos, podem ser aplicados de forma encadeada
// em um elemento a animar. vamos ver como realizar isso e como interferir

$(document).ready(function(){			// ver exemplo no livro
	$('button').click(function() {
		$('div').animate({
		width: '80px',
		height: '100px',
		left: '+=500px'
		}, 1000)
		.fadeTo(500, 0.3)
		.animate({top: '150px'}, 1000)
		.fadeTo(500, 1)
		.animate({
		left: '-=500px',
		top: '80px'
		}, 'fast')
		.animate({
		width: '40px',
		height: '40px'
		}, 'slow')
	});
});

// o script sera executado somente se o seletor não estiver animando.
if (!$('seletor:animated')) {
	// script de execução da animação
}

// Idem (e preferiver, pois não itera o DOM para ver quem está em animação)


$(document).ready(function(){	6.5b		// ** ver exemplo no livro 
	
	var animacaoEmAndamento = false;
	
	$('button').click(function() {
		if (!animacaoEmAndamento) {
			
			animacaoEmAndamento = true;
			
			$('div').animate({
			width: '80px',
			height: '100px',
			left: '+=500px'
			}, 1000)
			.fadeTo(500, 0.3)
			.animate({top: '150px'}, 1000)
			.fadeTo(500, 1)
			.animate({
			left: '-=500px',
			top: '80px'
			}, 'fast')
			.animate({
			width: '40px',
			height: '40px'
			}, 'slow', function() {
				animacaoEmAndamento = false;
			});
		}
	});
});

/* seletorjQuery.delay(duração [,nome_função]) */	6.5c // ** ver exemplo no livro 
// permite que você pause uma animação
// parametro.:
// - duration: "fast","slow","normal", e valor em missegundos
// - nome_função: é uma string a ser usada para fazer referencia s uma 
// função de animação personalizada
$(document).ready(function(){
	var animacaoEmAndamento = false;
	$('button').click(function() {
		if(!animacaoEmAndamento) {
			animacaoEmAndamento = true;
			$('div').animate({
			width: '80px',
			height: '100px',
			left: '+=500px'
			}, 1000)
			.fadeTo(500, 0.3)
			.animate({top: '150px'}, 1000)
			.fadeTo(500, 1, function() {$(this).text('Aqui delay(2000)')})
			.delay(2000)
			.animate({
			left: '-=500px',
			top: '80px'
			}, 'fast', function() {$(this).empty()})
			.animate({
			width: '40px',
			height: '40px'
			}, 'slow', function() {
			animacaoEmAndamento = false;
			});
		};
	});
});


/* $.queue(seletor [,nome_queue]) */ 6.5d  // ** ver exemplo no livro 
// No contexto das animações é usado para fazer referencia à fila dos efeitos 
// de animação.
// paramentros.:
// - seletor: é o elem animado
// - nome_queue: é uma string a ser usada para fazer ref a uma função de animação
// a finalidade dessa sintaxe é inspecionar a fila de animações.

// no exemplo inspecionamos a quantidade total de animações na fila de nossa animação
// básica e, por meio de um clique, no decorrer da animação inpecionamos quantas animações
// faltam
$(document).ready(function(){
function animar() {		
	$('div').animate({
	width: '80px',
	height: '100px',
	left: '+=500px'
	}, 4000)
	.fadeTo(1500, 0.3)
	.animate({top: '200px'}, 3000)
	.fadeTo(2500, 1)
	.animate({
	left: '-=500px',
	top: '80px'
	}, 2000)
	.animate({
	width: '40px',
	height: '40px'
	}, 2000, animar);
};
animar();

	var n = $.queue($('div')[0]);
	$('.msg1').html('Número total de animações na fila: <b style="color:red">' + 
	n.length + '</b>');

	$('button').click(function () {
		$('.msg2').html('Faltam: <b style="color:red">' + n.length + '</b> animações');
	});
});
/* $.queue(seletor, nome_queue, função) */ 6.5f	// ** ver exemplo no livro
// parametros obrigatorios
// - seletor: elem animado
// - nome_queue: string que ref uma função de animação
// - função: callback a ser executado quando o metodo é chamado

// Por ser obrigatorio o parametro nome_queue, quando não houver funçao especifica
// deve-se usar "fx" que é o termo default para a função-padrão

// a finalidade desse metodo é inserir metodos que não sejam de animação, como o metodo
// css(), na fila de uma cadeia de animação
// metodos que não são de animação não entram no encadeamento e são executados
// antes da animação

$(document).ready(function() {
	$('button').click(function() {		
		$('div').animate({
		width: '80px',
		height: '100px',
		left: '+=500px'
		}, 1000)
		.fadeTo(500, 0.3)
		.animate({top: '150px'}, 1000)
		.fadeTo(500, 1)
		.animate({
		left: '-=500px',
		top: '80px'
		}, 'fast')
		.animate({
		width: '40px',
		height: '40px'
		}, 'slow')
		$.queue( $('div')[0], 'fx', function() {
			$(this).css('background', '#ff0');
		});
	});
});

/* .queue(função) */ 6.5g	// ** ver exemplo no livro
// no exemplo anterior inserimos um metodo não de animação no final da fila.
// Se quisermos inserir o metodo em um ponto qualquer da fila, usaremos a sintaxe
// .queue(função)
$(document).ready(function(){
	$('button').click(function() {
		$('div').animate({
		width: '80px',
		height: '100px',
		left: '+=500px'
		}, 1000)
		.fadeTo(500, 0.3)
		.animate({top: '150px'}, 1000)
		.fadeTo(500, 1)
			.queue(function() {						// insere metodos na fila 
				$(this).css('background', '#ff0');	// mais interrompe à animação
			})
		.animate({
		left: '-=500px',
		top: '80px'
		}, 'fast')
		.animate({
		width: '40px',
		height: '40px'
		}, 'slow');
	});
});

/* .dequeue() */ 6.5h	// ** ver exemplo no livro
// Este deve ser usado em conjunto com o metodo .queue() e tem por finalidade
// dar continuidade à fila de animações que, por padrão, é interrompida quando
// se aplica o método queue()
$('div').animate({
	width: '80px',
	height: '100px',
	left: '+=500px'
	}, 1000)
	.fadeTo(500, 0.3)
	.animate({top: '150px'}, 1000)
	.fadeTo(500, 1)
		.queue(function() {
			$(this).css('background', '#f00').dequeue()
		})			
	.animate({
	left: '-=500px',
	top: '80px'
	}, 'fast')
	.animate({
	width: '40px',
	height: '40px'
	}, 'slow', function() {
	animacaoEmAndamento = false;
});

/* .clearQueue([função]) */ 6.5i	// ** ver exemplo no livro
// destina-se a limpar a fila. quando aplicado em uma etapa qualquer da animação
// cancela todas as animações subsequentes
$(document).ready(function() {
	$('button:eq(0)').click(function() {
		$('div').animate({
		width: '80px',
		height: '100px',
		left: '+=500px'
		}, 1000)
		.fadeTo(500, 0.3)
		.animate({top: '150px'}, 1000)
		.fadeTo(500, 1)
		.animate({
		left: '-=500px',
		top: '80px'
		}, 1000)
		.animate({
		width: '40px',
		height: '40px'
		}, 'slow')
	});
	
	$('button:eq(1)').click(function() {
		$('div').clearQueue();
	});
});

/* $.fx.off */	6.5j	// ** ver exemplo no livro
// Esta propriedade admite dois valores true e false. O valor-padrão é false, quando
// definido como true, desabilita todas as animações na página. Visa a fornecer ao
// usuario a opção de desabilitar as animações



	=/ 7 -- FUNÇÕES UTILITÁRIAS

	
	
// OPERAÇÕES COM ARRAYS E OBJETOS



/* jQuery.each(objeto, função(chave ou indice valor)) */ 7.3a
// Permite fazer iterações tanto por conjunto de elem da arvore do DOM como pelos
// elem de um array.
// parametros
// - objeto: define uma coleção de obj ou um array
// - função: define a ação sobre cada um dos itens da iteração
// admite dois parametros indice ou chave para array e o valor do elem

// difere do .each(), pois este itera somente por objetos jQuery,
// enquanto está tem uma abrangencia muito maior
var a = [1,2,3,4,5];
jQuery.each(a, function(i,v) {
	// i = indice
	// v = valor da posi i
});

/*jQuery.grep(array função(valor indice)[inverter]) */ 7.3b
// Esta função permite iterar pelos elem de um array e filtra-los.
// parametros
// - array: objeto a ser iterado
// - função: define uma ação de filtragem, admite 2 parametros
// valor e o indice
// - inverter: é facultativo e boleano, sendo o valor-padrão false, 
// quando definido true, a função retorna os valores falsos do filtro
$(document).ready(function() {
	$('.versao').click(function() {		
	
	var arr = [ 4, 3, 1, 9, 6, 8, 0, 2, 7, 3, 4, 8, 7, 1, 9 ];
	$('#um').append('<p>' + arr.join('- ') + '</p>');

	arr = jQuery.grep(arr, function(val, i) {			// exclui as ocorrencias de valor 3
		return (val != 3);
	});
	$('#um').append('<p>' + arr.join('- ') + '</p>');

	arr = jQuery.grep(arr, function (val, i ) { 		// exclui os indice 2 à 4
		return (i < 2 || i > 4 ) 
	});
	$('#um').append('<p>' + arr.join('- ') + '</p>');
	
	arr = jQuery.grep(arr, function (val, i) { 			// exclui elem < 7 e o indice 2
		return ( val <=  7 && i != 2 ) 
	});
		$('#um').append('<p>' + arr.join('- ') + '</p>');
	});
	
	$('.reset').click(function () {		
		$('#um').empty();
	});
});
	
/* jQuery.makeArray(objeto) */
// transforma qualquer conjunto de objetos em um array. O metodo mostrado
// a seguir coleta o conteudo de todos os divs do elemento e cria um array
// cujos elem são esses conteudos.
var arr = jQuery.makeArray('div');

/* jQuery.map(array função(valor indice)) */
// permite mapear os elem de um array e contruir, com base neles um novo array.
$(document).ready(function() {
	$('.versao').click(function() {		
	
	var arr = [ 'e', 'g', 'h', 'j', 'v', 'a', 'j', 'm', 'c' ];
	$('div').append('<p>' + arr.join(' - ') + '</p>');

	arr = jQuery.map(arr, function(val, i) {
	return (val.toUpperCase() + i*3);
	});
	$('div').append('<p>' + arr.join(' - ') + '</p>');

	arr = jQuery.map(arr, function (val, i ) { 
	return (val + '*' + (i/5)) 
	});
	$('div').append('<p>' + arr.join(' - ') + '</p>');
	});
	
	$('.reset').click(function () {		
	$('div').empty();
	});
});

/* jQuery.inArray(valor array) */ 7.3d
// inspeciona um array e verifica se um determinado elem a ele pertence
// parametros
// - valor: elem que se procurar
// - array: obj array
// o retorno é o indice da primeira ocorrencia encontrada, caso contrario -1
var arr = ['maujor', 'jquery', 'lightbox'];
var busca = jQuery.inArray('maujor', arr);		// => 0

/* jQuery.isArray(objeto) */ 
// verifica se um objeto é um array, apenas inspeciona objetos de JavaScript não objetos de jQuery
// retorno é um valor boleano
jQuery.isArray(arr);		//=> true

/* jQuery.param(objeto) */	7.3e
// destina-se a criar uma string de serialização de um array ou objeto.
// A string obtida é formatada de maneira apropriada (par nome/valor) para
// ser enviada em um URL (query string) ou uma requisição AJAX
$(document).ready(function() {
var obj = [
{name:"nome", value:"José Silva"},
{name:"email",value:"jose@jose.com"},
{name:"cpf",value:"012.345.678-00"}
];
// Idem
var obj = {
	nome:	'José Silva',
	email:	'jose@jose.com',
	cpf:	'012.345.678-00'
};

	$('button:eq(0)').click(function() {
		$('.msg1').text($.param(obj));
	});

	$('button:eq(1)').click(function() {
		$('.msg2').text(decodeURIComponent($.param(obj)))
	});

	$('button:eq(2)').click(function() {
		$('.msg1, .msg2').empty()
	});
});

/* jQuery.unique(array) */
// esta função remove os elem que tenham sido anteriormente duplicados
// (ou clonados) em um array constituido de elem da arvore

/* jQuery.merge(array1, array2) */	7.3f
// esta função cria um array combinando array1 e array2. resultando em um
// novo array. A ordem dos itens é preservada, e os array2 são adicionados
// aos do array1.
// essa função é destrutiva, ou seja, o array1 original recebe os itens do array2
// e passa a conter o resultado final da aplicação, para se evitar isso use:
jQuery.merge($.merge([], array1), array2);

/*jQuery.extend([bool], [alvo], objeto1, objeto2) */
// combina objeto1 e objeto2. resulta em um novo objeto contendo as prop dos 2
// se objeto2 contiver prop de mesmo nome em objeto1 essas seram sobrescritas
// está função é destrutiva, alterando o objeto1 um para o resultado final
var 
objeto1 = {
	abacaxi: {quantidade: 36},
	banana: {quantidade: 252, preco: 20}
},
objeto2 = {
	banana: {preco: 18},
	laranja: {quantidade: 34, preco: 45}
};
var resultado = $.extend(objeto1, objeto2);

// O script mostrado retorna o objeto resultado conforme mostrado
resultado = {
	abacaxi: {quantidade: 36},
	banana: {preco: 18},					// prop sobrescrita
	laranja: {quantidade: 34, preco: 45}	// prop acrescentada
}
// Apos a aplicação objeto1 é iqual a resultado
	
// Para preservar os valores de objeto1 não existentes em objeto2
// usamos o parametro bool
var 
objeto1 = {
	abacaxi: {quantidade: 36},
	banana: {quantidade: 252, preco: 20}
},
objeto2 = {
	banana: {preco: 18},
	laranja: {quantidade: 34, preco: 45}
};	
var resultado = $.extend(true, objeto1, objeto2);

// objeto resultado e objeto1 ficariam assim:
resultado = {	// objeto1 Idem
	abacaxi: {quantidade: 36},
	banana: {quantidade: 252, preco: 18}	// somente preco sobrescrita
	laranja: {quantidade: 34, preco: 45}	// prop acrescentada
}

// Se quisermos preservar o valor de objeto1 usamos o parametro alvo	
$.extend(true, {}, objeto1, objeto2)



// TESTE DE FUNÇÃO E OBJETOS	



/* jQuery.isFunction(objeto) */ 7.4a
// verifica se objeto é uma função retorna true/false

/* jQuery.noop */
// Este método retorna uma função vazia. aplica-se ao desenvolvimento de plug-ins
// para definir uma callback opcional
(i > 0)? faça alguma coisa : $.noop ;

/* jQuery.isPlainObject(objeto) */
// verifica se um objeto foi criado por { } ou pelo construtor new Object()
// retorna true/false

/* jQuery.isEmptyObject(objeto) */
// verifica se um objeto está vazio. retorna true/false



// OPERAÇÃO COM STRING 



/* jQuery.trim(string) */ 7.5a
// remove os espaços em branco antes e depois da string
var s = "  jQuery           ";
$.trim(s);	//=> "jQuery";



// FUNÇÕES UTILITARIAS PERSONALIZADAS



$.corTexto = function(e, cor) {
	var e = document.getElementsByTagName(e);
	for (var i = 0; i < e.length; i++)
		e[i].style.color = cor;
}
$.corTexto("p", '#00FF00');



// METODOS PARA MANIPULAÇÃO DE DADOS



/* seletorjQuery.data(chave, valor) */ 7.7a
// Este método destina-se a armazenar dados arbitrários no seletorjQuery
// Os dados armazenados podem ser recuperados com o metodo
// seletorjQuery.data(chave)
// o parametro valor pode ser qualquer tipo de dado da linguagem JavaScript
// inclusive array e objeto
 
var nome = $('input:eq(0)').val();
var email = $('input:eq(1)').val();
var cpf = $('input:eq(2)').val();
$('div').data('dados', {Nome: nome, Email: email, CPF: cpf});

if (nome && email && cpf) {	
	$('.msg').text('Dados armazenados com sucesso!');
} else {
	$('.msg').text('Preencha todos os campos!');
}

$('button:eq(1)').click(function() {
	var mensagem = '<p>Dados recuperados:</p>'
	mensagem += 'Nome: ' + $('div').data('dados').Nome + '<br />'
	mensagem += 'Email: ' + $('div').data('dados').Email + '<br />' 
	mensagem += 'CPF: ' + $('div').data('dados').CPF 
	$('.msg').html(mensagem);
});

/* seletorjQuery.removeData(chave) */ 7.7b
// destina-se a remover métodos previamente armazenados com o uso do dada()
// o parametro chave define os dados a serem removidos. se não for definido
// todos os dados armazenados na pagina serão removidos 
$('div').removeData('dados')

/* $.data(seletor, chave, valor) */
// Idem ao data() anterior adotando uma sintaxe alternativa
$.data("div", "dados", {Nome: nome});

/* $.removeData(seletor, chave) */
// Idem ao removeData() anterior adotando uma sintaxe alternativa
$.removeData("div", "dados");



	/= 13 -- PLUGIN-INS

	

/* PLUGIN-IN JQUERY ZOOM - (www.jacklmoore.com/zoom/) */ 13.2a

.ex1 {
	width: 400px; height: 300px;
}
.ex1:after { // icon da lupinha
	content: ''; 
	display: block;
	width: 33px; 
	height: 33px;
	position: absolute; 
	top: 0; 
	right: 0;
	background-image: url("zoom-master/icon.png");
}
$('.ex1').zoom();	// default zoom()
$('.ex1').zoom({on: 'grab'})	// outher options: click, toggle e mouseover (default)
	.on('mousedown',function(){$(this).css('cursor', 'url(zoom-master/grabbed.cur), auto')})
	.on('mouseup',function(){$(this).css('cursor', 'url(zoom-master/grab.cur), auto')})
	
$('.ex1').zoom({					// dispara os eventos quando entra e sai do zoom
	onZoomIn:  function(){},
	onZoomOut: function(){}
});
$('.ex1').zoom({					// chama a função quando o metodo é aplicado
	callback: function(){}
});
$('.ex1').zoom({					// define a imagem apliada
	url: 'imgAmpliada.jpg'
})
<div class="ex1">
	<img src="imagem">
</div>

/* PLUGIN-IN SLIMBOX 2 -  (www.digitalia.be/software/slimbox) */ 13.3b | 13.3c

// necessita apenas que voce atribua o atributo rel="lightbox" na imagem
// e folha de estilo slimbox2.css
// script slimbox2.js
<link href="slimbox2.css" rel="stylesheet">
<script src="slimbox2.js"></script>
<a href="imagem.jpg" rel="lightbox" alt="descrição imagem">
	<img src="imagem.jpg" width="300" height="200">
</a>
// para navegar entre as imagens ampliadas use
<a href="img1.jpg" rel="lightbox-nome">
<a href="img1.jpg" rel="lightbox-nome">
<a href="img1.jpg" rel="lightbox-nome">
	

/* PLUGIN-IN CAROUFREDSEL -  (caroufredsel.dev7studios.com/) */ 13.4b | 13.4c
	
$('.carrosel').carouFredSel();	// default

<div class="container-carrosel">
	<div class="carrosel">
		<img src="...">
		<img src="...">
		<img src="...">
		<img src="...">
	</div>
</div>
	


// DESENVOLVIMENTO DE PLUGIN-INS



jQuery.estilos = function(elem) {
	var largura = $(elem).css('width');
	return largura; 
};

$(document).ready(function() {
	$('button:eq(0)').click(function() {
	var msg = '<b>Estilos desta DIV</b> <ul>'
	msg += '<li>largura: ' + $.estilos($('div')) + '</li>'
	msg += '</ul>'
	$('div').html(msg)
	});
	$('button:eq(1)').click(function() { 
	$('div').html('')
	});
})

// Criando um namespace

jQuery.meuNameSpace = {
	estilos: function(elem) {
		var largura = $(elem).css('width');
		return largura; 
	}
};
// para chamar o metodo
$.meuNameSpace.estilo($('div'))



// CRIANDO MÉTODOS



// jQuery.fn é um alias para jQuery.prototype
jQuery.fn.nomeMetodo = function(parametros) {
	// script aqui...
}


jQuery.fn.aplicaLargura = function() {
	jQuery(this).css('width', 100);
}
$(document).ready(function() {
	$('button:eq(0)').click(function() {
		$('div').aplicaLargura();
	});
})

// Preservando o principio de Encadeamento da jQuery
jQuery.fn.aplicaLargura = function(larg) {
	return this.each(function() {
		jQuery(this).css('width', larg);
	});
}

$(document).ready(function() {
	$('button:eq(0)').click(function() {
		$('div').aplicaLargura(600).text('Texto inserido após aplicação da largura');
});

// Aplicando Clouser (blindagem contra conflitos)

(function($) {
	$.fn.aplicaLargura = function(larg) {
		return this.each(function() {
			$(this).css('width', larg);
		};
	};
}(jQuery));



// CRIAÇÃO DE PLUGIN-INS



(function($) {	
$.fn.aplicaEstilos = function(options) {
	var defaults = {
		largura: 400,
		altura: 250,
		corFundo: '#000',
		corFrente: '#0f0',
		texto: 'Recarregue a página para repetir a aplicação de estilos' 
	}
	
	var settings = $.extend({}, defaults, options);
	
	return this.each(function() {
		$(this).css({
			width: settings.largura,
			height: settings.altura,
			backgroundColor: settings.corFundo,
			color: settings.corFrente
		}).append(settings.texto);
	});
};
}(jQuery));	
$(document).ready(function() {
	$('button:eq(0)').click(function() {
		$('div').aplicaEstilos({
			largura: 600,
			corFundo: '#f00',
			corFrente: '#fff',
			texto: 'Alterei o texto'
		})
	});
})

// Metodo para alterar valor-padrão do plugin
(function($) {	
	$.fn.aplicaEstilos = function(options) {
		
		var settings = $.extend({}, $.fn.aplicaEstilos.defaults, options);
		
		return this.each(function() {
			$(this).css({
				width: settings.largura,
				height: settings.altura,
				backgroundColor: settings.corFundo,
				color: settings.corFrente
			}).append(settings.texto);
		});
	};
	
	$.fn.aplicaEstilos.defaults = {
		largura: 400,
		altura: 250,
		corFundo: '#000',
		corFrente: '#0f0',
		texto: 'Recarregue a página para repetir a aplicação de estilos' 
	};
})(jQuery)	
$(document).ready(function() {
	$('button:eq(0)').click(function() {
		$.fn.aplicaEstilos.defaults.corFundo = '#666';
		$('div').aplicaEstilos();
	});
});


/-- AJAX 

$.ajax({
	url: "index.php",
	type: "POST",
	dataType: "html",
	data: {nome: 'Marcos', idade: 'Idade', sexo:'M'},
	success: function(response){}
});

// POST
$.post(URL, data, callback);
// URL  	: requisição
// data 	: {prop: value, ...}
// callback	: função de resposta
$.post("demo_test_post.asp", 
	{name:"Donald Duck", city:"Duckburg"},
    function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
	}
);

// GET
$.get(URL, data, callback);
// URL  	: requisição
// data 	: querystring nome=value&...
// callback	: função de resposta
$.post("demo_test_post.asp", 
	'name=Donald%20Duck&city=Duckburg',
    function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
	}
);

// load()
$(selector).load(URL, data, callback);
// URL  	: requisição
// data 	: querystring nome=value&...
// callback	: função de resposta

// O exemplo a seguir carrega o conteúdo do elemento com id = "p1", 
// dentro do arquivo "demo_test.txt", em um elemento específico <div>:
$('div').load('demo_test.txt #p1');

//Exp 1.:
$("#div1").load("demo_test.txt", function(responseTxt, statusTxt, xhr){
	if(statusTxt == "success")
	{
		alert("External content loaded successfully!");
	}
	if(statusTxt == "error")
	{
		alert("Error: " + xhr.status + ": " + xhr.statusText);
	}
});


/**
 *	Quando uma requisação AJAX da erro ele não exibe nada para
 *	o usuário indicando que houve o erro, por isso o AJAX tem um
 *	método ".fail(callback)" que dispara uma função na ecorrencia de erro
 *	Alem disso, é sempre bom mostrar ao carregando/uma barra de progresso
 *	Quando uma requisição AJAX for executada o método ".always(callback)"
 *	é sempre disparado depois de uma requisição AJAX
 */
 
//spinner é uma imagem gif de loading... fica girando indicando um carregamento

// quando for realizar a requisiçao torne o spinner visível
$("#spinner").show();

$.get("http://localhost:3000/frases", trocaFraseAleatoria)
	// invocada quando há ocorrencia de ERRO
	.fail(function(){
		$("#erro").toggle();
		setTimeout(function(){
			$("#erro").toggle();
		}, 1500);
	})
	// sempre invocada ao término de uma requisição
	.always(function(){ //sempre escondendo o spinner
		$("#spinner").hide();
});






