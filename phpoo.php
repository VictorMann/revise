<?php

/* # # # # # # # # # # # # # # # # # # # # 
#							   2017-03-04
#				PHPOO
#			Design Patterns
#
#					- Dall'Oglio, Pablo -
# # # # # # # # # # # # # # # # # # # # # */



/*	[	2	]	Fundamentos de Orientação a Objetos		*/




# Converção de Tipo


$produto = new StdClass;	// (Standard Class) vázia sem atributos e métodos
$produto->descricao = 'Chocolate Amargo';
$produto->estoque   = 100;
$produto->preco     = 7;

$arr = (array) $produto;
//> ['descricao' => 'Chocolate Amargo', 'estoque' => 100, 'preco' => 7]

$produto2 = (object) $arr;
echo $produto2->descricao; //> 'Chocolate Amargo'

// Outro Exp.:

$produto = array();
$produto['descricao'] = 'Chocolate Amargo';
$produto['estoque']   = 100;
$produto['preco']     = 7;

$objeto = new StdClass;

foreach ($produto as $chave => $valor) {
	$objeto->$chave = $valor;
}
print_r($objeto);
//> stdClass Object (
//    [descricao] => Chocolate Amargo
//    [estoque] => 100
//    [preco] => 7 )


# Relacionamento Entre Objetos


// Associação

class Fabricante 
{
	private $nome;
	
	public function __construct($nome) 
	{
		$this->nome = $nome;
	}
	
	public function getNome() 
	{
		return $this->nome;
	}
}

class Produto 
{
	private $descricao;
	private $fabricante;
	
	public function __construct($descricao) 
	{
		$this->descricao = $descricao;
	}
	
	public function getDescricao() 
	{
		return $this->descricao;
	}
	
	// indução ao tipo (type hinting)
	public function setFabricante(Fabricante $f) 
	{
		$this->fabricante = $f;
	}
	
	public function getFabricante() 
	{
		return $this->fabricante;
	}
}

// criação dos objetos
$p = new Produto('Chocolate');
$f = new Fabricante('Willy Wonka');

// associação
$p->setFabricante( $f );

echo 'A descrição é '.  $p->getDescricao();
echo 'O Fabricante é '. $p->getFabricante()->getNome();


// Composição

class Caracteristica 
{
	private $nome;
	private $valor;
	
	public function __construct ( $nome, $valor ) 
	{
		$this->nome  = $nome;
		$this->valor = $valor;
	}
	
	public function getNome()  { return $this->nome;  }
	public function getValor() { return $this->valor; }
}

class Produto 
{
	private $caracteristicas;
	
	public function addCaracteristicas ( $nome, $valor ) 
	{
		$this->caracteristicas[] = new Caracteristica($nome, $valor);
	}
	
	public function getCaracteristicas () 
	{
		return $this->caracteristicas; 
	}
}

$p = new Produto('Chocolate');
$p->addCaracteristicas('Cor', 'Branco');
$p->addCaracteristicas('Peso', '2.6 Kg');

echo 'Meu produto '. $p->descricao;
foreach ( $p->getCaracteristicas() as $c ) {
	echo 'Caracteristica: '. $c->getNome() .' - '. $c->getValor();
}


// Agregação

class Cesta 
{
	private $itens;
	private $tempo;
	
	public function __construct () 
	{
		$this->tempo = date('Y-m-d H:i:s');
		$this->itens = array();
	}
	
	public function addItem ( Produto $p ) 
	{
		$this->itens[] = $p;
	}
	
	public function getItens() { return $this->itens; }
	public function getTempo() { return $this->tempo; }
}

$c = new Cesta;
$c->addItem( $p1 = new Produto('Chocolate') );
$c->addItem( $p2 = new Produto('Iorgute')   );
$c->addItem( $p3 = new Produto('Sorvete')   );

foreach ( $c->getItens() as $item ) {
	echo 'Item: '. $item->descricao;
}


// Herança

class Conta 
{
	protected $agencia, $conta, $saldo;
	
	public function __construct ($agencia, $conta, $saldo) 
	{
		$this->agencia = $agencia;
		$this->conta   = $conta;
		if ($saldo >= 0) $this->saldo = $saldo;
	}
	
	public function getInfo () 
	{
		return 'Agência: '. $this->agencia .', Conta: '. $this->conta;
	}
	
	public function depositar ( $quantia ) 
	{
		if ($quantia > 0) $this->saldo += $quantia;
	}
	
	public function getSaldo() { return $this->saldo; }
}

class ContaPoupanca extends Conta 
{
	public function retirar( $quatia ) 
	{
		if ($this->saldo >= $quantia) $this->saldo -= $quantia;
		else return false;
		return true;
	}
}

class ContaCorrente extends Conta 
{
	protected $limite;
	
	public function __construct($agencia, $conta, $saldo, $limite) 
	{
		parent::__construct($agencia, $conta, $saldo);
		$this->limite = $limite;
	}
	
	public function retirar($quantia)
	{
		if ($this->saldo + $this->limite >= $quantia) $this->saldo -= $quantia;
		else return false;
		return true;
	}
}

// Para fazer uso das Classes
require_once 'Conta.php';
require_once 'ContaPoupanca.php';
require_once 'ContaCorrente.php';

// criação dos objetos
$contas = array();
$contas[] = new ContaCorrente(6677, 'CC.1234.56', 100, 500);
$contas[] = new ContaPoupanca(6678, 'PP.1234.57', 100);

// percorre as contas
foreach ($contas as $conta) {
	echo $conta->getInfo();
	echo 'Saldo Atual: '. $conta->getSaldo();
	$conta->depositar(200);
	echo 'Depósito de: 200';
	echo 'Saldo Atual: '. $conta->getSaldo();
	if ($conta->retirar(700)) echo 'Retirada de: 700';
	else echo 'Retirada de 700 (não permitida)';
	echo 'Saldo Atual: '. $conta->getSaldo();
}


