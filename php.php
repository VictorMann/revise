<?php

/* # # # # # # # # # # # # # # # # # # # # 
#							   2017-02-25
#		Dominando PHP & MySQL
#		
#
#					- W. Jason Gilmore -
# # # # # # # # # # # # # # # # # # # # # */



/*	[	3	]	Fundamentos do PHP		*/



# Sintaxe Padrão


<?php
	echo '<p>Algum conteúdo dinâmico aqui.</p>';
?>

// Short-Tags -> short_open_tag = On

<?
	echo 'Este é um outro exemplo PHP.';
?>

// Short-circuit
// Quando a sintaxe short-tag estiver ativada e você quiser rápidamente,
// imprimir um texto dinâmico.
<?='Este é outro exemplo PHP.'?>

// ASP Style
// foi removida do php 6
// <% print 'Este é outro exemplo PHP.'; %>


# Embutindo Múltiplos blocos de códigos


<html><head>
<title><?php echo 'Bem vindo!'?></title>
</head><body>
<?php $date = 'July 26, 2007'?>
<p>A data de hoje é <?=$date?></p>
</body></html>


# Comentando seu código


Sintaxe C++
	// Título : Meu primeiro Script
Sintaxe Shell
	# Título : Meu primeiro Script
Sintaxe C de linha múltiplas	
	/* Título : Meu primeiro Script */


# Mostrando Dados no Navegador


// print()
// embora a sintaxe oficial requer o uso de parênteses, eles não são exigidos.

int print( string arg )

print('<p>Exibindo meu texto.</p>');
print '<p>Exibindo meu texto.</p>';

// echo()

void echo( string arg1 [, string arg...] )

$fruta = 'Maçã';
$cor = 'vermelha';
echo 'A ', $fruta, ' tem a cor ', $cor;

// Printf()

int printf( string format [, mixed arg1 [, mixed ...]] )

printf('Estoque do bar: %d garrafas de água tônica.', 100);

// ESPECIFICADORES DE TIPO COMUMENTE USADOS

//	%b		->	arg considerado um int; apresentado como um num binário.
//	%c		->	arg considerado um int; apresentado como um caractere corresp aquele valor ASCII.
//	%d		->	arg considerado um int; apresentado como um decimal.
//	%f		->	arg considerado um ponto flutuante; apresentado como num float.
//	%o		->	arg considerado um int; apresentado como num octal.
//	%s		->	arg considerado um string; apresentado como string.
//	%u		->	arg considerado um int; apresentado como num decimal não assinado.
//	%x		->	arg considerado um int; apresentado como num hexadecimal em letras minúsculas.
//	%X		->	arg considerado um int; apresentado como num hexadecimal em letras maiúsculas.

printf('Garrafas de água tánica custam R$ %f', 43.20);
// usando um especificador de precisão
printf('R$ %.2f', 43.20);

// Há ainda outros especificadores para ajustar alinhamento de args, espaçamento, assinatura
// e largura. Consulte o manual do PHP.

// A função sprintf() -> string sprintf( string format [, mixed args])
$cost = sprintf('R$ %.2f', 43.20);	//-> $cost = 'R$ 43.20'


# Tipos de Dados Suportados pelo PHP


// Tipos de Dados Escalares
// São capazes de conter apenas um item de informação. Como: boolean, int, float, string.

// Boolean
$alive = false;			// false
$alive = 0;				// false
$alive = 1;				// true
$alive = -1;			// true

// Numerico
42						// decimal
-67899					// decimal
0766					// octal
0xC4E					// hexadecimal

// Float
4.532
.05
8.7e4
1.2+E11

// String
'PHP é uma linguagem'
"whoop-de-do" ( agitaçao )
'*9subway\n'
"123$%^789"

$color = "marrom";
// você pode recuperar um carac da string
$color[2]	// 'a'


# Tipos de Dados Compostos


// Array
$arr[0] = 'Alabama';	// $arr[] = 'Alabama'
$arr[1] = 'Alaska';		// $arr[] = 'Alaska'
$arr[2] = 'Arizona';	// $arr[] = 'Arizona'

$state['Alabama'] = 'Montegomery';
$state['Alaska']  = 'Juneau';
$state['Arizona'] = 'Cheyenne';

// Objeto
class Appliance 
{
	private $power;
	
	public function setPower($status) 
	{
		$this->power = $status;
	}
}
$obj = new Appliance;
$obj->setPower('fire');


# Conversão Entre Tipos de Dados Usando Type Casting


(array)							Array
(bool) || (boolean)				Boolean
(int) || (integer)				Integer
(int64)							Inteiro de 64 bits (introduzido no php 6)
(object)						Object
(real) || (double) || (float)	Float
(string)						String


$score = (double) 13;			// $score = 13.0
$score = (int) 13.8;			// $score = 13
$sentence = (int) 'Uma frase';	// $sentence = 0
$score = (array) 1332;			// $score[0] = 1332
$model = (object) 'Toyota';		// $model->scalar = 'Toyota'


# Adaptando Tipos de Dados com o Type Juggling


$total = 5;				// um int
$count = '15';			// uma string
$total += $count;		// $total = 20 (int)

// Outro Exp.:

$tot = '45 carros de bombeiro';
$novos = 10;
$tot = $novos + $tot;	// $tot = 55 (int)

// Outro Exp.:

$val_1 = '1.2e3';			// 1200
$val_2 = 2;
$mult = $val_1 * $val_2;	// $mult = 2400


# Funções Relacionadas ao Tipo


// Tipos de Recuperação
// retorna o tipo da var especificado no parametro.

string gettype( mixed var )

gettype(1);						// integer
gettype(.5);					// double
gettype('abc');					// string
gettype(new StdClass);			// object
gettype(function(){});			// object
gettype(true);					// boolean
gettype(array());				// array

// Tipos de Conversão
// A função settype() converte uma var, em um tipo.

bool settype( mixed var, string type )

$str = '1.2e11';
settype($str, 'double');


# Funções de Identificador de Tipo


is_array()
is_bool()
is_numeric()
is_float()
is_integer()
is_null()
is_object()
is_resource()
is_scalar()
is_string()


$item = 43;
printf ('A variável é do tipo array: %d', is_array($item));
//-> A variável é do tipo array: 0
printf ('A variável é do tipo inteiro: %d', is_integer($item));
//-> A variável é do tipo inteiro: 1
printf ('A variável é um número: %d', is_numeric($item));
//-> A variável é um número: 1


# Váriáveis


// Desiginação de valor
$cor = 'red';
$sum = 15 + '10';

// Designação de Referência
$cor_1 = 'orange';
$cor_2 =& $cor_1;		// cor_1 e cor_2 alocam o mesmo espaço de memória


# Escopo de Variáveis


// Variáveis Locais

$x = 4;
function assignx() {
	$x = 0;
	printf('Dentro da função o valor de x é %d', $x); // 0
}
printf('fora da função o valor de x é %d', $x); // 4

// Variáveis Globais

$somar = 15;
function add() {
	GLOBAL $somar;	// ref a var $somar fora da função
	$somar ++;
}
// Outra alternativa para var globais Idem
$somar = 15;
function add() {
	$GLOBALS['somar'] ++;
}
echo 'Somar é igual à '.$GLOBALS['somar'];

// Variáveis Státicas
// não são destruidas quando deixa-se a função, elas retêm o valor
function myscope() {
	STATIC $count;	// implicitamente conf para 0
	$count ++;
	return $count;
}


# Variáveis Superglobais

// PHP oferece um número de variáveis pré-definidas qua são acessives a partir
// de qualquer lugar dentro do script executado e oferece a você uma quantidade
// substâncial de informação sobre o ambiente.

foreach ($_SERVER as $var => $value) {
	echo "{$var} => {$value} <br>\n";
}

// para exibir o endereço IP do usuário
printf('Seu endereço IP é %s', $_SERVER['REMOTE_ADDR']);
// Informações referentes ao navegador e sistema do usuário
printf('Seu navegador é %s', $_SERVER['HTTP_USER_AGENT']);
//> Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36 OPR/49.0.2725.64


# Recuperando Variáveis Passadas Com o Uso de GET


// O superglobal $_GET contêm info pertinentes a qualquer parâmetro passado usando
// o método GET.

URI : http://www.index.com.br?cat=apache&id=1234
$_GET['cat']	//> apache
$_GET['id']		//> 1234


# Recuperando Variáveis Passadas Com o Uso do POST

// O superglobal $_POST contêm info pertinentes a qualquer parâmetro passado usando
// o método POST.

