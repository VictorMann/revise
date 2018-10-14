/*----------------------------------------*
 *----------------------------------------*
 ---									---
 ---			jQuery UI				---
 ---									---
 ---							Maujor	---
 ---						07-04-2018	---
 ------------------------------------------
 ------------------------------------------*/

// CAPITULOS
= / 2 Componente Draggable (Arrastar) /
= / 3 Componente Droppable (Soltar) /




//=========================================================== 
= / 2 Componente Draggable (Arrastar) /
	
// sintaxe básica
$('seletor').draggable();



[-] CLASSES PARA ESTILIZAÇÃO



.ui-draggable			// é adicionada automaticamente ao elem
.ui-draggable-dragging	// apenas durante a ação de arraste



[-] CLASSES PADRÃO



.ui-widget-content	// (CSS) -> border | background | color
//					   Container do componente

.ui-widget-header	// (CSS) -> border | font-weight | background | color
//					   Elemento destinado ao cabeçalho

.ui-corner-all		// (CSS) -> border-radius "default = 4px"
//					   apenas para arredondar as bordas de um container


//// Exemplo

<div class="ui-widget-content ui-corner-all">
	<h3 class="ui-widget-header">Título aqui</h3>
	<p>
		conteúdo...
	</p>
</div>



[-] CALLBACK



evento: function (event, ui){ ... }
// event -> obj nativo de funções intrinsecas
// ui	 -> obj da ui contem algumas props

// @PROP ui
// 		helper 	 : cópia do elemento de araste
//		position : posiçao do helper {left, top} em relação ao container
//		offset	 : posiçao do helper {left, top} em relação a janela



[-] OPÇÕES

// @ draggable

[+] disabled
[+] addClasses
[+] appendTo
[+] axis
[+] cancel
[+] connectToSortable
[+] containment
[+] cursor
[+] cursorAt
[+] delay
[+] distance
[+] grid
[+] handle
[+] helper
[+] iframeFix
[+] opacity
[+] refreshPositions
[+] revert
[+] revertDuration
[+] scope
[+] scroll
[+] scrollSensitivity
[+] scrollSpeed
[+] snap
[+] snapMode
[+] snapTolerance
[+] stack
[+] z-index

// definição
$('seletor').draggable({
	opcao1: 'valor',
	opcao2: 'valor',
	...
});

// inspecionar (retorna o valor da opção)
var resp = $('seletor').draggable('option', 'opc');
// atribui
$('seletor').draggable('option', 'opc', 'valor');



[+] disabled
________

// habilita/desabilita o araste de um elem

vals: false | true
//default: false

$('seletor').draggable({ disabled: true })

// retorna o valor da opçao [disabled]
var disabled = $('seletor').draggable('option', 'disabled'); //> true



[+] addClasses
________

// controla a inserção automatica da classe "ui-draggable"

vals: true | false
// default: true

// remove a inserçao automatica da classe
$('seletor').draggable({ addClasses: false })



[+] appendTo
________

// define um elem container para o helper quando
// ele não for o próprio elem a arrastar

vals: 'elem-DOM'
// default: elem-pai

$('seletor').draggable({ appendTo: 'body' }) // body como container do helper



[+] axis
________

// limita a direçao do movimento de arraste no
// sentido de um dos eixos X e Y

vals: x | y | false
// default: false

$('seletor').draggable({ axis: 'x' }) // movimento somente na direção horizontal



[+] cancel
________

// destina-se a cancelar a capacidade de arraste
// concedida a um elem

vals: 'elem-filho'
// default: false

// bloquea o arraste para o elem-filho [class="drag"]
$('#conteudo').draggable({ cancel: '.drag' })



[+] connectToSortable
________

// permite a incorporação do elem a um grupo
// de elem criados com o uso do component Sortable (Ordenar)

vals: 'elem DOM'
// default: false

// inicializa o seletor conectando-o aos elementos filhos do elem cujo [class="lista"]
$('seletor').draggable({ connectToSortable: '.lista' }) 




[+] containment
________

// define um elem container para limitar a área de arraste.

vals: 'parent' | 'window' | 'document' | 'elem DOM' | [x1, y1, x2, y2]
// default: false

$('seletor').draggable({ containment: 'parent' }) // define elem pai como limitador de arraste
$('seletor').draggable({ containment: [0, 0, 700, 300] }) // área (0,0)-(100,300)
$('seletor').draggable({ containment: 'window' }) 
$('seletor').draggable({ containment: 'document' })
$('seletor').draggable({ containment: '#tudo' })



[+] cursor
________

// define o aspecto do cursor durante o arrasto

vals: 'valores da prop CSS cursor'
// default: false

$('seletor').draggable({ cursor: 'move' }) 



[+] cursorAt
________

// define coordenadas do ponto onde deverá ser posicionado
// o ponteiro do mouse durante o arraste

vals: {left: n, top: n}
// default: canto superior esquerdo

$('seletor').draggable({ cursorAt: {left: 10, top: 20} }) // posiçao do ponteiro sobre elem



[+] delay
________

// define um tempo de espera em milissegundos que decorre
// desde o evento mousedown sobre o elem a arrastar até o
// inicio do arraste

vals: milissegundos
// default: false

$('seletor').draggable({ delay: 2000 }) // tempo de espera de 2s



[+] distance
________

// define uma distância em pixel a ser percorrida pelo
// ponteiro do mouse depois do evento mousedown sobre o
// elem a arrastar para que o arraste inicie.

vals: inteiro
// default: false

$('seletor').draggable({ distance: 100 }) 
// 100px de arraste do mouse para início do arrasto



[+] grid
________

// define um grid ao qual o arraste será atrelado.
// Grid é uma malha de módulos retangulares iguais
// na qual a dimensão de cada módulo é definida em
// pixel nas direções horizontal e vertical

vals: array
// default: false

$('seletor').draggable({ grid: [50, 80] }) // grid de modulo 50px 80px



[+] handle
________

// define um elem-filho (ou área) que é arrastavel
// O arrastro só é possivel através desse elem

vals: 'elem-filho'
// default: false

$('seletor').draggable({ handle: '#area' }) // elem filho com [id='area']



[+] helper
________

// permite que se defina um helper para acompanhar o ponteiro
// enquanto o elem arrastável permanece em sua posição inicial
// Podendo ser um elem qualquer ou uma cópia do próprio

vals: 'origial' | 'clone' | callback que retorna um elem
// default: original

$('seletor').draggable({ helper: 'clone' })
$('seletor').draggable({ helper: function(){ return $('<div>') } })



[+] iframeFix
________

// por padrão se houver um iframe no caminho do elem
// de arrasto ele sera interrompido e retornado quando
// o ponteiro sair de cima do iframe.
// Para definir o reconhecimento basta definir essa prop
// como true

vals: false | true
// default: false

$('seletor').draggable({ iframeFix: true })



[+] opacity
________

// define a opacidade a ser aplicada ao helper

vals: 0..1
// default: false

$('seletor').draggable({ opacity: .5 })



[+] refreshPositions
________

// habilita o mecanismo de cálculo automático da posição
// do elem destino do arraste durante a ação de arraste.
// É usado em situações de alta interatvidade e pode haver
// problemas de performance

vals: false | true
// default: false

$('seletor').draggable({ refreshPositions: true })



[+] revert
________

// faz o helper do elem voltar para sua posição
// de partida não permancendo na destino

vals: false | true
// default: false

$('seletor').draggable({ revert: true })



[+] revertDuration
________

// tempo em milissegundos para a duração do trajeto de
// volta de um elem quando usamos a opção "revert"

vals: milissegundos
// default: false

$('seletor').draggable({ revertDuration: 1500 }) // 1.5s



[+] scope
________

// destina-se a ser usada em conjunto com o componente
// Droppable (Soltar), define um escopo para um, ou um conjunto
// de elem arrastáveis a serem soltos

vals: 'text-livre'
// default: false

$('seletor').draggable({ scopo: 'livros' })



[+] scroll
________

// habilita barras de rolagem para a viewport do doc
// onde se encontra o elem arrastável

vals: false | true
// default: false

$('seletor').draggable({ scroll: true })



[+] scrollSensitivity
________

// define um valor em pixels contado desde a borda
// da viewport até o ponteiro de mouse em uma ação
// de arraste e a partir da qual há rolagem, ou seja,
// o valor sensível de rolagem

vals: '(inteiro) valor em pixels'
// default: 20px

$('seletor').draggable({ scrollSensitivity: 100 })



[+] scrollSpeed
________

// define um valor, em pixes, que determina os ciclos da rolagem

vals: pixels
// default: 40px

$('seletor').draggable({ scrollSpeed: 60 })



[+] snap
________

// habilita a capacidade do elem arrastável ser atraído
// para uma guia em um elem qualquer do DOM ou um GRID.
// Essa guia poderá ser os lados, tanto interno como externos

vals: false | true | 'elem DOM'
// default: false

$('seletor').draggable({ snap: true })
$('seletor').draggable({ snap: '.el-snap' })
$('seletor').draggable({ snap: true, grid: [30, 50] })



[+] snapMode
________

// define qual é o lado do elem DOM que exercerá a atração
// cuja a opção "snap" esteja habilitada

vals: 'outer' | 'inner' | 'both'
// default: 'both'

$('seletor').draggable({ snap: true, snapMode: 'inner' })
$('seletor').draggable({ snap: '.el-snap', snapMode: 'both' })



[+] snapTolerance
________

// define o valor mínimo em pixes a partir do qual o lado
// do elem do DOM ou do GRID atrai o elem arrastável

vals: pixels
// default: 20

$('seletor').draggable({ snap: true, snapTolerance: 40 })



[+] stack
________

// define o z-index do elem arrastável superior a qualquer
// elem do DOM tornando-se sempre visível

vals: 'elem DOM'
// default: html (ou seja superior a todos os elem descendentes de html)

// define o elem arrastável superior a todos descendentes arrastáveis
// da div filha de .container
$('seletor').draggable({ stack: '.container > div' })



[+] z-index
________

// define o valor para prop CSS z-index do elem arrastável

vals: inteiro
// default: padrão elem

$('seletor').draggable({ zIndex: 1000 })
$('seletor').draggable({ helper: 'clone', zIndex: 500 })



[-] EVENTOS



// Seguem os mecanismos de implementação dos eventos 
// tradicionais da linguagem JavaScript

 Eventos draggable:
 
 	> create
 	> start
 	> drag
 	> stop

// callback 2 param

// 	> start
// 	> drag
// 	> stop

// 1º ARGUMENTO contém as informações tradicionais da
// 				linguagem
// 2º ARGUMENTO contém as informações sobre o helper

// CAUTION: para o evento create só o 1° argumento contém
// informações o segundo retorna undefined

// 2º argumento: ui (Nome de livre escolha)
// draggable
//	> ui.helper 	-> retorna obj jQuery contendo info sobre
//					   o helper do elem que está sendo arrastado
//	> ui.position 	-> retorna a posição do helper, no formato
//					   {left, top}, em relação a posi inicial do
// 					   elem q esta sendo arrastado
//	> ui.offset		-> retorna o posi absoluta do helper, no
//					   formato {left, top}, em relação a página



[|] create ()
________

// Esse evento ocorre qnd um elem arrastável é criado.

// nome designado: dragcreate

$('seletor').draggable({
	create: function(event) { ... }
})
// Idem
$('seletor').on('dragcreate', function(event) {
	...
})



[|] start ()
________

// Esse evento ocorre qnd se inicia a ação de arraste

// nome designado: dragstart

$('seletor').draggable({
	start: function(event, ui) { ... }
})
// Idem
$('seletor').on('dragstart', function(event, ui) {
	...
})



[|] drag ()
________

// Esse evento ocorre durante a ação de arraste

// nome designado: drag

$('seletor').draggable({
	drag: function(event, ui) { ... }
})
// Idem
$('seletor').on('drag', function(event, ui) {
	...
})



[|] stop ()
________

// Esse evento ocorre ao final da ação de arraste

// nome designado: dragstop

$('seletor').draggable({
	stop: function(event, ui) { ... }
})
// Idem
$('seletor').on('dragstop', function(event, ui) {
	...
})



[-] MÉTODOS



// Seguem os mecanismos de implementação dos métodos 
// tradicionais da linguagem JavaScript

 Métodos draggable:
 
	> destroy
	> disable
	> enable
	> option
	> widget



[.] destroy

// destrói a funcionalidade de arraste do elem. Uma vez
// destroida não será mais possível recuperá-la

$('seletor').draggable('destroy')



[.] disable & enable

// destinam-se a desabilitar e habilitar respectivamente
// a capacidade de arraste

$('seletor').draggable('disable')
$('seletor').draggable('enable')



[.] option

// permite que se definam opções para o componente arrastável


$('seletor').draggable('option', 'nome_opcao', 'valor')
// Idem
$('seletor').draggable('option', {obj com par opcao/valor})

$('seletor').draggable('option', 'grid', [30, 50])
$('seletor').draggable('option', {helper: 'clone', snap: true})


[.] widget

// retorna o elem arrastável

$('seletor').draggable('widget')



= / 3 Componente Droppable (Soltar) /



// Destina a criar áreas alvo (ou de soltura) para elem
// arrastáveis
// sintaxe:
$('seletor').droppable()



[-] CLASSES PARA ESTILIZAÇÃO



// adicionado automaticamente a classe
.ui-droppable



[-] OPÇÕES

// @ droppable

[+] disabled
[+] accept
[+] activeClass
[+] hoverClass
[+] addClasses
[+] greedy
[+] scope
[+] tolerance


// São parametros e seus valres que permitem configurar
// e controlar o componente

$('seletor').droppable({
	opc1: 'valor',
	opc2: 'valor',
	...
})

// inspeção
var valorOpcao = $('seletor').droppable('option', 'opcao')
// atribuição
$('seletor').droppable('option', 'opcao', 'valor')



[+] disabled
________

// habilita/desabilita a área de soltura

vals: true | false
// default: false

$('seletor').droppable({ disabled: true }) // desabilita



[+] accept
________

// define quais são os elem arrastáveis que podem
// ser soltos na área de soltura
// Alem de aceitar um elem do DOM, essa opção aceita um
// callback que tem como parametro cada um dos elem arrastáveis
// existentes na página

vals: 'elem DOM'
// default: '*'

$('seletor').droppable({ accep: '.drag' })
$('seletor').droppable({
	accep: function($el){
		var cor = $el.css('backgroundColor');
		if (cor == '#FF0000') return true;
	}
})



[+] activeClass
________

// define uma classe para o elem da área de soltura
// qnd começa o arraste de um elem por ela aceito


vals: 'class-name'
// default: '*'

$('seletor').droppable({ activeClass: 'destacar' })



[+] addClasses
________

// controla a inserção automática da classe intrinseca
// ui-droppable no elem área de soltura.

vals: true | false
// default: true

$('seletor').droppable({ addClasses: false }) // não gera classe



[+] greedy
________

// contrala a propagação de eventos específicos dos componentes
// da jQueryUI em áreas de soltura aninhadas. Para evitar a pro-
// pagação desses eventos basta declarar para o seletor que 
// representa a área de soltura aninhada o valor true