# Abstração


// Classes Abstratas
// não pode ser instânciada
abstract class Conta {
	//...
}
$c1 = new Conta;	//> ERROR...


// Classes Finais
// não pode ser uma superclass, ou seja, não pode ser de base para outras contas
final class ContaPoupanca extends Conta {
	//...
}

// Métodos Abstratos
// Deve conter sua implementação na classe filha
abstract class Conta {
	//...
	abstract function retirar($quantia);
}

// Método Final
// Não pode ser sobrescrito em suas classes filhas
class ContaPoupanca extends Conta {
	//...
	public final function retirar($quantia) {
		//...
	}
}
class ContaPoupancaUniversitaria extends ContaPoupanca {
	public function retirar($quantia) {}	//> ERROR...não pode recriar um método definido como final
}


# Encapsulamento
// provê proteção de acesso aos membros internos de um objeto

public
private
protected


# Membros da Classe


// Costante
class Pessoa 
{
	private $nome;
	private $genero;
	const GENEROS = array('M' => 'Masculino', 'F' => 'Feminino'); // PHP 7
	
	public function __construct($nome, $genero) 
	{
		$this->nome   = $nome;
		$this->genero = $genero;
	}
	
	public function getGenero() 
	{
		// Acessar a constante dentro da classe use self
		return self::GENEROS[ $this->genero ];
	}
}
// Para acessar a constante fora da classe
Pessoa::GENEROS;


// Atributos Estáticos
// Armazenado em nível de classe

class Software 
{
	private $id;
	private $nome;
	public static $contador;
	
	public function __construct($nome) 
	{
		self::$contador ++;
		$this->id = self::$contador;
		$this->nome = $nome;
	}
}
echo Software::$contador; //> 1

// Métodos Estáticos
// Protége os atributos estaticos

class Software 
{
	private $id;
	private $nome;
	private static $contador;
	
	public function __construct($nome) 
	{
		self::$contador ++;
		$this->id = self::$contador;
		$this->nome = $nome;
	}
	public static function getContador() 
	{
		return self::$contador;
	}
}
echo Software::$contador; 		//> ERROR...
echo Software::getContador(); 	//> 1


# Funções Para Manipulação de Objetos


// Retorna Um Vetor com os Nomes dos Métodos Públicos
array|null get_class_methods( mixed class_name )

class A {
	public function m() {}
}
get_class_methods('A');	//> ['m']


// Retorna um Array com os Nomes/Valores Públicos de um Objeto
array get_object_vars( object object )

class A {
	public $pb = 1;
	private $pv;
	protected $pt;
	public static $pbst;
	private static $pvst;
}
print_r( get_object_vars( new A ) ); //> ['pb' => 1]


// Nome da Class A qual o Objeto Pertence

string get_class( [obj objeto] )

// Nome da Classe Ancestral

string get_parent_class( [mixed objeto] )

// Indica se Determinado Objeto é Derivado de Outra Classe

bool is_subclass_of( mixed object, string class_name )

class Pessoa {}
class Funcionario extends Pessoa {}

$f = new Funcionario;

echo get_class( $f );					//> 'Funcionario'
echo get_parent_class( $f );			//> 'Pessoa'
echo get_parent_class('Funcionario');	//> 'Pessoa'
echo (is_subclass_of($f,'Pessoa'))? 'Ok':'Off';				//> 'Ok'
echo (is_subclass_of('Funcionario','Pessoa'))? 'Ok':'Off';	//> 'Ok'


// Verifica se o Método Existe

bool method_exists( mixed object, string method )

$p = new Pessoa;
echo (method_exists($o, 'getNome')) ? 'true' : 'false';


// Executa Uma Função ou um Método de uma Classe Passando Como Parâmetro

mixed call_user_func(callback function [, mixed parameter1 [, mixed param...]] )

function apresenta( $nome ) {
	echo 'Olá '. $nome;
}
// executa uma função
call_user_func('apresenta', 'Guto'); //> 'Olá Guto'

class Pessoa {
	public static function apresenta( $nome ) {
		echo 'Olá '. $nome;
	}
}
// chamando método estático
call_user_func(array('Pessoa', 'apresenta'), 'Guto'); //> 'Olá Guto'

// chamada por objeto
$obj = new Pessoa;
call_user_func(array($obj, 'apresenta'), 'Guto'); //> 'Olá Guto'


# Interface


// Utilizada para tornar um sistema menos acoplado

interface OrcavelInterface
{
	public function getPreco();
}
class Produto implements OrcavelInterface 
{
	private $descricao;
	private $preco;
	
	public function __construct($descricao, $preco) 
	{
		$this->descricao = $descricao;
		$this->preco = $preco;
	}
	public function getPreco() { return $this->preco; }
}
class Servico implements OrcavelInterface 
{
	private $descricao;
	private $preco;
	
	public function __construct($descricao, $preco) 
	{
		$this->descricao = $descricao;
		$this->preco = $preco;
	}
	public function getPreco() { return $this->preco; }
}
class Orcamento 
{
	private $itens;
	
	public function adiciona( OrcavelInterface $produto, $qtd ) 
	{
		$this->itens[] = array($qtd, $produto);
	}
	public function calculaTotal() 
	{
		$total = 0;
		foreach ($this->itens as $item) {
			$total += ($item[0] * $item[1]->getPreco());
		}
		return $total;
	}
}