<form action="index.php" method="POST">
<input type="text" name="nome">
<input type="text" name="email">
<input type="radio" name="item[]" value="Banana">
<input type="radio" name="item[]" value="Maça">
<input type="radio" name="item[]" value="Goiaba">
$_POST['nome']				//> 'Victor'
$_POST['email']				//> 'victor@victor.com'
$_POST['item']				//> array de items selecionados


# Recuperando informações Armazenadas Dentro dos Cookies

// A superglobal $_COOKIE armazena info passadas ao script através dos cookies do HTTP.
// Tais cookies são tipicamente configurados por um script PHP previamente executados

// através da função setcookie(name, value, [expire], [path], [domain], [secure=false]).
setcookie(name, value, expire, path, domain, secure)

// exemplo imagine que você configure com a função setcookie() um cookie chamado id
// você pode mais tarde acessá-lo chamando $_COOKIE['id']


# Recuperando informações Sobre Arquivos Atualizados Usando POST por $_FILES

// usado para recuperar arquivos enviados pelo metodo POST
// $_FILES é um array bidimensional

$_FILES['upload-name']['name']			// nome do arq enviado
$_FILES['upload-name']['tmp_name']		// nome temporario
$_FILES['upload-name']['size']			// tamanho do arq bytes
$_FILES['upload-name']['type']			// type MIME Exp.: image/png
$_FILES['upload-name']['error']			// um código de status do upload UPLOAD_ERR_OK = 0

is_uploaded_file($_FILES['nome-arq']['tmp_name'])
move_uploaded_file($_FILES['nome-arq']['tmp_name'], 'PATH DESTINO')

# Aprendendo Mais Sobre Ambiente de Sistema Operacional


// O superglobal $_ENV oferece info em relação ao ambiente do servidor

$_ENV['HOSTNAME']	// O nome do servidor
$_ENV['SHELL']		// O sistema shell


# Recuperando informações Armazenadas em Sessões


// O superglobal $_SESSION contém info sobre todas as var de sessão.
// Registrar info de sessão dá a você a conveniência de se referir a ela
// por meio de todo o seu site Web. Sem o trabalho de passar dados através de GET e POST
session_start()
$_SESSION['var'] = 'valor';


// Variáveis de Variáveis

$nome = 'Charles';
$$nome = 'Chaplin';

echo $nome $$nome;
echo $nome ${$nome};
//> 'Charles Chaplin';


# Constantes


bool define( string name, mixed value [, bool case_insensitive = false] ) 

define('PI', 3.1415);
// case_insensitive (não diff maiús de minús)
define('TAXA', .005, true)


# Expressões


$a = 5;
$a = '5';
$a = (50 + $a) * 2;
$a ++;

// Operandos

$a ++;			// operando : $a
$sum += $val;	// operando : $sum, $val

// Operadore

// ASSOCIAÇÃO E PRECEDENCIA

//	new					:	N/A
//	()					:	N/A
//	[]					:	right
//	! ~ ++ --			:	right
//	@					:	right
//	/ * %				:	left
//	+ - .				:	left
//	<< >>				:	left
//	< <= > >=			:	left
//	== != === <>		:	left
//	& ^ |				:	left
//	&& ||				:	left
//	?:					:	right
//	= += *= -= /= %= =&	:	right
//	AND XOR OR			:	left	


// Operadore de Designação

$a = 5;					// atribui
$a += 5;				// soma-atribui
$a -= 5;				// subtr-atribui
$a *= 5;				// mult-atribui
$a .= 5;				// concatena-atribui

// Operadores de String

$a = 'abc' . 'xyz';		// concatena
$a .= 'cmyc';			// concat-atribui

// Operadores de Incremento e Decremento

++ $a | $a ++;		// pré-incremento | pós-incremento
-- $a | $a --;		// pré-decremento | pós-decremento

// Operadores Lógicos

// Se o arq não exite exiba a mensagem
file_exists('file.txt') OR print 'Arquivo não encontrado';

$a && $b
$a || $b
! $a
$a AND $b
$a OR $b
$a XOR $b
NOT $a

// Operadores de Iguadade

$a == $b
$a != $b // <> idem
$a === $b
$a !== $b

// Operadores de Comparação

$a > $b
$a < $b
$a >= $b
$a <= $b
($a == 12) ? 5 : -1	// ternário


# Interpolação de String


// Aspas Duplas

$sport = 'boxe';
echo "O esporte favorito de John é $sport";
echo "O esporte favorito de John é {$sport}";
// sequencias de escape são interpretadas
echo "Esta é uma linha.\nE esta é outra linha.";

// ESCAPE
//	\n	\t	\r	\\	\$	\"	\[0-7]{1,3}	\x[0-9A-Za-z]{1,2}

// Aspas Únicas
// não interpreta escape nem var
 $num = 5;
echo 'Esta é uma linha.\nE esta é outra linha.{$num}';

// Heredoc
$city = 'romero.com'
echo <<< DELIMITER
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx, aaaaaaaa
aaaaaaa, bbbbbbbbbb, cccccccccccccc <a href="{$city}"></a>, ddd
DELIMITER;


# Estruturas de Controle


// Condicionais
// if
$secret = 'xxx';
if (isset($_POST['pswd']) && $_POST['pswd'] === $secret) echo ':)';
else echo ':(';

$a = 3;

if ($a == 1) 		;
elseif ($a == 2) 	;
else				;

// switch
switch ($a) {
	case 1: break;
	case 2: break;
	default:
}


# Instruções de repetição


$a = 0;
while ($a < 5) {
	$a ++;
}
$a = 5;
do {
	echo $a.PHP_EOL;
} while (-- $a);
for ($a = 0; $a != 3; $a ++) ;
for (;$a < 5;) ;
for (;;$a++) if ($a == 5) break;

$arr = array(1,2,3,4,5);
foreach ($arr as $val) {
	$arr_2[] = $val;
}
$sites = array('google' => 'google.com', 'uol' => 'uol.com');
foreach ($sites as $indice => $valor) {
	echo $nome . ' : ' . $site;
}


# Saltos -> break, goto, continue

$arr = array(1,2,3,4);
foreach ($arr as $val) {
	if ($val === count($arr)) break;
	if ($val%2 == 0) continue;
}

for ($i = 0; $i < 10; $i ++) {
	
	$randon = rand(1, 50);
	if ($randon < 10) goto less;
	else echo 'Número maior que 10<br>';
}
less: echo 'Número menor que 10';


# Expressão de Inclusão de Arquivos

include('myClass.class.php');
include 'myClass.class.php';

// uso incorreto
if (expression) include ('filename');
else include ('another_filename');

// uso correto (com delimitadores)
if (expression) { include ('filename'); }
else { include ('another_filename'); }

include "http://www.index.com?background=blue";

// Garantindo que um Arquivo Seja Incluido Apenas Uma Vez

include_once ('filename');

// Require

require ('filename');
require 'filename';
require_once 'filename';
// condicionais não funcionam com require




/*	[	4	]	Funções		*/




// Chamando uma função

$value = pow(5, 3);		//>	125
printf('Cinco elevado a três: %d', pow(5, 3));
echo 'Cinco elevado a três: '. pow(5, 3);


# Criando uma Função


function nameFunction( $params ) {
	// body-function
}

nameFunction();	// invocando 


// Passando Argumentos (by value / by referencia)

function byValue($value, $mult = 5) {	// $mult default ( opcional )
	$value *= $mult;
	return $value;
}
$value = 3;
byValue($value);	//> 15
$value				//> 3

function byRef(&$value, $mult = 5) {
	$value *= $mult;
	return $value;
}
$value = 3;
byRef($value);		//> 15
$value				//> 15


// Obtendo Argumentos de forma Dinâmica

array   func_get_args( void )		// todos args passados na função
integer func_num_args( void )		// número de argumentos passados

function ola(/* args opc */) {
	$args = func_get_args();
	$qtd  = func_num_args();
	for ($i = 0; $i < $qtd; $i ++) {
		echo 'Olá'. $args[ $i ] .', ';
	}
}
ola('Aline', 'Amanda', 'Samanta', 'Clarice');
//> 'Olá Vitória, Olá Beatriz, Olá Beatriz, Olá Leticia'


// Funções Anônimas