vals: true | false
// default: false

$('seletor').droppable({ greedy: true })



[+] hoverClass
________

// define uma classe para o elem da área de soltura qnd o elem
// arrastável é colocado sobre ela.

vals: 'class-name'
// default: undefined

$('seletor').droppable({ hoverClass: 'over-drag' })



[+] scope
________

// usado em conjunto com o componente Draggable. Define um
// escopo para um elem ou um conjunto de elem arrastáveis a
// serem soltos em um ou conjunto de elem que pertencem ao 
// mesmo escopo

vals: 'text-liver'
// default: undefined

$('.drag').draggable({scope: 'grupo1', revert: 'invalid'})
$('.drop').droppable({scope: 'grupo1'})



[+] tolerance
________

// define a distáncia que o elem arrastável deverá estar
// da zona de soltura

vals: 'fit' | 'intersect' | 'touch' | 'pointer'
// default: 'intersect'

// fit		 -> totalmente dentro da área
// intersect -> 50% dentro da área
// pointer	 -> ponteiro do mouse entra na área de soltura
// touch	 -> toca os limites da área de soltura

$('.drag').draggable({tolerance: 'fit'})



[-] EVENTOS



// Seguem os mecanismos de implementação dos eventos 
// tradicionais da linguagem JavaScript

 Eventos draggable:
 
 	> create
 	> activate
 	> deactivate
 	> over
 	> out
 	> drop

// callback 2 param

// 	> activate
// 	> deactivate
// 	> over
// 	> out
// 	> drop

// 1º argumento contém as informações tradicionais da
// linguagem
// 2º argumento contém as informações sobre o elem que
// esta sendo arrastado seu helper

// CAUTION: para o evento create só o 1° argumento contém
// informações o segundo retorna undefined

// 2º argumento: ui (Nome de livre escolha)
//	> ui.draggable 	-> retorna obj jQuery contendo info sobre
//					   o elem que está sendo arrastado. 
//					   Ex.: ui.draggable.text()
//	> ui.helper 	-> retorna obj jQuery contendo info sobre
//					   o helper do elem que está sendo arrastado
//	> ui.position 	-> retorna a posição do helper, no formato
//					   {left, top}, em relação a posi inicial 
//					   do elem q esta sendo arrastado
//	> ui.offset		-> retorna o posi absoluta do helper, no
//					   formato {left, top}, em relação a página



[|] create ()
________

// Esse evento ocorre qnd uma área de soltura é criada

// nome designado: dropcreate

$('seletor').droppable({
	create: function(event) { ... }
})
// Idem
$('seletor').on('dropcreate', function(event) {
	...
})



[|] activate ()
________

// Esse evento ocorre qnd se inicia a ação de arraste
// de um elem arrastável

// nome designado: dropactivate

$('seletor').droppable({
	activate: function(event, ui) { ... }
})
// Idem
$('seletor').on('dropactivate', function(event, ui) {
	...
})



[|] deactivate ()
________

// Esse evento ocorre qnd cessa a ação de arraste
// de um elem arrastável

// nome designado: dropdeactivate

$('seletor').droppable({
	deactivate: function(event, ui) { ... }
})
// Idem
$('seletor').on('dropdeactivate', function(event, ui) {
	...
})



[|] over ()
________

// Esse evento ocorre qnd o elem arrastável atinge
// a sua área de soltura (considerada a opção tolerance)

// nome designado: dropover

$('seletor').droppable({
	over: function(event) { ... }
})
// Idem
$('seletor').on('dropover', function(event) {
	...
})



[|] out ()
________

// Esse evento ocorre qnd o elem arrastável é retirado
// de sua área de soltura (considerada a opção tolerance)

// nome designado: dropout

$('seletor').droppable({
	out: function(event) { ... }
})
// Idem
$('seletor').on('dropout', function(event) {
	...
})



[|] drop ()
________

// Esse evento ocorre qnd o elem arrastável é solto
// na área de soltura

// nome designado: drop

$('seletor').droppable({
	drop: function(event) { ... }
})
// Idem
$('seletor').on('drop', function(event) {
	...
})



[-] MÉTODOS



// Seguem os mecanismos de implementação dos métodos 
// tradicionais da linguagem JavaScript

 Métodos droppable:

	> destroy
	> disable
	> enable
	> option
	> widget



[.] destroy

// destrói a funcionalidade área de soltura do elem. Uma vez
// destroida não será mais possível recuperá-la

$('seletor').droppable('destroy')



[.] disable & enable

// destinam-se a desabilitar e habilitar respectivamente
// a área de soltura

$('seletor').droppable('disable')
$('seletor').droppable('enable')



[.] option

// permite que se definam opções para o componente soltura


$('seletor').droppable('option', 'nome_opcao', '[valor]')
// Idem
$('seletor').droppable('option', {obj com par opcao:valor})

$('seletor').droppable('option', 'activeClass', 'ui-state-highlight')
$('seletor').droppable('option', {
	activeClass: 'ui-state-highlight',
	hoverClass: 'over-drop'
})



[.] widget

// retorna o elem que marca a área de soltura

var content = $('seletor').droppable('widget').text()



= / 4 Componente Resizable (Redimensionar) /



// Destina a criar áreas que possam ser redimensionadas
// sintaxe:
$('seletor').resizable()



[-] CLASSES PARA ESTILIZAÇÃO



.ui-resizable				// é adicionada automaticamente ao elem
.ui-resizable-resizing		// apenas durante a ação de redimensiomento



[-] CALLBACK



evento: function (event, ui){ ... }
// event -> obj nativo de funções intrinsecas
// ui	 -> obj da ui contem algumas props

// @PROP ui
// 		helper 	 		 : O elem visual durante a ação de 
//						   redimensiomento pode ser o proprio 
//						   elem ou uma cópia do mesmo
//		originalPosition : Posição do helper formato {left, top} antes
//						   do redimensiomento
//		originalSize	 : Dimensões do helper formato {width, height}
//						   antes do redimensiomento
//		position 		 : posiçao do helper {left, top} em um instante
//						   qualquer do redimensiomento
//		size			 : dimensões do helper {left, top} em um instante
//						   qualquer do redimensiomento



[-] OPÇÕES

// @ resizable

[+] disabled
[+] alsoResize
[+] animate
[+] animateDuration
[+] animateEasing
[+] aspectRatio
[+] autoHide
[+] cancel
[+] containment
[+] distance
[+] ghost
[+] grid
[+] handles
[+] helper
[+] maxHeight, maxWidth, minHeight, maxWidth


// São parametros e seus valores que permitem configurar
// e controlar o componente

$('seletor').resizable({
	opc1: 'valor',
	opc2: 'valor',
	...
})

// inspeção
var valorOpcao = $('seletor').resizable('option', 'opcao')
// atribuição
$('seletor').resizable('option', 'opcao', 'valor')



[+] disabled
________

// habilita/desabilita o redimensiomento

vals: true | false
// default: false

$('seletor').resizable({ disabled: true }) // desabilita



[+] alsoResize
________

// atrela um ou mais áreas quaisquer para serem
// redimensionadas e sincronizadas ao mesmo tempo

vals: 'elem DOM'
// default: undefined

$('seletor').resizable({ alsoResize: '.outro' })



[+] animate
________

// define um efeito de animação para o redimensiomento

vals: false | true
// default: false

$('seletor').resizable({ animate: true }) // anima

// OBS.: Existe uma classe nativa que permite ao autor
// criar com estilização um helper para o redimensionamento,
// que é particularmente útil para os casos nos quais o
// redimensionamento não é instantâneo
.ui-resizable-helper 



[+] animateDuration
________

// define o tempo de duração da animação de um redimensionamento

vals: 'slow' | 'normal' | 'fast' | milissegundos
// default: 'normal'

$('seletor').resizable({ animateDuration: 600 })



[+] animateEasing
________

// define o efeito da animação do redimensionamento

vals: 'easeInCubic' | 'linear' | ...
// default: nao_sei

$('seletor').resizable({ animateEasing: 'easeInCubic' })



[+] aspectRatio
________

// define a razão de aspecto, ou seja, a relação existente
// entre a largura e a altura do elem durante o redimensionamento

vals: false | true | decimal
// default: false

// altura metade da largura
$('seletor').resizable({ aspectRatio: .5 })
// largura 3x a altura
$('seletor').resizable({ aspectRatio: 3 })



[+] autoHide
________

// Controla a exibição do handle (tracinhos na diagonal)
// Torna o indicativo de redimensionamento 
// visível somente ao ponteiro do mouse 
// encontrar-se sobre o elem

vals: false | true
// default: false

$('seletor').resizable({ autoHide: true })



[+] cancel
________

// cancela a capacidade de redimensionamento
// O valor dessa opção é o elem ao qual se deseja
// retirar a capacidade de ser redimensionado
// Por padrão, todos os obj jQuery: INPUT e OPTION
// tem a capacidade cancela

vals: 'elem DOM'
// default: undefined

$('seletor').resizable({ cancel: '.redim' })



[+] containment
________

// define um container para limitar a área de
// redimensionamento

vals: 'parent' | 'document' | 'elem DOM' | 'seletor'
// default: undefined

$('seletor').resizable({ containment: 'parent' })



[+] delay
________

// define um tempo de permanência em milissegundos
// que o ponteiro do mouse deverá permanecer pressionado
// sobre o lado ou canto do elem para que o raste do
// redimensionamento seja possível

vals: milissegundos
// default: 0

$('seletor').resizable({ delay: 1000 })



[+] distance
________

// define uma distância em pixels a ser percorrida
// pelo ponteiro do mouse depois do evento mousedown


vals: pixels
// default: 0

$('seletor').resizable({ distance: 200 })



[+] ghost
________

// define um helper semitransparente para ser mostrado
// durante o arraste para redimensionamento

vals: false | true | 
// default: false

$('seletor').resizable({ ghost: true })



[+] grid
________

// define um grid ao qual o redimensionamento será
// atrelado

vals: [ pixel_X, pixel_y ]
// default: undefined

$('seletor').resizable({ grid: [75, 65] })



[+] handles
________

// define quais são os lados e cantos que podem
// ser arrastados para que haja o redimensionamento


vals: 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'nw' | 'all'
// default: 'e, se, s' (lado direito, canto inferior direito, lado inferior) 

// n	> lado superior 
// ne	> canto superior direito 
// e	> lado direito
// se	> canto inferior direito
// s	> lado inferior
// sw	> canto inferior esquerdo
// w	> lado esquerdo
// nw	> canto superior esquerdo

$('seletor').resizable({handles: 'n, nw'})
$('seletor').resizable({handles: 'all'})
// define o elem #area como auxílio visual para o arraste
// para redimensionamento pelo lado superior
$('seletor').resizable({handles: {n: '#area'} })



[+] helper
________

// permite que se defina uma classe para estilizar um helper
// para acompanhar o ponteiro do mouse enquanto o elem é arrastado.
// O helper acompanhar o arraste e desaparece quando o redimensiomento
// termina

vals: 'classe_livre'
// default: undefined

$('seletor').resizable({ helper: 'hpr' })



[+] maxHeight, maxWidth, minHeight, maxWidth
________

// define os valores limites para as dimensões
// de um elem redimensionável


vals: pixels
// default: undefined

$('seletor').resizable({ maxHeight: 500 })



[-] EVENTOS



// Seguem os mecanismos de implementação dos eventos 
// tradicionais da linguagem JavaScript

 Eventos resizable:

 	> create
 	> start
 	> resize
 	> stop


// callback 2 param

// 	> start
// 	> resize
// 	> stop

// 1º argumento contém as informações tradicionais da
// linguagem
// 2º argumento contém as informações sobre o elem que
// esta sendo arrastado seu helper

// CAUTION: para o evento create só o 1° argumento contém
// informações o segundo retorna undefined

// 2º argumento: ui (Nome de livre escolha)
//	> ui.helper 	-> retorna obj jQuery contendo info sobre
//					   o helper do elem que está sendo arrastado
//	> ui.position 	-> retorna a posição do helper, no formato
//					   {left, top}, em relação a posi inicial do 
//					   elem q esta sendo arrastado
//	> ui.offset		-> retorna o posi absoluta do helper, no
//					   formato {left, top}, em relação a página



[|] create ()
________

// Esse evento ocorre qnd uma elem redimensionado é criado

// nome designado: resizecreate

$('seletor').resizable({
	create: function(event) { ... }
})
// Idem
$('seletor').on('resizecreate', function(event) {
	...
})



[|] start ()
________

// Esse evento ocorre qnd se inicia a ação de arrasto
// de um elem redimensionavel

// nome designado: resizestart

$('seletor').resizable({
	start: function(event, ui) { ... }
})
// Idem
$('seletor').on('resizestart', function(event, ui) {
	...
})



[|] resize ()
________

// Esse evento ocorre qnd se inicia a ação de arrasto
// de um elem redimensionavel

// nome designado: resize

$('seletor').resizable({
	resize: function(event, ui) { ... }
})
// Idem
$('seletor').on('resize', function(event, ui) {
	...
})



[|] stop ()
________

// Esse evento ocorre ao final da ação de arraste
// de um elem redimensionável


// nome designado: resizestop

$('seletor').resizable({
	stop: function(event, ui) { ... }
})
// Idem
$('seletor').on('resizestop', function(event, ui) {
	...
})



[-] MÉTODOS



// Seguem os mecanismos de implementação dos métodos 
// tradicionais da linguagem JavaScript

  Métodos resizable:

	> destroy
	> disable
	> enable
	> option
	> widget



[.] destroy

// destrói a funcionalidade de redimensionamento. Uma vez
// destroida não será mais possível recuperá-la

$('seletor').resizable('destroy')



[.] disable & enable

// destinam-se a desabilitar e habilitar respectivamente
// a habilidade de redimensionamento

$('seletor').resizable('disable')
$('seletor').resizable('enable')



[.] option

// permite que se definam opções para o componente redimensionável


$('seletor').resizable('option', 'nome_opcao', '[valor]')
// Idem
$('seletor').resizable('option', {obj com par opcao:valor})

$('seletor').resizable('option', 'ghost', true)
$('seletor').resizable('option', {
	ghost: true,
	maxHeight: 500,
	maxWidth: 400,
	minHeight: 200,
	minWidth: 130
})



[.] widget

// retorna o elem redimensionável. Com ele podemos
// inspecionar o mesmo

var content = $('seletor').resizable('widget').text()



= / 5 Componente Selectable (Selecionar) /



// Destina a criar elem selecionáveis
// sintaxe:
$('seletor').selectable()



[-] CLASSES PARA ESTILIZAÇÃO



// é adicionada automaticamente ao elem
.ui-selectable		// adicionada ao container dos elem selecionáveis
.ui-selectee		// adicionada ao elem selecionável no momento em que ele é criado
.ui-selecting		// adicionada ao elem selecionável durante a ação de arraste
//					   para realizar a seleção, e somente durante o tempo que
//					   perdura o arraste.
.ui-selected		// adionada ao elem selecionável tão logo ele seja selecionado