$o = new Orcamento;
$o->adiciona( new Produto('Máquina de café', 299)	, 3 );
$o->adiciona( new Produto('Barbeador elétrico', 170), 2 );
$o->adiciona( new Servico('Corte de grama', 20)		, 1 );
$o->adiciona( new Servico('Limpeza do Apto', 50)	, 2 );

echo 'Total: '$o->calculaTotal(); //> 1357


# Design Patterns


// Singleton

// application.ini
// timezone = "America/Sao_Paulo"
// language = "en"
// application = "livro"

class Preferencias 
{
	private $data;
	private static $instance;
	
	private function __construct() 
	{
		$this->data = parse_ini_file('application.ini');
	}
	
	public static function getInstance() 
	{
		if (empty(self::$instance)) {
			self::$instance = new self;
		}
		return self::$instance;
	}
	
	public function setData($key, $value) 
	{
		$this->data[$key] = $value;
	}
	
	public function getData($key) 
	{
		return $this->data[$key];
	}
	
	public function save() 
	{
		$string = '';
		if (isset($this->data)) 
		{
			foreach ($data as $key => $value) 
			{
				$string .= $key .' = '. $value ."\n";
			}
		}
		file_put_contents('application.ini', $string);
	}
}

// Obtém a instância
$p1 = Preferencias::getInstance();
echo 'Linguage '. $p1->getData('language');
$p1->setData('language', 'pt');
echo 'Linguage '. $p1->getData('language');
// Obtém a mesma instância 
$p2 = Preferencias::getInstance();
echo 'Linguage '. $p2->getData('language');
$p1->save();

//> Linguage en
//> Linguage pt
//> Linguage pt


// Facade

// Blinda sua aplicação em relação às biblitecas externas e também a códigos legados,
// tornando sua manuteção e atualizações mais fáceis, uma vez que ela nos direciona
// a criar uma camada que busca isolar funcionalidades externas em relação a nossa aplicação

// ** Para demonstrar a utilização do Design Pattern Facade, utilizaremos como exemplo o serviço
// 	  de cobrança PagSeguro

require 'App/Lib/PagSeguro/PagSeguroLibrary.php';
$paymentRequest = new PagSeguroPaymentRequest();
$paymentRequest->setCurrency('BRL');

// Item
$item = new PagSeguroItem();
$item->setId( $produto->id );
$item->setDescription( $produto->descricao );
// Demais attr...

// Endereço
$address = new PagSeguroAddress();
$address->setPostalCode( $produto->postal );
$address->setStreet( $produto->address );
// Demais attr...

// Facade
class PagSeguroFacade {
	private $request;
	public function __construct( $currency ) {
		$this->request = new PagSeguroPaymentRequest();
		$this->request->setCurrency( $currency );
	}
	public function addItem($produto, $amount) {
		$item = new PagSeguroItem;
		$item->setId( $produto->id );
		$item->setDescription( $produto->descricao );
		// Demais attr...
	}
	public function setCustomer($customer) {
		$address = new PagSeguroAddress();
		$address->setPostalCode( $produto->postal );
		$address->setStreet( $produto->address );
		// Demais attr...
	}
}

// Dai é só centralizar nossos chamadas a Facade que isolará
// a comunicação à biblioteca de terceiros 
$ps = new PagSeguroFacade('BRL');
$produto = new Produto;
$produto->id = 5;
$produto->descricao = 'Pendrive';
$produto->price = 10;
$ps->addItem($produto, 3);


// Adapter

// Simplesmente converte uma interface (conjunto de métodos) em outro, ou seja, fazer
// dois lados conversarem por meio de uma interface adaptada.

// Exp.: supomos que vc fazia uso de uma biblioteca de email e vc não quer usar outra
// no lugar, mais sua aplicação faz uso dos metodos da antiga em diversos pontos
// vc pode adaptar a nova biblioteca com os nomes da antiga
class OldMailer {
	public function envia($msg) {}
	public function recebe() {}
	public function anexa($anexo) {}
}
class newMailer { // A ser adaptada, obs q os nomes dos metodos são diff da biblioteca antiga
	public function enviaEmail($msg) {}
	public function recebeEmail() {}
	public function anexaArq($anexo) {}
}
class MailerAdapter { // Adaptador obs os métodos são os mesmos da antiga mais fazem uso da nova
	public function envia($msg) {
		$mail = new newMailer;
		$mail->enviaEmail($msg);
	}
	public function recebe() {
		$mail = new newMailer;
		$mail->recebeEmail();
	}
	public function anexa($anexo) {
		$mail = new newMailer;
		$mail->anexaArq($anexo);
	}
}

# Autoload Simplificado

// Sempre que se instância um objeto em PHP, é necessário ter a declaração da classe
// na memória; caso contrário a aplicação é finalizada com um erro. Para introduzir a
// classe na memória podemos utilizar o comando require_once

function __autoload ( $classe ) {
	// busca classe no diretório de classes...
	require_once "classes/{$classe}.php";
}

// autoload é disparado assim que uma instancia é realizada, paasando o nome
// da classe para seu parâmetro.
$p = new Produto;




/*	[	3	]	Tópicos Especiais em Orientação a Objetos	*/


// clientes.csv
// Cidade;Cliente;Telefone;Endereço;Idade;Sexo
// Caxias do Sul;ANDREI ZMIEVSKI;10 1234-5678;Rua Palo Alto;1;M
// São Paulo;RUBENS QUEIROZ;11 4644-5678;Rua Campinas, 123;2;M
// São Paulo;AUGUSTO CAMPOS;43 1564-5345;Rua BRLinux, 343;3;M

class CSVParse {
	private $filename, $data, $header, $counter, $separator;
	
