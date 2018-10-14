/* * * * * * * * * * * * * * * * * *
 *							20-01-2017
 *				AJAX 
 *	Asynchronous JavaScript and XML
 *
 * * * * * * * * * * * * * * * * * */


// Métodos de XMLHttpRequest



// Cancela a requisição corrente
abort();


// Retorna o conjunto completo de cabeçalhos HTTP como uma string
getAllResponseHeaders();


// Retorna o valor do cabeçalho HTTP especificado
getResponseHeader();
ajax.getResponseHeader('Content-Type');


// Define a página a ser aberta, assim como outras opções de requisição
open(metodo, URL, assic, user, password)

/*
	metodo		-> o método usado normalmente GET ou POST, assim como nos formularios
	URL			-> endereço da página WEB a ser acessada. Pode ser um URL relativo ou completo
	assic		-> define se a requisição deve ser de forma assíncrona ou não. Ou seja, o valor
				   TRUE indica que o processamento do script continua depois da chamada send(),
				   sem aguardar por uma resposta. O valor FALSE indica que deve guardar por uma
				   resposta.
	user		-> nome do usuario em caso de página restrita
	password	-> senha de acesso, em caso de página restrita
*/

ajax.open('POST', 'index.php', true)


// Envia a requisição ao servidor WEB. Como parâmetro, define os dados a serem enviados
// ou null se não houver dados. Suporta diversos formatos de dados, como, por exemplo,
// um simples texto ou o formato DOM. Se a flag assic foi ativada no momento da abertura
// da página, esse método não aguarda a resposta do servidor, prosseguindo com a execução.

send(conteúdo);
ajax.open('GET', 'example.com?id='+id, true);
ajax.send(null);


// Altera o valor de um cabeçalho HTTP. Deve ser chamado depois do método open()
setRequestHeader()

ajax.open('GET', 'example.com', true);
ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
ajax.send(null);



// Propriedades de XMLHttpRequest



// Define a função que irá manipular (handler) os eventos, ou seja, que será ativada
// a cada mudança de estado do Ajax. Nesta prop pode especificar apenas o nome ou
// definir a função inteira

ajax.open('GET', 'index.php?id=' + codigo, true);
ajax.onreadystatechange = function() {
	if (ajax.readyState == 4) {			// foi carregado
		if (ajax.status == 200) {		// status é "Ok"
			ajax.responseText;			// exibe a resposta como texto
		}
	}
}
ajax.send(null);


// Retorna o estado do objeto XMLHttpRequest. Pode assumir os valores
/*
	0	->	não iniciado
	1	->	aberto
	2	->	enviado
	3	->	recebendo
	4	->	carregado
*/
readyState

if (ajax.readyState == 4) {
	if (ajax.status == 200) // resposta server...
	else // caso ocorra erro
}


// Retorna o estado da solicitação como um número (por exp.: 200 para "OK" e 404 "Not Found").
status

// Retorna o texto referente ao estado da solicitação (pro exp.: "OK", "Not Found")
statusText

// Retorna a resposta do servidor como uma String
responseText

//Retorna a resposta em formato XML. Ou seja, um objeto do tipo XMLDocument
responseXML



// Enviado dados ao Servidor



// antes de realizar o envio dos dados, devemos cumprir algumas etapas. Por exemplo,
// se formos utilizar o formato XML no navegador Mozilla, pode ser necessário enviar
// um cabeçalho extra ao servidor, informando que sera utilizado o tipo (MIME Type) XML.
ajax = new XMLHttpRequest();
ajax.overrideMimeType('text/xml')


// Os dados de envio devem seguir a forma de uma queryString
nome=Victor&idade=21&sexo=masculino

// É importante destacar que para enviar dados com o método POST, deve-se alterar o tipo MIME
// da requisição, enviado o seguinte cabeçalho:
ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=ISO-8859-1');


// SEGUE O 1° EXEMPLO 

function iniciaAjax() {
	var ajax;
	if (window.XMLHttpRequest) ajax = new XMLHttpRequest();
	else if (window.ActiveXObject) {
		ajax = new ActiveXObject('Msxml2.XMLHTTP');
		ajax = ajax || new ActiveXObject('Microsoft.XMLHTTP');
	}
	else alert('Seu navegador não suporta AJAX!');
	return ajax ? ajax : null;
}
function processa() {
	var ajax;
	if (ajax = iniciaAjax()) {
		ajax.onreadystatechange = function() {
			if (ajax.readyState == 4) {
				if (ajax.status == 200) {
					var elemResult = document.getElementsByName('result')[0];
					elemResult.value = ajax.responseText;
				}
				else alert(ajax.statusText);
			}
		}
		var nome = document.getElementsByName('nome')[0].value;
		var nota = document.getElementsByName('nota')[0].value;
		
		var query = 'nome='+nome+'&nota='+nota;
		
		ajax.open('POST', 'index.php', true);
		ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		ajax.send(query);
	}
}

//  Server - PHP

$nome = $_POST['nome'];
$nota = $_POST['nota'];
echo $nome.' '.$nota * 3;

<form name="minhaNota" method="" action="">
	Nome: <input type="text" name="nome"><br>
	Nota: <input type="text" name="nota"><br>
	Nota: <input type="text" name="result"><br>
	<button type="button" onClick="processa()"> Processa </button>
</form>



// Criando sua biblioteca AJAX

var ajax;
var dadosUsuario;
//	-------------- cria o objeto e faz a requisição --------------------
function requisicaoHTTP(tipo, url, assic) {
	if (window.XMLHttpRequest) ajax = new XMLHttpRequest();
	else if (window.ActiveXObject) {
		ajax = new ActiveXObject('Msxml2.XMLHTTP');
		ajax = ajax || new ActiveXObject('Microsoft.XMLHTTP');
	}
	
	if (ajax) iniciaRequisicao(tipo, url, assic);
	else alert('Seu navegador não suporta AJAX!');
}
// --------------- envia a requição ou server --------------------------
function iniciaRequisicao(tipo, url, assic) {
	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4) {
			if (ajax.status == 200) trataDados();
			else alert(ajax.statusText);
		}
	}
	ajax.open(tipo, url, assic);
	ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	ajax.overrideMimeTipy('text/xml');
	ajax.send(dadosUsuario);
	dadosUsuario = null;
}
// -------------- inicia a requisição com envio de dados ---------------
function enviaDados(url) {
	criaQueryString();
	requisicaoHTTP('POST', url, true);
}
// -------------- cria a string a ser enviada formato nom1=val1&nom2=val2&..nomN=valN
function criaQueryString() {
	var form = document.forms[0];
	var numElemts = form.elements.length;
	for (var i = 0; i < numElemts; i++) {
		dadosUsuario += form.elements[i].name + '=' + form.elements[i].value;
		if (i < (numElemts-1)) dadosUsuario += '&';
	}
}

