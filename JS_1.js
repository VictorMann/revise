/* 								  24/09/16
 * * * JavaScript Básica * * *	
------------------------------------------*/

//** 2 - ESTRUTURA LÉXICA___________________________

"café" === "caf\u00e9"	//=> true: Javascript são escritos com um conjunto de caracter Unicode (é um superconjunto de ASCII e Latin-1) e suporta todos os idiomas usados hoje no planeta.

// literal é um valor que aparece diretamente em um programa.

12					// numero
1.2					// numero (ponto flutuante)
"Hello World"		// string de tesxto
'Hi'				// outra string
false				// valor booleano
true				// outro booleano
/javascript/gi		// "expressão regular" (para comparação de padroes)
null				// ausência de um objeto (valor primitivo null)

// identificadores: devem iniciar com uma letra, _ ou $. 

i
my_variable_name
v13
_dumy
$str


 3 - TIPOS, VALORES E VARIÁVEIS_____________________________________
/* 
 * Os tipos podem ser divididos em duas categorias: 
 * - tipos primitivos (imutaveis): numeros, string, booleanos, null e undefined (null e undefined são tipos especiais membro unico do seu proprio tipo)
 * - tipos objetos (mutaveis): qualquer valor que não seja tipo primitivo. Ex.: objetos, arrays, funções...
 */

 
	__NUMEROS --

	
	
// <> literais inteiros
0
3
10000

/* hexadecimal: precede com "0x" ou "0X" */
0xff	// 15*16 + 15 = 255 (base 10)

/* octal: ECMAScript não oferece suporte para isso */
0377	// 3*64 + 7*8 + 7 = 255 (base 10)


// <> literais ponto flutuante
3.14
2345.6789
.333333
6.02e23			// 6.02 x 10^23: (notação exponencial)
1.456789e-13	// 1.456789 x 10^-13

// <> aritmetica em javascript
/* usando o obj Math e suas funçoes/propriedas */

Math.pow(2,23)		// 2 elevado a potencia 23
Math.round(.6)		//=> 1.0: arredonda para int mais proximo
Math.ceil(.6)		//=> 1.0: arredonda para cima um int
Math.floor(.6)		//=> 0.0: arredonda para baixo um int
Math.abs(-5)		//=> 5: valor absoluto
Math.max(x,y,z)		// retorna o > arg
Math.min(x,y,z)		// retorna o < arg
Math.random()		// numero pseudoaleatorio x, onde 0 <= x < 1.0
Math.sqrt(3)		// raiz quadrada de 3
Math.pow(3,1/3)		// raiz cubica de 3
Math.PI				//=> 3.1415..: circunferencia de um circulo / diametro


// O objeto 'Number' define alternativas que são somente para leitura 

Infinity					// uma variavel de leitura/gravação inicializada com infinity 
Number.POSITIVE_INFINITY	// o mesmo valor somente para leitura/gravação
1/0							// Este tambem é o mesmo valor
Number.MAX_VALUE + 1		// Isso tambem é avaliado com Infinity

Number.NEGATIVE_INFINITY	// Essas expressões são infinito negativo
-Infinity
-1/0
-Number.MAX_VALUE - 1

isFinite(1.456)				//=> true: avalia se a expressão não é (-Infinity/Infinity) 

NaN							// (not-a-number): uma variavel de leitura/gravação inicializada com NaN
Number.NaN					// O mesmo valor porém, somente para leitura
0/0							// Avaliado com NaN

isNaN(texto_qualquer/0)		//=> true: avalia se a expressão é NaN				

Number.MIN_VALUE / 2		// estouro negativo, avaliado como 0
-Number.MIN_VALUE / 2		//=> -0: Zero negativo
-1/Infinity					// tambem Zero negativo
-0

var zero = 0;
var negZ = -0;
zero === negZ;		//=> true: zero e zero negativo são iguais
1/zero === 1/negZ	//=> false: (Infinity e -Infinity) não são iguais


// <> erros de arredondamento

var x = .2 - .1;
var y = .3 - .2;
x == y;				//=> false: os dois valores não os mesmos
x == .1;			//=> true: .2-.1 é .1
y == .1;			//=> false: .3-.2 não é .1

// <> Datas e horas

var then = new Date(2010,0,1);				// o 1º dia do 1º mes de 2010
var later = new Date(2010,0,1,17,10,30);	// o mesmo dia, às 5:10:30 da tarde
var now = new Date();						// a data e hora atual
var elapsed = now - then;					// subtração de data: intervalo em milissegundos
later.getFullYear();			//=> 2010
later.getMonth();				//=> 0: meses com base em 0
later.getDate();				//=> 1: dia com base em 1
later.getDay();					//=> 5: dia da semana 0 é domingo
later.getHours()				//=> 17: 5 horas da tarde
later.getUTCHours();			//=> horas em UTC; depende do fuso horário
later.toString();				//=> "Sexta-feira, 01 de janeiro de 2010, 17:10:30 ..."
later.toUTCString();			//=> "Sabado, 02 de janeiro de 2010, 01:10:30 GMT"
later.toLocaleDateString();		//=> "01/01/2010"
later.toLocaleTimeString();		//=> "05:10:30 PM"
later.toISOString();			//=> "2010-01-02To01:10:30.000Z" somente ES5



	__STRING  --


	
"two\nline"	// string representa 2 linhas escrita em uma
			// string de 1 linha escrita em 3
"one\
long\
line"

var s = "hello," + " world";	// concatenação de strings

s.length;						//=> 12: tam da string
s.charAt(0);					//=> "h"				
s.charAt(s.length-1);			//=> "d"
s.substring(1,4);				//=> "ell"
s.slice(1,4);					//=> "ell" mesma coisa
s.indexOf("l");					//=> 2: posição da primeira letra "l"
s.indexOf("l", 3);				//=> 3: em ou apos 3
s.lastIndexOf("l");				//=> 10: posi ultima letra "l"
s.split(", ");					//=> ["hello", "world"] divide em substrings
s.replace("h", "H");			//=> "Hello, World": troca "h" por "H"
s.toUpperCase();				//=> "HELLO, WORLD"
s[0];
s[s.length-1];

// <> comparação de padroes

var t = "testing: 1, 2, 3";
var r = /\d+/g;					// todas as instancias de 1 ou mais digitos