[-] OPÇÕES

// @ selectable

[+] disabled
[+] autoRefresh
[+] cancel
[+] delay
[+] distance
[+] filter
[+] tolerance



// São parametros e seus valres que permitem configurar
// e controlar o componente

$('seletor').selectable({
	opc1: 'valor',
	opc2: 'valor',
	...
})

// inspeção
var valorOpcao = $('seletor').selectable('option', 'opcao')
// atribuição
$('seletor').selectable('option', 'opcao', 'valor')



[+] disabled
________

// habilita/desabilita a seleção de um item

vals: true | false
// default: false

$('seletor').selectable({ disabled: true }) // desabilita



[+] autoRefresh
________

// define como será a atualização das dimensões e da 
// posição de cada elem selecionável qnd inseridos dinamicamente
// Em uma seleção envolvendo grande quantidade de itens, pode ser
// interessante definir essa propriedade como false

vals: true | false
// default: false

$('seletor').selectable({ autoRefresh: false })



[+] cancel
________

// cancela a capacidade de seleção a partir de determinados
// elem selecionáveis. O valor dessa opção é um ou mais elem-filhos

vals: 'elem-filho'
// default: undefined

$('seletor').selectable({ cancel: 'li:first-child' })



[+] delay
________

// define um tempo de espera em milissegundos que decorre
// desde o evento mousedown sobre o elem a selecionar até o
// inicio do arraste.

vals: milissegundos
// default: 0

$('seletor').selectable({ delay: 1000 })



[+] distance
________

// define uma distância em pixels a ser percorrida
// pelo ponteiro do mouse depois do evento mousedown
// sobre o elem a selecionar para que o arraste inicie.

vals: pixel
// default: 0

$('seletor').selectable({ distance: 100 })



[+] filter
________

// define um filho para elems selecionáveis. A seleção
// é possível somente para os elems definidos no filtro

vals: 'elem-filhos'
// default: 0

$('seletor').selectable({ filter: $('li:nth-child(2n)') })



[+] tolerance
________

// define como se dará a seleção em relação ao arraste.
// O valor padrão é touch, significa que para haver seleção
// é preciso que se clique sobre o elem e arraste sobre ele

vals: 'fit' | 'touch'
// default: 'touch'

// touch	> Para haver seleção é preciso que se clique
//			  sobre o elem e arraste sobre ele
// fit		> a seleção ocorre qnd a caixa de arraste ocupa
//			  todo o elem
 

$('seletor').selectable({ tolerance: 'fit' })



[-] EVENTOS



// Seguem os mecanismos de implementação dos eventos 
// tradicionais da linguagem JavaScript

  Eventos selectable:

 	> create
 	> selected
 	> selecting
 	> start
 	> stop
 	> unselected
 	> unselecting



// callback 2 param

// 	> selected
// 	> selecting
// 	> start
// 	> stop
// 	> unselected
// 	> unselecting

// 1º ARGUMENTO contém as informações tradicionais da
//    linguagem
// 2º ARGUMENTO contém as informações sobre o elem que
//    esta sendo arrastado seu helper

// CAUTION: para o evento create só o 1° argumento contém
// informações o segundo retorna undefined

// 2º argumento: ui (Nome de livre escolha)
//	> ui.selected 	-> retorna obj jQuery contendo info sobre
//					   cada um dos elems selecionados



[|] create ()
________

// Esse evento ocorre qnd uma elem selecionavel é criado

// nome designado: selectablecreate

$('seletor').selectable({
	create: function(event) { ... }
})
// Idem
$('seletor').on('selectablecreate', function(event) {
	...
})



[|] start ()
________

// Esse evento ocorre qnd se inicia a ação de arrasto
// para uma seleção em grupo ou a cada clique para selecionar
// nome designado: selectablestart

$('seletor').selectable({
	start: function(event, ui) { ... }
})
// Idem
$('seletor').on('selectablestart', function(event, ui) {
	...
})



[|] selected ()
________

// Esse evento ao fim da seleção de cada um dos elems
// sendo selecionados
// nome designado: selectableselected

$('seletor').selectable({
	selected: function(event, ui) { ... }
})
// Idem
$('seletor').on('selectableselected', function(event, ui) {
	...
})



[|] selecting ()
________

// Esse evento ocorre durante a ação de seleção
// nome designado: selectableselecting

$('seletor').selectable({
	selecting: function(event, ui) { ... }
})
// Idem
$('seletor').on('selectableselecting', function(event, ui) {
	...
})



[|] stop ()
________

// Esse evento ao fim da ação de seleção
// nome designado: selectablestop

$('seletor').selectable({
	stop: function(event, ui) { ... }
})
// Idem
$('seletor').on('selectablestop', function(event, ui) {
	...
})



[|] unselected ()
________

// Esse evento ocorre ao final da ação de remoção de um elem
// selecionado anteriormente
// nome designado: selectableunselected

$('seletor').selectable({
	unselected: function(event, ui) { ... }
})
// Idem
$('seletor').on('selectableunselected', function(event, ui) {
	...
})



[|] unselecting ()
________

// Esse evento ocorre durante a ação de remoção de um elem
// selecionado anteriormente
// nome designado: selectableunselecting

$('seletor').selectable({
	unselecting: function(event, ui) { ... }
})
// Idem
$('seletor').on('selectableunselecting', function(event, ui) {
	...
})



[-] MÉTODOS



// Seguem os mecanismos de implementação dos métodos 
// tradicionais da linguagem JavaScript

  Métodos selectable:

	> destroy
	> disable
	> enable
	> option
	> widget
	> refresh



[.] destroy

// destrói a capacidade de um elem ou grupo de elems
// serem selecionado. Uma vez destroida não será mais
// possível recuperá-la

$('seletor').selectable('destroy')



[.] disable & enable

// destinam-se a desabilitar e habilitar respectivamente
// a habilidade de seleção

$('seletor').selectable('disable')
$('seletor').selectable('enable')



[.] option

// permite que se definam opções para o componente Selecionar


$('seletor').selectable('option', 'nome_opcao', '[valor]')
// Idem
$('seletor').selectable('option', {obj com par opcao:valor})

$('seletor').selectable('option', 'delay', 2000)
$('seletor').selectable('option', {
	delay: 2000,
	distance: 100,
	tolerance: 'fit',
	autoRefresh: false
})



[.] widget

// retorna o elem selecionável. Com ele podemos
// inspecionar o mesmo

var content = $('seletor').selectable('widget').text()



[.] refresh

// atualiza a contição de seleção de elems selecionáveis
// inseridos na página de forma dinámica, ou seja, depois
// que ela é carregada. Por padrão, tais elems são atualizados
// automaticamente à medida que são inseridos, contudo há situações
// em que uma grande quantidade de elems é adicionada e pode haver
// necessidade de esperar para atualizar depois que todos os elems
// ou mesmo um grupo deles estejam carregados.
// Nessa situações devemos definir a opção 'autoRefresh' para o valor
// false, para evitar a atualização automática e posteriormente usar 
// o método refresh para atualizar em massa.

$('seletor').selectable('refresh')



= / 6 Componente Sortable (Ordenar) /



// Destina a criar elem ordenáveis
// sintaxe:
$('seletor').sortable()



[-] CLASSES PARA ESTILIZAÇÃO



// é adicionada automaticamente ao elem
.ui-sortable		// adicionada ao container dos elem ordenáveis
.ui-sortable-helper	// adicionada ao elem ordenável durante a ação
// 					   de arraste para realizar a ordenação, somente
//					   durante o tempo que perdura o arraste



[-] OPÇÕES



// São parametros e seus valores que permitem configurar
// e controlar o componente

$('seletor').sortable({
	opc1: 'valor',
	opc2: 'valor',
	...
})

// inspeção
var valorOpcao = $('seletor').sortable('option', 'opcao')
// atribuição
$('seletor').sortable('option', 'opcao', 'valor')



[+] disabled
________

// habilita/desabilita a possibilidade de se ordenar
// os itens de um container

vals: true | false
// default: false

$('seletor').sortable({disabled: true}) // desabilita



[+] helper
________

// define um helper a ser usado como auxílio visual durante
// a ação de arraste para ordenação

vals: 'original' | 'clone' | 'elem retornado p/ function'
// default: 'original'

$('seletor').sortable({helper: 'clone'})



[+] axis
________

// destina-se a limitar a direção do movimento de ordenação
// no sentido de um dos eixos cartesianos

vals: false | 'x' | 'y'
// default: false

$('seletor').sortable({axis: 'x'})



[+] cancel
________

// destina-se a cancelar a possibilidade de ordenação
// de determinados elem ordenáveis ou de todos os elems


vals: 'elem-filho'
// default: undefined

$('seletor').sortable({cancel: 'li:first-child'})



[+] connectWith
________

// destina-se a permitir q a ordenação de itens de um
// container seja possível dentro dos itens de outro container
// ordenável, ou seja, conectar um ou mais containers de itens
// ordenáveis.

vals: 'elem DOM (ordenável)'
// default: undefined

// permite a ordenação de seus elems não só entre si como
// tbm entre os itens ordenáveis do container class="conectar"
$('seletor').sortable({connectWith: '.conectar'})



[+] containment
________

// destina-se a definir um container para limitar a área de arraste
// durante a operação de ordenação

vals: 'parent' | 'document' | 'window' | 'elem DOM'
// default: undefined

$('seletor').sortable({containment: 'parent'})



[+] cursor
________

// destina-se a definir o aspecto do cursor do mouse durante
// a ação de arraste para ordenação

vals: 'prop CSS cursor'
// default: undefined

$('seletor').sortable({cursor: 'ns-resize'})



[+] cursorAt
________

// destina-se a definir as coordenadas do ponto onde deverá
// ser posicionado o ponteiro do mouse durante o arraste para 
// ordenação

vals: 'prop CSS cursor'
// default: undefined

$('seletor').sortable({cursor: 'ns-resize'})



[+] delay
________

// destina-se a definir um tempo de espera em milissegundos
// que decorre dede o evento mousedown sobre o elem a ordenar
// até o início do arraste


vals: milissegundos
// default: 0

$('seletor').sortable({delay: 1000})



[+] distance
________

// destina-se a definir uma distância em pixel a ser percorrida
// pelo ponteiro do mouse depois do evento mousedown sobre o elem
// a ordenar para que o arraste inicie

vals: pixels
// default: 0

$('seletor').sortable({distance: 100})



[+] dropOnEmpty
________

// destina-se a definir se um item ordenável de uma determinada
// área poderá ou não ser arrastado e solto em uma área de ordenação
// vazia (áreas conectadas com o uso da opção connectWith)

vals: true | false
// default: true

// não permite a soltura
$('seletor').sortable({dropOnEmpty: false, connectWith: '.conecta'})



[+] grid
________

// destina-se a definir um grid ao qual o arraste para ordenação
// será atrelado

vals: [pixel_X, pixel_Y]
// default: undefined

$('seletor').sortable({grid: [20, 50]})



[+] appendTo
________

// destina-se a colocar o helper em um container durante
// a ação de arraste para ordenação

vals: 'elem DOM'
// default: undefined

// define o elem-pai do seletor como container do helper
// durante o arraste
$('seletor').sortable({appendTo: 'parent'})



[+] handle
________

// destina-se a definir um elem-filho (ou área) dentro
// do item ordenável. O arraste para ordenação somente
// é possível se o clique para seu início for realizado
// dentro dessa área


vals: 'elem DOM'
// default: undefined

// define a área do elem p como handle
$('seletor').sortable({handle: 'p'})



[+] items
________

// destina-se a definir quais itens serão ordenáveis

vals: 'elem DOM'
// default: undefined

// somente os itens com class=".eh_ordenavel"
$('seletor').sortable({items: '.eh_ordenavel'})
$('seletor').sortable({items: 'li:not(:nth-child(5n+1))'})



[+] opacity
________

// destina-se a definir uma opacidade para o helper

vals: 0 à 1
// default: 1

$('seletor').sortable({opacity: .5})



[+] placeholder
________

// destina-se a definir um valor para o atributo classe
// a ser aplicada ao placeholder (local que ocupará o item
// arrastado após ser solto)

vals: 'nome-classe'
// default: undefined

// o placeholder conterá um atributo classe com
// valor pholder
$('seletor').sortable({placeholder: 'pholder'})



[+] revert
________

// destina-se a controlar a velocidade com q um item ordenado
// se desloca para ocupar o seu placeholder


vals: true | false
// default: false

// velocidade suave para o retorno
$('seletor').sortable({revert: true})



[+] scroll
________

// destina-se a controlar a rolagem da viewport qnd o arraste
// para ordenar se da para fora dos seus limites. O valor true
// faz com q se bloqueie a rolagem qnd o ponteiro do mouse atinge
// os limites da viewport

vals: true | false
// default: true

// inicializa o seletor bloqueando a rolagem da viewport
$('seletor').sortable({scroll: true})



[+] scrollSensitivity
________

// destina-se a definir o mínimo de pixels q o ponteiro
// do mouse deve estar dos limites da viewport (qnd o item
// a ordenar atinge aqles limites) para o início da rolagem

vals: pixels
// default: 20

// inicializa o seletor em 40px a distância mínima do ponteiro
// do mouse aos limites da viewport
$('seletor').sortable({scrollSensitivity: 40})



[+] scrollSpeed
________

// define o mínimo de pixels para determinar a velocidade da rolagem

vals: pixels
// default: 20

// inicializa o seletor definindo em 100px a distância para determinar
// a velocidade de rolagem
$('seletor').sortable({scrollSpeed: 100})



[+] tolerance
________

// destina-se a definir o comportamento da ordenação durante a ação
// de arraste.

vals: 'intersect' | 'pointer'
// default: 'intersect'

// intersect : é necessário que o item arrastado cubra pelo menos 50%
//			   da área do placeholder
// pointer   : é necessário que o ponteiro do mouse entre em contato 
//			   com o placeholder

// inicializa o seletor definindo a posição do ponteiro do mouse como
// tolerância
$('seletor').sortable({tolerance: 'pointer'})



[+] z-index
________

// destina-se a definir a coordenada z dos itens ordenáveis.
// O valor padrão é 1000, o que, na maioria dos casos, é suficientemente
// alto para fazer com que os itens arrastados para ordenação se sobre-
// ponham a todos os elementos da página.

vals: inteiro
// default: 1000

// inicializa o seletor definindo em 20 a coordenada z dos itens arrastáveis
$('seletor').sortable({zIndex: 20})



[+] z-index
________

// destina-se a definir a coordenada z dos itens ordenáveis.
// O valor padrão é 1000, o que, na maioria dos casos, é suficientemente
// alto para fazer com que os itens arrastados para ordenação se sobre-
// ponham a todos os elementos da página.

vals: inteiro
// default: 1000

// inicializa o seletor definindo em 20 a coordenada z dos itens arrastáveis
$('seletor').sortable({zIndex: 20})



[+] forceHelperSize
________

// destina-se a forçar as dimensões do helper.

vals: false | true
// default: false