$remove_acento = function( $str ) {
	$a = array('À', 'Á', 'Â', 'Ä', 'Ç', 'È', 'É', 'Ê',
	'Ì', 'Í', 'Ò', 'Ó', 'Õ', 'Ô', 'Ù', 'Ú', 'à', 'á',
	'â', 'ã', 'ç', 'è', 'é', 'ê', 'ì', 'í', 'î', 'ò',
	'ó', 'õ', 'ô', 'ú', 'ù', 'û', 'ü');
	
	$b = array('A', 'A', 'A', 'A', 'C', 'E', 'E', 'E',
	'I', 'I', 'O', 'O', 'O', 'O', 'U', 'U', 'a', 'a',
	'a', 'a', 'c', 'e', 'e', 'e', 'i', 'i', 'i', 'o',
	'o', 'o', 'o', 'u', 'u', 'u', 'u');
	
	return str_replace($a, $b, $str);
};

echo $remove_acento('José da Conceição');
//> 'Jose da Conceicao'

$palavras[] = 'José da Conceição';
$palavras[] = 'Jérson Araújo';
$palavras[] = 'Félix Júnior';
$palavras[] = 'Ênzo Müler';
$palavras[] = 'Ângelo Ônix';

array array_map( callback function, array arr1 [, array arr ...] )

$r = array_map($remove_acento, $palavras);
print_r($r);
//> Array (
//   [0] => Jose da Conceicao
//   [1] => Jerson Araujo
//   [2] => Felix Junior
//   [3] => Enzo Muler
//   [4] => Angelo Onix 


# Funções Recursivas


function fatorial( $num ) {
	if ($num <= 1) return 1;
	return $num * fatorial($num - 1);
}


# Bibliotecas de Função


<?php
function localTaxa( $iniTaxa, $val = .12) {}
function sumatori( $value ) {}
function percentual( $num, $percent ) {}
?>
// para fazer uso da biblioteca em suas aplicações
include 'financas.library.php';




/*	[	5	]	Array		*/




# Criando um Array


$arr = array(0, 1, 2, 3, 4, 5);
$arr = array('red' => '#F00', 'green' => '#0F0', 'blue' => '#00F');

$arr[0] = 'Delivery';
$arr[49] = 'Coroa';

$arr[] = 'Porcos';
$arr[] = 'Frangos';

$arr['qtd'] = 13;

$arr = [1, 2, 4, ['goto', 'pare']];
$arr = array(1, 2, 4, array('goto', 'pare'));
$nums = array('um' => 1, 'dois' => array('2.1' => 'dois + um', '2.2' => 'dois + dois'));

foreach ($nums as $key => $value) {
	echo $key;
	// não é array
	if (! (is_array($value))) echo ' - '. $value. '<br>'.PHP_EOL;
	// é um array
	else {
		echo '<br>'.PHP_EOL;
		foreach ($value as $key2 => $value2) {
			echo "{$key2} => {$value2}<br>";
		}
	}
}


# Extraindo Arrays com list()


void list( mixed )

list($nome, $tel, $email) = array('Guto', '9876-5432', 'guto@guto.com');

// Outro Exp.:

$guto = 'Guto|9876-5432|guto@guto.com';
list($nome, $tel, $email) = explode('|', $guto);


# Populando Arrays com um Limite de Valor Pré-Definido


array range( mixed low, mixed high [, int step] )
// A função range() oferece uma maneira fácil de criar intervalos de array

$arr = range(1,5);	// [1, 2, 3, 4, 5]
range(0, 10, 2);	// [0, 2, 4, 6, 8, 10]
range('A', 'F');	// ['A',..,'F']


// Testando se é um Array

bool is_array( mixed var )

$state[] = 'Florida';
printf('$state é um array : %s', (is_array($state)?'TRUE':'FALSE'));


# Adicionando e Removendo Elementos


// int array_unshift ( array &array, mixed vars )
// int array_push    ( array &array, mixed vars )
// mixed array_shift ( array &array )
// mixed array_pop   ( array &array )

$arr = array();
array_unshift($arr, 1, 2);		//	[1, 2]
  array_shift($arr);			//	[2]
   array_push($arr, 3, 4);		//	[2, 3, 4]
    array_pop($arr);			//	[2, 3]


# Localizando Elementos


bool in_array( mixed busca, array array [, bool strict] )
// o 3° param força a considerar o tipo

$arr = [1, 2, 3, 4, 5];
echo in_array(3, $arr) ? 'true' : 'false';


// Buscando Chaves Array Associativo
// retorna TRUE se uma chave especifica for encontrada

bool array_key_exists( mixed key, array array)

$arr = array('one' => 1, 'two' => 2, 'tree' => 3);
array_key_exists('two', $arr);

// Busca Valores de Array Associativos
// busca um valor e retorna o seu indice

mixed array_search( mixed busc, array haystack [, bool strict] )

$arr = array('one' => 1, 'two' => 2, 'tree' => 3);
$key = array_search(2, $arr);
$arr[ $key ];	// $key = 'two'


# Recuperando as Chaves de um Array


// retorna um array consistindo as chaves de um outro array. Se search_values for
// incluído, somente keys combinando com o valor serão retornadas

array array_keys( array array [, mixed search_values] )

$arr = array('one' => 1, 'two' => 2, 'tree' => 3);
array_keys($arr);	//>	['one', 'two', 'tree']


# Recuperando os Valores de um Array


array array_values(array array)

$arr = array('one' => 1, 'two' => 2, 'tree' => 3);
array_values($arr);	//>	[1, 2, 3]


# Percorrendo Array


// Recuperando a Chave Atual no Array

mixed key( array array )

$capitals = array('Ohio' => 'Columbus', 'Iowa' => 'Des Moines');
while ($key = key($capitals)) {
	echo 'O indice: '.$key;		//> 'Ohio' 'Iowa'
	next($capitals);			// move o ponteiro do array para a proxima posi
}

// Recuperando o Valor Atual no Array

mixed current( array array )

while ($value = current($capitals)) {
	echo 'O valor: '.$value;
	next($capitals);
}

// Recuperando a Chave e o Valor Atual
// A função each() retorna o par atual chave/valor e avança o ponteiro em uma posi

array each(array array)

while ($mix = each($capitals)) {
	echo 'O indice' .$mix[0].     ' o valor' .$mix[1];
	echo 'O indice' .$mix['key']. ' o valor' .$mix['value'];	// Pode ser assim tbm
}


# Movendo o Ponteiro no Array


// Movendo o Ponteiro para a Próxima Posição no Array
// A função next() retorna o valor da posi imediatamente seguinte

mixed next( array array )

$fruits = array('Maçã', 'Pera', 'Uva');
$fruit = next($fruits);	//> 'Pera'

// Movendo o Ponteiro à Posição Anterior no Array

mixed prev( array array )
$fruits = array('Maçã', 'Pera', 'Uva');
$fruit = prev($fruits);	//> FALSE (posi anterior à 0) 
$fruit = next($fruits);	//> 'Pera'
$fruit = prev($fruits);	//> 'Maçã'

// Movendo o Ponteiro à Primeira Posição do Array

mixed reset( array array )

// Movendo o Ponteiro à Última Posição do Array

mixed end( array array )


// Passando Valores de Array para uma Função
// A função array_walk() irá passar cada elem de um array à função definida
// a função definida precisa ter 2 param: (value, indice [, dados]) atual
// O 3º param é um valor a passar para a função opcinal
bool array_walk( array &array, callback function [, mixed userdata] )

function dados_usuario( &$value, $key ) {
	$value = strip_tags($value);
}
array_walk($_POST['keywords'], 'dados_usuario');


# Determinando Tamanho e Exclusividade do Array


// Determinando o Tamanho do Array
// A função count() retorna o num tot de valores encontrados no array
// Se mode for definido para 1 o array será contado recursivamente

integer count( array array [, int mode] )

$garden = array('cabbage', 'peppers', 'turnips', 'carrots');
count($garden)			//> 4
sizeof($garden)			//> 4 (é funcionalmente Idem)

// Exp.: com mode

$locations = array('Italy', 'Amsterdam', array('Boston', 'Des Moines'), 'Miami');
count($locations, 1);	//> 6

// Contando a Frequencia do Valor de Array
// A função array_count_values() retorna um array com os indeces associados ao num de
// frequencia de um determinado valor

array array_count_values( array array )

$state = array('Ohio', 'Iowa', 'Arizona', 'Iowa', 'Ohio');
$frequency = array_count_values($state);	//> ['Ohio' => 2, 'Iowa' => 2, 'Arizona' => 1]

// Determinando Valores Únicos no Array
// A função array_unique() remove valores duplicatas