	public function __construct($filename, $separator = ',') {
		$this->filename = $filename;
		$this->separator = $separator;
		$this->counter = 1;
	}
	public function parse() {
		// Arquivo não existe
		if (!file_exists($this->filename)) {
			// die() aborta a execução do programa
			die("Arquivo {$this->filename} não existe!");
		}
		// Não tem permissão para ser lido
		if (!is_readable($this->filename)) {
			die("Arquivo {$this->filename} sem permissão");
		}
		$this->data = file($this->filename);
		$this->header = str_getcsv($this->data[0], $this->separator);
	}
	public function fetch() {
		if (isset($this->data[$this->counter])) {
			$row = str_getcsv($this->data[$this->counter ++], $this->separator);
			foreach ($row as $key => $value) {
				$row[ $this->header[$key] ] = $value;
			}
			return $row;
		}
	}
}

$csv = new CSVParse('clientes.csv', ';');
$csv->parse();
while ($row = $csv->fetch()) {
	echo $row['Cliente'] .' - '. $row['Cidade'] .'<br>';
}


# Métodos Mágicos

__get(), __set(), __isset(), __unset(), __clone(), __call() __toString()

class Titulo 
{
	private $data;
	
	public function __set($propriedade, $valor) 
	{
		if ($propriedade == 'dt_vencimento') {
			$this->setVencimento($valor);
		}
		else {
			$this->data[$propriedade] = $valor;
		}
	}
	public function __get($propriedade) 
	{
		if ($propriedade == 'valor') {
			return $this->getValor();
		}
		else {
			return $this->data[$propriedade];
		}
	}
	public function getValor() 
	{
		$vecto = DateTime( $this->data['dt_vencimento'] );
		$agora = DateTime('now');
		if ($vecto < $agora) {
			$interval = $vecto->diff($agora);
			$days = $interval->days;
			return $this->data['valor'] + $this->data['multa']
			 + ($this->data['valor'] * $this->data['juros'] * $days);
		
		} else {
			return $this->data['valor'];
		}
	}
	public function setVencimento($vencimento) 
	{
		$parts = explode('-', $vencimento);
		if (count($parts) == 3) {
			if (checkdate($parts[1], $parts[2], $parts[0])) {
				$this->data['dt_vencimento'] = $vencimento;
			}
			else {
				throw new Exception("Data {$vencimento} inválida!");
			}
		}
	}
	public function __isset($propriedade)
	{
		return isset($this->data[$propriedade]);
	}
	public function __unset($propriedade) 
	{
		unset($this->data[$propriedade]);
	}
	public function __toString() 
	{
		return json_encode($this->data);
	}
	public function __clone() 
	{
		$this->codigo = NULL;
		// No caso de array de prop...
		$this->data['codigo'] = NULL;
	}
	public function __call($method, $values)
	{
		print "você executou o método {$method}, com as parâmetros: ".implode(',', $values);
	}
}

$titulo = new Titulo;
// __set()
$titulo->valor = 12345;
// __isset()
echo (isset($titulo->valor))?'definido':'não definido';
// __get()
print 'O valor é: '. number_format($titulo->valor, 2, ',', '.');
//> 'O valor é: 12.345,00'

// __toString()
echo $titulo;
//> {"valor":12345}

// __clone()
$titulo1->codigo = 101;
$titulo2 = clone $titulo;
echo $titulo1->codigo; // 101
echo $titulo2->codigo; // null

// Outro uso do método mágico __call()
class Titulo {
	public $codigo, $valor, $juros, $multa;
	public function __construct($cod, $val, $jur, $mul) {
		$this->codigo = $cod;
		$this->valor  = $val;
		$this->juros  = $jur;
		$this->multa  = $mul;
	}
	public function __call($method, $values) {
		return call_user_func($method, get_object_vars($this));
	}
}
$tit = new Titulo(101, 1.99, .1, 9.99);
$tit->print_r();
//> Array (
//    [codigo] => 101
//    [valor] => 1.99
//    [juros] => 0.1
//    [multa] => 9.99 )
$tit->count(); //> 4


# SimpleXML


// paises.xml
<?xml version="1.0" encoding="UTF-8"?>
<pais>
	<nome>    Brasil    </nome>
	<idioma>  Português </nome>
	<capital> Brasília  </capital>
	<moeda>   Real (R$) </moeda>
	<prefixo> +55       </prefixo>
</pais>

// interpreta o documento XML
$xml = simplexml_load_file('paises.xml');

// exibe as informações do objeto criado
var_dump($xml);
// object(SimpleXMLElement)[1]
//  public 'nome'    => string 'Brasil' (length=6)
//  public 'idioma'  => string 'Português' (length=10)
//  public 'capital' => string 'Brasília' (length=9)
//  public 'moeda'   => string 'Real (R$)' (length=9)
//  public 'prefixo' => string '+55' (length=3)


// Acessando Atributos

// asXML()		->	retorna uma string formatada que representa o objeto
// attributes()	->	lista os atributos dentro da tag XML
// children()	->	retorna os elemntos filhos do objeto
// addChild()	->	adiciona um elem ao nodo especificado

echo 'Nome: '. $xml->nome    .'<br>\n';
echo 'Nome: '. $xml->idioma  .'<br>\n';
echo 'Nome: '. $xml->capital .'<br>\n';
echo 'Nome: '. $xml->moeda   .'<br>\n';
echo 'Nome: '. $xml->prefixo .'<br>\n';

// Percorrendo Elementos Filhos

$xml = simplexml_load_file('paises.xml');
foreach ($xml->children() as $elemento => $valor) {
	echo "{$elemento} -> {$valor}<br>\n";
}
//> nome -> Brasil
//  idioma -> Português
//  capital -> Brasília
//  moeda -> Real (R$)
//  prefixo -> +55