// inicializa o seletor forçando o helper a ter dimensões
$('seletor').sortable({forceHelperSize: true})



[+] forcePlacehoderSize
________

// destina-se a forçar as dimensões do placeholder

vals: false | true
// default: false

// inicializa o seletor forçando o placeholder a ter dimensões
$('seletor').sortable({forceHelperSize: true})



[+] connectToSortable
________

// Essa opção não é do componente Ordenar e sim do Arrastar
// permite que um elem arrastável seja incorporado a um grupo
// de elem criados com o uso do componente Ordenar

vals: 'elem DOM'
// default: false

// inicializa o seletor conectando-o aos elem-filhos do elem
// cujo valor do atributo classe seja ordem
$('seletor').sortable({connectToSortable: '.ordem'})



[-] EVENTOS



// Seguem os mecanismos de implementação dos eventos 
// tradicionais da linguagem JavaScript

// Eventos ordenar:
// 	> create
// 	> start
// 	> sort
// 	> change
// 	> beforeStop
// 	> stop
// 	> update
// 	> receive
// 	> remove
// 	> over
// 	> out
// 	> activate
// 	> deactivate



// callback 2 param

// 	> start
// 	> sort
// 	> change
// 	> beforeStop
// 	> stop
// 	> update
// 	> receive
// 	> remove
// 	> over
// 	> out
// 	> activate
// 	> deactivate

// 1º ARGUMENTO contém as informações tradicionais da
//    linguagem
// 2º ARGUMENTO contém as informações sobre o elem que
//    esta sendo arrastado seu helper

// CAUTION: para o evento create só o 1° argumento contém
// informações o segundo retorna undefined

// 2º argumento: ui (Nome de livre escolha)
//	> ui.helper 		-> retorna um obj jQuery contendo informações
//						   sobre o helper do elem que está sendo arrastado
//	> ui.position		-> retorna a posição do helper, {left, top}, em relação
//					   	   a posição inicial do elem que está sendo arrastado
//	> ui.offset			-> retorna a posição absoluta do helper, {left, top},
//					   	   em relação à página
//	> ui.item			-> retorna o item que está sendo arrastado para ordenação,
//	> ui.placeholder 	-> retorna o placeholder, se existir.
//	> ui.sender			-> retorma a lista do itens ordenáveis origem do item arrastado
//						   existe somente em listas conectadas



[|] create ()
________

// Esse evento ocorre qnd uma elem ordenável é criado

// nome designado: sortcreate

$('seletor').sortable({
	create: function(event) { ... }
})
// Idem
$('seletor').on('sortcreate', function(event) {
	...
})



[|] start ()
________

// Esse evento ocorre qnd se inicia a ação de arraste para ordenação

// nome designado: sortstart

$('seletor').sortable({
	start: function(event, ui) { ... }
})
// Idem
$('seletor').on('sortstart', function(event, ui) {
	...
})



[|] sort ()
________

// Esse evento ocorre durante a ação de arraste para ordenação

// nome designado: sort

$('seletor').sortable({
	sort: function(event, ui) { ... }
})
// Idem
$('seletor').on('sort', function(event, ui) {
	...
})



[|] change ()
________

// Esse evento ocorre durante a ação de arraste para ordenação
// tão logo o DIM tenha sido modificado

// nome designado: sortchange

$('seletor').sortable({
	change: function(event, ui) { ... }
})
// Idem
$('seletor').on('sortchange', function(event, ui) {
	...
})



[|] beforeStop ()
________

// Esse evento ocorre ao final da ação de ordenação, mas
// com o helper ou/e o placeholder ainda disponível

// nome designado: sortbeforestop

$('seletor').sortable({
	beforeStop: function(event, ui) { ... }
})
// Idem
$('seletor').on('sortbeforestop', function(event, ui) {
	...
})



[|] stop ()
________

// Esse evento ocorre ao final da ação de ordenação

// nome designado: sortstop

$('seletor').sortable({
	stop: function(event, ui) { ... }
})
// Idem
$('seletor').on('sortstop', function(event, ui) {
	...
})



[|] update ()
________

// Esse evento ocorre ao final da ação de ordenação e
// depois que o DOM tenha sido modificado

// nome designado: sortupdate

$('seletor').sortable({
	update: function(event, ui) { ... }
})
// Idem
$('seletor').on('sortupdate', function(event, ui) {
	...
})



[|] activate ()
________

// Esse evento ocorre qnd começa a ação de arraste de um item
// de uma lista ordenável conectada a outra lista

// nome designado: sortactivate

$('seletor').sortable({
	activate: function(event, ui) { ... }
})
// Idem
$('seletor').on('sortactivate', function(event, ui) {
	...
})



[|] over ()
________

// Esse evento ocorre qnd um item de uma lista ordenável 
// é colocado sobre o placeholder de uma lista conectada

// nome designado: sortover

$('seletor').sortable({
	over: function(event, ui) { ... }
})
// Idem
$('seletor').on('sortover', function(event, ui) {
	...
})



[|] out ()
________

// Esse evento ocorre qnd um item de uma lista ordenável
// é solto sobre o placeholder de um lista conectada


// nome designado: sortout

$('seletor').sortable({
	out: function(event, ui) { ... }
})
// Idem
$('seletor').on('sortout', function(event, ui) {
	...
})



[|] receive ()
________

// Esse evento ocorre qnd um item de uma lista ordenável
// é aceito como item de uma lista conectada

// nome designado: sortreceive

$('seletor').sortable({
	receive: function(event, ui) { ... }
})
// Idem
$('seletor').on('sortreceive', function(event, ui) {
	...
})



[|] remove ()
________

// Esse evento ocorre qnd um item de uma lista ordenável
// foi removido de uma lista conectada


// nome designado: sortremove

$('seletor').sortable({
	remove: function(event, ui) { ... }
})
// Idem
$('seletor').on('sortremove', function(event, ui) {
	...
})



[|] deactivate ()
________

// Esse evento ocorre qnd cessa a ação de ordenação entre
// itens de listas conectadas

// nome designado: sortdeactivate

$('seletor').sortable({
	deactivate: function(event, ui) { ... }
})
// Idem
$('seletor').on('sortdeactivate', function(event, ui) {
	...
})



[-] MÉTODOS




// Seguem os mecanismos de implementação dos métodos 
// tradicionais da linguagem JavaScript

// Métodos sortable:
//	> destroy
//	> disable
//	> enable
//	> option
//	> widget
//	> serialize
//	> toArray
//	> refresh
//	> refreshPosition
//	> cancel



[.] destroy

// destrói a capacidade de um item ou grupo de itens de ser
// ordenado, retornando ao seu estado inicial

$('seletor').sortable('destroy')



[.] disable & enable

// destinam-se a desabilitar e habilitar respectivamente
// a habilidade de ordenaç

$('seletor').sortable('disable')
$('seletor').sortable('enable')



[.] option

// permite que se definam opções para o componente ordenável


$('seletor').sortable('option', 'nome_opcao', '[valor]')
// Idem
$('seletor').sortable('option', {obj com par opcao:valor})

$('seletor').sortable('option', 'placeholder', 'pholder')
$('seletor').sortable('option', {
	cursor: 'ns-resize',
	delay: 500,
	distance: 100,
	tolerance: 'pointer',
	helper: 'clone'
})



[.] widget

// retorna o elem ao qual foi aplicado o construtor sortable()
// com ele podemos inspecionar aquele elem

var content = $('seletor').sortable('widget').text()



[.] serialize

// permite que se serialize em uma string a sequência
// de uma ordenação. O método retorna uma string formatada na
// sintaxe apropriada a ser enviada ao servidor


$('seletor').sortable('serialize' [, {}])

// o segundo parametro opcional
$('seletor').sortable('serialize', {attribute: 'class'})
// Por padrão, o atributo para serialização é o id do item ordenável
// Essa sintaxe para o segundo parâmetro altera o atributo de parseamento
// para o atributo class
$('seletor').sortable('serialize', {key: 'maujor'})
// Por padrão, o nome a serialização é o nome adotado para o atributo.
// Essa sintaxe para o segundo parâmetro altera o nome de parseamento para
// 'maujor'
$('seletor').sortable('serialize', {expression: 'expReg'})
// Por padrão, o valor do atributo de serialização é da forma 
// (.+)[_-+](.+) Essa sintaxe para o segundo parâmetro define uma expressão
// regular, alterando o formato do valor do atributo



[.] toArray

// retorna um array de strings constituido pelos valores do atributo
// ID de cada item da sequência de uma ordenação
// Por padrão, os dados que formam o array são os valores dos atributos
// ID de um segundo parâmetro, e pode-se adotar qualquer valor de ID

var ordemArray = $('.ordem').sortable('toArray')



[.] cancel

// destina-se a cancelar a possibilidade de ordenação de um item
// de um container ordenável

$('seletor').sortable('cancel')



[.] refresh

// destina-se a recarregar uma lista de intes ordenáveis para
// que novos itens acrescentados sejam reconhecidos

$('seletor').sortable('refresh')



[.] refreshPosition

// usado internamente pela biblioteca e destina-se a recarregar
// e atualizar as posições em cache dos itens de uma lista ordenável

$('seletor').sortable('refreshPosition')



= / 7 Widget Accordion (Acordeão) /



// Para criar um acordeão precisamos construir uma estrutura HTML
// predefinida

<div class="acordeao"> // container geral
	<h3><a href="#">Seção 1</a></h3> // chave de abertura da 1a sanfona
	<div> // container da 1a sanfona
		<h4>Abacate</h4>
		// marcação HTML livre
		// ...
	</div>
	<h3><a href="#">Seção 2</a></h3> // chave de abertura da 2a sanfona
	<div> // container da 1a sanfona
		<h4>Maracuja</h4>
		// marcação HTML livre
		// ...
	</div>
</div>

// Com a estrutura base basta declarar o construtor

$('.acordeao').accordion()



[-] CLASSES PARA ESTILIZAÇÃO



//* adicionadas ao container geral do acordeão
ui-accordion
ui-widget
ui-helper-reset
ui-accordion-icons

//* adicionadas ao elem h1-h6, chave de abertura da sanfona
ui-accordion-header
ui-helper-reset
ui-state-default

//* adicionada ao elem h1-h6, chave de abertura da sanfona
//  que estiver ativa (aberta)
ui-state-active

//* adicionada ao primeiro elem h1-h6, chave de abertura da sanfona
ui-corner-top

//* adicionada ao último elem h1-h6, chave da sanfona
ui-corner-bottom

//* adicionada aos elem h1-h6, chave da sanfona, do segundo ao penúltimo
ui-corner-all

//* adicionada ao elem div, container dos conteúdos
ui-accordion-content
ui-helper-reset
ui-widget-content

//* adicionada ao elem div, container dos conteúdos que estiver ativa (aberta)
ui-accordion-content-active



[-] OPÇÕES



// São parametros e seus valores que permitem configurar
// e controlar o widget

$('seletor').accordion({
	opc1: 'valor',
	opc2: 'valor',
	...
	opcN: 'valor'
})

// inspeção
var valorOpcao = $('seletor').accordion('option', 'opc')
// atribuição
$('seletor').accordion('option', 'opc', 'valor')



[+] disabled
________

// habilita/desabilita a possibilidade de se abrir
// aa sanfonas de um acordeão

vals: true | false
// default: false

$('seletor').accordion({disabled: true}) // desabilita



[+] active
________

// define qual das sanfonas estará ativa (aberta) qnd
// a página for carregada. Os valores possíveis são:
// boolean, número, seletor ou objQuery que retorne 
// o elem chave de abertura da sanfona (normalmente h1-h6)

vals: boolean | number | seletor | objQuery
// default: first-child

// inicializa o seletor definindo todas as sanfonas fechadas
$('seletor').accordion({active: false})
// define a 3a sanfona aberta (contagem em 0)
$('seletor').accordion({active: 2})



[+] animated
________

// define como será o efeito de abertura/fechamento das
// sanfonas. Os valores possíveis são: boolean e valores
// deanimação típicos da biblioteca

vals: boolean | vals_animacao_library
// default: slide

$('seletor').accordion({animated: true})
$('seletor').accordion({animated: 'easeInBounce'})
$('seletor').accordion({animated: 'bounceslide'})
$('seletor').accordion({animated: 'easeInCircle'})
$('seletor').accordion({animated: 'easeInElastic'})
$('seletor').accordion({animated: 'easeInBack'})



[+] autoHeight
________

// destina-se a controlar a altura total das sanfonas qnd abertas.
// Qnd abertas teram altura igual aquela do painel com maior quantidade
// de conteúdo

vals: true | false
// default: true

$('seletor').accordion({autoHeight: false}) // altura diferentes



[+] clearStyle
________

// destina-se a eliminar a existência de barra de rolagem vertical
// (overflow) dentro do painel de uma sanfona


vals: true | false
// default: false

// anula a necessidade de barras de rolagem qnd houver overflow
$('seletor').accordion({clearStyle: true})



[+] collapsible
________

// destina-se a definir como será o fechamento de uma sanfona
// aberta

vals: true | false
// default: false

// true : faz com q a ação de abertura tbm cause seu fechamento.
// Isso é, se uma sanfona abre com um clique, fechará não somente
// com a abertura de outra como tbm com um clique
$('seletor').accordion({collapsible: true})



[+] event
________

// destina-se a definir qual evento será responsável pela abertura/fechamento
// de uma sanfona. Valores possíveis são os eventos da linguagem javascript

vals: 'eventos javascript'
// default: click

$('seletor').accordion({event: 'mouseover'})
$('seletor').accordion({event: 'dblclick'})



[+] fillSpace
________

// destina-se a definir como será a altura da sanfona em relação
// ao seu elem-pai

vals: false | true
// default: false

// true: faz com que a sanfona, qnd aberta, se estenda por toda a 
// altura do container do acordeão
$('seletor').accordion({fillSpace: true})



[+] header
________

// destina-se a definir qual é o elem HTML, sobre o qual se exercerá
// a ação que fará a abertura/fechamento da sanfona

vals: 'elem-filho'
// default: first-child

// define o elem h4 como chave de abertura/fechamento das sanfonas
$('seletor').accordion({header: 'h4'})



[+] icons
________

// destina-se a definir ícones para os estados abertura/fechamento
// bem como ícones em geral

vals: 'icons da biblioteca'
// default: undefined

$('seletor').accordion({
	icons: {
		'header': 'ui-icon-plus',
		'headerSelected': 'ui-icon-minus'
	}
})



[+] navigation
________

// usado com a finalidade de se manter o acordeão aberto em
// determinada sanfona qnd se navega de uma página a outra
// em uma aplicação. Permite, ainda, apresentar o menu aberto,
// na sanfona correspondente, qnd se carregam páginas marcadas em
// bookmark, bem como é amigável aos mecanismos SEO. Essa opção é 
// usada em acordeões destinados a criar menus de navegação

vals: true | false
// default: true

// aplica a funcionalidade de navegação
$('seletor').accordion({navigation: true})



[+] navigationFilter
________

// destina-se a definir uma função destinada a personalizar o
// comportamento da navegação, conformte mostrado no exemplo anterior