array array_unique( array array )
$unicos = array_unique($state);				//> ['Ohio', 'Iowa', 'Arizona']


# Classificando Array


// Revertendo a Ordem dos Elem Array
// A função array_reverse() inverte a ordem de elem se o 3º param
// for definido mantém a assoc de indices 

array array_reverse( array array [, bool preserve_keys] )

$garden = array('cabbage', 'peppers', 'turnips', 'carrots');
$ord = array_reverse($garden);	//> ['carrots', 'turnips', 'peppers', 'cabbage']

// Exp.: matem assoc de índice

$ord_Assoc = array_reverse($garden, true);
//> [3 => 'carrots', 2 => 'turnips', 1 => 'peppers', 0 => 'cabbage']


// Invertendo Valores e Chaves de Array

array array_flip( array array )

$color = array('red', 'green', 'blue');
$color = array_flip($color);	//> ['red' => 0, 'green' => 1, 'blue' => 2]


// Classicando um Array

void sort( array &array [, int sort_flags = SORT_REGULAR] )
 
//	sort_flags (values)
//		SORT_NUMERIC	:	Organiza itens numericamente, bom para INT e FLOAT	
//		SORT_REGULAR	:	Organiza pelo seu valor ASCII, B < b
//		SORT_STRING		:	Organiza de uma forma melhor ao mundo real ( veja natsort() )

$num = array(12, 4, 100, 0);
sort($num);		//> [0, 4, 12, 100]

// Outro Exp.: é importante notar que assoc não mantém

$color = array('red' => '#f00', 'green' => '#0f0', 'blue' => '#00f');
sort($num);		//> [0 => 'blue', 1 => 'green', 2 => 'red']

// Ordem Reversa
void rsort( array &array [, int sort_flags] )

// Mantendo a assoc
void asort( array &array [, int sort_flags] )
void arsort( array &array [, int sort_flags] )


// Organizando um Array Naturalmente
// A função natsort() é destinada a oferecer um mecanismo de organização comparável
// aos mecanismos que as pessoas normalmente usam 

void natsort( array &array )	// (matém assoc de índice)

$img = array('img20', 'img2', 'img1', 'img10');
sort($img);			// ['img1', 'img10', 'img2', 'img20']
natsort($img);		// ['img1', 'img2', 'img10', 'img20']

// Organzando Naturalmete sem diferenciar Maiús de Minús

void natcasesort( array &array )	// (matém assoc de índice)

$img = array('img20', 'IMG2', 'img1', 'Img10');
natsort($img);		// ['IMG2', 'Img10', 'img1', 'img20']
natcasesort($img);	// ['img1', 'IMG2', 'Img10', 'img20']


// Organiza um Array por Chaves

int ksort( array &array [, int sort_flags] )


// Organiza de acordo com uma função

bool usort( array &array, callback function)

$dates = array('10-10-2003', '2-17-2002', '2-16-2003', '1-10-2005', '10-10-2004');

function dateSort($x, $y) {
	// se as datas forem iguias
	if ($x == $y) return 0;
	// desmontando data
	list($monthX, $dayX, $yearX) = explode('-', $x);
	list($monthY, $dayY, $yearY) = explode('-', $y);
	// colocando 0 ao lado do mês se necessário
	$monthX = str_pad($monthX, 2, '0', STR_PAD_LEFT);
	$monthY = str_pad($monthY, 2, '0', STR_PAD_LEFT);
	// colocando 0 ao lado do dia se necessário
	$dayX = str_pad($dayX, 2, '0', STR_PAD_LEFT);
	$dayY = str_pad($dayY, 2, '0', STR_PAD_LEFT);
	// Remontando as datas
	$x = $yearX . $monthX . $dayX;
	$y = $yearY . $monthY . $dayY;
	
	// Determina que é maior
	return ($x > $y) ? 1 : -1;
}

usort($dates, 'dateSort');


# Unindo, Dividindo, Combinando e Dissecando


// Unindo Arrays

array array_merge( array arr1, array arr2 [, ...] )

$a = [1,2,3];
$b = [4,5,6];
$union = array_merge($a,$b);	//> [1,2,3,4,5,6]

// Unindo Recursivamente

array array_merge_recursive( array arr1, array arr2 [, ...] )

$a = array('a' => 1, 'b' => 2);
$b = array('c' => 3, 'a' => 10);
$union = array_merge_recursive($a,$b);	//> ['a' => [1, 10], 'b' => 2, 'c' => 2]

// Combinando Dois Arrays

array array_combine( array keys, array values )

$a = [1,2,3];
$b = ['a','b','c'];
$comb = array_combine($a,$b);	//> [1 => 'a', 2 => 'b', 3 => 'c']

// Dividindo um Array

array array_slice( array array, int offset [, int length [, bool preserve_key]] )	// aceita negative

$a = [0,1,2,3,4];
$pedaco = array_slice($a, 1, 3);	//> [1, 2, 3]

// Removendo e Substituindo

array array_splice( array &array, int offset [, int length [, array replacement]] )

$a = [0,1,2,3,4];
$arr = array_splice($a, 1, 2);			//> $arr = [1,2] | $a = [0,3,4]
$arr = array_splice($a, 1, 0, [5,6]);	//> $arr = []    | $a = [0,5,6,1,2,3,4]

// Interseção de Array

array array_intersect( array arr1, array arr2 [, ...] )	// aqueles val no first array

$a = [1,2,3];
$b = [4,3,1];
$c = [4,1,5];
$intersect = array_intersect($a, $b, $c);	//> [1]

// Interseção de Array com Assoc

array array_intersect_assoc( array arr1, array arr2 [, ...] )	// aqueles val no first array

$a = array(0 => 'a', 1 => 'b');
$b = array(2 => 'b', 5 => 'c');
$c = array(1 => 'a', 2 => 'b');
$inter_assoc = array_intersect_assoc($a, $b, $c);	//> []

// Diferença de Array

array array_diff( array arr1, array arr2 [, ...] )	// aqueles val no first array

$a = [1,2,3];
$b = [6,3,0];
$c = [4,1,5];
$diff = array_diff($a, $b, $c);	// [2]

// Diferença de Array Assoc

array array_diff_assoc( array arr1, array arr2 [, ...] )	// aqueles val no first array

// Retorna umConjunto Aleatório de Chaves

mixed array_rand( array array [, int num_req = 1] )

$a = [1,2,3,4,5,6];
$rand = array_rand($a);		// [3] ( 1 elem aleatório )
$rand = array_rand($a, 2);	// [6,2]

// Embaralha Array

void shuffle( array &array )

$a = [1,2,3,4,5];
shuffle($a);		// $a [3,1,5,4,6,2]

// Retorna uma Somatoria do Array

number array_sum( array array )

$a = [42,'Ola mundo!', 42];
$sum = array_sum($a);		//> 84

// Subdivide um Array

array array_chunk( array array, int size [, bool preserve_keys = false] )

$a = [1,2,3,4,5,6,7,8,9,10];
$chuck = array_chunk($a, 3);	// array([1,2,3], [4,5,6], [7,8,9], [10])




/*	[	8	]	Gerenciamento de Erros e Exceções	*/




// Diretrizes de Configuração

// Nível de Sensibilidade de Error ( consultar no book )

error_reporting = E_ALL
error_reporting E_ERROR | E_PARSE | E_CORE_ERROR
error_reporting E_ALL & ~(E_USER_ERROR | E_USER_WARNING | E_USER_NOTICE)

// Exibindo Erros de Inicilização

display_startup_errors	// exibe qualquer error encontrado durante a inicialização
display_error			// você deve ter esta diretriz ativada durante testes

// Identificando o Arquivo de Log

error_log	// syslog (Linux) evento log (Windows)

// Configurando o Comprimento máximo

log_errors_max_len	// comprimento max em bytes, cada item logado

// Ignorando Erros Repetidos

ignore_repeated_source

// Armazenado o Erro Mais Recente em uma Variável

track_errors	// $php_errormsg

// Logar Erros

// Inicializando o Instrumento de Logging do PHP

void define_syslog_variables( void )

// Abrindo Conexão de Logging

int openlog( string ident, int option, int facility )

// Fechando a Conexão de Logging

int closelog( void )

// Enviando uma Mensagem ao Destino de Logging

int syslog( int priority, string message )

<?php
// Este exemplo produz uma entrada de log no arquivo syslog de msgs similar ao seguinte:
// DEC 5 20:09:29 CHP8[30326]: Chapter 8 example warning.
define_syslog_variables();
openlog('CHP8', LOG_PID, LOG_USER);
syslog(LOG_WARNING, 'Chapter 8 example warning.');
closelog();
?>