// Acessando Elemtos Filhos
// paises.xml
<pais>
	<geografia>
		<clima>tropical</clima>
		<costa>7367 km</costa>
		<pico>Neblina (3014 m)</pico>
	</geografia>
</pais>

$xml = simplexml_load_file('paises.xml');
echo $xml->geografia->clima;	//> 'tropical'
echo $xml->geografia->costa;	//> '7367 km'
echo $xml->geografia->pico;		//>	'Neblina (3014 m)'


// Alterando o Conteúdo do Documento

$xml = simplexml_load_file('paises.xml');
// altera prop
$xml->moeda = 'Novo Real (NR$)';
$xml->geografia->clima = 'temperado';
// adiciona novo nodo
$xml->addChild('presidente', 'Chapolin Colorado');
// exibe o novo XML
$xml->asXML();
// grava no arquivo paises2.xml
file_put_contents('paises2.xml', $xml->asXML());


// Acessando Elementos Repetidos
// paises.xml
<pais>
	<estado>
		<nome>Rio Grande do Sul</nome>
		<nome>São Paulo</nome>
		<nome>Minas Gerais</nome>
		<nome>Rio de Janeiro</nome>
		<nome>Paraná</nome>
		<nome>Mato Grosso</nome>
	</estado>
</pais>

$xml = simplexml_load_file('paises.xml');

echo $xml->estado->nome[0];	//> 'Rio Grande do Sul'
foreach ($xml->estado->nome as $estado) {
	echo 'Estado: '. $estado.'<br>'.PHP_EOL;
}


// Acessando Atributos de Elementos

// paises.xml
<pais>
	<estados>
		<estado nome="Rio Grande do Sul" capital="Porto Alegre"/>
		<estado nome="São Paulo" capital="São Paulo"/>
		<estado nome="Minas Gerais" capital="Belo Horizonte"/>
	</estados>
</pais>

$xml = simplexml_load_file('paises.xml');

foreach ($xml->estados->estado as $estado) {
	echo 'Estado:'. $estado['nome'] .', capital: '. $estado['capital'];
}

// Percorrendo Atributos de Elemento

$xml = simplexml_load_file('paises.xml');

foreach ($xml->estados->estado as $estado) {
	// percorrendo cada atributo
	foreach ($estado->attributes() as $key => $valeu) {
		echo $key .' -> '. $value;
		//> 'nome -> Rio Grande do Sul'
	}
}


# XML com DOM


// bases.xml
<bases>
	<base id="1">
		<name>teste</name>
		<host>192.168.0.1</host>
		<type>mysql</type>
		<user>mary</user>
	</base>
	<base id="2">
		<name>producao</name>
		<host>192.168.0.2</host>
		<type>pgsql</type>
		<user>admin</user>
	</base>
</bases>

$doc = new DOMDocument();
$doc->load('bases.xml');

$bases = $doc->getElementsByTagName('base');
foreach ($bases as $base) {
	print 'ID: '. $base->getAttribute('id') .'<br>'. PHP_EOL;
	
	$names = $base->getElementsByTagName('name');
	$hosts = $base->getElementsByTagName('host');
	$types = $base->getElementsByTagName('type');
	$users = $base->getElementsByTagName('user');
	
	$name = $names->item(0)->nodeValue;
	$host = $hosts->item(0)->nodeValue;
	$type = $types->item(0)->nodeValue;
	$user = $users->item(0)->nodeValue;
	
	print 'Nome: '. $name .'<br>'. PHP_EOL;
	print 'Host: '. $host .'<br>'. PHP_EOL;
	print 'Type: '. $type .'<br>'. PHP_EOL;
	print 'User: '. $user .'<br>'. PHP_EOL;
}


// Manipulação de Conteúdo

$dom = new DOMDocument('1.0', 'UTF-8');
$dom->formatOutput = true;

$bases = $dom->createElement('bases');
$base  = $dom->createElement('base');
$bases->appendChild( $base );

$attr = $dom->createAtribute('id');
$attr->value = '1';
$base->appendChild( $attr );

$base->appendChild( $dom->createElement('name', 'teste') 		);
$base->appendChild( $dom->createElement('host', '192.168.0.1') 	);
$base->appendChild( $dom->createElement('type', 'mysql') 		);
$base->appendChild( $dom->createElement('user', 'mary') 		);


# SPL


// manipulação de Arquivos

$file = SplFileInfo('file.txt');
echo $file->getFileName();	//> 'file.txt'
echo $file->getExtension();	//> 'txt'
echo $file->getSize();		//> '415'
echo $file->getRealPath();	//>	'/test/file.txt'
echo $file->getType();		//>	'file'
echo $file->isWritable();	//>	'1'

// Extende SplFileInfo
$file2 = new SplFileObject('file.txt');
echo $file2->getFileName();	//>	'file.txt'

$file2 = new SplFileObject('file.txt', 'w');
$bytes = $file2->fwrite('Olá Mundo'. PHP_EOL);

// Lendo o Arquivo

$file = new SplFileObject('file.txt');

// forma 1
while (!$file->eof()) {
	print 'Linha: '. $file->fgets();
}
// forma 2
foreach ($file as $linha => $content) {
	print $linha .': '. $content .'<br>';
	//> '0: Ola mundo'
}


// Percorrendo Diretórios

foreach (new DiretoryIterator('/tmp') as $file) {
	print (string) $file;		 //> 'file.txt'
	print $file->getFileName();	 //> 'file.txt'
	print $file->getExtension(); //> 'txt'
}


# Traits


// trait.php
<?php
require_once 'classes/Record.php';

trait ObjectConversionTrait
{
	public function toXML() 
	{
		$data = array_flip($this->data);
		$xml = new SimpleXMLElement('<'. get_class($this) .'/>');
		array_walk_recursive($data, array($xml, 'addChild'));
		return $xml->asXML();
	}
	public function toJSON() 
	{
		return json_encode( $this->data );
	}
}