vals: callback
// default: undefined

$('seletor').accordion({
	navigationFilter: function(){...}
})



[-] EVENTOS



// Seguem os mecanismos de implementação dos eventos 
// tradicionais da linguagem JavaScript

// Eventos accordion:
// 	> create
// 	> change
// 	> changestart



// callback 2 param

// 	> change
// 	> changestart


// 1º ARGUMENTO contém as informações tradicionais da
//    linguagem
// 2º ARGUMENTO contém as informações sobre o elem ui
// 	  do widget

// CAUTION: para o evento create só o 1° argumento contém
// informações o segundo retorna undefined

// 2º argumento: ui (Nome de livre escolha)
//	> ui.newHeader 		-> retorna objQuery de abertura/fechamento
//						   da sanfona (header) que acaba de ser aberto
//	> ui.oldHeader		-> retorna objQuery de abertura/fechamento
//						   (header) que acaba de ser fechado
//	> ui.newContent		-> retorna objQuery do conteúdo (div no nosso caso)
//						   que acaba de ser aberto
//	> ui.oldContent		-> retorna objQuery do conteúdo (div no nosso caso)
//						   que acaba de ser fechado



[|] create ()
________

// Esse evento ocorre qnd uma widget acordeão é criado

// nome designado: accordioncreate

$('seletor').accordion({
	create: function(event) { ... }
})
// Idem
$('seletor').on('accordioncreate', function(event) {
	...
})



[|] change ()
________

// Esse evento ocorre no final da abertura de uma nova sanfona

// nome designado: accordionchange

$('seletor').accordion({
	change: function(event,ui) { ... }
})
// Idem
$('seletor').on('accordionchange', function(event, ui) {
	...
})



[|] changestart ()
________

// Esse evento ocorre no início da abertura de uma nova sanfona

// nome designado: accordionchangestart

$('seletor').accordion({
	changestart: function(event,ui) { ... }
})
// Idem
$('seletor').on('accordionchangestart', function(event, ui) {
	...
})



[-] MÉTODOS




// Seguem os mecanismos de implementação dos métodos 
// tradicionais da linguagem JavaScript

// Métodos accordion:
//	> destroy
//	> disable
//	> enable
//	> option
//	> widget
//	> activate
//	> resize



[.] destroy

// destrói a capacidade de abrir/fechar de um acordeão

$('.acordeao').accordion('destroy')



[.] disable & enable

// destinam-se a desabilitar/habilitar, respectivamente
// o acordeão

$('.acordeao').accordion('disable')
$('.acordeao').accordion('enable')



[.] disable & enable

// destinam-se a desabilitar/habilitar, respectivamente
// o acordeão

$('.acordeao').accordion('disable')
$('.acordeao').accordion('enable')



[.] option

// permite que se definam opções para o componente accordion


$('.acordeao').accordion('option', 'nome_opcao', '[valor]')
// Idem
$('.acordeao').accordion('option', {opc:'val',...,opcN:'val'})



[.] widget

// retorna o elem ao qual foi aplicado o construtor accordion()

$('.acordeao').accordion('widget').addClass('abc')



[.] activate

// destina-se a ativar programaticamente uma sanfona do acordeão.
// A sanfona alvo é definida com o uso do índice do elem que a ativa,
// com a contagem em 0 ou com o uso de um seletor para chave de abertura
// Passar o parâmetro false causa o fechamento de todas as sanfonas.
// Nesse caso, é necessário definir a opção collapsible como true

$('.acordeao').accordion('activate', indiceEscolhido)



[.] resize

// destina-se a calcular automaticamente as novas alturas dos conteúdos
// das sanfonas qnd se usa a opção fillSpace e a altura do container
// varia


$('.acordeao').accordion('resize')



= / 8 Widget Autocomplete (Autocompletar) /



// Para criar um autocompletar precisamos construir uma estrutura HTML
// predefinida

<label for="frutas">Frutas:</label>
<input class="frutas" id="frutas" />

// Com a estrutura base basta declarar o construtor

// requer o uso obrigátorio de um parâmetro
// source : 'define onde deve ser buscado os valores'
// isso é necessário pq a lista não faz parte da marcação
// HTML do autor 
// o VALOR pode ser um endereço apontando para um arq JSON ou
// um array simples ou de objetos
var listaFrutas = ['Abacate', 'Abacaxi', 'Amora', 'Ameixa'];
$('.frutas').autocomplete({source: listaFrutas});



[-] CLASSES PARA ESTILIZAÇÃO



//* adicionadas ao input 
ui-autocomplete-input

//* adicionadas ao elem ul, container da lista de opções
ui-autocomplete
ui-menu
ui-widget
ui-widget-content
ui-corner-all

//* adicionada aos elem li, itens da lista 
ui-menu-item

//* adicionada ao elem a [âncora]
ui-corner-all



[-] OPÇÕES



// São parametros e seus valores que permitem configurar
// e controlar o widget

$('seletor').autocomplete({
	opc1: 'valor',
	opc2: 'valor',
	...
	opcN: 'valor'
})

// inspeção
var valorOpcao = $('seletor').autocomplete('option', 'opc')
// atribuição
$('seletor').autocomplete('option', 'opc', 'valor')



[+] disabled
________

// habilita/desabilita a possibilidade de apresentar
// uma lista de seleção

vals: true | false
// default: false

$('seletor').autocomplete({source: [...], disabled: true})



[+] minLength
________

// define qual será o número mínimo de caracteres a digitar
// para que se dê a abertura da lista

vals: int
// default: 1

$('seletor').autocomplete({source: [...], minLength: 2})



[+] autoFocus
________

// destina-se a definir se será dado o foco à primeira opção
// da lista à medida que for sendo digitado

vals: false | true
// default: false

$('seletor').autocomplete({source: [...], autoFocus: true})



[+] delay
________

// destina-se a definir um tempo de espera para a abertura da lista

vals: milissegundos
// default: 300

$('seletor').autocomplete({source: [...], delay: 600})



[+] position
________

// destina-se a posicionar a caixa contendo a lista de opções

vals: 'left top' | 'left bottom' | 'right top' | 'right bottom' |
	  'left center' | 'right center' | 'top center' | 'bottom center'
// default: default

$('seletor').autocomplete({
	source: [...],
	position: {
		my: 'left top',
		at: 'right center'
	}
})



[+] appendTo
________

// destina-se a definir um elem container para a lista de opções.
// Por padrão a lista é inserida como last-child do body

vals: 
// default: default

$('seletor').autocomplete({appendTo: '#container'})



[+] source
________

// destina-se a definir o local onde se encontra lista das opções
// do widget.


vals: array | JSON | callback
// default: undefined

$('seletor').autocomplete({source: ['a', 'b', 'c']})



[-] EVENTOS



// Seguem os mecanismos de implementação dos eventos 
// tradicionais da linguagem JavaScript

// Eventos autocomplete:
// 	> create
// 	> search
// 	> open
// 	> select
// 	> close
// 	> change



// callback 2 param

// 	> search
// 	> open
// 	> select
// 	> close
// 	> change


// 1º ARGUMENTO contém as informações tradicionais da
//    linguagem
// 2º ARGUMENTO contém as informações sobre o elem ui
// 	  do widget

// CAUTION: para o evento create só o 1° argumento contém
// informações o segundo retorna undefined



[|] create ()
________

// Esse evento ocorre qnd um autocompletar é criado

// nome designado: autocompletecreate

$('seletor').autocomplete({
	create: function(event) { ... }
})
// Idem
$('seletor').on('autocompletecreate', function(event) {
	...
})



[|] search ()
________

// Esse evento ocorre qnd uma requisição de busca por uma
// opção comece e depois que se inseriu o número mínimo de
// caracteres no campo e que o tempo de espera definido na
// opção delay tenha trascorrido

// nome designado: autocompletesearch

$('seletor').autocomplete({
	search: function(event, ui) { ... }
})
// Idem
$('seletor').on('autocompletesearch', function(event, ui) {
	...
})



[|] open ()
________

// Esse evento ocorre qnd a lista se abre

// nome designado: autocompleteopen

$('seletor').autocomplete({
	open: function(event, ui) { ... }
})
// Idem
$('seletor').on('autocompleteopen', function(event, ui) {
	...
})



[|] focus ()
________

// Esse evento ocorre qnd se dá o foco a uma opção

// nome designado: autocompletefocus

$('seletor').autocomplete({
	focus: function(event, ui) { ... }
})
// Idem
$('seletor').on('autocompletefocus', function(event, ui) {
	...
})



[|] select ()
________

// Esse evento ocorre qnd uma opção é selecionada

// nome designado: autocompleteselect

$('seletor').autocomplete({
	select: function(event, ui) { ... }
})
// Idem
$('seletor').on('autocompleteselect', function(event, ui) {
	...
})



[|] close ()
________

// Esse evento ocorre qnd a lista se fecha

// nome designado: autocompleteclose

$('seletor').autocomplete({
	close: function(event, ui) { ... }
})
// Idem
$('seletor').on('autocompleteclose', function(event, ui) {
	...
})



[|] change ()
________

// Esse evento ocorre qnd se retira o foco da lista que se
// fechou após a escolha de uma opção

// nome designado: autocompletechange

$('seletor').autocomplete({
	change: function(event, ui) { ... }
})
// Idem
$('seletor').on('autocompletechange', function(event, ui) {
	...
})



[-] MÉTODOS




// Seguem os mecanismos de implementação dos métodos 
// tradicionais da linguagem JavaScript

// Métodos autocomplete:
//	> destroy
//	> disable
//	> enable
//	> option
//	> widget
//	> search
//	> close



[.] destroy

// destrói a capacidade de de um autocompletar

$('seletor').autocomplete('destroy')



[.] disable & enable

// destinam-se a desabilitar/habilitar, respectivamente
// o autocompletar

$('seletor').autocomplete('disable')
$('seletor').autocomplete('enable')



[.] option

// permite que se definam opções para o componente Autocompletar


$('seletor').autocomplete('option', 'nome_opcao', '[valor]')
// Idem
$('seletor').autocomplete('option', {opc:'val', ..., opcN:'val'})



[.] widget

// retorna o elem ao qual foi aplicado o construtor autocomplete()

$('seletor').autocomplete('widget').find('li').eq(0).text()



[.] search

// destina-se a ativar e abrir a lista das opções de escolhas

$('seletor').autocomplete('search')



[.] close

// destina-se a fechar a lista das opções de escolha

$('seletor').autocomplete('close')



[-] ARRAY e JSON



// Array de objetos

// qnd o sorce seguir esta estrutura o auto completar irá
// considerar a prop label como chave e cria uma propriedade 
// do objeto ui denominada ui.item, cujas os pares prop/valor
// são as chaves/valores do array. Ou seja, para a escolha da
// opção Abacate temos:

ui.item.label
ui.item.descricao
ui.item.url

var source = [
	{label: 'Abacate', descricao: 'O Abacate...', url: '../abacate.png'},
	{label: 'Morango', descricao: 'O Morango...', url: '../morango.png'},
	{label: 'Ameixa',  descricao: 'O Ameixa...',  url: '../ameixa.png'}
];



// JSON

// Seguem os mesmos princípios dos array de objetos mais só que 
// com uma vasta possibilidade de valores já que podemos fazer
// requisição AJAX

$('#cidade').autocomplete({
	source: function(request, response) {
		$.ajax({
			url: 'http://ws.geonames.org/searchJSON',
			dataType: 'json',
			data: {
				country: sigla,
				username: 'maujor',
				name_startsWith: request.term
			},
			success: function(data) {
				response( $.map(data.geonames, function(item) {
					if (item.countryName == 'pais') {
						return {
							label: item.name +', '+ item.adminName1,
							cidade: item.name,
							estado: item.adminName1,
							latitude: item.lat,
							longitude: item.lng,
							populacao: item.population ? item.population : 'Não disponível'
						}
					} else {
						return false
					}
				}))
			}
		})
	}
})



= / 9 Widget Button (Botão) /



<button type="button" class="btn">Botao</button>
<input type="button" value="Botao" class="btn" />
<input type="submit" value="Submit" class="btn" />
<input type="reset" value="Reset" class="btn" />
<a href="#" class="btn">Botao</a>

// Com a devida estrutura montada basta declarar
$('.btn').button()



[-] OPÇÕES



// São parametros e seus valores que permitem configurar
// e controlar o widget

$('seletor').button({
	opc1: 'valor',
	opc2: 'valor',
	...
	opcN: 'valor'
})

// inspeção
var valorOpcao = $('seletor').button('option', 'opc')
// atribuição
$('seletor').button('option', 'opc', 'valor')



[+] disabled
________

// habilita/desabilita a possibilidade de estilização
// de um botão

vals: true | false
// default: false

$('seletor').button({disabled: true})



[+] icons
________

// possibilita a inserção de um ícone nativo (ou
// personalizado) no botão. O valor dessa opção
// é o nome de uma classe destinada a inserir o
// ícone.

// primary:		posiciona à esquerda
// secondary:	posiciona à direita

// ATENCÃO: para inserir ícones em botões os mecanismos da
// biblioteca criam elem span como filhos do elem botão
// por esse motivo é não possível iserir ícones em elem
// INPUT apenas A e BUTTON


vals: 'classe de incons'
// default: undefined

$('seletor').button({
	icons: {
		primary: 'ui-icon-gear',
		secondary: 'ui-icon-search'
	}
})



[+] label
________

// destina-se a definir um texto substituto para
// o texto padrão do botão

vals: 'livre-escolha'
// default: undefined

$('seletor').button({label: 'Buscar'})



[-] EVENTOS



// Seguem os mecanismos de implementação dos eventos 
// tradicionais da linguagem JavaScript

// Eventos button:
// 	> create

// 1º ARGUMENTO contém as informações tradicionais da



[|] create ()
________

// Esse evento ocorre qnd um elem botão é criado

// nome designado: buttoncreate

$('seletor').button({
	create: function(event) { ... }
})
// Idem
$('seletor').on('buttoncreate', function(event) {
	...
})



[-] MÉTODOS




// Seguem os mecanismos de implementação dos métodos 
// tradicionais da linguagem JavaScript

// Métodos button:
//	> destroy
//	> disable
//	> enable
//	> option
//	> widget



[.] destroy

// destrói a estilização diferenciada do botão

$('seletor').button('destroy')



[.] disable & enable

// destinam-se a desabilitar/habilitar, respectivamente
// a estilização diferenciada dos botões

$('seletor').button('disable')
$('seletor').button('enable')



[.] option

// permite que se definam opções para o widget Botão

$('seletor').button('option', 'nome_opcao', '[valor]')
// Idem
$('seletor').button('option', {opc:'val', ..., opcN:'val'})



[.] widget

// retorna o elem ao qual foi aplicado o construtor button()

$('seletor').button('widget').text()



[.] refresh

// destina-se a atualizar o estado de um botão qnd de sua
// mudança com o uso de programação. É útil para atualizar
// a mudança de seleções em checkboxes e botões radio.

$('seletor').button('refresh')



[\] MÉTODO BUTTONSET