# Gerenciamento de Exceções


// O Construtor Padrão

throw new Exception();

// Sobrecarga de Construtor

// - meassage	: explicação amigável ao usuário que presumivelmente será passada
// - error code	: Identificador de error que presumidamente será mapeado para alguma tabela msg

throw new Exception('Aqui vai sua mensagem de erro', 4);
throw new Exception('Outra mensagem de erro sem o código de error');

// MÉTODOS

//	getMessage()		:	mensagem passada ao construtor
//	getCode()			:	Código de erro se ele for passado ao construtor
//	getLine()			:	Número da linha a qual a exceção foi disparada
//	getFile()			:	Nome do arquivo enviando a exceção
//	getTrace()			:	Array consistindo de info ao error que ocorreu
//	getTraceAsString()	:	O mesmo que getTrace() só que informa de string

try {
	$f = fopen('file.txt', 'r');
	if (!$f) throw new Exception('Arquivo não pode ser lido');
} catch (Exception $ex) {
	echo "Error ({$ex->getFile()}, line {$ex->getLine()}): {$ex->getMessage()}";
}
// Error (File:/usr/local/apache2/htdocs/read.php, line 6): Arquivo não pode ser lido!

// Estendendo a Classe de Exceções

class My_Exception extends Exception {
	private $language, $errorCode;
	public function __construct($language, $errorCode) {
		$this->language = $language;
		$this->errorCode = $errorCode;
	}
	public function getMessageMap() {
		$errors = file('error/'.$this->language.'.txt');
		foreach ($errors as $error) {
			list($key, $value) = explode(',', $error, 2);
			$errorArray[$key] = $value;
		}
		return $errorArray[$this->errorCode];
	}
}
try {
	throw new My_Exception('english', 4);
} catch (My_Exception $ex) {
	echo $ex->getMessageMap();
}




/*	[	9	]	String e Expressões Regulares	*/




// Qualificadores

//	p+
//	p*
//	p?
//	p{2}
//	p{2,3}
//	p{2,}
//	p$
//	^p
//	[^a-zA-Z]
//	p.p
//	^.{2}$
//	<b>(.*)</b>
//	p(hp)*

// Intervalo de Caracters Predefinidos (Classes de Caracters)

[:alpha:]		//	[A-Za-z]
[:alnum:]		//	[A-Za-z0-9]	
[:cntrl:]		// tab, escape ou backspace
[:digit:]		//	[0-9]
[:lower:]		//	[a-z]
[:upper:]		//	[A-Z]
[:punct:]		//	pontuação ~ ' ! @ # $ % ^ & * ( ) [ ] { } : ; , . ? / _ + = -
[:space:]		// caracteres de espaço em branco


# Funções de Expressão Regular PHP (POSIX Estendido)

ereg()
eregi()
ereg_replace() 
eregi_replace()
split()
spliti()
sql_regcase()

// Realizando uma Busca com diff em Maiús e Minús

bool ereg(string pattern, string str [, array &regs] )

$ref = 'cod: 1, 2, 3';
if (ereg("[:digit:]", $user)) {
	echo 'Deve conter um digito';
}
else echo 'Não possui qualquer digito';

// O 3º param serve como um array contendo os valores ref aos agrupamentos

$url = 'http://www.example.com';
// quebra a URL
// 'http://www', 'example', 'com' 
ereg("^(http://www)\.([[:alnum:]]+)\.([[:alnum:]]+)", $url, $reg);
echo $reg[0];		//	'http://www.example.com'
echo $reg[1];		//	'http://'	
echo $reg[2];		//	'example'
echo $reg[3];		//	'com'

// Realizando uma Busca sem diff Maius e Minus

int|false eregi(string pattern, string str [, array &regs] )

$pswd = 'secret';
if (eregi("^[a-zA-Z0-9]{8,}$", $pswd)) echo 'Valid!';
else echo 'Invalid';

// Substituindo Texto com Diferenciação Maius e Minus

string ereg_replace( string pattern, string replacement, string str )

$text = 'Isto é um link para http://www.example.com';

echo ereg_replace("http://([a-zA-Z0-9./-]+)$", "<a href=\"\\0\">\\0</a>", $text);
// Isto é um link para <a href="http://www.example.com">http://www.example.com</a>

//Substituindo sem diff Maius e Minus

string eregi_replace( string pattern, string replacement, string str )

// Dividindo uma String diff Maius e Minus
// limit espc o num de elem que a string se dividirá

array split( string pattern, string str [, int limit] )

$text = "Isto é\talgum texto que\nnós podemos dividir";
print_r( split("[\n\t]", $text) );
// [0 => 'Isto é', 1 => 'algum texto que', 2 => 'nós podemos dividir']


// Dividindo uma String sem diff Maius e Minus

array spliti( string pattern, string str [, int limit] )


# Sintaxe de Expressão Regular (Perl)

// FLAGS
//	i		:	case-insentive
//	g		:	busca global
//	m		:	busca de multiplas linhas
//	s		:	trata a string como uma única linha. Oposto do m
//	x		:	ignora espaços em branco e comentário
//	U		:	Para na primeira combinação. muitos modificadores são 'vorazes' vc pode torná-lo não voraz

// Funções de Expressão Regular PHP (Compatível com PERL)

preg_grep()
preg_match()
preg_match_all()
preg_replace()
preg_replace_callback()
preg_split()
preg_quote()

// Buscando um Array

array preg_grep( string pattern, array arr [, int flags = 0] )	
// flags invert ao busca aqueles que não se relacionam

$foods = array('pasta', 'steak', 'fish', 'potatoes');
$food = preg_grep("/^p/", $foods);	// ['pasta', 'potatoes']


// Buscando um Padrão
// procura uma string por um padrão espcif, retorna true | false

int|false preg_match(string pattern, string str [, array &matches [, int flags [, int offset]]] );

$line = 'vim é o maior processador de palavras já criado';
if ( preg_match("/\bvim\b/i", $line, $match) ) echo 'palavra encontrada!';

$str = 'http://www.google.com/~cookie+book';
preg_match("/(\w+):\/\/([\w.]+)\/(\S+)/i", $str, $arr);
$arr[0];	//> http://www.google.com/~cookie+book
$arr[1];	//> http
$arr[2];	//> www.google.com
$arr[3];	//> ~cookie+book


// Relaciona Todas as Ocorrências de um Padrão

int|false preg_match_all(string pattern, string str, array &pattern_array [, int order] );

$ref = "indice: 1, 2, 3";
preg_match_all("/\d+/", $ref, $indice);
$indice[0][0];		//> 1
$indice[0][1];		//> 2
$indice[0][2];		//> 3


// Delimitando Caracteres Especiais de Expressão Regular
// $ * ^ () + = [] {} | \\ : < .
string preg_quote( string str [, string delimiter = null] )

$text = "O ingre/sso custa R$500. 23:10:55";
echo preg_quote($text, '/');	//> O ingre\/sso custa R\$500\. 23\:10\:55


// Substituindo Todas as Ocorrências de um Padrão

mixed preg_replace( mixed pattern, mixed replacement, mixed str [, int limit = -1 [, int &count]] )

$text = "Isto é um link para http://www.example.com/";
echo preg_replace("/http:\/\/(.*)\//", "<a href=\"\${0}\">\${0}</a>", $text);
//> Isto é um link para <a href="http://www.example.com/">http://www.example.com/</a>

$text = "ref: 1, 2, 3";
echo preg_replace("/\d/", "#", $text, 2);
//> ref: #, #, 3

// Exp.:

$draft = 'Em 2007 a empresa encerrou queda nos lucros e escândalos.';
$key = array('/encerrou/', '/queda/', '/escândalos/');
$replacement = array('celebrou', 'aumento', 'expansão');
echo preg_replace($key, $replacement, $draft);
//> Em 2007 a empresa celebrou aumento nos lucros e expansão.


// Criando uma Função de Substituição Personalizada

mixed preg_replace_callback( mixed pattern, classbacl func, mixed str [, int limit = -1 [, int &count]] )

function acronym( $matches ) {
	// Está função irá adicionar a forma longa
	// do acrônimo encontrado em $matches
	$acron = array (
		'WWW' => 'World Wide Web',
		'IRS' => 'Internal Revenue Service',
		'PDF' => 'Portable Document Format'
	);
	if (isset($acron[$matches[1]])) {
		return $matches[1].' ('.$acron[$matches[1]].')';
	}
	else return $matches[1];
}
$text = "O <acronym>IRS</acronym> oferece formas de taxa em". 
"formato <acronym>PDF</acronym> no <acronym>WWW</acronym>";