// Para fazer uso da trait
class Pessoa extends Record {
	const TABLENAME = 'Pessoa';
	use ObjectConversionTrait;	
}
$p = new Pessoa;
$p->toJSON();

class Pessoa extends Record {
	const TABLENAME = 'Pessoa';
	// voce pode apelidar seus métodos
	use ObjectConversionTrait {
		toJSON as exportJSON;
	}
}
$p = new Pessoa;
$p->exportJSON();


# Injeção de Dependência


// injeção2.php
<?php
require_once 'classes/Record.php';
interface ExportInterface {
	public function export($data);
}
class XMLElement implements ExportInterface {
	public function export( $data ) {
		$data = array_flip( $data );
		$xml = new SimpleXMLElement('<'. get_class($this) .'/>');
		array_walk_recursive($data, array($xml, 'addChild'));
		return $xml->asXML();
	}
}
class JSONExport implements ExportInterface {
	public function export( $data ) {
		return json_encode( $data );
	}
}
class Pessoa extends Record {
	const TABLENAME = 'Pessoa';
	
	public function export( ExportInterface $e ) {
		return $e->export($this->data);
	}
}

$p = new Pessoa;
$p->nome = 'Maria Rita';
$p->endereco = 'Rua das Flores';
$p->numero = 123;
print $p->export( new XMLElement );
print $p->export( new JSONExport );


# Namespaces


<?php

namespace Application;
class Form {}

namespace Components;
class Form {}

// utilzação
var_dump( new Form );					//> object(Componets\Form)
var_dump( new Componets\Form );			//> object(Componets\Form)
var_dump( new Application\Form );		//> object(Application\Form)
var_dump( new \SplFileInfo('arq.txt') );//> object(SplFileInfo)
var_dump( new SplFileInfo('arq.txt') );	//> Fatal Error: Class 'Componets\SplFileInfo' not found

// a.php
<?php
namespace Application;
class Form  {}
class Field {}

// b.php
<?php
namespace Components;
class Form  {}
class Field {}

<?php
require_once 'a.php';
use Application\Form;
var_dump( new Form  );	//> objecto(Application\Form)
var_dump( new Field );	//> Fatal error: Class 'Field'

<?php
require_once 'a.php';
require_once 'b.php';
use Application\Form as Form;
use Components\Field as Field;
var_dump( new Form  );	//> objecto(Application\Form)
var_dump( new Field );	//> objecto(Components\Field)
use Components\Form as ComponentForm;
var_dump( new ComponentForm ); //> objecto(Components\Form)
var_dump( new Application\Form ); //> objecto(Application\Form)
var_dump( new Components\Form  ); //> objecto(Components\Form)

// Outro Exp.:

// a1.php
<?php
namespace Library\Widgets;
class Field {}

//b1.php
<?php
namespace Library\Container;
class Table {}

//c1.php
namespace Library\Widgets;
use Library\Container\Table;
use SplFileInfo;
class {
	// Class Field está no mesmo namespace
	public function fazAlgo( Field $x ) {}
	public function show() {
		new Table;
		new SplFileInfo('/tmp/shadow');
	}
}


# SPL Autoload

<?php
spl_autoload_register(function($class) {
	require_once(str_replace('\\', '/', $class.'.php'));
});

use Library\Widgets\Field;
var_dump( new Field );	//> object(Library\Widgets\Field)

// Caso o 1º metodo registrado encontre a classe, está será
// requisitada, e o 2º método na fila não será executado
spl_autoload_register(array(new LibraryLoader, 'loadClass'));
spl_autoload_register(array(new ApplicationLoader, 'loadClass'));

class LibraryLoader {
	public static function loadClass($class) {
		if (file_exists("Lib/{$class}.php")) {
			require_once "Lib/{$class}.php";
			return true;
		}
	}
}
class ApplicationLoader {
	public static function loadClass($class) {
		if (file_exists("App/{$class}.php")) {
			require_once "App/{$class}.php";
			return true;
		}
	}
}

# PDO - PHP Data Object


try {
	// instância objeto PDO, conectando no MySQL
	$conn = new PDO('mysql:host=127.0.0.1;port=3306;dbname=livro', 'root', 'vertrigo');
	// executa uma série de instruções SQL
	$conn->exec("INSERT INTO famosos (codigo, nome) VALUES (1, 'Érico Verissimo')");
	$conn->exec("INSERT INTO famosos (codigo, nome) VALUES (2, 'John Lennon')");
	$conn->exec("INSERT INTO famosos (codigo, nome) VALUES (3, 'Ayrton Senna')");
	// fecha conexão
	$conn = NULL;
} catch ( PDOException $ex ) {
	print 'Error! : '. $ex->getMessage();
}

// Gateways

// Table Data Gateway

class ProdutoGateway
{
    private static $conn;
    
    public static function setConnection( PDO $conn )
    {
        self::$conn = $conn;
    }
    
    public function find($id, $class = 'StdClass')
    {
        $sql = "SELECT * FROM produto where id = '{$id}'";
        print "{$sql} <br>\n";
        $result = self::$conn->query($sql);
        return $result->fetchObject($class);
    }

    public function all($filter, $class = 'stdClass')
    {
        $sql = "SELECT * FROM produto";
        if ($filter) {
            $sql .= " WHERE {$filter}";
        }
        print "$sql <br>\n";
        $result = self::$conn->query($sql);
        return $result->fetchAll(PDO::FETCH_CLASS, $class);
    }

    public function delete($id)
    {
        $sql = "DELETE FROM produto where id = '{$id}' ";
        print "$sql <br>\n";
        return self::$conn->query($sql);
    }