// destinado a criar um conjunto de botões. Esse construtor
// tem a finalidade de agrupar conjuntos de elem input dos
// tipos CHECKBOX e RADIO dando-lhes a aparência idêntica à
// dos botões

// CHECKBOX

$('#checkboxes').buttonset()

<p id="checkboxes"> // necessário container
	<input type="checkbox" id="aba">
	<label for="aba">Abacate</label>
	<input type="checkbox" id="abx">
	<label for="abx">Abacaxi</label>
	...
	<input type="checkbox" id="cup">
	<label for="cup">Cupuaçu</label>
</p>


// RADIO

$('#radios').buttonset()

<p id="radios"> // necessário container
	<input type="radio" id="aba">
	<label for="aba">Abacate</label>
	<input type="radio" id="abx">
	<label for="abx">Abacaxi</label>
	...
	<input type="radio" id="cup">
	<label for="cup">Cupuaçu</label>
</p>



= / 10 Widget Datepicker (Seletor de Datas) /



// Estrutura base HTML
<label for="data">Data:</label>
<input type="text" id="data" />

// construtor
$('#data').datepicker()



[-] OPÇÕES



// São parametros e seus valores que permitem configurar
// e controlar o widget

$('seletor').datepicker({
	opc1: 'valor',
	opc2: 'valor',
	...
	opcN: 'valor'
})

// inspeção
var valorOpcao = $('seletor').datepicker('option', 'opc')
// atribuição
$('seletor').datepicker('option', 'opc', 'valor')



[+] disabled
________

// habilita/desabilita a possibilidade de se entrar datas
// no campo

vals: true | false
// default: false

$('seletor').datepicker({disabled: true})



[+] altField
________

// define um campo alternativo para a entrada da data
// selecionada

vals: 'elem DOM'
// default: undefined

// inicializa o seletor definindo que a data escolhida
// será lançada no campo #campo2
$('seletor').datepicker({altField: '#campo2'})



[+] altFormat
________

// usada juntamente com a opção altField, destina-se a
// definir um formato de data diferente para o campo alternativo

/*------------+--------------------------+
 | caractere  | descrição				 |
 +------------+--------------------------+
 | d   		  | dia do mês (1 dig)		 |
 | dd		  | dia do mês (2 dig)		 |
 | D		  | abrev nome dia semana	 |
 | DD		  | extenso nome dia semana	 |
 | m		  | mês (1 dig)				 |
 | mm		  | mês (2 dig)				 |
 | M		  | abrev nome mês			 |
 | MM		  | extenso nome mês		 |
 | y		  | ano (2 dig)				 |
 | yy		  | ano (4 dig)				 |
 | @		  | timestamp (mls 1/1/1970) |
 | !		  | (100 nanoseg 1/1/0001)	 |
 | '...'	  | texto					 |
 | ''		  | aspas simples			 |
 | qlqr other | texto literal			 |
 +------------+--------------------------*/

// CONSTANTES
// ...consultar book...


$('seletor').datepicker({
	altField: '#campo2',
	altFormat: "dd 'de' MM 'de' yy - DD"
})
// input:	30/03/2012
// output:	30 de Março de 2012 - Sexta-feira



[+] appendText
________


// destina-se a inserir um conteúdo textual à direita do
// campo de entrada da data

vals: 'texto-livre'
// default: undefined

$('seletor').datepicker({appendText: '(dd/mm/yyyy)'})



[+] showOtherMonths
________


// Exibe os dias do mês anterior e seguinte
// completando a matriz 7 x 5

vals: false | true
// default: false

$('seletor').datepicker({showOtherMonths: true})



[+] selectOtherMonths
________


// atua junto ao showOtherMonths permitindo
// selecionar as datas do mês anterior/seguinte

vals: false | true
// default: false

$('seletor').datepicker({selectOtherMonths: true})



[+] showWeek
________


// destina-se a criar uma coluna à esquerda no seletor
// de datas e mostrar o número de ordem da semana. A contagem
// por padrão, é feita com base no que prescreve a ISO 8601

vals: false | true
// default: false

$('seletor').datepicker({showWeek: true})



[+] calculateWeek
________

// destina-se a definir uma função, retornando o número de
//ordem para a semana de um determinado dia do ano. Esse n
// servirá de base para a ordem das demais semanas do ano

vals: callback
// default: undefined

$('seletor').datepicker({ showWeek: function(){...} })



[+] firstDay
________

// destina-se a definir qual é o dia da semana a ser mostrado
// na primeira coluna dos dias no seletor de datas. Por padrão
// o dia é o domingo, que equivale ao valor 0 (zero)

vals: 0..6 [dom..seg]
// default: 0

$('seletor').datepicker({firstDay: 6}) // define segunda-feira 



[+] stepMonths
________

// destina-se a definir a navegação pelos meses qnd o usuário
// clica os link para avançar e recuar o mês. O valor padrão é 1
// ou seja recua/avança 1 mês de cada vez

vals: int
// default: 1

$('seletor').datepicker({stepMonths: 2}) // 2 meses de uma vez



[+] autoSize
________

// ajusta automaticamente a largura do campo de data, de modo
// a acomodar a data no formato que foi definido

vals: false | true
// default: false

// inicializa com ajuste automático
$('seletor').datepicker({autoSize: true})



[+] dateFormat
________

// destina-se a definir o formato da data

vals: 'format-date'
// default: false

$('seletor').datepicker({dateFormat: 'dd/mm/yyyy'})



[+] changeMonth
________

// define um campo do tipo select para navegação pelos meses
// no seletor de datas

vals: false | true
// default: false

// define a existencia do campo de seleção do mês
$('seletor').datepicker({changeMonth: true})



[+] changeYear
________

// define um campo do tipo select para a navegação do ano

vals: false | true
// default: false

// define a existencia do campo de seleção do ano
$('seletor').datepicker({changeYear: true})



[+] yearRange
________

// destina-se a definir a faixa de anos selecionáveis

vals: '-aa:+aa'
// default: '-10:+10'

// define a existencia do campo de seleção do ano
$('seletor').datepicker({yearRange: '-15:+5'})



[+] maxDate
________

// define até que data futura a seleção é possível

vals:
// +6		: até 6 dias à frente
// +1w		: até 1 semana à frente
// +1m		: até 1 mês à frente
// +2y		: até 2 anos à frente
// +6 +3m	: desde 6 dias até 3 meses à frente
// new Date	: obj javascript Date

// default: undefined

$('seletor').datepicker({maxDate: '+1y'})



[+] minDate
________

// define até que data passada a seleção é possível

vals:
// -8		: até oito dias antes
// -3w		: até três semanas antes
// -3m		: até 3 mês antes
// -5y		: até 5 anos antes
// -2m -3y	: desde 3 anos até 2 meses antes
// new Date	: obj javascript Date

// default: undefined

$('seletor').datepicker({
	maxDate: '+3m',
	minDate: '-2w'
})



[+] hideIfNoPrevNext
________

// destina-se a esconder os links avançar e recuar de
// navegação pelos meses qnd eles estão desabilitados.
// Por padrão, tais links são desabilitados qnd usamos 
// as opções maxDate e minDate

vals: false | true
// default: false

// links pelos meses desabilitados escondidos
$('seletor').datepicker({hideIfNoPrevNext: true})



[+] defaultDate
________

// destina-se a definir a data a ser mostrada qnd o
// seletor de datas é aberto

vals: Idem maxDate & minDate

// links pelos meses desabilitados escondidos
$('seletor').datepicker({defaultDate: '+4m'})



[+] numberOfMonths
________

// destina-se a definir o n de meses a ser mostrado qnd
// o seletor de datas é aberto

vals: int | [1,c]
// inteiro definindo a quant de meses dispostos
// um ao lado do outro ou um array do tipo [1, c]
// que define a apresentação segundo um grid de linha por
// c colunas

// mostrando 3 meses em linha
$('seletor').datepicker({numberOfMonths: 3})
// mostra 2 meses em um grid de 3 rows 2 cols
$('seletor').datepicker({numberOfMonths: [3,2]})



[+] showCurrentAtPos
________

// destina-se a definir qual será a posição ocupada pelo mês
// atual em um seletor de datas que mostre mais de um mês

vals: int

$('seletor').datepicker({
	numberOfMonths: 3,
	showCurrentAtPos: 2
})



[+] showAnim
________

// destina-se a definir um efeito de animação para a abertura/fechamento
// do seletor de datas

vals: necessario linkar a pagina ao modulo effects da library
// default: show

$('seletor').datepicker({showAnim: 'slide'})
$('seletor').datepicker({showAnim: 'bounce'})



[+] duration
________

// destina-se a definir o tempo de duração da abertura/fechamento

vals: milissegundos
// default: 300

$('seletor').datepicker({duration: 2000})



[+] showOn
________

// destina-se a definir um botão para a abertura do seletor de
// datas

vals: 'button' | 'both' | 'focus'
// focus	: foco no campo
// button	: cria um botao ao lado
// both		: botao + focus

// default: focus

$('seletor').datepicker({showOn: 'button'})



[+] buttonText
________

// destina-se a definir um texto para ser colocado no botão de abertura

vals: 'texto-livre'

$('seletor').datepicker({
	showOn: 'button',
	buttonText: 'Mostrar Calendário'
})



[+] buttonImage
________

// destina-se a definir uma imagem para ser usada no lugar do texto

vals: 'URL'

$('seletor').datepicker({
	showOn: 'button',
	buttonText: 'Mostrar Calendário',
	buttonImage: '../images/icon-cal.png'
})



[+] buttonImageOnly
________

// destina-se a retirar o botão inserido, aplicando somente a imagem

vals: false | true
// default: false

$('seletor').datepicker({
	showOn: 'button',
	buttonText: 'Mostrar Calendário',
	buttonImage: '../images/icon-cal.png',
	buttonImageOnly: true
})



[+] showButtonPanel
________

// destina-se a mostrar um painel com botão na parte inferior do
// do seletor de datas

vals: false | true
// default: false

$('seletor').datepicker({showButtonPanel: true})



[+] Opção de Internacionalização

// [/exemplos/c10opcao-loxalizacao.html]



[-] EVENTOS



// Seguem os mecanismos de implementação dos eventos 
// tradicionais da linguagem JavaScript

// Eventos button:
// 	> create
// 	> beforeShow
// 	> beforeShowDay
// 	> onChangeMonthYear
// 	> onClose
// 	> onSelect

// IMPORTANTE :: observar que os param não são iguais aos dos 
//				 antigos widgets



[|] create () 
________


// Ver funcionalidade no site oficial
// o escritor não tinha tais dados na época


[|] beforeShow ()
________

// Esse evento ocorre antes da abertura do seletor.
// OBS.: Não existe um nome para designar esse tipo de evento

// 1º PARAM	: retorna elem input
// 2º PARAM	: instância corrente do Datepicker

$('seletor').button({
	beforeShow: function(input, inst) { ... }
})



[|] beforeShowDay ()
________

// Esse evento ocorre antes da inserção do dia no campo
// OBS.: Não existe um nome para designar esse tipo de evento

// 1º PARAM	: retorna a objeto Date contendo os dias do seletor

$('seletor').button({
	beforeShowDay: function(date) { ... }
})



[|] onChangeMonthYear ()
________

// Esse evento ocorre qnd se navega para um novo mês ou ano
// OBS.: Não existe um nome para designar esse tipo de evento

// 1º PARAM	: ano
// 2º PARAM	: mês (1-12) para qual se navegou
// 3º PARAM	: instância Datepicker

$('seletor').button({
	onChangeMonthYear: function(year, month, inst) { ... }
})



[|] onClose ()
________

// Esse evento ocorre antes do fechamento do seletor
// OBS.: Não existe um nome para designar esse tipo de evento

// 1º PARAM	: retorna a data selecionada
// 2º PARAM	: instância Datepicker


$('seletor').button({
	onClose: function(dateText, inst) { ... }
})



[|] onSelect ()
________

// Esse evento ocorre após a seleção de uma data
// OBS.: Não existe um nome para designar esse tipo de evento

// 1º PARAM	: retorna a data selecionada
// 2º PARAM	: instância Datepicker


$('seletor').button({
	onSelect: function(dateText, inst) { ... }
})



[-] MÉTODOS




// Seguem os mecanismos de implementação dos métodos 
// tradicionais da linguagem JavaScript

// Métodos datepicker:
//	> destroy
//	> disable
//	> enable
//	> option
//	> widget
//	> dialog
//	> isDisabled
//	> hide
//	> show
//	> refresh
//	> getDate
//	> setDate



[.] destroy

// destrói a capacidade de abrir/fechar um seletor de datas

$('seletor').datepicker('destroy')



[.] disable & enable

// destinam-se a desabilitar/habilitar, respectivamente
// a funcionalidade do datepicker

$('seletor').datepicker('disable')
$('seletor').datepicker('enable')



[.] option

// permite que se definam opções para o widget Datepicker

$('seletor').datepicker('option', 'numberOfMonths', 3)
// Idem
$('seletor').datepicker('option', {
	showOn: true,
	showAnim: 'fold',
	duration: 600
})



[.] widget

// retorna o elem ao qual foi aplicado o construtor datepicker()

$('seletor').datepicker('widget').attr('id')



[.] dialog

// destina-se a abrir o seletor de datas em uma janela
// tipo caixa de diálogo. O método admite 5 params:

$('seletor').datepicker('dialog', date , [onSelect], [setting], [pos])

// dialog	: defini a abertura do seletor de datas em uma janela de diálogo
// date		: uma string ou método do obj Date em uma janela de diálogo
// onSelect	: exeta callback qnd há uma seleção
// setting	: novas configurações para o seletor de datas
// pos		: posição do seletor de datas. Padrão é o centro da tela

$('seletor').datepicker('dialog', new Date)



[.] isDisabled

// inspeciona a condição de habilitação do seletor de datas

$('seletor').datepicker('isDisabled')



[.] hide

// fecha o datepicker

$('seletor').datepicker('hide')



[.] show

// abre o datepicker

$('seletor').datepicker('show')



[.] refresh

// recarrega um seletor de datas após nele terem sido
// feitas modificações

$('seletor').datepicker('refresh')



[.] getDate

// destina-se a recuperar o valor de uma data selecionada


$('seletor').datepicker('getDate')



[.] setDate

// destina-se a definir o valor de uma data

$('seletor').datepicker('setDate', new Date) 	// data atual
$('seletor').datepicker('setDate', '20/6/2012') // data especifica
$('seletor').datepicker('setDate', '+7') 		// num dias a partir data atual
$('seletor').datepicker('setDate', '+3w') 		// notação de datas da library



= / 11 Widget Dialog (Janela de Diálogo) /



// Estrutura base HTML

<div class="dialog" title="Janela de diálogo básica">
	<h4>Abacate</h4>
	<p>
		<img src="../image.png">
		O abacate é o pseudofruto...
	</p>
</div>


// construtor
$('.dialog').dialog()



[-] CLASSES PADRÃO

//* add ao elem container geral
ui-dialog
ui-widget
ui-widget-content