$newtext = preg_replace_callback("/<acronym>(.*)</acronym>/U", 'acronym', $text);
echo $newtext;
//> O IRS (Internal Revenue Service) oferece formas de 
//  taxa emformato PDF (Portable Document Format) no WWW (World Wide Web)


// Dividindo uma String em Vários Elementos

array preg_split( string pattern, string str [, int limit = -1 [, int flags = 0]] )

$text = 'Maçã++Goiaba+++++++Pera';
$fruits = preg_split("/\+{1,}/", $text);	//> ['Maçã', 'Goiaba', 'Pera']


# Outras Funções de String


// Comprimento da String

int strlen( string str )

echo strlen('secret');	//> 6


// Comparando Duas Strings

int strcmp( string str1, string str2 )

//	->  0 igauis (operador == equivalente)
//	->  1 a > b
//	-> -1 a < b

$a = 'abc';
$b = 'ABC';
switch (strcmp($a,$b)) {
	case  1: echo 'a > b'; break;
	case -1: echo 'a < b'; break;
	case  0: echo 'a = b';
}
//> 'a > b'


// Compara sem diff Maius e Minus

int strcasecmp( string str1, string str2 )

switch (strcasecmp($a,$b)) {
	case  1: echo 'a > b'; break;
	case -1: echo 'a < b'; break;
	case  0: echo 'a = b';
}
//> 'a = b'


// Calculando a Similaridade Entre Duas Strings

int strspn(string str, string mask [, int start [, int length]] )

// a função strspn() retorna o comprimento da primeira string contendo caracteres tbm
// encontrados na outra string

// para garantir que uma senha não seja só números
$pswd = '3322679';
if (strspn($pswd, '1234567890') == strlen($pswd)) echo 'Não pode ser só números';


// Calculando a Diferença Entre Duas Strings

int strcspn( string str1, string str2 [, int start [, int length]] )

// a função strcspn() retorna o comprimento da primeira string não contendo caracteres tbm
// encontrados na outra string

// Aqui está um exemplo de validação de senha
$pswd = 'a12345';
if (strcspn($pswd, '1234567890') == 0) echo 'Não pode ser só números';


# Manipulando Cases de String


string strtoupper( string str )	// str = 'abacaxi' 		->	'ABACAXI'
string strtolower( string str )	// str = 'ABACAXI' 		->	'abacaxi'	
string ucfirst( string str )	// str = 'abacaxi' 		->	'Abacaxi'
string ucwords( string str )	// str = 'aba ca xi'	->	'Aba Ca Xi'


# Convertendo Strings para e a partir HTML


string nl2br( string str [, bool is_xhtml = true] )

$receita = "3 colheres de sopa\n
1/2 xicara de molho branco
30 gramas de açucar";

echo nl2br($receita);
//> 3 colheres de sopa<br />
//  <br />
//  1/2 xicara de molho branco<br />
//  30 gramas de açucar


// Convertendo Caracteres Especiais aos Seus Equivalentes HTML

string htmlentities( string str [, int quote_style = ENT_COMPAT [, int charset]] )

// ENT_COMPAT		:	ignoradas aspas simples
// ENT_NOQUOTES		:	ignora aspas simples e duplas
// ENT_QUOTES		:	converte aspas simples e duplas

$text = "Café com pão";
echo htmlentities($text, ENT_QUOTES);
//> Caf&eacute; com p&atilde;o


// Usando Caracteres HTML Especiais para Outros Objetivos

string htmlspecialchars( string str [, int quote_style = ENT_COMPAT [, int charset]] )

// &	: &amp;
// "	: &quot;
// '	: &#039;
// <	: &lt;
// >	: &gt;

echo htmlspecialchars('<a href="example.html">', ENT_QUOTES);
//> &lt;a href=&quot;example.html&quot;&gt;gt;


// Criando uma Lista de Conversão Personalizada

string strtr( string str, string array )

$troca = array('<b>' => '<strong>', '</b>' => '</strong>');
echo strtr("<b>Ola Mundo</b>", $troca);
//> <strong>Ola Mundo</strong>


// Remove todas as tags HTML

string strip_tags( string str [, string allowable_tags] )
// allowable_tags tags que não devem ser removidas

$url = "Clique <a href=\"example.com\">aqui</a>";
echo strip_tags($url);
//> Clique aqui
echo strip_tags($url, '<a>');
//> Clique <a href="example.com">aqui</a>


# Alternativas Para as Funções de Expressão Regular


// Sinalizando uma String Baseado em Caracteres Predefindos

// A função strtok() formata uma string em uma lista predefinida
// de caracteres. Ela deve ser chamada continuamente para tokenize
// uma string

string strtok( string str, string token )

$info = 'J. Gilmore:jason@example.com|Columbus, Ohio';
// delimitadores
$token = ':|,';
$tokenized = strtok($info, $token);
// Imprime cada elem do array $tokenized
while ($tokenized) {
	echo 'Elemento = ' . $tokenized . '<br>';
	$tokenized = strtok($token);
}

// Explodindo uma String

array|false explode( string delimiter , string str [, int limit] )

$text = 'Gilson|Lana|Godoi';
explode('|', $text);	//> ['Gilson', 'Lana', 'Godoi']

// Convertendo um Array em String

string implode(string glue, array pieces )

$arr = array('Gilson', 'Lana', 'Godoi');
implode('|', $arr);		//> 'Gilson|Lana|Godoi'

// Encontrando a Posição de uma Substring

int|false strpos( string str, mixed needle [, int offset = 0] )

$text = 'O Rato Roeu a Roupa do Rei de Roma';
echo strpos($text, 'Rato');	//> 2

// Encontrando a Última Ocorrência de uma Substring

int|false strrpos( string str, string needle [, int offset = 0] )

$text = 'O doce está muito doce';
echo strrpos($text, 'doce'); //> 19

// Substituindo Todas as Instâncias de Uma String por Outra

mixed str_replace( mixed search, mixed replace, mixed str [, int &count] )

$ref = 'ref: 1,2,3';
$troca = str_replace(',', '$', $ref); //> 'ref: 1$2$3$'
// str_ireplace() atua Idem, mas sem diff de Capitalização

// Recuperando Parte de Uma String

string strstr( string str, string occurrence )
// retorna o resto de uma string começando com a primeira
// ocorrência de uma string predefinida

$url = 'sales@example.com';
echo strstr($url, '@'); //> @example.com

// Retorna Parte de Uma String com Offsets Definidos

string|false substr( string str, int start [, int length] )

$sub = 'Abacaxi';
echo substr($sub, 1);		//> 'bacaxi'
echo substr($sub, -1);		//> 'i'
echo substr($sub, 2, -1);	//> 'acax'

// Determina a Frequencia de Aparição de Uma String

int substr_count( string str, string needle [, int offset = 0 [, int length]] )

$pam = 'pamonha, pamonha, pamonha fresquinhas!';
echo substr_count($pam, 'pamonha'); //> 3

// Substituindo Parte de Uma String Por Outra

mixed substr_replace( mixed string, string replace, int start [, int length] )

$number = '0123456';
echo substr_replace($number, '***', 0, 3); // '***3456'

// Repetindo Uma String

string str_repeat( string str, int multiple)

$txt = '.o0o.';
echo str_repeat($txt, 3);	//> '.o0o..o0o..o0o.'

# Preenchendo e Esvaziando Strings


// Removendo Caracteres do Começo da String
// A função ltrim() remove do começo espaço em branco, \n \t \r \0 \x0b
// charlist serve para designar outras carac para serem removidos

string ltrim( string str [, string charlist] )

$t = "\n\t  @Abacaxi";
echo ltrim($t, '@');	//> 'Abacaxi'

// Removendo Carac do Final

string rtrim( string str [, string charlist] )

$t = 'Abacaxi@@ ';
echo rtrim($t, '@');	//> 'Abacaxi'

// Removendo Carac Ambos os Lados

string trim( string str [, string charlist] )

$t = "\n\t  @Abacaxi@@ ";
echo trim($t, '@');	//> 'Abacaxi'

// Preenchendo Uma String

string str_pad( string str, int pad_length [, string pad_string = "" [, pad_type = STR_PAD_RIGTH]])