r.test(t);		//=> true: existe uma correspondencia
t.search(r);	//=> 9: posi da primeira correspondencia
t.match(r);		//=> ["1","2","3"]: array de todas corresp
t.replace(r, #)	//=> "testing: #, #, #"


	__VALOR BOLLEANO

	

	
/* valors falsos */
undefined
null
""
0
-0
NaN

/* valor verdadeiros *
 *
 * qualquer outro valor */
 

	__NULL E UNDEFINED
	

	
/* indicam ausência de valor */

// null: palavra-chave da linguagem
// undefined: variavel global prédefinida


	__OBJETO WRAPPER
	

	
var s = "test";	// começa com um valor
s.len = 4;		// configura uma prop nele
var t = s.len;	//=> t = undefined: s.len prop temp não foi definida


	__REFERENCIAS DE OBJETOS
	

	
var o1 = {x: 1}, o2 = {x: 1};	// 2 obj com mesma prop
o1 === o2;						//=> false: obj distintos nunca são iguais
var a = [], b = [];				// 2 arrays vazios
a === b;						//=> false: não iguais

var a = [];		// A variavel a se referenciada a um array vazio
var b = a;		// agora b se refere ao mesmo array
b[0] = 1;		// muda o array referido pela var b
a[0];			//=> 1: mudança tambem é visivel por meio da var a-number
a === b;		//=> true: A e B se referem ao mesmo obj


	__CONVERÇÃO DE TIPOS

	
	
10 + " object";		//=> "10 object"
"7" * "3";			//=> 21
var n = 1 - "x";	//=> NaN
n + " object";		//=> "NaN object"
null == undefined	//=> true
"0" == 0			//=> true
0 == false			//=> true
"0" == false		//=> true

// conversões explicitas

Number("3")			//=> 3
String(false)		//=> "false"
Boolean([])			//=> true
Object(3)			//=> novo numero 3
x + ""				//=> O mesmo que String(x)
+x					//=> O mesmo que Number(x)
!!x					//=> O mesmo que Boolean(x)

var n = 17;
binario = n.toString(2);		//=> "10001": base 2
octal = "0" + n.toString(8);	//=> "021": base 8
hexa = "0x" + n.toString(16);	//=> "0x11": base 16

var n = 123456.789;
n.toFixed(0);			//=> "123456": converte num em uma string com o numero especifico de digitos apos a casa decimal
n.toFixed(2);			//=> "123456.79" realiza arredondamento tambem na converção
n.toExponential(1);		//=> "1.2e+5"
n.toExponential(3);		//=> "1.234e+5"
n.toPrecision(7);		//=> "123456.8"
n.toPrecision(4);		//=> "1.234e+5"

parseInt("2 bilhoes")		//=> 2
parseInt("11", 2)			//=> 3
parseInt("FF", 16)			//=> 255

parseFloat(" 3.14 mm")		//=> 3.14


	__ESCOPO DE VARIAVEL

	

var scope = "global";
function checkScope() {
	var scope = "local";		// sobrescreve a variavel global
	return scope;				//=> "local"
}



4 - EXPRESSOES E OPERADORES_____________________________________

	__EXPRESSOES PRIMARIAS
	
1.23
"hello"
/javascript/gi
true
false
null
undefined


	__INICIALIZADORES DE OBJETOS E ARRAYS
	
	
	
[];
[1+2, 3+4];
var matrix = [[1,2,3], [4,5,6]];
var o = {x: 1, y: {z: 2, w: 4}};

	
	__EXPRESSOES DE ATRIBUIÇÃO DE FUNÇÃO
	
	
	
var square = function(x) { return x*x };


	__EXPRESSOES DE ACESSO A PROPRIEDADE
	
	
	
var o = {x: 1, y: {z: 2, w: 4}};
var a = [o, 4, [5, 6]];				// um exemplo de array que contêm um obj
o.x;			//=> 1
o.y.z;			//=> 2
o["y"]["w"];	//=> 4
a[1];			//=> 4
a[2]["1"];		//=> 6: realiza a conversão String p/ Number
a[0].x			//=> 1



	__EXPRESSOES DE INVOCAÇÃO
	
	
	
f(0);					// f é a expressao de função; 0 é a expressao de argumento
Math.max(x, y, z);		// Math.max é a função; x,y,z expressoes de argumentos
a.sort();				// a.sort é a função; não há argumentos



	__EXPRESSÃO DE CRIAÇÃO DE OBJETOS
	
	
	
new Objetos();		// caso não haja argumentos, é opcional o uso dos ()
new Point(1,2);



	__Lvalues
	
	
// Javascript define Lvalue: variaveis, propriedades de obj e elementos de arrays 



	__EXPRESSOES RELACIONAIS
	


// IGUALDADE E DESIGUALDADE

x == y		// igualdade
x === y		// igualdade restrita (não realiza conversão)
x != y		// desigualdade
x !== y		// desigualdade restrita


// OPERADOR DE COMPARAÇAO

x > y
x >= y
x < y
x <= y


// OPERADOR "in"

var o = {x: 1, y: 1};
"x" in o		//=> true: prop existe em o1
"toString" in o //=> true: prop herdadas são validas

var a = [1, 2, 3];
"0" in a		//=> true: array tem element 0
1 in a			//=> true: converção realizada
3 in a			//=> flase: nenhum elemento 3


// OPERADOR "instanceof"

var a = [1, 2, 3];
a instanceof Array;			//=> true: a é uma instancia da classe Array
a instanceof Object;		//=> true: todos obj são instancias de "Object"



	__EXPRESSOES DE AVALIAÇÃO
	

// Javascript tem a capacidade de interpretar strings de código-fonte.
// avaliando-as para produzir um valor, ele faz isso com a função global eval();

eval("3 + 2");	//=> 5: espera 1 unico argumento, se não for uma string ele retorna o valor
eval("x = 3");	// define uma variavel global
eval("function f() { return x+1; }");	// define uma função, na qual utiliza a variavel global anterior definida

// eval global - se for passado outro nome a "eval" por exemplo "geval = eval;" ela é definida como global

var geval = eval;					// usa outro nome faz eval global
var x = "global", y = "global";		// duas variaveis globais

function f() {						// esta função faz uma eval local
	var x = "local";				// define uma variavel local
	eval("x += 'changed';");		// "eval direta" configura variavel local
	return x;						// retorna var local
}
function g() {						// esta função faz uma eval global
	var y = "local";				// uma variavel local
	geval("y += 'changed';");		// "eval indireta" configura variavel global
	return y;						// retorna var local inalterada
}

console.log(f(), x);				//=> "localchanged global": variavel local alterada
console.log(g(), y);				//=> "local globalchanged": variavel global alterada


	
	__OPERADOR DIVERSOS
	

// OPERADOR CONDICIONAL "?:"

x > 0 ? x : -x;		// o valor absoluto de x

greeting = "hello " + (username ? username : "there"); // o perador se parece com "if" porem é mais compacto

greeting = "hello ";
if (username)											// equivalente ao de cima
	greeting += username;
else
	greeting += "there";



// OPERADOR "typeof" --> especifica o tipo do operando


typeof undefined;		//=> "undefined"
typeof null;			//=> "object"
typeof true ou false;	//=> "boolean"
typeof numero ou NaN;	//=> "number"
typeof string;			//=> "string"
typeof função;			//=> "function"
(typeof(value) == "string") ? "'" + value + "'" : value;	// tambem pode ser expresso em parenteses como uma função



// OPERADOR "delete" --> tenta excluir a propriedade do objeto ou elemento do array


var o = {x: 1, y: 1};
delete o.x;				//=> true: exclui uma de suas propiedades
"x" in o;				//=> false: a prop não existe
typeof o.x;				//=> "undefined": a prop não existe
delete o.x;				//=> true: exclui uma prop inexistente
delete o;				//=> false: não pode excluir uma prop declarada

var a = [1,2,3];
delete a[2];			// exclui o ultimo elemento do array
"2" in a;				//=> false: o elemento array 2 não existe
a.length;				//=> 3: note que o comprimento do array não muda

delete 1;				//=> true: o argumento não é Lvalue
this.x = 1;				// define uma prop global sem var
delete x;				//=> true: no modo não restrito. exceção no modo restrito 'delete this.x'



// OPERADOR "void" --> ele avalia seu operando e, então, descarta o valor e retorna undefined

<a href="javascript: void window.open();">Open New Window</a>




	5 - INSTRUÇÕES_____________________________________
	

	__INSTRUÇÕES DE EXPRESSAO
	

greeting = "Hello" + name;
i *= 3;
counter ++;
alert(greeting);
Math.cos(x);
delete o.x;



	__INSTRUÇÕES COMPOSTAS E VAZIAS
	
	
{	// bloco de instruções --> atuam como uma unica instrução (instrução composta)
	x = Math.PI;
	cx = Math.cos(x);
	console.log("cos(pi): " + cx);
}

// instrução vazia é uma instrução apenas com um ponto e vírgula
;

for(i = 0; i < a.length; a[i++] = 0) /* vazio */ ;


	__INSTRUÇÕES DE DECLARAÇÃO

	// var e function são instruções de declaração
	
	// var
	
var i;
var j = 0;
var p, q;
var greeting = "hello " + name;
var x = 2.34, y = Math.cos(.75), r, theta;
var x = 2, y = x*x;
var x = 2,
	f = function(x) { return x*x},
	y = f(x);

	// function
	
var f = function(x) { return x+1;};		// expressão atribuida a uma variavel
function f(x) { return x+1; }			// instrução de declaração de função

// definição de funções não podem aparecer
// dentro de if, laços while ou qualquer
// outra instrução



	__CONDICIONAIS
	
	// if, if/else e switch
	
if (username == null)		// Se username é null ou undefined
	username = "John Doe";	// o define
	
if (!username)				// se username é null, undefined, 0, -0, "", NaN
	username = "John Doe";	// fornece a ele um novo valor
	
if (n == 1) {
	// executa o bloco de codigo #1
}
else if (n == 2) {
	// executa o bloco de codigo #2
}
else if (n == 3) {
	// executa o bloco de codigo #3
}
else {
	// Se tudo falha, executa o bloco #4
} 


switch(n) {
	case 1:			// começa aqui se n === 1
		break;		// para aqui	
	case 2:			// começa aqui se n === 2
		break;
	case 3:			// começa aqui se n === 3
		break;
	default:		// se tudo falha
}

function convert(x) {
	switch(typeof x) {
		case "number":				// converte o numero para uma string em hexadecimal
			return x.toString(16);
		case "string":				// retorna a string colocada em apostrofo
			return "'" + x + "'";	
		default:					// Converte em uma string
			return String(x);
	}
}



	__LAÇOS

	// while, do/while, for, for/in

var count = 0;
while (count < 10) {
	console.log(count);
	count++;
}

function printArray(a) {
	var len = a.length, i = 0;
	if (len == 0)
		console.log("Empty Array");
	else {
		do {
			console.log(a[i]);
		} while (++i < len);
	}
}


for(var count = 0; count < 10; count++)
	console.log(count);

var sum = 0;
for(var i = 0, j = 10; i < 10; i++, j--)
	sum += i * j;

function tail(o) {								// retorna a calda da lista
	for(; o.next; o = o.next) /* vazio */ ;		// percorre enquanto o.next é verdadeiros
	return o;
}

var o = {x: 1, y: 1, z: 1, w: 1};
for(var prop in o)					// atribui nomes de propriedade de o à variavel prop 
	console.log(o[prop]);			// imprime o valor de cada prop
	
var o = {x: 1, y: 1, z: 1, w: 1};
var a = [], i = 0;
for(a[i++] in o) /* vazio */;		// copia os nomes de todas as propriedades em um array
for(i in a) console.log(i);			// exibe os indeces 0, 1, 2 que contem os valores da prop de o



	__SALTOS
	
	// break, continue, return, throw, try/cath/finally


// instruções rotuladas
mainloop: while (token != null) {
	// codigo omitido...
	continue mainloop;			// pula para a proxima iteração do laço
	// mais codigo omitido...
}
for(var i = 0; i < 10; i+=2) {
	if (i == 6) continue;		// pula o numero 6
	console.log(i);
}
for(var i = 0; i < a.length; i++) {
	if (a[i] == null) break;	// sai do laço ao encontrar um valor null
}	

var matrix = getDate();			// obtem um array 2D de numero de algum lugar
var sum = 0, success = false;
computer_sum: if (matrix) {		// começa com uma instrução rotulada da qual podemos sair se ocorrem erros
	for(var x = 0; x < matrix.length; x++)
	{
		var row = matrix[x];
		if (!row) break computer_sum;
		
		for(var y = 0; y < row.length; y++)
		{
			var ceil = row[y];
			if (isNaN(ceil)) break computer_sum;
			sum += ceil;
		}
	}
	success = true;
}
// As instruções break pulam para cá, se chegamos aqui com success = false então algo deu ERRADO

	
function square(x) {
	return x*x;			// uma instrução que tem return
}
square(4);				//> 16: valor do retorno da função
	
function display_objeto(o) {
	if (!o) return;		//> undefined, caso o arg seja um valor falso
	// O resto de função fica aqui...
}
	
// throw --> uma exceção é um sinal indicando que ocorreu algum tipo de condição excepcional ou erro.
// disparar uma exceção é sinalizar tal erro ou condição excepcional.
	
function factorial(n) {
	if (isNaN(n))							// se não é um numero dispara uma exceção
		throw new Error("Não é um numero");
	if (n < 0)								// se o argumento de entrada é inválido, dispara uma exceção
		throw new Error("'n' não pode ser negativo");
	for(var f = 1; n > 1; f *= n, n--);		// caso contrario, calcula um valor e retorna normalmente
	return f;
}	
	
try {
	// pede para o usuario inserir um numero
	var num = Number(prompt("Digte um numero inteiro positivo:",""));
	// calcula o fatorial do numero, supondo que a entrada seja válida
	var f = factorial(num);
	// exibe o resultado
	alert(num + "! = " + f);
}
catch (ex) {					// se a entrada é invalida, terminamos aqui
	alert(ex.message);		// informa ao usuario o erro
} 
	
var x = 0;
while (x < 10) {
	try { console.log(x); }
	finally { x++; }		// finally é sempre executado apos o try
}
	
	
	
	__INSTRUÇÕES DIVERSAS

	// with | debugger | use strict
	

// with --> é usada para ampliar o encadeamento de escopo (é proibida no modo restrito e desaprovada no modo não restrito)

document.forms[0].address.value; 	// de uma forma a não ter que digitar isso varias vezes
with(document.forms[0]) {			// isso reduz o volume de digitação
	// acessa elementos do formulario diretamente aqui. Por exemplo:
	name.value = "";
	address.value = "";
	email.value = "";
}

// voce poderia evitar a instrução escrevendo isto
var f = document.forms[0];
f.name.value = "";	
f.address.value = "";	
f.email.value = "";	


// debugger --> normalmente não faz nada, serve apenas para o desenvolvedor encontrar error no código

function f(o) {
	if (o == undefined) debugger;	// linha temporaria para proposito de depuração
	//...						    // o restante da função fica aqui
}


// use strict --> é uma diretiva que indica que o codigo seguinte (no script ou função) é codigo restrito

var hasStrictMode = (function() { "use strict"; return this === undefined;}());
	



	6 - OBJETOS_____________________________________

// ATRIBUTOS DE PROPRIEDADE
// - gravavel     --> especifica se o valor da prop pode ser configurado
// - enumeravel   --> especifica se o nome da prop é retornado por um laço "for/in"
// - configuravel --> especifica se a prop pode ser excluida e seus atributos podem ser alterados

// ATRIBUTOS DE OBJETO 
// - prototipo       --> é a referencia para outro objeto do qual as prop são herdadas
// - classes         --> é a string que classifica um tipo de objeto
// - flag extensível --> especifica se novas prop podem ser adicionadas no objeto

// CATEGORIAS DE OBJETOS
// - objetos naticos        --> é um objeto definido pela especificação ECMAScript. Exp.: Arrays, funções, Datas, Expressoes regulares são objetos nativos.
// - objeto hospedeiro      --> é definido pelo ambiente hospedeiro (como um navegador Web) dentro do qual o interpretador javascript esta incorporado. Exp.: HTMLElement
// - definidos pelo usuário --> é qualquer obj criado pela execução de código JavaScript.

// TIPOS DE PROPRIEDADES
// - propriedade própria --> é uma prop definida diretamente em um objeto
// - propriedade herdada --> é uma prop definida pelo obj prototipo de um obj



	__CRIANDO OBJETOS
	

// OBJETOS LITERAIS

var empty = {};					// um objeto sem propiedades
var point = {x: 0, y: 0};		// duas propiedades
var book = {					// os nomes das prop incluem espaço e hifens portanto usam strings literias
	"main title": "JavaScript",
	'sub-title': "The Definitive Guide",
	"for": "all audience",		// "for" é uma palavra reservada
	author: {
		firstname: "David",
		surname: "Flanagan"
	}
};

// CRIANDO OBJETOS COM New

var o = new Object();			// o mesmo que {}
var a = new Array();			// o mesmo que []
var d = new Date();				// cria um obj Date representando a hora atual
var r = new RegExp("js");		// cria um objeto para comparaçao de padroes



// PROTOTIPO
// todo objeto tem um prototipo na qual ele herda propriedades e metodos
// todos objetos herdam de Object.prototype..


// Object.create() --> cria um novo objeto 

var o1 = Object.create({x: 1, y: 2});		// herda as prop x e y
var o2 = Object.create(null);				// não herda nenhuma prop nem as nativas como toString() de Object.prototype
var o3 = Object.create(Object.prototype);	// o3 é como {} ou new Object().

// inherit() retorna um objeto recém-criado que herda propiedades do
// objeto p. Ele usa a função ECMAScript 5 Object.create() se
// estiver definida e, caso contrário, retrocede para uma técnica mais antiga.

function inherit(p) {
	if (p == null) throw TypeError();	// p deve ser um objeto
	if (Object.create)					// se Object.create esta definido...
		return Object.create(p);		// então basta usá-la.
	var t = typeof p;					// caso contrario, faça uma verificação de tipo
	if (t !== "object" && t !== "function") throw TypeError();
	function f(){};						// define uma função construtora fictícia
	f.prototype = p;					// configura sua propiedade construtora como p.
	return new f;						// usa f() para criar um "herdeiro" de p.
}



	__CONSULTANDO E CONFIGURANDO PROPRIEDADES
	
	
var author = book.author;			// obtem a prop "author" de book
var title = book["main title"];		// obtem a prop  "main title" de book
book.edition = 6;					// cria uma prop "edition" de book
book["main title"] = "ECMAScript";	// configura a prop "main title".

// OBJETOS COMO ARRAYS ASSOCIATIVOS

object.prototype;		
object["prototype"];	// Idem

var addr = "";
for(var i = 0; i < 4; i++)		// Lê e concatena as prop address0, address1, address2, address3 de objeto customer
	addr += customer["address" + i] + '\n';

	
// HERANÇA


var o = {};				// o herda prop e metodos de Object.prototype
o.x = 1;				// o tem uma prop propria x
var p = inherit(o);		// p herda de o e Object.prototype
p.y = 2;				// e tem uma prop propria y
var q = inherit(p);		// q herda prop de p, o e Object.prototype
q.z = 3;				// q tem uma prop propria z
var s = q.toString();	// toString é herdado de Object.prototype
q.x + q.y;				//=> 3: x e y são herdados de o e p


var unitcircle = { r: 1 };		// um obj para herdar
var c = inherit(unitcircle);	// c herda a prop r
c.x = 1; c.y = 1;				// c define duas prop proprias
c.r = 2;						// c anula sua prop herdada
unitcircle.r;					//=> 1: o objeto prototipo não é afetado


// ERROS DE ACESSOS Á PROPIEDADES

var len = undefined;
if (book)
	if (book.subtitle) len = book.subtitle.length;

// uma alternativa concisa e idiomatica para obter o tamanho de subtitle ou undefined
var len = book && book.subtitle && book.subtitle.length;



	__EXCLUINDO PROPRIEDADES
	
	
delete book.author;		//=> true
delete book["author"];	//=> true
o = { x:1 };
delete o.x;				//=> true
delete o.x;				//=> true: não faz nada
delete o.toString;		//=> true: não faz nada (toString não é prop propria)
delete 1;				//=> true: não tem sentido

delete Object.prototype;	//=> false: a prop não é configuravel
var x = 1;			
function f(){}
delete x;					//=> false: não pode excluir
delete this.f;				//=> false: não pode excluir

	
	
	__TESTANDO PROPIEDADES
	
	
var o = { x:1 };
"x" in o;			//=> true
"toString" in o;	//=> true

o.hasOwnProperty("x");			//=> true: prop própria
o.hasOwnProperty("toString");	//=> false: não é própria

var o = inherit({ y:1 });
o.x = 1;
Object.defineProperty(o, 'x', {enumerable: false});
o.propertyIsEnumerable("x");		//=> false: prop propria mas NÃO ENUMERABLE
o.propertyIsEnumerable("y");		//=> false: herdada não propria
o.propertyIsEnumerable("toString");	//=> false: não enumeravel e não propria


	__ENUMERANDO PROPRIEDADES
	
// funções utilitarias

//copia prop de p em o e retorna o.
// se o e p tem prop de mesmo nome p sobrescreve
function extend(o, p) {
	for(prop in p)
		o[prop] = p[prop];
	return o;
}
//copia prop de p em o e retorna o.
// se o e p tem prop de mesmo nome mante o
function merge(o, p) {
	for(prop in p) {
		if (o.hasOwnProperty(prop)) continue;
		o[prop] = p[prop];
	}
	return o;
}
// remove prop de o se não existem em p
function restrict(o, p) {
	for(prop in o)
		if (!(prop in p)) delete o[prop];
	return o;
}
// exclui as prop de o se há uma com mesmo nome em p
function subtract(o, p) {
	for(prop in p)
		delete o[prop];
	return o;
}
// retorna um novo objeto, copia prop de p em o e retorna o.
// se o e p tem prop de mesmo nome p sobrescreve	
function union(o, p) {
	return extend(extend({}, o), p);
}	
// retorna um novo objeto, remove prop de o se não existem em p	
function intersection(o, p) {
	return restrict(extend({}, o), p);
}
// retorna um array contendo os nomes das prop proprias enumeraveis de o
function keys(o) {
	if (typeof o !== "object") throw TypeError();
	var result = [];
	for(var prop in o)
	{
		if (o.hasOwnProperty(prop))
			result.push(prop);
	}
	return result;
}


Object.keys();					// retorna um array com os nomes das prop próprias e enumeraveis de um objeto
Object.getOwnPropertyNames();	// retorna um array com os nomes das prop proprias de um obj não precisando ser enumeraveis

	__METODOS GETTER E SETTER

	
var serialnum = {
	$n: 0,			// O $ no nome sugere que se trata de uma prop privada
	
	get next() { return this.$n++; },	// retorna o valor atual e o incrementa
	set next(n) {						// configura novo valor de n, somente se for > do que o atual
		if (n > this.$n) this.$n = n;
	}
}
var random = {
	get octet() { return Math.floor(Math.random() * 254); },
	get uint16(){ return Math.floor(Math.random() * 6521); }
}


	__ATRIBUTOS DE PROPRIEDADES

// para obter o descritor de uma propriedade
Object.getOwnPropertyDescriptor({x:1}, "x");		//=> {value: 1, writable: true, enumerable: true, configurable: true}
Object.getOwnPropertyDescriptor(random, "octet");	//=> {get: /*func*/, set: undefined, enumerable: true, configurable: true}
Object.getOwnPropertyDescriptor({}, "toString");	//=> undefined: herdada
// para configurar o descritor de uma propriedade
var o = {};
Object.defineProperty(o, "x", { 

	value: 1,
	writable: true,
	enumerable: false,
	configurable: true
	
});
o.x;		//=> 1
Object.defineProperty(o, "x", { writable: false });
o.x = 2;	// falha silenciosa ou lança TypeError no modo restrito
Object.defineProperty(o, "x", { get: function() {return 0;} });
	
	
var p = Object.defineProperties({}, {
	x: { value: 1, writable: true, enumerable: true, configurable: true },
	y: { value: 1, writable: true, enumerable: true, configurable: true },
	r: {
		get: function() { return Math.sqrt(this.x * this.y); },
		enumerable: true,
		configurable: true
	}
});
/* Adiciona um metodo não enumeravel extend() em Object.prototype.
 * este metodo extende o objeto no qual é chamado, copiando propiedades
 * do objeto passado como argumento. Todos os atributos de propriedades são
 * copiados e não apenas o valor da propriedade. Todas as propriedades proprias
 * (mesmo as não enumeraveis) do objeto argumento são copiadas, a não ser que já 
 * exista uma propriedade com o mesmo nome no objeto de destino.
 */
Object.defineProperty(Object.prototype, 
	"extend",	// define Object.prototype.extend
	{
		writable: true,
		enumerable: false,
		configurable: true,
		value: function(o) {	// seu valor é esta função
			var names = Object.getOwnPropertyNames(o);		// obtem todas as prop, até mesmo as não enumeraveis
			for(var i = 0; i < names.length; i++) {			// Itera por elas
				if (names[i] in this) continue;				// pula as que já estão neste obj
				var desc = Object.getOwnPropertyDescriptor(o, names[i]);	// obtem o descritor de propiedades de o
				Object.defineProperty(this, names[i], desc);// A utiliza para criar propriedades em this
			}
		}
	}
);



	__API LEGADAS PARA METODOS GETTER E SETTER /* NÃO PADRONIZADAS */
	

var o = {
	v: 0,
	get x() {return this.v}, 
	set x(n) {this.v = n} 
};
o.__lookupGetter__("x");	// retorna o metodo getter de uma prop de o
o.__lookupSetter__("x");	// retorna o metodo setter de uma prop de o
o.__defineGetter__("x",		// configura metodo getter
	function(){
		return 4 * 4;
	}
);
o.__defineSetter__("x",		// configura metodo setter
	function(n) {
		this.v = n;
	}
);



	__ATRIBUTOS DE OBJETO
	
	// prototipo, classe e flag extensivel
	
var o = {x:1};
var p = Object.create(o);
Object.getPrototypeOf(p);	//=> {x: 1}: consulta o prototipo de p.
o.isPrototypeOf(p);			//=> true: determina se um obj é prototipo de outro



	__ATRIBUTO CLASSE
	

function classOf(o) {
	if (o === null) return "Null";
	if (o === undefined) return "Undefined";
	return Object.prototype.toString.call(o).slice(8,-1);
}

classOf("");			//=>"String"
classOf(1);				//=>"Number"
classOf([]);			//=>"Array"
classOf({});			//=>"Object"
classOf(/./);			//=>"Regexp"
classOf(new Date());	//=>"Date"
function f(){}			
classOf(f);				//=>"Function"
classOf(new f());		//=>"Object"	(construtora)



	__ATRIBUTOS EXTENSIVEIS
	
	// expecifica se novas propiedades podem ser adicionadas no obj
	
var o = {};
Object.isExtensible(o);			//=> true
Object.preventExtensions(o);	// torna um objeto "não extensivel"
Object.seal(o);					// selado "não extensivel" e "configurable: false"
Object.freeze(o);				// congelado "não extensivel", "configurable: false" e "writable: false"

Object.isSealed(o);				//=> true: verifica se está selado
Object.isFrozen(o);				//=> true: verifica se está congelado

// cria um obj selado com prototipo congelado e uma prop não enumeravel
var o = Object.seal(Object.create(Object.freeze({x:1}), { y: { get: function(){return 0}, enumerable: false }}));



	__SERIALIZANDO OBJETOS
	
// é o estado em que se converte um obj
// em uma string a partir da qual ele pode
// ser restaurado posteriormente

o = {x: 1, y: {z: [false, null, ""]}};	//obj de test
s = JSON.stringify(o);					//s é "{'x':1,'y':{'z':[false,null,'']}}"
p = JSON.parse(s);						// p é uma copia de o




	7- ARRAYS_____________________________________


	__CRIANDO ARRAYS
	
var empty = [];				// sem elementos
var primes = [1,2,3,4,5];	// 5 elementos
var misc = [1.1,true,"a",];	// 3 elementos de varios tipos + virgula à direita
var count = [1,,3];			// array esparço
var undefs = [,,];			// array de 2 elementos 

var a = new Array();		// usando a construtora. o mesmo que []
var a = new Array(10);		// comprimento 10
var a new Array(5,"ester Carlos", true);



	__LENDO E GRAVANDO
	

var a = ["world"];
var val = a[0];		// lê o indice 0
a[1] = 3.14;		// grava o elemento 1
a[-1.32] = true;	// cria uma prop chamada "-1.32"
a["1000"] = 0;		// posi 1001º do array
a[1.000]			// igual à a[1]


	
	__ARRAY ESPARSOS
	
	
var a1 = [,];			// não tem elemento e tem comprimento 1
var a2 = [undefined];	// tem 1 elemento undefined
0 in a1;				//=> false
0 in a2;				//=> true



	__COMPRIMENTO DO ARRAY
	

a = [1,2,3,4,5];
a.length;				//=> 5: comprimneto
a.length = 3;			// trunca e agora é [1,2,3]
a.length = 0;			// exclui todos os elementos
a.length = 5;			// comprimento 5 mas não há elementos

a = [1,2,3];
Object.defineProperty(a, "length", {writable: false});	// torna somente para leitura
a.length = 0;		// length não pode ser mais alterado



	__ADICIONA E EXCLUI ELEMENTOS DO ARRAY
	
	
a = [];
a.push("zero");		// add no final do array ["zero"]
a = [1,2,3];
delete a[1];		//exclui elemento
"1" in a;			//=> false
a.length;			//=> 3: não altera comprimento




	__ARRAYS MULTIDIMENCIONAIS
	
var table = new Array(10);
for(var i = 0; i < table.length; i++)
	table[i] = new Array(10);

for(row = 0; row < table.length; row++) {
	for(col = 0; col < table[row].length; col++) {
		table[row][col] = row * col;
	}
}
// table[5][7] = 35



	__METODOS DE ARRAYS
	
// join() --> converte em uma string

var a = [1,2,3];
a.join();			//=> "1,2,3"
a.join(" ");		//=> "1 2 3"
a.join("");			//=> "123"
var b = new Array(10);
b.join("-");		//=> --------------


// reverse()  --> inverte array (local)

var a = [1,2,3];
a.reverse().join();		//=> "3,2,1"


// sort() --> classifica em ordem alfabetica

var a = ["banana", "cherry", "apple"];
a.sort();	// ["apple", "banana","cherry"]

var a = [33, 4, 1111, 222];
a.sort()					// ordem alfabetica [1111, 222, 33, 4]
a.sort(function(a,b) {		// ordem numerica [4, 33, 222, 1111]
	return a-b;
}); 

a = ["ant", "Bug", "cat", "Dog"];
a.sort();					// [Bug, Dog, ant, cat] considera maiusculas e minusculas
a.sort(function(s,t) {		// [ant, Bug, cat, Dog] sem considerar
	a = s.toLowerCase();
	b = t.toLowerCase();
	if (a < b) return -1;
	if (a > b) return 1;
	return 0;
});


// concat() --> retorna um array com args add

var a = [1,2,3];
a.concat(4,5);				// retorna [1,2,3,4,5]
a.concat([4,5]);			// retorna [1,2,3,4,5]
a.concat([4,5],[6,7]);		// retorna [1,2,3,4,5,6,7]
a.concat([4,5,[6,7]]);		// retorna [1,2,3,4,5,[6,7]]


// slice() --> retorna um pedaço do array

var a = [1,2,3,4,5];
a.slice(2);				// [3,4,5]
a.slice(3, -1);			// [4]
a.slice(-3, -2);		// [3]



// splice() --> remove ou add elementos no array

var a = [1,2,3,4,5,6,7,8];
a.splice(4);			// fica [1,2,3,4]	retorna [5,6,7,8] 
a.splice(1,2);			// fica [1,4]		retorna [2,3] 
a.splice(1,1);			// fica [1]			retorna [4] 

var a = [1,2,3,4,5];
a.splice(2,0,"a","b");	// fica [1,2,"a","b",3,4,5] retorna []
a.splice(2,2,[1,2],3);	// fica [1,2,[1,2],3,3,4,5] retorna ["a","b"]


// push(), pop(), unshift() e shift() --> add e remove elementos do inicio e fim do array

var a = [];
a.push(1,2);		// [1,2]	 retorna 2
a.pop();			// [1]		 retorna 2 
a.push([3,4]);		// [1,[3,4]] retorna 2
a.pop();			// [1]		 retorna [3,4]

var a = [];
a.unshift(1);		// [1]		 	retorna 1
a.unshift(22);		// [22,1]	 	reotrna 2
a.shift();			// [1]		 	retorna 22
a.unshift(3,[4,5]);	// [3,[4,5],1]	reotrna 3
a.shift();			// [[4,5],1]	retorna 3



// toString()

[1,2,3].toString();		// "1,2,3"
[1,[2,3]].toString();	// "1,2,3"



	__METODOS DE ARRAY DE ECMAScript 5
	

// forEach() --> itera por cada elemento chamando uma função especializada
// forEach(function(valor, indice, array))

var data = [1,2,3,4];
sum = 0;
data.forEach(function(v) {		//=> sum = 10
	sum += v;
});

data.forEach(function(v,i,a) {	//=> [2,3,4,5]
	a[i] = v + i;
});



// map() --> passa cada elemento do array para a função e retorna os valores

a = [1,2,3];
var b = a.map(function(v) {		//=> b = [1,4,9]
	return v * v;
});


// filter() --> retorna um subconjunto dos arrays utilizando um predicado
a = [1,2,3,4,5];
var b = a.filter(function(v) {	//=> b = [1,2]
	return v < 3;
});
var b = a.filter(function(v,i){ //=> b = [1,3,5]
	return i%2 == 0;
});



// every() --> retorna true se todos elementos forem true ao predicado
a = [1,2,3,4,5];
a.every(function(v) {			// true
	return v < 10;
});


// some() --> retorna true se apenas um elemento corresponder ao predicado
a = [1,2,3,4,5];
a.some(function(v) {			// true 
	return v%2 == 0;
});




//reduce(func, inicia) --> combina os valoes para produz um valor unico
a = [1,2,3,4];
a.reduce(function(x,y) {	// 0 (opcional) inicializada no x caso não seja definido utiliza
	return x + y;			// os elementos 1 e 2 do array
}, 0);	
a.reduce(function(x,y) {	// retorna o maior valor
	return (x>y)?x:y;
});


// reduceRight() --> atua igual ao reduce(), só que do maior índece para o menor

// Exp.: 2^(3^4)
var a = [2,3,4];
a.reduceRight(function(elevado,valor) {
	return Math.pow(valor, elevado);
}); 



// indexOf() e lastIndexOf() --> procura certo elemento no array
a = [0,1,2,1,0];
a.indexOf(1);		//=> 1
a.lastIndexOf(1);	//=> 3
a.indexOf(-1);		//=> -1

function findall(a, x) {	// localiza todas as ocorrencias de um valor x em um array e retorna um array
	var result = [], pos = 0, len = a.length;
	while (len > pos) {
		pos = a.indexOf(x, pos);
		if (pos === -1) break;
		result.push(pos ++);
	}
	return result;
}




	__TIPOS DE ARRAYS
	
	
Array.isArray([]);		//=> true: verifica se é um array
Array.isArray({});		//=> false

[] instanceof Array;	//=> true
({}) instanceof Array;	//=> false

var isArray = Array.isArray || function(o) {
	return typeof o === "object" && Object.prototype.toString.call(o) === "[object Array]";
};



	__OBJETOS SEMELHANTES A UM ARRAY
	
	
var a = {"0": "a", "1": "b", "2": "c", length: 3};	// um obj semelhante a um array
Array.prototype.join.call(a,"+");			//=> "a+b+c"
Array.prototype.slice.call(a, 0);			//=> ["a","b","c"]: copia do array verdadeiro
Array.prototype.map.call(a, function(v) {	//=> ["A","B","C"]
	return v.toUpperCase();
});


// STRING COMO ARRAYS

s = "JavaScript";

Array.prototype.join.call(s, " ");				//=> "J a v a S c r i p t"
Array.prototype.filter.call(s, function(v) {	//=> "JvScrpt": filtra os caracteres da string
	return v.match(/[^aeiou]/);					// corresponde apenas as não vogais
}).join("");




	8- FUNÇÕES_____________________________________


	__DEFININDO FUNÇÕES
	
// imprime o nome e o vcalor de cada propiedade de o. retorna undefined
function printProps(o) {
	for(var p in o)
		console.log(p + ": " + + o[p] + '\n');
}
// uma função recursiva (que chama a si mesmo) que calcula fatorial
function fatorial(x) {
	if (x <= 1) return 1;
	return x * fatorial(x - 1);
}
// as expressões de função podem incluir nome, o que é útil para a recursividade
var f = fact(x) { if(x <= 1) return 1; else return x * fact(x-1); };

// ás vezes as expressões de função são definidas e chamadas ao mesmo tempo.
var square = (function(x) { return x*x; }(10));



// FUNÇÕES ANINHADAS


function hipotenusa(a, b) {
	function square(x) { return x*x; }
	return Math.sqrt(square(a) + square(b));
}



	__CHAMANDO FUNÇÕES
	
	// como funções, metodos, construtoras e indireta
	

// CHAMADA DE FUNÇÃO


printProps({x: 1});
var num = fatorial(5)/fatorial(4);
var strict = (function() { return !this; }());	// define e chama a funçãoe para ver se estamos no modo restrito



// CHAMADA DE METODOS


o.m = f;	// atribui uma função a prop m do obj o
o.m();		// chama o metodo
o.m(x, y);	// chama passando dois args

var calc = {
	opara1: 1,
	opera2: 2,
	add: function() {		// note o uso da palavra-chave this para se referir a este obj
		this.r = this.opara1 + this.opera2;
	}
}
calc["add"]();		// chama metod
a[0](z);			// other forma

var o = {	// ao contrario da variaveis, a palavra-chave this 
			// não tem escopo e as funções aninhadas não herdam o valor de this de suas chamadoras
	m: function() {
		var self = this;				// salva o valor de this em uma var
		console.log(this === o);		//=> "true": this é o obj o
		f();
		function f() {
			console.log(this === o);	//=> "false": this é global ou undefined 
			console.log(self === o);	//=> "true": self é o valor de this
		}
	}
}



// CHAMADA DA CONSTRUTORA

// uma chamada de construtora cria um novo obj vazio que herda da propiedade prototype da construtora. 

var o = new Object();	// são iguas
var o = new Object;




// CHAMADA INDIRETA --> call e apply

Array.prototype.join.call("javascript", " ");




	__ARGUMENTOS E PARAMETROS DE FUNÇÃO
	
	

// PARAMETROS OPCIONAIS

// anexa os nomes das prop enumeraveis do obj o no
// array a e retorna a. Se a for omitido, cria e retorna um novo array
function getPropertyNames(o, /*opcional*/ a) {
	a = a || [];
	for(var p in o) a.push(p);
	return a;
}



// LISTA DE ARGS DE COMPRIMENTO VARIAVEL: Objeto Arguments


function f(x, y, z) {
	// verifica se foi passado o numero correto de args
	if (arguments.length != 3) throw "Numero de args incorreto!";
	// continua o corpo...
}

// Função que define o maior argumento passado
function f(/*...*/) {
	var max = Number.NEGATIVE_INFINITY;
	for(var i = 0; i < arguments.length; i++)
		if (max < arguments[i]) max = arguments[i];
	return max;
}

function f(x) {
	console.log(x);			// exibe o valor de x
	arguments[0] = null;	// muda o elemento do array tambem muda x
	console.log(x);			//=> null: x foi alterado por arguments;
}

// CALLEE E CALLER --> propriedades do Objeto Arguments

// callee --> se refere a função que está sendo executada no momento
// caller --> se refere a função que chamou aquela, não é padronizada mas comumente implementada

var fact = function(x) {
	if (x <= 1) return 1;
	else return x * arguments.callee(x - 1);
}



	__FUNÇÕES COMO VALORES
	
	
function square(x) { return x*x; }
var s = square;		// s passa a se referir ao mesmo obj função
s(4);				//=> 16

var o = {square: function(x) { return x*x;}};
o.square(16);		//=> 256
	
var a = [function(x) { return x*x; }, 20];		// um array literal
a[0](a[1]);										//=> 400


operadores = {
	add:		function(a,b) { return a + b; },
	suntract:	function(a,b) { return a - b; },
	multiply:	function(a,b) { return a * b; },
	divide:		function(a,b) { return a / b; },
	pow:		Math.pow		// tambem funciona para funções pré-definidas
}
function operacao(operador, operando1, operando2) {
	if (typeof operadores[operador] === "function")
		return operadores[operador](operando1, operando2);
}

// (3 + 4) * (4 - 2)
operacao("multiply", operacao("add", 3, 4), operacao("subtract", 4, 2); 



// DEFININDO SUAS PROPRIAS PROPIEDADES DE FUNÇÃO

// inicializa a prop counter do obj function
// as declarações de função são içadas, de modo que
// podemos fazer esta atribuição antes da declaração da funçãoe

uniqueInteger.counter = 0;
function uniqueInteger() {
	return uniqueInteger.counter++;		// retorna e incrementa em counter
} 
	
// calcula fatorial e coloca os resultados na cache como propiedades da propria função
function factorial(n) {
	if (isNaN(n)) throw TypeError("Error grave!");
	if (isFinite(n) && n > 0 && n == Math.round(n)) {	// finito somente int positivo
		if (!(n in factorial))							// se não houver resultados na cache
			factorial[n] = n * factorial(n - 1);		// calcula e coloca na cache
		return factorial[n];							// retorna o resultado da cache
	}
	else return 1;
}
	
/* função extend()
 *
 * define uma função extend que copia as prop de seu segundo argumento
 * e dos subsequentes em seu primeiro argumento.
 * resolvemos um Erro do IE aqui> em muitas versões do IE, o laço for/in
 * não enumera uma prop enumeravel de o, se o prototype de o tem uma prop  
 * não enumeravel de mesmo nome. Isso significa que props como toString não
 * são manipuladas corretamente, a não ser que as verifiquemos explicitamente.
 */

var extend = (function() {					// atribui o valor de retorno desta função 
	for(var p in {toString:null}) {			// verifica a presença do Erro do IE, antes de usar o patch
		// se chegamos ate aqui então o laço for/in
		// funciona corretamente e retornamos uma função simples de extend()
		return function extend(o) {
			for(var i = 1; i < arguments.length; i++) {
				var source = arguments[i];
				for(var prop in source) o[prop] = source[prop];
			}
			return o;
		};
	}
	
	// esta é a lista de propriedades de caso especial que verificamos
	var protoprops = ["toString", "valueOf", "constructor", "hasOwnProperty",
	"isPrototypeOf", "propertyIsEnumerable", "toLocaleString"];
	
	// se chegamos até aqui, isso significa que o laço for/in não enumerou
	// a prop toString do objeto test. Portanto, retorna uma versão da funçãoe
	// extend() que testa explicitamente as prop não enumeraveis de Object.prototype
	for(var j = 0; j < protoprops.length; j++) {
		var prop = protoprops[j];
		if (source.hasOwnProperty(prop)) o[prop] = source[prop];
		return function patched_extend(o) {
			for(var i = 1; arguments.length; i++) {
				var source = arguments[i];
				for(var prop in source) o[prop] = source[prop];
			}
			return o;
		};
	}
}());
	

	
	__CLOSURES
// as variaveis da função tem vinculo no encadeamento de escopo e que portanto, a função é "fechada em relação" as suas variaveis.
	
var scope = "global scope";
function check() {
	scope = "local scope";
	function f() { return scope; }
	return f();
}
check();	//=> "local scope"

function check() {
	scope = "local scope";
	function f() { return scope; }
	return f;						// retorna "local escope"
}
check()();	//=> retorna a função "f" e depois a invoca no segundo "()"


var uniqueInteger = (function() {	// define e chama
	var counter = 0;				// estado privado da função abaixo
	return function() { return counter++; };
}());


// definindo mais variaveis prividas

function counter() {
	var n = 0;
	return {
		count: function() { return n++; },
		reset: function() { n = 0;}
	};
}

var c = counter(), d = counter();	// cria duas contadoras
c.count();							//=> 0
d.count();							//=> 0: elas contam independentemente
c.reset();							//=> os metodos reset() e count() compartilham estado
c.count();							//=> 0: pois zeramos c
c.count();							//=> 1: d não foi zerada


function counter(n) {	// o arg da função n é a var privada
	return {
		get count() { return n++; },
		set count(m) {
			if (m >= n) n = m;
			else throw Error("não pode ser definido um valor menor");
		}
	};
}

var c = counter(1000);
c.count;				//=> 1000
c.count;				//=> 1001
c.count = 2000;			
c.count;				//=> 2000
c.count = 2000;			// Error !



	__PROPRIEDADES DE FUNÇÃO, MÉTODOS E CONSTRUTORA
	
	
// length --> retorna a aridade da função (o numero de parametros que ela declara em sua lista de parametros);
// arguments.length --> retorna o numero de argumentos passados para a função chamadora

// esta função usa arguments.callee, de argumentos que não funcionaria no mode restrito

function f(x, y, z) {						// define uma função de test
	check(arguments);
	/* resto do corpo... */
}
function check(args) {
	var actual = args.length;			// o numero real de argumentos
	var expected = args.callee.length;	// o numero esperado de argumentos
	if (actual !== expected) throw Error("numero de argumentos passados não corresponde ao num de parametros");
}



// METODOS CALL() E APPLY() --> permite chamar uma função indiretamente



f.call(o);	// chama a função f como metodo de o
f.apply(o);

// é semelhante a isso

o.m = f;	// torna f um metodo temporario
o.m();		//chama-o, sem passar argumentos
delete o.m;	// remove o metodo temporario

f.call(o, 1, 2);	// passando dois argumentos
f.apply(o, [1,2]);	// argumentos de apply() é um array


// substitui o metodo m do obj o por uma versão
// que registra uma msg no inicio e no final
function trace(o, m) {									// monkey-patching --> é o processo pelo qual o codigo em linguagem dinamica é estendido ou modificado durante sua execução sem que seja alterado seu código-fonte
	var original = o[m];								// lembra o metodo original
	o[m] = function() {									// agora define o novo metodo
		console.log(new Date(), "Entering: ", m);		// registra msg
		var result = original.apply(this, arguments);	// chama origianl
		console.log(new Date(), "Entering: ", m);		// registra msg
		return result;
	};
}

''
// BIND() --> vincula uma função a um objeto e retorna uma função
// chamar a nova função, chama a função original f como metodo de o

function f(y) { return this.x + y; }	// esta função precisa ser vinculada
var o = {x: 1};							// objeto no qual vincularemos
var g = f.bind(o);						// chamar g(x) chama o.f(x)
g(3);									//=> 4

// é fácil fazer esse tipo de vinculo com:

function bind(f, o) {
	if (f.bind) return f.bind(o);	// usa o metodo bind() se houver
	else return function() {		// caso contrario, vincula-o como segue
		return f.apply(o, arguments);
	};
}


// METODO BIND() APLICAÇÃO PARCIAL - currying

var sum = function(x,y){ return x+y; };

// cria uma nova função como sum, mas com o valor de this vinculado a null
// e o 1º arg vinculado a 1. Essa nova função espera apenas um arg.
var succ = sum.bind(null, 1);
succ(2);	//=> 3: "x" esta para: 1, e passamos 2 para "y"

function f(y,z){ return this.x + y + z; }

// vincula "this" e "y"
var g = f.bind({x:1}, 2);
g(3);		//=> 6: this.x esta para: 1, y para 2 e z o que passamos 3


// Reflect.apply ( fuction, contexto, array ) # ES6
// É semelhante ao metodo bind de uma função

let ob1 = {	nome: 'Flávio'  }
let ob2 = {	nome: 'Almeida' }

function exibeNome () {
	return this.nome;
}
Reflect.apply( exibeNome, ob1, [] ) //> 'Flávio'
Reflect.apply( exibeNome, ob2, [] ) //> 'Almeida'



	__CONSTRUTORA FUNCTION()
	
	
var f = new Function("x", "y", "return x*y;");
var f = function(x,y){ return x*y; }			// são iguais

var scope = "global";
function myTest() {
	var scope = "local";
	return new Function("return scope");		// não captura o escopo local
}
// esta linha retorna "global", pois a função retornada pela
// construtora Function() não usa escopo local.
myTest()();	//=> "global"




	__PROGRAMAÇÃO FUNCIONAL
	
	
// PROCESSANDO ARRAYS COM FUNÇÃO

// calcula a media e o desvio padrao
// -- ESTILO NÃO FUNCIONAL:

var data = [1,1,3,5,5];

// -media
var total = 0;
for(var i = 0; i < data.length; i++) total += data[i];
var mean = total / data.length;

// -desvio padrao -> somamos os quadrados do desvio de cada elemento em relação a media
total = 0;
for(var i = 0; i < data.length; i++) {
	var deviation = data[i] - mean;
	total += deviation * deviation;
}
var stddev = Math.sqrt(total/(data.length-1));	// o desvio padrao é 2


// -- ESTILO FUNCIONAL

// define 2 funções simples
var sum = function(x,y){ return x+y; };
var square = function(x){ return x*x; };

var data = [1,1,3,5,5];
var mean = data.reduce(sum)/data.length;
var deviation = data.map(function(v){ return v-mean;});
var stddev = Math.sqrt(deviation.map(square).reduce(sum)/(data.length-1));


// ECMAScript 3 não tem matodos map() e reduce()

// definindo metodo map()
var map = Array.prototype.map
	? function(a, f) { return a.map(f); }	// usa map() se existir
	: function(a, f) {						// caso contrario implementa
		var results = [];					// nosso próprio
		for(var i = 0, len = a.length; i++)
			if (i in a) results[i] = f.call(null, a[i], i, a);
		return results;
	};

// definindo metodo reduce()
var reduce = Array.prototype.reduce
	? function(a, f, initial) {				// se o metodo reduce() existe
		if (arguments.length > 2)			// se foi passado valor initial
			return a.reduce(f, initial);
		else return a.reduce(f);			// caso contrário, nenhum valor initial
	}
	: function(a, f, initial) {				// algoritmo da especificação ES5
		var i = 0, len = a.length, accumulator;
		if (arguments.length > 2) accumulator = initial;
		else {	// encontre o 1º indice definido no array
			if (len == 0) throw TypeError();
			while (i < len) {
				if (i in a) {
					accumulator = a[i++];
					break;
				}
				else i++;
			}
			if (i == len) throw TypeError();
		}
		// agora chama f para cada elemento restante no array
		while (i < len) {
			if (i in a) accumulator = f.call(null, accumulator, a[i], i, a);
			i++;
		}
		return accumulator;
	};

// agora para calcular o desvio e a media, é como segue:
var data = [1,1,3,5,5];
var sum = function(x,y) { return x+y; }
var square = function(x){ return x*x; }
var mean = reduce(data, sum)/data.length;
var deviation = map(data, function(v) { return v-mean; });
var stddev = Math.sqrt(reduce(map(deviation, square), sum)/(data.length-1));



// FUNÇÕES DE ALTA ORDEM --> opera sobre funções recebe uma ou mais como args e retorna uma nova função

// Esta função de alta ordem retorna uma nova função que passa seus args 
// para f e retorna a negação logica do valor de retorno de f.

function not(f) {
	return function() {							// retorna uma nova
		var result = f.apply(this, arguments);	// que chama f
		return !result;							// e nega seu resultado
	};
}
var even = function(x) {						// uma função para determinar se um num é par
	return x % 2 === 0;
};
var odd = not(even);							// uma nova função que faz o oposto
[1,1,3,5,5].every(odd);							//=> true: todos os elementos do array são impar


function mapper(f) {
	return function(a) { return a.map(f); };
}
var increment = function(x) { return x+1; };
var incrementer = mapper(increment);
incrementer([1,2,3]);							//=> [2,3,4]

// Retorna uma nova função que calcula f(g(...)).
// a função retorna h passa todos os seus args para g, então passa
// o valor de retorno de g para f e, em seguida, retorna o valor de retorno de f.
// tanto f como g são chamadas com o mesmo valor de this com que h foi chamada.
function compose(square, sum) {
	return function() {
		// usamos a chamada de f porq estamos passando um unico valor edition
		// aplicamos em g porq estamos passando um array de valores.
		return square.call(this, sum.apply(this, arguments));
	};
}
var square = function(x) { return x*x; };
var sum = function(x, y) { return x+y; };
var quadradoDaSoma = compose(square, sum);
quadradoDaSoma(2, 3);							//=> 25



// APLICAÇÃO PARCIAL

// Função utilitaria para converter um obj semelhante a um array
// (ou um sufixo dele) em um array verdadeiro.
function array(a, n) {
	return Array.prototype.slice.call(a, n || 0);
}

// Os args desta função são passados na esquerda
function partialLeft(f /*,...*/) {
	var args = arguments;						// salva o array de arguments esxterno
	return function() {
		var a = array(args, 1);					// começa com os arguments externos de 1 em diante.
		a = a.concat(array(arguments));			// em seguida, add todos os argumnets internos.
		return f.apply(this, a);				// depois chama f nessa lista de arguments
	};
}

// Os args desta função são passados na direita
function partialLeft(f /*,...*/) {
	var args = arguments;						// salva o array de arguments esxterno
	return function() {
		var a = array(arguments);				// começa com os arguments internos
		a = a.concat(array(args, 1));			// em seguida, add os arguments externos de 1 em diante
		return f.apply(this, a);				// depois chama f nessa lista de arguments
	};	
}

// Os arguments dessa função servem como modelo. Os valores indefinidos
// na lista de argumentos são preenchidos com valores de conjunto interno.
function partial(f /*...*/) {
	var args = arguments;
	return function() {
		var a = array(args, 1);
		var i = 0, j = 0;
		for(;i < a.length; i++)					// itera por esses args, preenchendo os valores undefined do interno
			if (a[i] === undefined) a[i] = arguments[i++];
		a = a.concat(array(arguments, j));		// agora anexa os argumentos internos restantes
		return f.apply(this, a);
	};
}

// Aqui esta uma função com tres argumentos
var f = function(x, y, z) { return x * (y - z); };

// Observe como essas tres aplicações parciais diferem
partialLeft(f, 2)(3, 4);						//=> -2: vincula o PRIMEIRO argumento: 2 * (3 - 4)
partialRight(f, 2)(3, 4);						//=>  6: vincula o ULTIMO   argumento: 3 * (4 - 2)
partial(f, undefined, 2)(3, 4);					//=> -6: vincula o DO MEIDO argumento: 3 * (2 - 4)



// MEMOIZAÇÃO --> em programação funcional colocar o resultado na cache é denominado memoização

// Retorna uma função memoizada de f.
// Só funciona se todos os argumentos de f tem representação de string distintas
function memoize(f) {
	var cache = {};								// cache de valores armazenada na closure
	return function() {
		// cria uma versão de string dos argumentos para usar como chave de cache.
		var key = arguments.length + Array.prototype.join.call(arguments, ", ");
		if (key in cache) return cache[key];
		return cache[key] = f.apply(this, arguments);
	};
}


// Retorna o MDC - MAXIMO DIVISOR COMUM de dois inteiros, usando o algoritmo
// euclidiano
function gcd(a, b) {
	var t;										// variavel temp para troca de valores
	if (a < b) t=b, b=a, a=t;					// garante que a >= b
	while (b != 0) t=b, b=a%b, a=t;				// algoritmo de Euclides para MDC
	return a;
}
var gcdmemo = memoize(gcd);
gcdmemo(85, 187);								//=> 17


// Note que, quando escrevemos uma função recursiva que vai ser memoizada,
// normalmento queremos aplicar recursividade na versão memoizada e não na original.
var factorial = memoize(function(n) {
	return (n <= 1) ? 1 : n * factorial(n - 1);
});
factorial(5);	//=> 120: tambem coloca na cache os valores 4, 3, 2, 1.





	9- CLASSES E MODULOS_____________________________________
	
	
	__CLASSES E PROTOTIPOS
	

function range(from, to) {
	var r = inherit(range.methods);		// propiedades herdadas
	r.from = from;						// prop próprias
	r.to = to;
	return r;							// retorna o novo obj
}
range.methods = {						// Este obj prototipo define metodos herdados por todos objs range.
	includes: function(x) { return this.from <= x && x <= this.to; },
	foreach: function(f) { 
		for(var x = Math.ceil(this.from); x <= this.to; x++) f(x);
	},
	toString: function() { return "(" + this.from + "..." + this.to + ")"; }
};

var r = range(1, 3);					// Cria um obj range
r.includes(2);							//=> true: 2 esta no intervalo
r.foreach(consoloe.log);				// imprime 1 2 3
console.log(r);							// imprime (1...3)



	__CLASSES E CONSTRUTORAS
	
// Esta é a função construtora que inicializa novo obj Range
function Range(from, to) {
	this.from = from;
	this.to = to;
}
Range.prototype = {						// todos obj Range herdam deste obj
	includes: function(x) { return this.from <= x && x <= this.to; },
	foreach:  function(f) { for(var x = Math.ceil(this.from); x <= this.to; x++) f(x); },
	toString: function()  { return "(" + this.from + "..." + this.to + ")"; }
};

var r = new Range(1,3);					// cria um obj Range
r.includes(2);							//=> true: 2 esta no intervalo
r.foreach(consoloe.log);				// imprime 1 2 3
console.log(r);							// imprime (1...3)



// CONSTRUTORAS E IDENTIDADS DE CLASSE
	
	
// instanceof não verifica se r foi inicializado pela construtora Range.
// Mas verificav se ela herda de Range.prototype
r instanceof Range;						//=> true



// A PROPRIEDADE CONSTRUCTOR

var F = function(){};		// este é um obj função
var p = F.prototype;		// este é o obj prototipo associado a ele
var c = p.constructor;		// esta é a função associada ao prototype
c === F;					//=> true: F.prototype.constructor === F para qualquer função

var o = new F();
o.constructor === F;		//=> true: a prop constructor especifica a classe


// adicionando uma constructora no prototipo explicitamente
Range.prototype = {
	constructor: Range,			// define explicitamente a referencia de volta para a constructora
	includes: /* função...  , */
	foreach: /* função...  , */
}

// estende o obj Range.prototype predefinido para que não sobrescrevamos
// a prop Range.prototype.constructor criada automaticamente.
Range.prototype.includes = function(x) { return this.x <= x && x <= this.to; };
Range.prototype.foreach =  function(f) { for(var x = Math.ceil(this.from); x <= this.to; x++) f(x); };
Range.prototype.toStrin =  function()  { return "(" + this.from + "..." + this.to + ")"; }


// Uma função simples para definir classes simples
function defineClass(
	constructor, 	// uma função que configura prop de instancias
	methods, 		// Metodos de instancia: copiados para o prototype
	statics)		// Propiedades de classes: copiadas para constructora
{
	if (methods) extend(constructor.prototype, methods);
	if (statics) extend(constructor, static);
	return constructor;
}

/* Complex.js:
 * classe Complex para representar numeros complexos.
 * lembre-se de que um número complexo é a soma de um número real e um
 * número imaginário e de que o número imaginário i é a raiz quadrada de -1
 *
 * Esta função construtora define os campos de instancia r e i em cada 
 * instância que cria. Esses campos contêm as partes real e imaginaria
 * do numero complexo: eles são o estado do objeto
 */
function Complex(real, imaginary) {
	if (isNaN(real) || isNaN(imaginary)				// certifica que são 2 numeros
		throw TypeError();
	this.r = real;									// A parete real do numero Complexo
	this.i = imaginary;								// A parete imaginary do numero
}

/*
 * Os metodos de instancia de uma classe são definidos como propriedades com valor de
 * funções do objeto protótipo. Os métodos definidos aqui são herdados por todas as 
 * instâncias e fornecem o comportamento compartilhado da classe. Note que os métodos
 * de instância de JavaScript devem usar a palavra-chave this para acessar os campos de
 * instância
 */

// Adiciona um número complexo em this e retorna a soma em um novo objeto.
Complex.prototype.add = function(that) {
	return new Complex(this.r + that.r, this.i + that.i);
};

// Mulplica esse número complexo por outro e retorna o produto.
Complex.prototype.mul = function(that) {
	return new Complex(this.r * that.r - this.i * that.i,
	                   this.r * that.r + this.i * that.i);
};

// Retorna a magnitude de um numero Complexo. Isso é definido
// como sua distância em relação à origem (0,0) do plano complexo.
Complex.prototype.mag = function() {
	return Math.sqrt(this.r * this.r + this.i * this.i);
};

// Retorna um numero Complexo que é negativo deste.
Complex.prototype.neg = function() {
	return new Complex(-this.r, -this.i);
};

// Converte um objeto Complex em uma string
Complex.prototype.toString = function() {
	return "{" + this.r + ", " + this.i + "}";
};

// Testa se objeto Complex tem mesmo valor que outro
Complex.prototype.equlas = function(that) {
	return that != null && 						// deve ser definido e não nulo
	that.constructor === Complex &&				// e deve ser uma instancia de Complex
	this.r === that.r && this.i === that.i;		// e ter os mesmos valores
};

/*
 * Os campos de classes (como as constructoras) e os metodos de classe são definidos como
 * prop da constructora. Note que os metodos da classe geralmete não usam a 
 * palavra-chave this: eles operam somente em seus argumentos.
 */

// Aqui estão alguns campos de classe que contem números complexos pré-definidos úteis.
// Seus nomes estão maúisculas para indicar que são constantes.
// (Em ECMAScript 5, poderiamos tornar essas props somente para leitura.)
Complex.ZERO = new Complex(0,0);
Complex.ONE = new Complex(1,0);
Complex.I = new Complex(0,1);

// Este método analisa uma string no formato retornado pelo
// metodo de instancia toString e retorna um obj Complex ou lança um TypeError.
Complex.parse = function(s) {
	try {
		var m = Complex._format.exec(s);		// magica de expressao regular
		return new Complex(parseFloat(m[1]), parseFloat(m[2]));
	}
	catch (ex) {								// dispara uma exceção
		throw new TypeError("Não pode converter");
	}
};

// Um campo de classe "privado", usado em Complex.parse() acima.
// O sublinhado em seu nome indica que se destina a uso interno
// e não deve ser considerado parte de uma API pública dessa classe.
Complex._format = /^\{([^,]+),([^}]+)\}$/;


var c = new Complex(2, 3);						// cria um novo objeto com a construtora
var d = new Complex(c.i, c.r);					// Usa prop de instância de c
c.add(d).toString();							//=> "{5,5}": usa metodos de instancia
// Uma expressão mais complexa que usa um método e um campo de classe
Complex.parse(c.toString()).					// Converte c em uma string e de volta novamente,
add(c.neg()).									// adiciona veu negativo a ele,
equals(Complex.ZERO);							// e ele sempre será iqual a zero

  
	__METODOS DE COMPARAÇÃO
	
// metodo compareTo()
// se o obj this for "MAIOR" que o objeto comparado retorna um valor  > 0   	
// se o obj this for "MENOR" que o objeto comparado retorna um valor  < 0
// iguais retorna 0

Range.prototype.compareTo = function(that) {
	return this.r - that.r;
}

// pode ser útil em classificações
reanges.sort(function(a, b) { return a.compareTo(b); };




	10- COMPARAÇÃO DE PADRÃO COM EXPRESSÕES REGULARES_____________________________________
	
	
	
	__DEFININDO EXPRESSÕES REGULARES
	

var pattern = /s$/;				// forma literal cria um obj RegExp
var = new RegExp("s$");			// o mesmo que acima

/* - Caracteres literais de expressões regulares (caracter de escape)
 * 
 * Caractere alfanumerico		| Ele mesmo
 * \0							| O caracter NUL (\u0000)
 * \t							| Tabulação (\u0009)
 * \n 							| Nova linha (\u000A)
 * \v							| Tabulção vertical
 * \f							| Alimentação da página (\u000C)
 * \r							| Retorno de carro (\u000D)
 * \x nn						| Caracter Latino especificado pelo núm hexa nn.    Exp.: \x0A 	 é o mesmo que \n
 * \u nnnn						| Caracter Unicode especificado pelo núm hexa nnnn. Exp.: \u0009 é o mesmo que \t 
 * \c nn						| Caracter de Controle ^X. Exp.: \cj é equivalente ao caracter \n (nova linha)
 */

// caracteres de pontuação com significado especial:
// ^ $ * + ? = ! : | \ / {} () []

// não são especiais: "" '' @ 
 
	__CLASSES DE CARACTERES
	
e = /[abc]/				// a ou b ou c
e = /[^abc]/			// (classe negada) não pode ser: a ou b ou c
e = /[a-z]/				// qualquer letra a..z
e = /[a-zA-Z0-9]/		// a..z ou A..Z ou 0..9
e = /[\u0400-\u04FF]/	// corresponde a qualquer caracter cirílico

/* - Classes de caracteres de expressões regulares
 *
 * [...]						| Qualquer caracter entre os conchetes
 * [^...]						| Qualquer caracter que não esteja entre os conchetes
 * .							| Qualquer caracter, exceto nova linha ou outro finalizador de linha Unicode
 * \w							| Qualquer caracter alfabetico em ASCII. Equivalente a [a-zA-Z0-9_]
 * \W							| Qualquer caracter que não seja alfabetico em ASCII. Equivalente a [^a-zA-Z0-9_]
 * \s							| Qualquer caracter Unicode de espaço em branco
 * \S							| Qualquer caracter Unicode que não seja espaço em branco. Note que \S e \w não são a mesma coisa
 * \d							| Qualquer digito ASCII. Equivalente [0-9]
 * \D							| Qualquer caracter que não seja um digito em ASCII. Equivalente [^0-9]
 * [\b]							| Um backspace literal (caso especial)
 */


e = /[\s\d]/					// qualquer caracter de espaço em branco ou um digito


	__REPETIÇÃO
	
/* - Caracteres de repetição
 *
 * {n,m}						| Corresponde ao item anterior pelo menos n vezes, mais não mais do que m vezes
 * {n,}							| Corresponde ao item anterior n ou mais vezes
 * {n}							| Corresponde a exatamente n vezes do item anterior
 * ?							| {0,1} Corresponde a zero ou uma vez o item anterior. Isto é o item anterior é opcional
 * +							| {1,} Corresponde a uma ou mais vezes o item anterior
 * *							| {0,} Corresponde a zero ou mais vezes o item anterior.
 */

e = /\d{2,4}/					// um valor entre dois e quatro digitos
e = /\w{3}\d?/					// corresponde a três caracters alfabeticos seguido de um digito opcional
e = /\s+java\s+/				// corresponde a palavra java com um ou mais espaço antes e depois
e = /[^(]*/						// corresponde a 0 ou mais caracteres que não sejm parênteses de abertura



// REPETIÇÃO NÃO GANANCIOSA

// ??, +?, *? ou mesmo {1,5}?

// Por exemplo:

e = /a+/	// aplica-se "aaa" corresponde a string inteira "aaa" (repetição gananciosa)
e = /a+?/	// aplica-se "aaa" corresponde a string "a" corresponde ao numero minimo de caracteres
e = /a+b/	// aplica-se "aaaab" (gananciosa)
e = /a+?b/	// aplica-se "aaaab" (não gananciosa) equivale a gananciosa nesse caso




	__ALTERNAÇÃO, AGRUPAMENTO E REFERENCIA
	
	
	
e = /ab|cd|ef/ 				// corresponde a string "ab" ou "cd" ou "ef"
e = /\d{3}|[a-z]{4}/		// corresponde a três digitos ou quatro letras minúsculas
e = /a|ab/					// se aplicado "abelha" não busca o melhor "ab" fica com a primeira correspondencia valida "a"

e = /java(script)?/			// corresponde a "java" seguido ou não de "script"
e = /(ab|cd)+|ef/			// corresponde a string "ef" ou a uma ou mais repetições das strings "ab" ou "cd"


// referencias são através dos agrupamentos (1.(2(3..)..).)
// apartir do parenteses da esquerda \1 \2 \3 sucessivamente

// Exemplo:
//    \1       \2                \3
e = /([Jj]ava([Ss]cript)?)\sis\s(fun\w*)/  

e = /[a-z]+\d{3}/
e = /[a-z]+(\d{3})/			// agora suponha que vc só quer extrair os digitos


e = /['"][^'"]*['"]/		// a referencia se da ao valor da substring não ao padrão usado nessa subexpressão
e = /(['"])[^'"]*\1/		// para exigir que as aspas correspondam, use uma referência
e = /(['"])[^\1]*\1/		// não é permitido referencias dentro de classes


// Tambem é possivel criar grupos sem fazer uma referencia, com ?: na primeira posição dentro dos parenteses
// aqui não (?:[Ss]script) não tem referencia \2 se refere ao (fun\w*)
e = /([Jj]ava(?:[Ss]cript)?)\sis\s(fun\w*)/  


/* - Caracteres de alternação, agrupamente e referência de expressões regulares
 *
 * |						| Alternação, corresponde a expressão da esquerda ou da direita
 * (...)					| Agrupamento, agrupa itens em uma única unidade que pode ser usada com *, +, ?, |, etc.
 *							  lembra também dos caracteres que correspondem a esse grupo para uso com referências posteriores 
 * (?:...)					| Somente agrupamento. Agrupa itens em uma única unidade, mas não lembra dos caracteres
 *							  que correspondem a esse grupo.
 * \n						| Referência. Corresponde aos mesmo caracter que coincidiram quando o grupo núm n foi encontrado pela primeira vez.
 */
 

 
	__ESPECIFICANDO A POSIÇÃO DA CORRESPONDENCIA


// para corresponder a "JavaScript" em uma linha sozinha.
e = /^JavaScript$/

// corresponde (ou ancore) aos limites da palavra com \b
e = /\bjava\b/

// \B ancora a correspondencia em um local que não é um limite de palavra 
e = /\B[Ss]cript/			// corresponde: "JavaScript", "postscript", mas NÂO a: "script", "Scriting"

// (?=\:) declaração de leitura antecipada positiva
e = /[Jj]ava([Ss]cript)?(?=\:)/		// corresponde a "JavaScript" na string "JavaScript: The Definitive Guide"

// (?!script) declaração de leitura antecipada negativa
e = /Java(?!script)[A-Z]\w*/		// corresponde a "Java" desde que não seja seguido de "script"
//									// corresponde: "JavaBeans", "JavaScrip", mas não a "Javanese"


/* - Caracters de âncora de expressão regular
 *
 * ^						| Corresponde ao início da string e, em pesquisas de várias linhas, ao início de uma linha
 * $						| Corresponde ao fim da string e, em pesquisas de várias linhas, ao final de uma linha
 * \b						| Corresponde a um limite de palavra. Isto é, corresponde à posição entre um caracter
 *							  \w e um \W ou ebtre um caractere \w e o início ou o final de uma string. (Note, entretanto,
 *							  que [\b] corresponde a backspace.
 * \B						| Corresponde a uma posição que não é um limite de palavra.
 * (?= p)					| Uma declaração de leitura antecipada positiva. Exige que os caracteres seguintes correspondam
 *							  ao padrão p, mas não inclui esses caracters na correspondência.
 * (?! p)					| Uma declaração de leitura antecipada negativa. Exige que os caracters seguintes não correspondam ao padrão
 */

 

	__FLAGS
	
// não diferencia letras maiúsculas e minúsculas
e = /\bjava\b/i			// corresponde: "java" "Java" "jAVA" ...

e = /java$/im			// corresponde: "Java\n" --> note: o caracter "nova linha"


/* - Flags de expressão regular
 *
 * i						| Faz correspondencias sem diferenciar letras maiúsculas e minúsculas
 * g						| Faz uma correspondencia global - isto é, localiza todas as correspondencia, em vez de para depois da primeira
 * m						| Modo de várias linhas. ^ corresponde ao inicio da linha ou da string, e $ corresponde ao fim da linha ou ao final da string.
 */

 
	__METODOS DE STRING PARA COMPARAÇÕES DE PADRÕES
	

	// exec(), test(), search(), replace(), split(), match()

// SEARCH --> retorna a posição da 1ª correspondencia. -1 se não encontrar correspondencia
// se for passado uma string converte em um obj RegExp tornando uma expressão regular
// search() não suporta a flag global g ignora

"Javascript".search(/script/i);		// 4

// Independente de como seja composta, substitui pela composição correta de letras maiusculas e minusculas
text.replace(/javascript/gi, "JavaScript")


// Uma citação é composta de aspas, seguidas de quaisquer núm de
// caracters que não são aspas (os quais lembramos), seguidos
// de outra aspas.
var quote = /"([^'"]*)"/g;
// Substitui aspas normais por aspas inglesas,
// deixando o texto da citação (armazenado em $1) intacto.
text.replace(quote, '"$1"');

// MATCH() --> recebe um argumento sendo uma expressao reg. se não for ele converte em uma
// e então, retorna um array com as correspondecias

"1 plus 2 equals 3".match(/\d+/g);	//=> ["1","2","3"]

// se a expressão não tem a flag global "g"
// nesse caso o 1º elemento do array é a string correspondente
// e quaisquer elemeto restante são as subexpressões da expressão regular colocados em parênteses.

var url = /(\w+):\/\/([\w.]+)\/(\S*)/;
var text = "Visite nosso site em http://www.exemplo.com/~david";
var result = text.match(url);

var fullurl  = result[0];			// http://www.exemplo.com/~david"
var protocol = result[1];			// "http"
var host     = result[2];			// "www.exemplo.com"
var path     = result[3];			// "~david"




	__O OBJETO REGEXP
	
	
// para criar expressões regulares utilizando a construtora
// o 1º arg é a expressão note "\\" como nas expressões literais
// o 2º arg é opcional são as flags
// essa tecnica de criar as expressões é util para criar dinâmicamente
// expressões em tempo de execução.
var zipcode = new RegExp("\\d{5}","g");		// similar a "/\d{5}/g"



/* PROPRIEDADES DE RegExp

* - source     --> string somente de leitura que cnotem o texto da expressão regular
* - global     --> especifica se a expressão tem a flag g (true/false)
* - ignoreCase --> se tem a flag i (true/false)
* - multiline  --> se tem a flag m (true/false)
* - lastIndex  --> int de leitura/gravação armazena a posição na string em que a próxima busca deve começar usada por exec() e test()
*/


// METODOS DE RegExp

/* exec()
/* --> semelhante ao método match() de strings
* ao contrario de match, exec retorna uma unica correspondencia e fornece
* informações completas sobre essa correspondencia
* quando chamado em uma expressão com a flag g ele configura
* a propiedade lastIndex
*
* - index --> contem a posi do caracter correspondente
* - input --> se refere a string que foi pesquisada
*/

var pattern = /Java/g;
var text = "Javascript is more fun then Java!";
var result;
while ((result = pattern.exec(text)) != null) {
	console.log("Matched '" + result[0] + "'" +
" at position " + result.index + "; proxima busca começa no " + pattern.lastIndex);
}





	11- SUBCONJUNTOS E EXTENSÕES DE Javascript_____________________________________


	__CONSTANTES E VARIAVEIS SEM ESCOPO
	
let x = 1, y = 2;
let (x = x+1, y = y+1) {		// note que estamos ocultando variaveis
	console.log(x+y);			// imprime 5
}
console.log(x+y);				// imprime 3


function oddsum(n) {
	let total = o, result = [];				// Define por toda a função
	for(let x = 0; x <= n; x++) {			// x é definido apenas no laço
		let odd = 2 * x - 1;				// odd está apenas nesse laço
		total += odd;
		result.push(total);
	}
	// Usar x ou odd aqui causaria ReferenceError
	return result;
}

o = {x: 1, y: 2};
for(let p in o) console.log(p);			// imprime x e y (p fora do laço causaria ReferenceError)
for each(let v in o) console.log(v);	// imprime 1 e 2



	__ATRIBUIÇÃO E DESESTRUTURAÇÃO
	

let [x,y] = [1,2];						// o mesmo q let x = 1, y = 2
[x,y] = [x+1,y+1];						// omq	let x = x+1, y = y+1/
[x,y] = [y,x];							// troca valores 


function f(x,y) {
	return [(function(){return x*x;}(x)), Math.max(x,y)];
}

var [square, maior] = f(4, 5);				// fact = 16 e maior = 5
var [x,y] = [1];							// x = 1, y = undefined 
[x,y] = [1,2,3];							// x = 1, y = 2
[,x,,y] = [1,2,3,4];						// x = 2, y = 4

var first, second, all;
all = [first, second] = [1,2,3,4]			// first = 1, second = 2, all = [1,2,3,4]

var [one, [twoA, twoB]] = [1, [2, 2.5], 3]	// one = 1, twoA = 2, twoB = 2.5



// busca o nome da propriedade e atribui o valor dela na variavel
var transparent = {r: 0.0, g:0.0, b:0.0, a:1.0};	// cor RGBA
var {r:red, g:green, b:blue} = transparent;			// red = 0.0, green = 0.0, blue = 0.0 

// O mesmo que var sin = Math.sin, cos = Math.cos, tan = Math.tan
var {sin:sin, cos:cos, tan:tan} = Math;

// Uma estrutura de dados aninhada: um obj que contém um array de obj
var data = {
	name: "Atribuição de desestruturação",
	type: "extensão",
	impl: [{engine: "spidermonkey", version: 1.7}, {engine: "rhino", version: 1.7}]
};

var {name: nome, impl:[{engine: impl1, version: v1},{engine: impl2}]} = data;

console.log(nome);				// "Atribuição de desestruturação"
console.log(impl1);				// "spidermonkey"
console.log(v1);				// 1.7
console.log(impl2);				// "rhino"



// Reutilização de código através de mixin!

class Aviao
{
	constructor ( nome ) 
	{
		this._nome = nome;
	}

	voa () 
	{
		alert(`${this._nome} está voando`);
	}

	ligaMotor () 
	{
		console.log('liga o motor');
	}

	fechaPortas () 
	{
		console.log('Portas sendo fechadas');
	}
}

class Passarinho 
{
	constructor ( nome ) 
	{
		this._nome = nome;
	}

	voa () 
	{
		// ES6 executa o método `voa` de `Avião` usando como contexto a 
		// instância de `Passarinho`
		Reflect.apply(Aviao.prototype.voa, this, []); 
		// ES5
		Aviao.prototype.voa.apply(this, []); // Idem
	}
}


















