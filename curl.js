// instalacao para curl
'www.cygwin.com
// certificao ssl free
'https://letsencrypt.org

# curl

// :: OPTIONS
// - cabeçalho
-H "Content-Type: application/json"
// - dados
-d "{\"name\": \"Jackson Pires\"}"
// - retorna com o cabeçalho/corpo
-i , --include
// - traz apenas os cabeçalhos
-I , --head
// - verboso (mais informações)
-v
// - qual verbo HTTP (default: GET)
-X , --request
POST	// inserçao
PUT  	// substituição
PACTH	// alteração de um item especifico
CONNECT	// [raramete usado] ref ao ssl (pesquisar)
TRACE	// [raramete usado] bate-e-volta no servidor


OPTIONS	// Access-Control-Allow-Methods
'https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Access-Control-Allow-Methods
/**
 * 	O Access-Control-Allow-Methodscabeçalho especifica o método ou métodos 
	permitidos ao acessar o recurso. Isso é usado em resposta a uma 
	solicitação de comprovação. As condições sob as quais uma 
	solicitação é pré-determinada são discutidas acima.
	
	Access-Control-Allow-Methods: <method>[, <method>]*
**/

// Detalhes de como usar uma resposta com verbo OPTIONS
'http://zacstewart.com/2012/04/14/http-options-method.html


// TESTES COM CURL
"https://jsonplaceholder.typicode.com/

// Safe Methods
// metodos que são considerados "salvos" GET e HEAD

// Idempotentes
// quando "rodado" múltiplas vezes o resultado não sera alterado de pois da primeira.
GET, HEAD, PUT, DELETE, OPTIONS E TRACE

// Modelo de maturidade Richardson
// 4 níveis para que alcancemos uma API REST
// 0, 1 e 2 não seguem realmente o padrao REST
// -----
// 0: POX  Exp: salvarCliente "Você nem mesmo está usando o HTTP de forma correta!"
// 1: Recursos | 2: Verbos HTTP | 3: HATEOAS