$pad = 'Abacaxi';
echo str_pad($pad, 10, '_'); 				//> Abacaxi___
echo str_pad($pad, 10, '_', STR_PAD_LEFT); //> ___Abacaxi
echo str_pad($pad, 10, '_', STR_PAD_BOTH); //> _Abacaxi__




/*	[	10	]	Trabalhando com Arquivos e Sistema Operacional	*/




// Recuperando o Caminho de um Nome de Arquivo
// suffix remove a extensão do arquivo lido

string basename( string path [, string suffix] )

$path = '/home/www/data/users.txt';
echo basename($path);			//> 'users.txt'
echo basename($path,'.txt');	//> 'users'

// Recuperando Um Caminho de Diretório

string dirname( string path )

$path = '/home/www/data/users.txt';
echo dirname($path);	//> 'home/www/data'

// Aprendendo Mais Sobre Um Caminho

array pathinfo( string path, int options )

$path = '/home/www/data/users.txt';
$info = pathinfo($path);
$info = pathinfo($path, PATHINFO_EXTENSION); // passando 2 attr
echo $info[dirname];	//> 'home/www/data'
echo $info[basename];	//> 'data.txt'
echo $info[extension];	//> 'txt'

// Identificando Caminho Absoluto

string|false realpath( string path )

$path = '../../images/banner.jpg';
echo realpath($path);	//> '/www/htdocs/book/images/banner.jpg'

// Tamanho do Arquivo

int filesize( string filename )

$file = 'file.txt';
echo filesize($file);	//> 256 (bytes)

// Calculando o Espaço Livre do Disco

float disk_free_space( string directory )

$drive = '/usr';
echo disk_free_space($drive)/1024/1024;	//> tamanho em MB

// Calculando Tamanho Total do Disco

float disk_total_space( string directory )

$drive = '/usr';
echo disk_total_space($drive)/1024/1024;	//> tamanho em MB


# Trabalhando Com Arquivos


// End-Of-Line

int feof( resource handle )

$file = fopen('file.txt', 'r');
while (!feof($file)) echo fgets($file);
fclose($file);

// Abrindo e Fechando Arquivo

resource|false fopen( string filename, string mode [, bool use_include_path = false [, resource context]] )

// MODOS DO ARQUIVO
//	r		:	Somente Lê. Ponteiro colocado no início
//	r+		:	Lê e Escreve. Ponteiro colocado no início
//	w		:	Escreve. Deleta todo o conteudo antes de escrever. Cria arq se não exite
//	w+		:	Escreve e Lê. Deleta todo o conteudo antes de escrever. Cria arq se não exite
//	a		:	Escreve. Ponteiro no final anexa conteudo ao arq. Cria arq se não exite
//	a+		:	Escreve e Lê. Ponteiro no final anexa conteudo ao arq. Cria arq se não exite
//	b		:	Abre arq no modo binário
//	t		:	Abre arq no modo texto

$fh = fopen('/doc/file.txt', 'rt');
// Fecha Arquivo
fclose($fh);

// Lendo um Arquivo em um Array

array|false file( string filename [, int flags = 0 [, resource context]] )

$arq = file('file.txt');
foreach ($arq as $line => $val) {
	echo "{$line}: {$val}<br>\n";
}


// Lendo o Conteúdo de um Arquivo

string file_get_contents( string filename [, int flags = 0] )

// Sobrescrevendo um Arquivo

int file_put_contents( string filename, mixed data [, int flags = 0 [, resource context]] )

file_put_contents('file.txt', "Este \n é o contúdo \n do arquivo.")
echo file_get_contents('file.txt');

// Copiando um Arquivo e Renomeando

bool copy( string source, string destino [, resource context] )
bool rename( string old_name, string new_name [, resource context] )

$origem = '/tmp/file1.txt';
$destin = '/tmp/file2.txt';
if (copy($origem,$destin)) echo 'Cópia realizada';

// Apagando um Arquivo 

bool unlink( string filename [, context context] )

if (unlink('/tmp/file.txt')) echo 'Arquivo apagado!';

// Verificando a Existência de um Arquivo ou Diretório

bool file_exists( string filename )

if (file_exists('/tmp/file.txt')) echo 'Arq ou Dir existênte!';

// Verifica se é um Arquivo ou Diretório

bool is_file( string filename)
bool is_dir( string filename)

// Criando e Apagando um Diretório

bool mkdir( string pathname [, int mode = 0777 [, bool recursive = false [, resource context]]] )
bool rmdir( string dirname [, resource context] )

if (mkdir('/tmp/diretorio', 0777)) echo 'Dir criado com sucesso!';
if (rmdir('/tmp/diretorio')) echo 'Dir apagado!';

// Lendo um Arquivo CSV em um Array

array fgetcsv( resource handle [, int length [, string delimiter [, string enclosure [, string escape]]]] )

// file.csv
//	Nome;email;telefone
//	Jason Gil;jason@example.com;8746-1234
//	Ros Costa;rosec@example.com;1234-7899
//	Paloma DE;palom@example.com;555-44345

$f = fopen('data/file.csv', 'r');
// quebra cada linha do arquivo em 3 partes
while (list($name, $email, $phone) = fgetcsv($f, 1024, ';')) {
	echo $nome . $phone . $email . '<br>';
}

// Lendo um Arquivo Específico

string fgets( resource handle [, int length = 1024] )

$f = fopen('data/file.txt', 'r');
while(!feof($f)) echo fgets($f)."<br>\n"; //> cada linha ou até 1024 caracteres

// Esvaziando Tags do Input

string|false fgetss( resource handle [, int length [, string allowable_tags]] )
// tira qualquer tag HTML presente, exceto as definidas em allowable_tags

// Contrói a lista de tags aceitáveis
$tags = '<h2><h3><p><b><a><img>';
// Abre o artigo e lê o conteúdo
$f = fopen('article.html', 'rt');
while (!feof($f)) {
	$art .= fgetss($f, 1024, $tags);
}
fclose($f);

// Lê o Arquivo Inteiro

string|false fread( resource handle, int length )

$f = fopen('arq.txt', 'rt');
// Lê o arquivo todo
$arq = fread($f, filesize('arq.txt'));
fclose($f);

// Lendo um Arquivo de Acordo com um Formato Predefinido

mixed fscanf( resource handle, string format [, string var] )

// arq.txt
//	123-456-789
//	321-654-987
//	231-546-879

$f = fopen('arq.txt', 'rt');
while ($user = fscanf($f, "%d-%d-%d")) {
	list($part1, $part2, $part3) = $user;
}
fclose($f);


# Lendo Conteúdo de um Diretório


// Abrindo Diretório

resource opendir( string path )

// Fechando Diretório

void closedir( resource handle )

// Lendo Conteúdo de um Diretório

string|false readdir( resource handle )

$dir = opendir('data/images/');
while ($file = readdir($dir)) {
	echo $file;
}

// Lendo um Diretório em um Array

array scandir( string dir [, int sorting_order = 0 [, resource context]] )
// configurar sorting_order em 1 realiza a ordem decrescente

$dir = scandir('data/images/');
foreach ($dir as $file) echo $file;

// Removendo um Diretório

bool rmdir( string dirname [, resource context] )

// Renomeando um Arquivo

bool rename( string old_name, string new_name [, resource context] )




/*	[	12	]	Data e Hora	*/




// Validando Datas

bool checkdate( int month, int day, int year )

checkdate(4, 31, 2007)? 'true' : 'false';
//> 'false' abril só tem 30 dias
checkdate(2, 29, 2004)? 'true' : 'false';
//> 'true' por 2004 é um ano bissexto
checkdate(2, 29, 2007)? 'true' : 'false';
//> 'false' por 2007 NÃO é um ano bissexto


// Formatando Datas e Horas

string|false date( string format [, int timestamp] )
// timestamp corresponde a representação daquela data especif

// FORMAT
//	a		:	am | pm
//	A		:	AM | PM
//	d		:	01 a 31
//	D		:	mon a sun
//	F		:	January a December
//	g		:	1 a 12	(sem zero)
//	G		:	0 a 23  (sem zero)
//	h		:	01 a 12 (com zero)
//	H		:	00 a 23 (com zero)
//	i		:	01 a 60 (com zero)
//	I		:	0 ou 1 se sim (horário de verão)
//	j		:	1 a 31 (dia sem zero)
//	l		:	monday a sunday
//	L		:	0 ou 1 se sim (ano bissexto)
//	m		:	01 a 12 (mês com zero)
//	M		:	jan a dec
//	n		:	1 a 12 (mês sem zero)
//	r		:	Ter, 19 Abr 2007
//	s		:	00 a 59 (segundos com zero)
//	t		:	28 a 31 (total de dias do mês)
//	w		:	0 a 6 (domingo a sabado)
//	Y		:	1970 a 2038	(ano)