//* add ao elem div do título da jan
ui-dialog-titlebar
ui-widget-header

//* add ao elem span container do titulo da jan
ui-dialog-title-1



[-] OPÇÕES



// São parametros e seus valores que permitem configurar
// e controlar o widget

$('seletor').dialog({
	opc1: 'valor',
	opc2: 'valor',
	...
	opcN: 'valor'
})

// inspeção
var valorOpcao = $('seletor').dialog('option', 'opc')
// atribuição
$('seletor').dialog('option', 'opc', 'valor')



[+] disabled
________

// habilita/desabilita a possibilidade de se abrir
// a janela de diálogo

vals: true | false
// default: false

$('seletor').dialog({disabled: true})



[+] modal
________

// permite que se transforme a jan de diálogo em jan com
// efeito modal

vals: true | false
// default: false

$('seletor').dialog({modal: true}) // abre como modal



[+] title
________

// destina-se a definir um título para a jan de diálogo

vals: 'text-liver'
// default: undefined

$('seletor').dialog({title: 'Título da Janela'}) // sobrescreve attr title



[+] resizable
________

// destina-se a fazer com que a jan de diálogo seja dimensionável. Para 
// isso é necessário que a library resizable seja linkada

vals: false | true
// default: false

$('seletor').dialog({resizable: true})



[+] draggable
________

// destina-se a fazer com que a jan de diálogo seja arrastável. Para 
// isso é necessário que a library draggable seja linkada

vals: false | true
// default: false

$('seletor').dialog({draggable: true})



[+] minWidth
________

// defini uma largura mínima para a jan de diálogo

vals: pixels
// default: 150px

$('seletor').dialog({minWidth: 400})



[+] maxWidth
________

// defini uma altura máxima para a jan de diálogo

vals: pixels
// default: undefined

$('seletor').dialog({maxWidth: 600})



[+] minHeight
________

// defini uma altura mínima para a jan de diálogo

vals: pixels
// default: 150px

$('seletor').dialog({minHeight: 350})



[+] maxHeight
________

// defini uma altura máxima para a jan de diálogo

vals: pixels
// default: 150px

$('seletor').dialog({maxHeight: 500})



[+] width
________

// defini largura fixa

vals: pixels
// default: 300px

$('seletor').dialog({width: 500})



[+] height
________

// defini altura fixa

vals: pixels
// default: 300px

$('seletor').dialog({height: 180})



[+] autoOpen
________

// defini abertura automática

vals: false | true
// default: false

$('seletor').dialog({autoOpen: true}) // abre automaticamente



[+] button
________

// defini a inserção de botões na parte inferior da jan

vals: {'nome-button': callbach}
// default: undefined

$('seletor').dialog({
	button: {
		'Fechar': function(event){
			$(this).dialog('close')
		},
		'CSS': function(event){
			$(this).css({
				fontSize: 14,
				color: 'red'
			})
		}
	}
})



[+] closeOnEscape
________

// defini se a ação do usuário na tela ESC fechará a jan
// de diálogo

vals: false | true
// default: false

$('seletor').dialog({closeOnEscape: true})



[+] show
________

// defini um efeito de animação par a abertura da jan
// de diálogo. Podemos definir slide sem a library effect

vals: false | 'slide' | library effect...
// default: false

$('seletor').dialog({show: 'slide'})



[+] hide
________

// define um efeito de animação para o fechamento da jan
// de diálogo. Podemos definir slide sem a library effect


vals: false | 'slide' | library effect...
// default: false

$('seletor').dialog({hide: 'slide'})



[+] position
________

// define o posicionamento da jan de diálogo

vals: 'center' | 'top' | 'right' | 'bottom' | 'left' | 
[x,y] | ['left', 'top']
// default: center

$('seletor').dialog({position: [10, 30]})



[+] closeText
________

// define um texto padrão para o botão fechar da jan de
// diálogo

vals: 'texto-livre'
// default: 'X'

$('seletor').dialog({closeText: 'Fechar'})



[+] dialogClass
________

// define um valor para o atributo classe do container
// geral do widget

vals: 'classe-livre'
// default: undefined

$('seletor').dialog({dialogClass: 'dialog-um'})



[+] stack
________

// destina-se a controlar o empilhamento das jans de diálogo

vals: false | true
// default: undefined

$('seletor').dialog({stack: true})



[+] z-index
________

// destina-se definir a prop CSS z-index da jan de diálogo

vals: int
// default: 1000

$('seletor').dialog({zIndex: 2000})



[-] EVENTOS



// Seguem os mecanismos de implementação dos eventos 
// tradicionais da linguagem JavaScript

// Eventos dialog:
// 	> create
// 	> beforeClose
// 	> open
// 	> focus
// 	> dragStart
// 	> drag
// 	> dragStop
// 	> resizeStart
// 	> resize
// 	> resizeStop
// 	> close

// callback 2 param

// 	> dragStart
// 	> drag
// 	> dragStop
// 	> resizeStart
// 	> resize
// 	> resizeStop



// 1º ARGUMENTO contém as informações tradicionais da
//    			linguagem
// 2º ARGUMENTO contém as informações sobre o elem ui
// 	 			do widget

// CAUTION: para o evento create só o 1° argumento contém
// informações o segundo retorna undefined



[|] create () 
________


// ocorre qnd uma jan de diálogo é criada

// nome designado: dialogcreate

$('seletor').dialog({
	create: function(event) { ... }
})
// Idem
$('seletor').on('dialogcreate', function(event) {
	...
})



[|] beforeClose () 
________


// ocorre imediatamente antes do fechamento da jan
// de diálogo

// nome designado: dialogbeforeclose

$('seletor').dialog({
	beforeClose: function(event) { ... }
})
// Idem
$('seletor').on('dialogbeforeclose', function(event) {
	...
})



[|] open () 
________


// ocorre qnd a jan de diálogo é aberta

// nome designado: dialogopen

$('seletor').dialog({
	open: function(event,ui) { ... }
})
// Idem
$('seletor').on('dialogopen', function(event,ui) {
	...
})



[|] focus () 
________


// ocorre qnd é dado o foco à jan de diálogo

// nome designado: dialogfocus

$('seletor').dialog({
	focus: function(event,ui) { ... }
})
// Idem
$('seletor').on('dialogfocus', function(event,ui) {
	...
})



[|] dragStart () 
________


// ocorre qnd se inicia uma ação de arraste da jan de diálogo

// nome designado: dialogdragstart

$('seletor').dialog({
	dragStart: function(event,ui) { ... }
})
// Idem
$('seletor').on('dialogdragstart', function(event,ui) {
	...
})



[|] drag () 
________


// ocorre durante a ação de arraste da jan de diálogo

// nome designado: dialogdrag

$('seletor').dialog({
	drag: function(event,ui) { ... }
})
// Idem
$('seletor').on('dialogdrag', function(event,ui) {
	...
})



[|] dragStop () 
________


// ocorre qnd termina uma ação de arraste da jan de diálogo

// nome designado: dialogdragstop

$('seletor').dialog({
	dragStop: function(event,ui) { ... }
})
// Idem
$('seletor').on('dialogdragstop', function(event,ui) {
	...
})



[|] resizeStart () 
________


// ocorre qnd termina se inicia uma ação de redimensionamento
// da jan de diálogo

// nome designado: dialogresizestart

$('seletor').dialog({
	resizeStart: function(event,ui) { ... }
})
// Idem
$('seletor').on('dialogresizestart', function(event,ui) {
	...
})



[|] resizeStart () 
________


// ocorre qnd termina se inicia uma ação de redimensionamento
// da jan de diálogo

// nome designado: dialogresizestart

$('seletor').dialog({
	resizeStart: function(event,ui) { ... }
})
// Idem
$('seletor').on('dialogresizestart', function(event,ui) {
	...
})



[|] resize () 
________


// ocorre durante a ação de redimensionamento


// nome designado: resize

$('seletor').dialog({
	resize: function(event,ui) { ... }
})
// Idem
$('seletor').on('dialogresize', function(event,ui) {
	...
})




[|] resizeStop () 
________


// ocorre qnd termina a ação de redimensionamento


// nome designado: resize

$('seletor').dialog({
	resizeStop: function(event,ui) { ... }
})
// Idem
$('seletor').on('dialogresizestop', function(event,ui) {
	...
})



[|] close () 
________


// ocorre qnd a jan de diálogo é fechada


// nome designado: closedialog

$('seletor').dialog({
	close: function(event,ui) { ... }
})
// Idem
$('seletor').on('closedialog', function(event,ui) {
	...
})



[-] MÉTODOS



// Seguem os mecanismos de implementação dos métodos 
// tradicionais da linguagem JavaScript

// Métodos draggable:
//	> destroy
//	> disable
//	> enable
//	> option
//	> widget
//	> close
//	> isOpen
//	> moveToTop
//	> open



[.] destroy

// destrói a capacidade de mostrar/esconder a jan de diálogo

$('seletor').dialog('destroy')



[.] disable & enable

// destina-se a desabilitar/habilitar respectivamente a funcionalidade
// de abertura/fechamento da jan de diálogo

$('seletor').dialog('disable')
$('seletor').dialog('enable')



[.] option

// permite que se defina opções para o widget de jan de diálogos

$('seletor').dialog('option', 'zIndex', 2000)



[.] widget

// retorna o elem div container da jan de diálogo

$('seletor').dialog('option', 'zIndex', 2000)



[.] close

// fecha a jan de diálogo

$('seletor').dialog('close')



[.] isOpen

// retorna true se a jan estiver aberta e false caso fechada

$('seletor').dialog('isOpen')



[.] moveToTop

// move a jan para uma posi mais a frente qnd existe uma pilha

$('seletor').dialog('moveToTop')



= / 11 Widget Dialog (Janela de Diálogo) /



// Estrutura base HTML

<div class="dialog" title="Janela de diálogo básica">
	<h4>Abacate</h4>
	<p>
		<img src="../image.png">
		O abacate é o pseudofruto...
	</p>
</div>


// construtor
$('.dialog').dialog()



[-] CLASSES PADRÃO

//* add ao elem container geral
ui-dialog
ui-widget
ui-widget-content

//* add ao elem div do título da jan
ui-dialog-titlebar
ui-widget-header

//* add ao elem span container do titulo da jan
ui-dialog-title-1



[-] OPÇÕES



// São parametros e seus valores que permitem configurar
// e controlar o widget

$('seletor').dialog({
	opc1: 'valor',
	opc2: 'valor',
	...
	opcN: 'valor'
})

// inspeção
var valorOpcao = $('seletor').dialog('option', 'opc')
// atribuição
$('seletor').dialog('option', 'opc', 'valor')



[+] disabled
________

// habilita/desabilita a possibilidade de se abrir
// a janela de diálogo

vals: true | false
// default: false

$('seletor').dialog({disabled: true})




= / 12 Widget Progressbar (Barra de Progresso) /




// Estrutura HTML

<div class="progresso"></div>

$('.progresso').progressbar()



[-] CLASSE PARA ESTILIZAÇÃO


//* add ao div container geral da barra de progresso
ui-progressbar
ui-widget
ui-widget-content

//* add ao elem div elem-filho do container geral,
//  inserido dinâmicamente pela library destina a ser
//  o container q marca o valor
ui-progressbar-value
ui-widget-header



[-] OPÇÕES



// São parametros e seus valores que permitem configurar
// e controlar o widget

$('seletor').dialog({
	opc1: 'valor',
	opc2: 'valor',
	...
	opcN: 'valor'
})

// inspeção
var valorOpcao = $('seletor').dialog('option', 'opc')
// atribuição
$('seletor').dialog('option', 'opc', 'valor')



[+] value
________

// permite que se defina o valor do progresso

vals: 0..100%
// default: 0

$('seletor').progressbar({value: 30})



[+] disabled
________

// habilita/desabilita o funcionamento da barra

vals: true | false
// default: false

$('seletor').progressbar({disabled: true})



[-] EVENTOS



// Seguem os mecanismos de implementação dos eventos 
// tradicionais da linguagem JavaScript

// Eventos progressbar:
// 	> create
// 	> change
// 	> complete


// callback 2 param

// 	> change
// 	> complete



// 1º ARGUMENTO contém as informações tradicionais da
//    			linguagem
// 2º ARGUMENTO contém as informações sobre o elem ui
// 	 			do widget

// CAUTION: para o evento create só o 1° argumento contém
// 			informações o segundo retorna undefined



[|] create () 
________


// ocorre qnd uma barra de progresso é criada

// nome designado: progressbarcreate

$('seletor').progressbar({
	create: function(event) { ... }
})
// Idem
$('seletor').on('progressbarcreate', function(event) {
	...
})



[|] change () 
________


// ocorre toda vez q o valor da barra é atualizado

// nome designado: progressbarchange

$('seletor').progressbar({
	change: function(event, ui) { ... }
})
// Idem
$('seletor').on('progressbarchange', function(event, ui) {
	...
})



[|] complete () 
________


// ocorre qnd o valor da barra atinge 100%

// nome designado: progressbarcomplete

$('seletor').progressbar({
	complete: function(event, ui) { ... }
})
// Idem
$('seletor').on('progressbarcomplete', function(event, ui) {
	...
})



[-] MÉTODOS



// Seguem os mecanismos de implementação dos métodos 
// tradicionais da linguagem JavaScript

// Métodos progressbar:
//	> destroy
//	> disable
//	> enable
//	> option
//	> widget
//	> value




[.] destroy

// destrói a funcionalidade barra de progresso

$('seletor').progressbar('destroy')



[.] disable & enable

// destina-se a desabilitar/habilitar respectivamente a funcionalidade
// barra de progresso

$('seletor').progressbar('disable')
$('seletor').progressbar('enable')



[.] option

// permite que se defina opções para o widget barra de progresso

$('seletor').progressbar('option', 'value', 60)



[.] widget

// retorna o elem div container da barra de progresso

$('seletor').progressbar('widget')



[.] value

// destina-se a inspecionar ou definir o valor da barra

$('seletor').progressbar('value', [valor])




= / 13 Widget Slider (Controle Deslizante) /




// Estrutura HTML

<div class="desliza"></div>

$('.desliza').slider()



[-] CLASSE PARA ESTILIZAÇÃO


//* add ao div container geral
ui-slider
ui-widget
ui-widget-content

//* add ao elem a gerado como filho do geral
//  é destina a servir de container para o deslizante
ui-slider-handle
ui-state-default
ui-state-active

//* arredonda cantos em geral
ui-corner-all



[-] OPÇÕES



// São parametros e seus valores que permitem configurar
// e controlar o widget

$('seletor').slider({
	opc1: 'valor',
	opc2: 'valor',
	...
	opcN: 'valor'
})

// inspeção
var valorOpcao = $('seletor').slider('option', 'opc')
// atribuição
$('seletor').slider('option', 'opc', 'valor')



[+] disabled
________

// destina-se a habilitar/desabilitar o controle deslizante

vals: false | true
// default: false

$('seletor').slider({disabled: true})



[+] step
________

// permite que se defina um valor diferente de 1 para aquela
// seleção

vals: false | true
// default: false