    public function save($data)
    {
        if (empty($data->id)) {
            $id = $this->getLastId() +1;
            $sql = "INSERT INTO produto (id, descricao, estoque, preco_custo, ".
                                   "      preco_venda, codigo_barras, data_cadastro, origem)" .
                                   " VALUES ('{$id}', " .
                                            "'{$data->descricao}', " .
                                            "'{$data->estoque}', " .
                                            "'{$data->preco_custo}', " .
                                            "'{$data->preco_venda}', " .
                                            "'{$data->codigo_barras}', " .
                                            "'{$data->data_cadastro}', " .
                                            "'{$data->origem}')";
        }
        else {
            $sql = "UPDATE produto SET descricao     = '{$data->descricao}', " .
                                "       estoque       = '{$data->estoque}', " .
                                "       preco_custo   = '{$data->preco_custo}', " .
                                "       preco_venda   = '{$data->preco_venda}', ".
                                "       codigo_barras = '{$data->codigo_barras}', ".
                                "       data_cadastro = '{$data->data_cadastro}', ".
                                "       origem        = '{$data->origem}' ".
                                "WHERE  id            = '{$data->id}'";
        }
        print "$sql <br>\n";
        return self::$conn->exec($sql);   // executa instrucao SQL
    }
    
    private function getLastId()
    {
        $sql = "SELECT max(id) as max FROM produto";
        $result = self::$conn->query($sql);
        $data = $result->fetch(PDO::FETCH_OBJ);
        return $data->max;
    }
}

<?php
class Produto
{
    private static $conn;
    private $data;

    function __get($prop)
    {
        return $this->data[$prop];
    }

    function __set($prop, $value)
    {
        $this->data[$prop] = $value;
    }

    public static function setConnection( PDO $conn )
    {
        self::$conn = $conn;
        ProdutoGateway::setConnection($conn);
    }

    public static function find($id)
    {
        $gw = new ProdutoGateway;
        return $gw->find($id, 'Produto');
    }

    public static function all($filter = '')
    {
        $gw = new ProdutoGateway;
        return $gw->all($filter, 'Produto');
    }
    
    public function delete()
    {
        $gw = new ProdutoGateway;
        return $gw->delete($this->id);
    }
    
    public function save()
    {
        $gw = new ProdutoGateway;
        return $gw->save( (object) $this->data);
    }

    public function getMargemLucro()
    {
        return (($this->preco_venda - $this->preco_custo) / $this->preco_custo) * 100;
    }

    public function registraCompra($custo, $quantidade)
    {
        $this->custo = $custo;
        $this->estoque += $quantidade;
    }
}

require 'classes/tdg/Produto.php';
require 'classes/tdg/ProdutoGateway.php';
try {
	$conn = new PDO('mysql:host=127.0.0.1;port=3306;dbname=bank', 'root', '***');
	$conn->setAttribute(PDO::ATTR_ERRMODE, POD::ERRMODE_EXCEPTION);
	Produto::setConnection($conn);
	
	$p1 = new Produto;
	$p1->descricao 		= 'Vinho Brasileiro Tinto Merlot';
	$p1->estoque   		= 10;
	$p1->preco_custo   	= 12;
	$p1->data_cadastro 	= date('Y-m-d');
	$p1->save();
	
	$p2 = Produto::find(1);
	$p2->estoque = 32;
	$p2->save();
	
} catch (Exception $ex) {
	print $ex->getMessage();
}

// Row Data Gatway - Não tem métodos de negócia

<?php
class ProdutoGateway
{
    private static $conn;
    private $data;
    
    function __get($prop)
    {
        return $this->data[$prop];
    }

    function __set($prop, $value)
    {
        $this->data[$prop] = $value;
    }
    
    public static function setConnection( PDO $conn )
    {
        self::$conn = $conn;
    }
    
    public static function find($id)
    {
        $sql = "SELECT * FROM produto where id = '{$id}'";
        print "{$sql} <br>\n";
        $result = self::$conn->query($sql);
        return $result->fetchObject(__CLASS__);
    }

    public static function all($filter = '')
    {
        $sql = "SELECT * FROM produto";
        if ($filter) {
            $sql .= " where {$filter}";
        }
        print "{$sql} <br>\n";
        $result = self::$conn->query($sql);
        return $result->fetchAll(PDO::FETCH_CLASS, __CLASS__);
    }
    
    public function delete()
    {
        $sql = "DELETE FROM produto where id = '{$this->id}' ";
        print "{$sql} <br>\n";
        return self::$conn->query($sql);
    }

    public function save()
    {
        if (empty($this->data['id'])) {
            $id = $this->getLastId() +1;
            $sql = "INSERT INTO produto (id, descricao, estoque, preco_custo, ".
                                   "      preco_venda, codigo_barras, data_cadastro, origem)" .
                                   " VALUES ('{$id}', " .
                                            "'{$this->descricao}', " .
                                            "'{$this->estoque}', " .
                                            "'{$this->preco_custo}', " .
                                            "'{$this->preco_venda}', " .
                                            "'{$this->codigo_barras}', " .
                                            "'{$this->data_cadastro}', " .
                                            "'{$this->origem}')";
        }
        else {
            $sql = "UPDATE produto SET descricao     = '{$this->descricao}', " .
                                "       estoque       = '{$this->estoque}', " .
                                "       preco_custo   = '{$this->preco_custo}', " .
                                "       preco_venda   = '{$this->preco_venda}', ".
                                "       codigo_barras = '{$this->codigo_barras}', ".
                                "       data_cadastro = '{$this->data_cadastro}', ".
                                "       origem        = '{$this->origem}' ".
                                "WHERE  id            = '{$this->id}'";
        }
        print "{$sql} <br>\n";
        return self::$conn->exec($sql);   // executa instrucao SQL
    }
    