echo 'Hoje é ' . date("F d, Y");
//> 'Hoje é March 02, 2017'
echo date('l');
//> 'Thursday';
echo date('m-d-Y');
//> '03-02-2017'
echo date('h:i:sa');
//> '08:55:23am'

// Convertendo um Timestamp para Valores Amigáveis

array getdate( [int timestamp = time()] )
// time() ref ao timestamp atual
//> Array
//(
//    [seconds] => 27
//    [minutes] => 1
//    [hours] => 9
//    [mday] => 2
//    [wday] => 4
//    [mon] => 3
//    [year] => 2017
//    [yday] => 60
//    [weekday] => Thursday
//    [month] => March
//    [0] => 1488456087
//)

// Dtermina o Timestamp Atual

int time( void )
echo time(); //> 1488456280
echo date('F d, Y h:i:s', 1488456280);
//> March 02, 2017 09:04:40

// Criando um Timestamp Baseado em Uma Data e Hora

int mktime([int hour [, int minute [, int second [, int month [, int day [, int year [, int is_dst = -1]]]]]]] )
// is_dst ref horario de verão configure para 1, 0 não -1 padrão não tem certeza

echo mktime(16,24,00,2,24,2007); //> 1172341440

// Quantas Horas há do dia atual até quando nasci

$now = time();
$birthday = mktime(0,0,0,3,5,1996);
$diff = $now - $birthday;
$hours = round($diff / 60 / 60);
echo 'Apenas horas do nascimento até agora '. $hours;


// Exibindo Data e Hora Mais Recente de Modificação da Página Web

int|false getlastmod( void )

echo 'Última modificação '. date('F d, Y', getlastmod());

// Determinando o Número de Dias do Mês

echo 'Este mês tem '. date('t') .' dias';
//> 'Este mês tem 31 dias'
echo 'Fevereiro tem '. date('t', mktime(0,0,0,2,1,2017)) .' dias';
//> 'Fevereiro tem 28 dias'


// Calculando Data X Dias a Partir do Atual

int strtotime( string time [, int now] )

$futuredate = strtotime('45 days');
echo date('F d, Y', $futuredate);
//> April 16, 2017

echo date('F d, Y', strtotime('-45 days'));
//> January 16, 2017

echo date('F d, Y', strtotime('10 weeks 2 days'));
//> May 13, 2017




/*	[	14	]	Autenticando Seus Usuários		*/




// Variáveis de Autenticação

$_SERVER['PHP_AUTH_USER']		// nome
$_SERVER['PHP_AUTH_PW']			// senha


// Funções Úteis

// header() enivia um cabeçalho HTTP cru ao navegador. O parâmetro string
// especifica a informação do cabeçalho enviado. 

void header( string header [, bool replace = true [, int http_response_code]] )

// isset() determina se uma variável foi designada com um valor.

bool isset( mixed var [, mixed ...] )


# Métodos de Autenticação


// Hard-Code

if (($_SERVER['PHP_AUTH_USER'] != 'myUser') || 
	($_SERVER['PHP_AUTH_PW'] != 'secret')) {
	header('WWW-Authenticate: Basic Realm="Secret Stash"');
	header('HTTP/1.0 401 Unauthorized');
	echo 'Você deve fornecer as credenciais corretas!';
	exit;
}

// Baseada em Arquivo

// file.txt

// jason:0cc175b9c0f1b6a831c399e269772661
// ana:92eb5ffee6ae2fec3ad71c777531578f
// pedro:4a8a08f09d37b73795649038408b5f33

$authorized = FALSE;
if (isset($_SERVER['PHP_AUTH_USER']) && isset($_SERVER['PHP_AUTH_PW'])) {
	// Ler arquivo de autenticação
	$auth = file('file.txt');
	// Verifica por uma autenticação compatível
	if (in_array($_SERVER['PHP_AUTH_USER'].
		":".
		md5($_SERVER['PHP_AUTH_PW'])."\n", $auth)) $authorized = TRUE;
}
if ( ! $authorized ) {
	header('WWW-Authenticate: Basic Realm="Secret Stash"');
	header('HTTP/1.0 401 Unauthorized');
	echo 'Você deve fornecer as credenciais corretas!';
	exit;
}

// Baseada Em Um Banco de Dados

//	id		username		pswd
//	1		jason			0cc175b9c0f1b6a831c399e269772661
//	2		guto			92eb5ffee6ae2fec3ad71c777531578f
//	3		matias			4a8a08f09d37b73795649038408b5f33

function authentication() {
	header('WWW-Authenticate: Basic Realm="Secret Stash"');
	header('HTTP/1.0 401 Unauthorized');
	exit;
}
// Se o usuário não foi definido
if ( ! isset($_SERVER['PHP_AUTH_USER']) ) {
	authentication();
} else {
	// conecta ao banco de dados
	$db = mysqli_connect('localhost', 'user', 'password');
	mysqli_select_db($db, 'bank');
	
	// Query de consulta
	$query = "SELECT username, pswd FROM logins 
	WHERE username='".$_SERVER['PHP_AUTH_USER']."' AND pswd='".md5($_SERVER['PHP_AUTH_PW'])."'";
	
	$result = mysqli_query($db, $query);
	
	if (mysqli_num_rows($result) == 0) authentication();
	else echo 'Bem-vindo ao arquivo Secret';
}
mysqli_close($db);




/*	[	18	]	Gerenciadores de Sessão		*/




// Dentro de URL anexada
$_GET['sid']
// Armazenada dentro de um Cookie
$_COOKIE['sid']


// Diretrizes de Configuração

// Gerenciando a Mídia de Armazenamento da Sessão
session.save_handler = file|mm|sqlite|user

// Configurando o Caminho de Arquivo da Sessão
session.save_path = string	// /tmp

// Ativando Sessões Automáticas
session.auto_start = 0|1

// Configurando o Nome da Sessão
session.name = string	// padrão PHPSESSID

// Escolhendo Cookies ou Reescrevendo URL
session.use_cookies = 0|1

// Automatizando a Reescrita de URL
session.use_trans_sid = 0|1

// Configurando o Tempo de Vida do Cookie de Sessão
session.cookie_lifetime = integer

// Configurando o Caminho de URL Válido do Cookie de Sessão
session.cookie_path = string	// '/' o cookie será válido para todo site

// Configurando o Domínio Válido de Cookie da Sessão
session.cookie_domain = string	// www.example.com | .example.com (subdomínios)

// Válidando Sessões Usando um Referer
session.referer_check = string	// usado para passagem por URL

// Configurando Direções de Armazenamento Temporário para Páginas Ativadas por Sessão
session.cache_limit = string	// none|*nocache|private|private_no_expire|public

// Configurando Tempo de Expiração de Cache para Página Ativadas por Sessão
session.cache_expire = integer		// default 180s

// Configurando o Tempo de Vida da Sessão
session.gc_maxlifetime = integer	// default 1440s


# Trabalhando Com Sessões


// Iniciando uma Sessão

bool session_start( void )

// Destruindo uma Sessão

void session_unset( void )
bool session_destroy( void )

// Configurando e Recuperando o ID da Sessão

string session_id( [string id] )

// Exp.:
session_start();
echo 'Seu número de identificação de sessão '. session_id();
//> Seu número de identificação de sessão 4n3geo03kpgvtta0lgdusr6ej5

// Cria Deleta Variáveis de Sessão

session_start();
$_SESSION['username'] = 'Jason';
echo 'Seu nome de usuário é '. $_SESSION['username'];
//> Seu nome de usuário é Jason

// Para delete a varável
unset($_SESSION['username']);

// Codificando e Decodificando Dados de Sessão

string session_encode( void )

session_start();
$_SESSION['username'] = 'Jason';
$_SESSION['loggedon'] = date('M d, Y H:i:s');
$sessionStringVar = session_encode();	// codifica todas var até mesmo as definidas anteriormente
echo $sessionStringVar;
//> 'username|s:5:"Jason";loggedon|s:20:"Mar 03, 2017 10:17:55"';	(utilizado para guardar em db)

// Para decodificar ao estado original

bool session_decode( string data )

session_decode($sessionStringVar);
echo $_SESSION['username'] .' time: '. $_SESSION['loggedon'];
//> 'Jason time: Mar 03, 2017 10:17:55'