$('seletor').slider({step: 10})



[+] animate
________

// define um efeito de animação para o botão de um controle 
// deslizante

vals: 'fast' | 'slow' | 'normal' | false | milissegundos
// default: false

$('seletor').slider({animate: 'slow'})
$('seletor').slider({animate: 2000})



[+] value
________

// define um valor de seleção para o controle deslizante

vals: int
// default: 0

$('seletor').slider({value: 45})



[+] values
________

// define múltiplos botões dearraste com a finalidade de 
// selecionar múltiplos valores ao mesmo tempo

vals: [val1, val2, ..., valN]
// default: undefined

$('seletor').slider({values: [10, 45, 93] })



[+] min
________

// destina-se a definir o valor mínimo para a seleção no controle
// deslizante

vals: int
// default: undefined

$('seletor').slider({min: 25})



[+] max
________

// destina-se a definir o valor máximo para a seleção no controle
// deslizante

vals: int
// default: undefined

$('seletor').slider({max: 90})



[+] range
________

// destina-se a estilizar de forma diferentciada uma determinada
// faixa de valores de um controle arrastável

vals: false | true | 'max' | 'min'
// default: false

$('seletor').slider({range: true})



[+] orientation
________

// destina-se a posicionar o controle deslizante

vals: 'horizontal' | 'vertical'
// default: horizontal

$('seletor').slider({orientation: 'vertical'})



[-] EVENTOS



// Seguem os mecanismos de implementação dos eventos 
// tradicionais da linguagem JavaScript

// Eventos slider:
// 	> create
// 	> start
// 	> stop
// 	> change
// 	> slide


// callback 2 param

// 	> start
// 	> stop
// 	> change
// 	> slide


// 1º ARGUMENTO contém as informações tradicionais da
//    			linguagem
// 2º ARGUMENTO contém as informações sobre o elem ui
// 	 			do widget

// CAUTION: para o evento create só o 1° argumento contém
// 			informações o segundo retorna undefined



[|] create () 
________

// ocorre qnd uma controle deslizante é criado

// nome designado: slidercreate

$('seletor').slider({
	create: function(event) { ... }
})
// Idem
$('seletor').on('slidercreate', function(event) {
	...
})



[|] start () 
________

// ocorre no instante que se inicia a ação de arraste
// do botão deslizante

// nome designado: sliderstart

$('seletor').slider({
	start: function(event, ui) { ... }
})
// Idem
$('seletor').on('sliderstart', function(event, ui) {
	...
})



[|] stop () 
________

// ocorre no instante que acaba a ação de arraste do
// botão deslizante

// nome designado: sliderstop

$('seletor').slider({
	stop: function(event, ui) { ... }
})
// Idem
$('seletor').on('sliderstop', function(event, ui) {
	...
})



[|] change () 
________

// ocorre após ter sido selecionado outro valor no controle
// deslizante

// nome designado: sliderchange

$('seletor').slider({
	change: function(event, ui) { ... }
})
// Idem
$('seletor').on('sliderchange', function(event, ui) {
	...
})



[|] slide () 
________

// ocorre repetidamente enquanto se arrasta o controle
// deslizante

// nome designado: slide

$('seletor').slider({
	slide: function(event, ui) { ... }
})
// Idem
$('seletor').on('slide', function(event, ui) {
	...
})



[-] MÉTODOS



// Seguem os mecanismos de implementação dos métodos 
// tradicionais da linguagem JavaScript

// Métodos slider:
//	> destroy
//	> disable
//	> enable
//	> option
//	> widget
//	> value




[.] destroy

// destrói a capacidade de controle deslizante

$('seletor').slider('destroy')



[.] disable & enable

// destinam-se a desabilitar/habilitar o controle deslizante

$('seletor').slider('disable')
$('seletor').slider('enable')



[.] option

// permite que se defina opções para o widget Slider

$('seletor').slider('option', 'max', 80)



[.] widget

// retorna o elem ao qual foi aplicado o construtor slider()

$('seletor').slider('widget')



[.] value

// retorna/define o valor do controle deslizante

$('seletor').slider('value', [valor])



[.] values

// retorna/define o valor do controle deslizante constituido
// de mais de um botão

$('seletor').slider('values', indice, [valor])




= / 13 Widget Tabs (Painel de Abas) /




// Estrutura HTML

<div id="abas">
	<ul>
		<li><a href="#aba-1">Abacate</a></li>
		<li><a href="#aba-2">Cupuaçu</a></li>
		<li><a href="limao.html">Limão</a></li> // carregada com AJAX
		...
		<li><a href="#aba-N">Pera</a></li>
	</ul>
</div>

<div id="aba-1">
	<h3>Abacate</h3>
	<p>...content...</p>
</div>
<div id="aba-2">
	<h3>Abacate</h3>
	<p>...content...</p>
</div>


$('#abas').tabs()



[-] CLASSE PARA ESTILIZAÇÃO


//* add ao div container geral painel
ui-tabs
ui-widget
ui-widget-content
ui-corner-all

//* add ao elem li q marca as abas
ui-state-default
ui-corner-top

//* add ao elem li ativo (aberto)
ui-tabs-selected
ui-state-active

//* add ao elem div, container dos conteúdos das abas
ui-tabs-panel
ui-widget-content


[-] OPÇÕES



// São parametros e seus valores que permitem configurar
// e controlar o widget

$('seletor').tabs({
	opc1: 'valor',
	opc2: 'valor',
	...
	opcN: 'valor'
})

// inspeção
var valorOpcao = $('seletor').tabs('option', 'opc')
// atribuição
$('seletor').tabs('option', 'opc', 'valor')



[+] disabled
________

// destina-se a habilitar/desabilitar o painel de abas

vals: false | true | []
// default: false

$('seletor').tabs({ disabled: true })
$('seletor').tabs({ disabled: [1,3] }) // aba 2 e 4 desabilitadas (cont 0)



[+] collapsible
________

// destina-se a fechar a aba ativa com clique nela mesma

vals: false | true
// default: false

$('seletor').tabs({ collapsible: true })



[+] selected
________

// destina-se a definir qual das abas estará selecionada (aberta)

vals: indice (cont 0)
// default: 0

$('seletor').tabs({ selected: 3 })



[+] event
________

// destina-se a definir qual será a ação do usuário que fará
// a abertura das abas

vals: event
// default: click

$('seletor').tabs({ event: 'mouseover' })
$('seletor').tabs({ event: 'click mouseover' })



[+] fx
________

// define a animação para a abertura/fechamento das abas

vals: animate jQuery
// default: undifined

$('seletor').tabs({ // animação para ambas abert/fecha
	fx: {
		opacity: 'toggle',
		duration: 2000
	}
})

$('seletor').tabs({
	fx: [{					// anima fechamento
		opacity: 'toggle',
		duration: 2000
	 },
	 {						// anima abertura
		height: 'show',
		duration: 'slow'
	}]
})



[+] ajaxOptions
________

// define as configurações globais para as requisições AJAX
// a sintáxe é idem a do jQuery AJAX

vals: config ajax jQuery
// default: default

$('seletor').tabs({ 
	ajaxOptions: {
		async: false,
		type: 'POST',
		proccessData: false,
		contentType: false
	}
})



[+] cache
________

// destina-se a definir se os conteúdos a serm apresentados
// qnd uma aba é aberta irão ou não para o cache

vals: false | true
// default: true

$('seletor').tabs({ cache: false })



[+] spinner
________

// destina-se a definir uma indicação visual de que uma aba 
// está sendo carregada.
// É necessário que se add marcação extra <span>

vals: 'text-liver';
// default: undefined

/*
<ul>
	<li><a href="#aba-1">  <span>Abacate</span>  </a></li>
	<li><a href="#aba-2">  <span>Cupuaçu</span>  </a></li>
	<li><a href="limao.html">  <span>Limão</span>  </a></li> // carregada com AJAX
	...
	<li><a href="#aba-N">Pera</a></li>
</ul>*/

$('seletor').tabs({ spinner: 'Carregando...' })
$('seletor').tabs({
	spinner: '<em>Aguarde...</em>',
	cache: false,
	ajaxOptions: 
	{
		error: function( xhr, status, index, anchor ) 
		{
			$(anchor.hash).html('Lamentamos, falha no carregamento.<br/>'
				+ 'tente mais tarde.').css('color', 'red')
		}
	}
})



[+] cookie
________

// destina-se a criar um cookie para armazenar a última aba
// selecionada. O cookie pode ser usado para determinar a aba
// ativa incialmente qnd não for usada a opção selected. Para
// usar essa opção é necessário o plugin para cookie, que pode
// ser encontrado na pasta development-bundle/external da library

// prazo de expiração do cookie é de 30 dias
$('seletor').tabs({ cookie: { expires: 30 } })
// retorna os valores do cookie
$('seletor').tabs('option', 'cookie')
// define param secure do cookie
$('seletor').tabs('option', 'cookie', 'secure: true')



[+] idPrefix
________

// destina-se a alterar o prefixo dos id para o fragmento 
// identificador da navegação para carregamento das abas,
// qnd se faz requisições com uso de AJAX. Por padrão, o 
// prefixo dos id é a string ui-tabs (por exp.: ui-tabs-2,
// ui-tabs-16 etc.)

// define que o prefixo do id de navegação será minha-aba
$('seletor').tabs({ idPrefix: 'minha-aba' })
// retorna a string idPrefix
$('seletor').tabs('option', 'idPrefix')



[+] panelTemplate
________

// finalidade de alterar o elem container geral do painel
// das abas. Por padrão o container é um elem div. Usa-se
// essa opção em casos de criação de novos painéis com o emprego
// do método add ou em um painél remoto

vals: 'sintaxe-elem'
// default: '<div>'

// elem li para template do painel
$('seletor').tabs({ panelTemplate: '<li></li>' })



[+] tabTemplate
________

// finalidade de alterar o elem container das abas. Por 
// padrão o container é um elem li. Usa-se
// essa opção em casos de criação de novos painéis com o emprego
// do método add ou em um painél remoto

// difine o container das abas será uma div.
// o placeholder {href} receve o url para carregamento da aba
// e o placeholder {label}, o título da aba, e são passados como
// argumento do método add
$('seletor').tabs({
	'<div><a href="#{href}"><span>#{label}</span></a></div>'
})



[-] EVENTOS



// Seguem os mecanismos de implementação dos eventos 
// tradicionais da linguagem JavaScript

// Eventos tabs:
// 	> create
// 	> select
// 	> show
// 	> load
// 	> add
// 	> remove
// 	> enable


// callback 2 param

// 	> select
// 	> show
// 	> load
// 	> add
// 	> remove
// 	> enable


// 1º ARGUMENTO contém as informações tradicionais da
//    			linguagem
// 2º ARGUMENTO contém as informações sobre o elem ui
// 	 			do widget
// CAUTION: para o evento create só o 1° argumento contém
// 			informações o segundo retorna undefined

// 2º argumento: ui (Nome de livre escolha)
//	> ui.tab 	-> retorna o elem âncora da aba selecionada ou clicada
//
//	> ui.panel 	-> retorna o elem-pai dos conteúdos da aba delecionada
//
//	> ui.index	-> retorna o índice (cont 0) da aba selecionada




[|] create () 
________

// ocorre qnd um painél de abas é criado

// nome designado: tabscreate

$('seletor').tabs({
	create: function(event) { ... }
})
// Idem
$('seletor').on('tabscreate', function(event) {
	...
})



[|] select ()
________

// ocorre qnd o usuário seleciona uma aba

// nome designado: tabsselect

$('seletor').tabs({
	select: function(event, ui) { ... }
})
// Idem
$('seletor').on('tabsselect', function(event, ui) {
	...
})



[|] show ()
________

// ocorre imediatamente após os eventos select e load

// nome designado: tabsshow

$('seletor').tabs({
	show: function(event, ui) { ... }
})
// Idem
$('seletor').on('tabsshow', function(event, ui) {
	...
})



[|] load ()
________

// ocorre imediatamente após o evento select e antes
// do evento show

// nome designado: tabsload

$('seletor').tabs({
	load: function(event, ui) { ... }
})
// Idem
$('seletor').on('tabsload', function(event, ui) {
	...
})



[|] add ()
________

// ocorre qnd uma aba é adicionada com o uso de script

// nome designado: tabsadd

$('seletor').tabs({
	add: function(event, ui) { ... }
})
// Idem
$('seletor').on('tabsadd', function(event, ui) {
	...
})



[|] remove ()
________

// ocorre qnd uma aba é removida com o uso de script

// nome designado: tabsremove

$('seletor').tabs({
	remove: function(event, ui) { ... }
})
// Idem
$('seletor').on('tabsremove', function(event, ui) {
	...
})



[|] disable ()
________

// ocorre qnd uma aba é desabilitada

// nome designado: tabsdisable

$('seletor').tabs({
	disable: function(event, ui) { ... }
})
// Idem
$('seletor').on('tabsdisable', function(event, ui) {
	...
})



[-] MÉTODOS



// Seguem os mecanismos de implementação dos métodos 
// tradicionais da linguagem JavaScript

// Métodos slider:
//	> destroy
//	> disable
//	> enable
//	> option
//	> widget
//	> add
//	> remove
//	> select
//	> load
//	> url
//	> length
//	> abort
//	> rotate




[.] destroy

// destrói o painél de abas

$('seletor').tabs('destroy')



[.] disable & enable

// destinam-se a desabilitar/habilitar uma ou mais abas de um
// painél de abas

$('seletor').tabs('disable', [indice])
$('seletor').tabs('enable', [indice])



[.] option

// permite que se defina opções para o widget Slider

$('seletor').tabs('option', 'selected', 3)



[.] widget

// retorna o elem ao qual foi aplicado o construtor tabs()

$('seletor').tabs('widget')



[.] select

// destina-se a selecionar uma aba

$('seletor').tabs('select', indice)



[.] length

// retorna a quantidade (num) de abas de um painél

$('seletor').tabs('length')



[.] remove

// remove uma aba

$('seletor').tabs('remove', indice)



[.] add

// adiciona uma aba

$('seletor').tabs('add', url, label, [indice])



[.] rotate

// destina-se abrir e fechar as abas dinamicamente em sequência

// param:
//	> ms 		 : define o time transcorrido entre a abertura e
//			       o fechamento das abas
//	> continuing : facultativo e booleano, sendo false o valor padrão
//				   Por padrão, se o usuário clicar em uma aba, o processo
//				   de rotação no fechamento/abertura das abas é interrompido
//				   Defir esse parâmetro para true faz com que o ciclo recomece
// 				   depois que o usuário clica em uma aba, interrompendo o processo

$('seletor').tabs('rotate', ms, [continuing])



[.] load

// destina-se a recarregar uma aba mesmo que a opção cache tenha
// sido definida com true

$('seletor').tabs('load', indice)



[.] abort

// destina-se a abortar uma requisição AJAX em andamento

$('seletor').tabs('abort')



[.] url

// destina-se a alterar o URL de uma requisição AJAX

$('seletor').tabs('url', indice, url)




= / 15 Efeitos /


// ...book...