    private function getLastId()
    {
        $sql = "SELECT max(id) as max FROM produto";
        $result = self::$conn->query($sql);
        $data = $result->fetch(PDO::FETCH_OBJ);
        return $data->max;
    }
}

require 'classes/ProdutoGateway.php';

try {
	$conn = new PDO('mysql:host=127.0.0.1;port=3306;dbname=bank', 'root', '***');
	$conn->setAttribute(PDO::ATTR_ERRMODE, POD::ERRMODE_EXCEPTION);
	Produto::setConnection($conn);
	
	$p1 = new Produto;
	$p1->descricao 		= 'Vinho Brasileiro Tinto Merlot';
	$p1->estoque   		= 10;
	$p1->preco_custo   	= 12;
	$p1->data_cadastro 	= date('Y-m-d');
	$p1->save();
	
	$p2 = Produto::find(1);
	$p2->estoque = 32;
	$p2->save();
	
} catch (Exception $ex) {
	print $ex->getMessage();
}


// Active Record


class Produto {
	private $data;
	private static $conn;
	
	public function __get($propriedade) {
		return $this->data[$propriedade];
	}
	public function __set($propriedade, $valor) {
		$this->data[$propriedade] = $valor;
	}
	public static function setConnection(PDO $conn) {
		self::$conn = $conn;
	}
	public static function find($id) {
		$sql = "SELECT * FROM produto WHERE id = {$id}";
		print "{$sql}</br>\n";
		$result = self::$conn->query($sql);
		return $result->fetchObject(__CLASS__);
	}
	public static function all($filter = '') {
		$sql = "SELECT * FROM produto";
		if ($filter) $sql .= " WHERE {$filter}";
		print "{$sql}</br>\n";
		$result = self::$conn->query($sql);
		return $result->fetchAll(PDO::FETCH_CLASS, __CLASS__);
	}
	public function delete() {
		$sql = "DELETE FROM produto WHERE id = {$this->id}";
		return self::$conn->exec($sql);
	}
	public function save() {
		if (empty($this->data['id'])) {
			$id = $this->getLastId() +1;
			$sql = "INSERT INTO produto (id, descricao, custo) ".
			"VALUES ({$id}, '{$this->descricao}', {$this->custo})";
		} else {
			$sql = "UPDATE produto SET ".
			"descricao = '{$this->descricao}', ".
			"custo = '{$this->custo}' ".
			"WHERE id = '{$this->id}'";
		}
		print "{$sql}</br>\n";
		return self::$conn->exec($sql);
	}
	private function getLastId() {
		$sql = "SELECT MAX(id) AS max FROM produto";
		$result = self::$conn->query($sql);
		$data = $result->fetch(PDO::FETCH_OBJ);
		return $data->max;
	}
	public function dobraCusto() {
		$this->custo *= 2;
	}
}

try {
	$conn = new PDO('mysql:host=127.0.0.1;port=3306;dbname=livro', 'root', 'vertrigo');
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	Produto::setConnection($conn);
	
	$produtos = Produto::all();
	foreach ($produtos as $produto) {
		$produto->delete();
	}
	
	$p1 = new Produto;
	$p1->descricao = 'Vinho tinto de mesa';
	$p1->custo = 18.99;
	$p1->save();
	
	$p2 = new Produto;
	$p2->descricao = 'Queijo Qualho';
	$p2->custo = 5;
	$p2->save();
	
	$p3 = Produto::find(1);
	$p3->custo = 15.5;
	$p3->save();
} catch (Exception $ex) {
	print $ex->getMessage();
}


// DATA MAPPER


class Produto {
	private $data;
	
	public function __get($prop) { 
		return $this->data[$prop];
	}
	public function __set($prop, $val) { 
		$this->data[$prop] = $val;
	}
}
class Venda {
	private $id, $itens;
	
	public function getId() { return $this->id; }
	public function setId($id) { 
		$this->id = $id;
	}
	public function getItens() { return $this->itens; }
	public function addItem($qtd, Produto $p) {
		$this->itens[] = array($qtd, $p);
	}
}

class VendaMapper {
	private static $conn;
	
	public static function setConnection( PDO $conn ) {
		self::$conn = $conn;
	}
	public static function save(Venda $venda) {
		$data = date('Y-m-d');
		$sql = "INSERT INTO venda (data_venda) VALUES ('{$data}')";
		print "{$sql}<br>\n";
		self::$conn->exec($sql);
		$id = self::getLastId();
		
		foreach ($venda->getItens() as $item) {
			$quantidade = $item[0];
			$produto 	= $item[1];
			$preco		= $produto->preco;
			
			$sql = "INSERT INTO item_venda (id_venda, id_produto, quantidade, preco) ".
			"VALUES ({$id}, {$produto->id}, {$quantidade}, {$preco})";
			
			print "{$sql}<br>\n";
			self::$conn->exec($sql);
		}
	}
	private static function getLastId() {
		$sql = "SELECT MAX(id) AS max FROM venda";
		$result = self::$conn->query($sql);
		$data = $result->fetch(PDO::FETCH_OBJ);
		return $data->max;
	}
}

$p1 = new Produto;
$p1->id = 1;
$p1->preco = 17.90;

$p2 = new Produto;
$p2->id = 2;
$p2->preco = 10;

$venda = new Venda;
$venda->addItem(1000, $p1);
$venda->addItem(9999, $p2);

$conn = new PDO('mysql:host=127.0.0.1;port=3306;dbname=livro', 'root', 'vertrigo');
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

VendaMapper::setConnection($conn);
VendaMapper::save($venda);


