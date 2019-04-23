<?php
/* * * * * * * * * * * * * * * * * * *
 *
 *			- LARAVEL 5.3 -
 *
 *
 *					by Matt Stauffer
 *						  2018-09-29
 *
 * * * * * * * * * * * * * * * * * * */


(*) 2 CONFIGURAÇÕES
__

//Instalação Laravel
composer create-project laravel/laravel projectName --prefer-dist


// 
// as cofigurações do app residem na pasta config/
// ao definir uma nova configuração acesse-a com
// notação de '.'
config/

// para variaveis de ambiente
// é possivel acessar do app e arq na config/
env/

BUGSNAG_API_KEY = oinfp13414534

// -- config/services.php
return [
	'sparkpost' => [
		'secret' => 'abcdef'
	],
	'bugsnag' => [
		'api_key' => env('BUGSNAG_API_KEY')
	]
];

// acessando var de configurações
config('services.sparkpost.secret');




(*) 3 ROTEAMENTO E CONTROLADORES
__


// Rotas são buscadas decima para baixo


// rotas de API
routes/api.php

// rotas da WEB
routes/web.php

// versões anterior 5.3 haverá apenas -- app/Http/routes.php


# EXP: Rota Basica
// -- routes/web.php
Route::get('/', function () {
	return 'Hello, World!';
});

// se preferir evitar os Facades
$router->get('/', function () {
	return 'Hello, World!';
});


_ Verbos de Rota


Route::get('/', function () {});
Route::post('/', function () {});
Route::put('/', function () {});
Route::delete('/', function () {});
Route::patch('/', function () {});
Route::put('/', function () {});
Route::any('/', function () {});
Route::match(['get', 'post'], function () {});


__ Manipulação de Rotas

// apps que usam clouser não pode se benficiar
// do cache de rotas do Laravel

// chamando métodos de controlador
// App\Http\Controller\WelcomeController
Route::get('/', 'WelcomeController@index')


__ Parâmetros de Rotas


// segmento de estrutura URL
// no param da func não é necesario usar o mesmo nome
Route::get('users/{id}/friends', function ( $id ) {
	// ....
})

// Opcionais
Route::get('users/{id?}', function ( $id = 'fallback' ) {
	// ....
})

// Expressão Regular
Route::get('users/{id}', function ( $id ) {
	// ....
})->where('id', '[0-9]+')

Route::get('posts/{id}/{slug}', function ( $id, $slug ) {
	// ....
})->where(['id' => '[0-9]+', 'slug' => '[a-zA-Z]+'])


__ Nomes de Rotas


// Helper url() ?>
<a href="<?php echo url('/')?>"><?
// > <a href="http://myapp.com/">


// Definindo nomes recursoPlural.acao
Route::get('members/{id}', 'MembersController@show')->name('members.show')

// vinculando nome em view ?>
<a href="<?php echo route('members.show', ['id' => 14])?>"><?
// se não houver param route('members.show')


// A diferentes formas de passar param par route()

Exp.: user/{userId}/comments/{commentId}

route('users.comments.show', [1, 2])
// user/1/comments/2
route('users.comments.show', ['userId' => 1, 'commentId' => 2])
// user/1/comments/2
route('users.comments.show', ['commentId' => 2, 'userId' => 1])
// user/1/comments/2
route('users.comments.show', ['userId' => 1, 'commentId' => 2, 'opt' => 'a'])
// user/1/comments/2?opt=a


/* Laravel 5.1
Route::get('members/{id}', [
	'as'   => 'members.show',
	'uses' => 'MembersController@show'
])
*/

// convenção de nomenclatura
/*
	photos.index
	photos.create
	photos.store
	photos.show
	photos.edit
	photos.update
	photos.destroy
*/


__ Grupos de Rotas


// Um grupo de rotas na vdd não faz nada se não
// for definido alguma propriedade no []

// Definindo um grupo de rotas
Route::group([], function () {
	Route::get('hello', function () {
		// ....
	})
	Route::get('world', function () {
		// ....
	})
})

// EXP.: Restringindo um grupo de rotas 
// apenas a usuários que fizeram login
Route::group(['middleware' => 'auth'], function () {
	Route::get('dashboard', function () {
		return view('dashboard')
	})
	Route::get('account', function () {
		return view('account')
	})
}) //* é mais claro aplicar middleware direto no controlador

class DashboardController extends Controller 
{
	public function __contruct ()
	{
		$this->middleware('auth');
		$this->middleware('admin-auth')->only('admin');
		$this->middleware('team-member')->except('admin');
	}
}


 Prefixos de caminho
 
 
// Prefixando um grupo de rotas
Route::group(['prefix' => 'api'], function () {
	Route::get('/', function () {
		// manipula o caminho /api
	})
	Route::get('users', function () {
		// manipula o caminho /api/users
	}
})


 Roteamento de subdomínio


// semelhante ao prefix
Route::group(['domain' => 'api.myapp.com'], function () {
	Route::get('/' , function () {
		// ....
	})
})

// parte de um subdomínio como param
// costuma ser feito para modelos multitenancy (multi-inquilino)
Route::group(['domain' => '{account}.myapp.com'], function () {
	Route::get('/', function ($account) {
		// ....
	})
	Route::get('users/{id}', function ($account, $id) {
		// ....
	})
})


	Prefixos de namespace.
 

// evita referências de nomes grandes
// como "API\Controller_A_@index" e "API\Controller_B_@index"
Route::group(['namespace' => 'API', 'prefix' => 'api'], function () {
	Route::get('/', 'ControllerA@index')
	Route::get('user', 'ControllerB@index')
})


	Prefixos de nome
 

// caminho: 	 users/comments/5
// rota chamada: users.comments.show
Route::group(['as' => 'users.', 'prefix' => 'users'], function () {
	Route::group(['as' => 'commets.', 'prefix' => 'comments'], function () {
		// O nome da rota será users.comments.show
		Route::get('{id}', function ($id) {
			// ....
		})->name('show')
	})
})


__ Views


// pode ser HTML, JSON, XML, emails

// formatos de view: 

//	PHP simples		: about.php
//	template Blade	: about.blade.php

// Há trêz maneiras de carregar:

//	view()
//	View::make()
//	injetar Illuminate\View\View


// Uso simples
// -- resources/view/home.blade.php ou
// -- resources/view/home.php
Route::get('/', function () {
	return view('home')
})

// Passando variáveis
// -- resources/view/tasks/index.blade.php ou index.php
Route::get('tasks', function () {
	return view('tasks.index')->with('tasks', Task::all())
})


__ Controladores


// comando artisan:
php artisan make:controller MyController

// esqueleto
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Requests;

class MyController extends Controller {}


// Gerando controladores de recursos
// métodos pré-definidos
// index, create, destroy, edit, update, show, store
php artisan make:controller MyController --resource


 Obtendo Entradas do Usuário


// vinculando ações de formulário
// -- route/web.php
Route::get('tasks/create', 'TasksController@create') // exibe formulario
Route::post('tasks', 'TasksController@store') // recebe

// Método comum de controller para obtenção de entrada

public function store () 
{
	$task = new Task
	$task->title = Input::get('title')
	$task->description = Input::get('description')
	$task->save()
	
	return redirect('tasks')
}


 __Injetando Dependências em Controladores


// Uma outra alternativa sobre o modelo acima

public function store ( \Illuminate\Http\Request $request )
{
	$task = new Task
	$task->title = $resquest->input('title')
	// restante ...
}


__Controlador de Recursos


// já vem com métodos pré-definidos
php artisan make:controller MyController --resource

/*
 +-----------+-------------------+--------------+---------------+
 | VERBO	 | URL				 | Métod. Contr | Descricão		|
 +-----------+-------------------+--------------+---------------+
 | GET		 | tasks			 | index()		| exibe todas	|
 | GET		 | tasks/create		 | create()		| exibe form	|
 | POST		 | tasks			 | store()		| recebe form	|
 | GET		 | tasks/{task}		 | show()		| exibe tarefa	|
 | GET		 | tasks/{task}/edit | edit()		| edit tarefa	|
 | PUT/PATCH | tasks/{task}		 | update()		| recebe form	|
 | DELETE    | tasks/{task}		 | destroy()	| exclui tarefa |
 +-----------+-------------------+--------------+---------------+
 
*/

// Vinculação de controlador de recursos
// -- routes/web.php
Route::resource('tasks', 'TasksController')
// Essa técnica também nomeia as rotas exp.: tasks.index

// ver rotas disponíveis
php artisan route:list


__ Vinculando Rota Modelo


// busca em um registro Eloquent
Route::get('conferences/{id}', function ( $id ) {
	$conference = Conference::findOrFail($id)
})


 Vinculação rota modelo explicíta
 

// deve utilizar o mesmo nome no rota quanto no typehinting param
Route::get('conferences/{conference}', function (Conference $conference) {
	// como o param de rota tem o mesmo nome do param typehinting
	// o laravel vê isso como vinculação rota modelo e considera que 
	// esta sendo passado um ID e conference fica sendo uma instância
	return view('conferences.show')->with('conference', $conference)
})

// Para alterar o coluna buscada pelo laravel sendo ID em uma vinculaçao
// rota modelo adicione um método em seu modelo 
public function getRouteKeyName () {
	return 'slug'
}


 Vinculação rota modelo personalizada
 

// Para configurar vinculação rota modelo manualmente.
// adicione as seguintes linhas em boot() 
// -- App\Providers\RouteServiceProvider

// Adicionando uma viculação rota modelo
public function boot (Route $router) {
	// permite q o método boot() parent continue
	parent::boot($router)
	// Executa a vinculação
	$router->model('event', Conference::class)
}

// Agora sempre que uma rota tiver um parâmetro chamado {event}
// o resolvedor da rota retornará um instancia da class Conference
// com o ID desse parâmetro
Route::get('events/{event}', function (Conference $event) {
	return view('events.show')->with('event', $event)
})


__ Cache de Rotas


// Para usar caches de rotas deve estar usando rotas de controladores
// e recursos (e não clouser de rotas).

php artisan route:cache 
// o laravel serializará os resultados de seus arquivos route/*
// Se quiser excluir o cache
php artisan route:clear

// O laravel passa a procurar rotas no arquivo do cache em vez de 
// nos arquivos routes/* reais.

// você pode fazer quantas alterações quiser nesses arquivos que não
// produziram efeito até que o comando route:cache seja executado
// novamente


__Spoofing de Método de Formulário


 Introdução aos verbos
// GET 		: Solicita um recursoPlural
// HEAD		: Idem GET só que apenas cabeçalhos
// POST		: cria um recurso
// PUT		: Sobrepõe um recurso
// PATCH	: Modifica um recurso
// DELETE	: exclui um recurso
// OPTIONS	: Pergunta ao servidor quais verbos
//			  são aceitos nessa URL


 Spoofing de método HTTP em formulário HTML
 
 
// Para enviar form usando outros verbos
// defina um input hidden com name "_method"?>
<form action="/task/5" method="POST">
	<input type="hidden" name="_method" value="DELETE">
</form><?


 Proteção Contra CSRF
 

// Por padrão todas as rotas laravel, exceto de leitura (GET, 
// HEAD ou OPTIONS) são protegidas contra ataques de falsificação
// de solicitação (CSRF, cross-site request forgery)
// exigindo um _token sendo passado junta as solicitação ?>
<form action="" method="">
	<?php echo csrf_field() ?>
	ou
	<input type="hidden" name="_token" value="<?php echo csrf_token() ?>">
</form><?


__ Redirecionamento


// diferentes maneiras de retornar um redirecionamento

// Helper
	return redirect()->to('login')
// Atalho do Helper
	return redirect('login')
// Facade
	return Redirect::to('login')


 redirect->to()
 
// assinatura
// @param to 	 : caminho interno valido
// @param status : status HTTP
// @param headers: define quais cabeçalhos seram enviados
// @param secure : permite sobrepor http versus https
function to ($to = null, $status = 302, $headers = [], $secure = null)

Route::get('/', function () {
	return redirect->to('home')
})


 redirect->route()

// Igual ao to() mais aponta para um nome de rota

// assinatura
function route ($to = null, $parameters = [], $status = 302, $headers = [])
Route::get('/', function () {
	return redirect->route('conferences.index')
})
// com parametros
Route::get('/', function () {
	return redirect->route('conferences.show', ['conference' => 99])
})


 redirect->back()
 
// retorna a última página visitada
// outras formas
redirect()->()
back()


 Outros métodos de redirecionamento
 
 
home()		// para uma rota chamada home
refresh()	// para a mesma página
away()		// para um URL externo sem validação padrão
secure()	// é como to() com o param secure
action()	// permite a vinculação a um controlador
.			   redirect->action('MyController@index')
guest()		// usado internamente pelo sistema de autenticação
intended()	// tambem usando pelo sistema de autenticação


 redirect->with()

 
// passa dados no redirecionamente
return redirect('dashboard')->with('error', true)
// para mais de um dado
return redirect('dashboard')->with([
	'error'   => true,
	'message' => 'Whoops!'
])

// redireciona com entradas do usuário
// isso é mais comum para erro de validação,
// para enviar o usuário de volta ao formulário
// do qual ele veio
return redirect('form')
.			->withInput()
.			->with([
.				'error'   => true, 
.				'message' =>
.			])

// Para obter a entrada que foi passada com withInput()
// é com o helper old(), que pode ser usado para obter todas
// as entradas anteriores ou apenas uma old('username', [valor-default-opcional])
// é comum ver casos em view como este?>
<input name="username" value="<?=old('username', 'Default username instructions here')?>"><?


// falando em validação, tbm há um método útil para a passagem
// de erros junto com uma resposta de redirecionamento withErrors()
withErrors()
// compartilha uma variável $errors com as views da página 

// Redirecionamento com erros
Route::post('form', function () {
	$validator = Validator::make($request->all(), $this->validationRules)
	
	if ( $validator->fails() )
	{
		return redirect('form')
			->withErrors($validator)
			->withInput()
	}
})


__ Abortando a Solicitação


// opcionalmente recebem códigos de status HTTP
// uma mensagem e um array de cabeçalhos como param
abort()
abort_if()
abort_unless()

// Abortamento 403 Forbidden
Route::post('something-you-cant-do', function () {
	abort(403, 'You cannot do that!')
	abort_unless($request->has('magicToken'), 403)
	abort_if($request->user()->isBanned, 403)
})


__ Respostas Personalizadas


// pode ser usado o helper
response()
// ou o facade
Response


 response()->make()
// respostas manualmente HTTP
return response()->make('Hello, World!')

 
 response()->json() e->json()
// resposta HTTP codificada em JSON
// é como make() mais define o cabeçalho adequado
return response()->json( User::all() )


 response()->download() e->file()
// para enviar um arquivo para download
// passe uma instancia (new SplFileInfo) ou
// um arq em formato string
return response()->download('file4ef3512.pdf', 'myFile.pdf')




(*) 4 TEMPLATES DO BLADE
__




// ecoando dados
{{ $variavel }} // escapado ?>
<?= htmlentities($variavel) ?>
<?
// Sem escape
{!! $variavel !!}

// A @ removida e "{{ textoDireto }}" é ecoado diretamente na view
@{{ textoDireto }}


___	Estruturas de Controle


	Condicionais
 
 
	@if ($condition)

// compilado if ($condition):

// Exp.:
@if ( count($stalks)  === 1 )
	// ....
@elseif ( count($stalks) === 0 )
	// ....
@else
	// ....
@endif


	@unless e @endunless
	
// É o oposto de @if
// o mesmo que if ( !$condition ):	
@unless ( $user->hasPaid() )
	// ....
@endunless


	Loops
	
	
	@for @foreach @while
	
@for ($i = 0; $i < 10; $i ++)
	//{{ $i }}
@endfor

@foreach ($talks as $talk)
	// {{ $talk->title }}
@endforeach

@while ($item = array_pop($items))
	// {{ $item->orSometing() }}<br>
@endwhile


	@forelse

// É como foreach mais permite um fallback caso
// o item a ser iterado esteja vazio
@forelse ($talks as $talk)
	// {{$talk->length }}
@empty
	// No talks this day
@endforelse

// As diretivas @foreach e @forelse adicionam um recurso
// uma objeto $loop
$loop
// $loop->
//		index		: indice de base 0 (primeiro item)
//		iteration	: indice de base 1 (primeiro item)
//		remaining	: qtos itens permanecem no loop; se o item atua
//					  for o 1° de 3 essa prop será 2
//		count		: contagem dos itens do loop
//		first		: booleano indica se é o 1° item
//		last		: booleano indica se é o último item
//		depth		: qtos "níveis" há nesse loop
//		parent		: Referece à var $loop do item do loop-pai ?>
<ul>
	@foreach ($pages as $page)
		<li>
			{{ $loop->iteration }}: {{ $page->title }}
			
			@if ( $page->hasChildren() )
				<ul>
					@foreach ( $page->children() as $child )
						{{ $loop->parent->iteration }}
						{{ $loop->iteration }}
						{{ $child->title }}
					@endforeach
				</ul>
			@endif
		</li>
	@endforeach
</ul><?


	or

// ecoa valor de $title se ele tiver sido definido
// caso contrário "Default"
{{ $title or "Default" }}


___	Definindo Seções com @section/@show e @yield


// Liaute Blade nível superior ?>
<!-- resources/view/layouts/master.blade.php -->
<html>
	<head>
		<title>My Site | @yield('title', 'Home Page')</title>
	</head>
	<body>
		<div class="container">
			@yield('content')
		</div>
		@section('footerScripts')
			<script src="app.js"></script> <!-- fallback -->
		@show
	</body>
</html>

<!-- Estendendo um Leiaute Blade -->
<!-- resources/view/dashboard.blade.php -->
@extends('layouts.master')

@section('title', 'Dashboader')

@section('content')
	Welcome to your application dashboard!
@endsection

@section('footerScripts')
	@parent	<!-- se não definir iria sobrepor -->
	<script src="dashboard.js"></script>
@endsection
<?

@show 		// local de uma seção no template-pai
@endsection	// define o conteudo de um template

@extends	// define que esta view extende outra
//			   cada arq so extend 1 arq e a chamada
//			   deve ser a primeira

@endsection // tbm pode ser @stop


	@include
	
// Incluindo view partials com @include
?>
<!-- resources/views/home.blade.php -->
<div class="content" data-page-name="{{ $pageName }}">
	<p>Here's why you should sign up for our app</p>
	
	@include('partials.sign-up-button', ['text' => 'See just how great it is'])
</div>

<!-- resources/view/partials/sign-up-button.blade.php -->
<a class="button button--callout" data-page-name="{{ $pageName }}">
	<i class="exclamation-icon">{{ $text }}</i>
</a><?


	@each

// usando view partials em um loop com @each ?>
<!-- resources/view/sidebar.blade.php -->
<div class="sidebar">
	@each('partials.module', $module, 'module', 'partials.empty-module')
</div>

<!-- resources/view/partials/module.blade.php -->
<div class="sidbar-module">
	<h1>{{ $module->title }}</h1>
</div>

<!-- resources/view/partials/empty-module.blade.php -->
<div class="sidbar-module">
	No modules :(
</div><?


___	View Composers e Injeção de Serviços


	compartilhando variável globalmente
	
// Algum provedor de serviço
// pode ser -- App\Providers\AppServiceProvider
public function boot () {
	...
	view()->share('posts', Post::recent())
}
// usar view()->share() torna a variavel acessível
// para todas as views, o q pode ser um exagero


	view composers baseados em closures

// Criando um view composer baseado em closure
// compartilhando a var com uma unica view
view()->composer('partials.sidebar', function ($view) {
	$view->with('posts', Post::recent())
})
// com mais view
// pode se user partials.*, tasks.* ou apenas *
view()->composer(
	['partials.header', 'partials.footer'], 
	function ($view) {
		$view->with('posts', Post::recent())
	}
)


	view composers baseados em classes
	
// Não há um local formalmente para as view composers
// recomendado App\Http\ViewComposer

// Exp.: View Composers
namespace App\Http\ViewComposer;

use App\Post;
use Illuminate\Contracts\View\View;

class RecentPostsComposer {
	private $posts;
	
	public function __construct (Post $posts) {
		$this->posts = $posts;
	}
	public function compose (View $view) {
		$view->with('posts', $this->posts->recent())
	}
}

// Registrando um view composer em AppServiceProvider
// -- App\Providers\AppServiceProvider
public function boot () {
	...
	view()->compose(
		'partials.sidebar',
		\App\Http\ViewComposer\RecentPostsComposer::class
	)
}


	Injeção de Serviços do Blade
	
// injetando um serviço diretamente em uma view ?>
@inject('analytics', 'App\Services\Analytics')
<div class="finances-display">
	{{ $analytics->getBalance() }}
</div><?


	Diretivas Personalizadas do Blade
	
// Imagine se quisessemos
// reduzir de escrever @if (auth()->guest())
// para @ifGuest
// -- App\Providers\AppServiceProvider
public function boot () {
	Blade::directive('ifGuest', function () {
		return "<?php if (auth()->guest()): ?>"
	})
}

// Criando uma diretiva com parâmetros
Blade::directive('newlinesToBr', function ($expression) {
	return "<?php echo nl2br({$expression}); ?>"
})
// Em uso ?>
<p>@newlinesToBr($message->body)</p>
<?



(*) 5 COMPONENTES FRONTEND
__



___	PAGINAÇÃO


// Paginando uma resposta do construtor de consultas
// -- PostController
public function index () {
	return view('posts.index', [
		'posts' => DB::table('posts')->paginate(20)
	])
}

// Renderizando links de páginação em um template
// -- posts.index.blade.php ?>
<table>
	@foreach ($posts as $post)
		<tr><td>{{ $post->title }}</td></tr>
	@endforeach
</table>

{{ $posts->links() }}
<!-- gera widget de paginação bootstrap -->
<ul class="pagination">
	<li class="disabled"><span>&laquo;</span></li>
	....
</ul>
<?

	Criando Páginação manualmente
	
// Existe duas classes para gerar paginação
//
// Illuminate\Pagination\Paginator
// Illumiate\Pagination\LengthAwarePaginator	
//
// Paginator 			: apenas botoes "Voltar" e "Avançar"
// LengthAwarePaginator	: widget bootstrap pagination

// Criando paginador manualmente no Laravel 5.2 e 5.3
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;

Route::get('people', function (Request $request) {
	$people = [...]; // lista de pessoas
	$perPage = 15;
	$offsetPages = $request->input('page', 1) - 1;
	// Paginator não fatia seu array por você
	$people = array_slice(
		$people,
		$offsetPages * $perPage,
		$perPage
	);
	return new Paginator($people, $perPage);
})



___	MESSAGE BAGS


// Também estão ligadas as Validadores
// os validadores ao retornar messagens de erros
// são MessageBag
// podemos passar mensagens de erro
redirect->route('tasks.create')->withErrors($messagebag)
// que será atribuido para a variável
$errros

// Criando e usando MessageBag manualmente
$messages = [
	'erros' => [
		'Aqui vai uma mesangem de erro'
	],
	'messages' => [
		'Edit 2 was successful'
	]
]
$messagebag = new \Illuminate\Support\MessageBag( $messages );
// procurando erros; se houver algum ecoa
if ($messagebag->has('erros')) {
	echo '<ul id="errors">';
	foreach ($messagebag->get('errors', '<li>:message</li>') as $error)
	{
		echo $error;
	}
	echo '</ul>';
}

// Fragmento comum que os desenvolvedores inserem
// em cada página
// -- partials/errors.blade.php ?>
@if ($errors->any())
	<div class="alert alert-danger">
		<ul>
			@foreach ($errors as $error)
				<li>{{ $error }}</li>
			@endforeach
		</ul>
	</div>
@endif
<?
// Error bags nomeados
redirect('dashboard')->withErrors($validator, 'login')
// só utilizar 
$error->login->[any() | count()]



___	HELPERS DE STRING, PLURALIZAÇÃO E LOCALIZAÇÃO
// https://laravel.com/docs/5.3/helpers

// Str::plural() | str_plural()

e				// alias html_entities
start_with		// verificas uma string se começa como
ends_with		// termina com
str_contains	// contém uma string

str_is(pattern, string_context) // verif se coincide com um padrão 					
//								   foo* : foobar e foobaz								
str_slug		// convert em slug
str_plural		// pluraliza uma palavra apenas no inglês dog : dogs
str_singular	// sigulariza 


	Localização

// Permite definir vários idiomas e marcar strings como
// alvo de tradução

// Blade
{{ trans('navidation.back') }}
// Diretiva Blade
@trans('navigation.back')




(*) 6 COLETANDO E MANIPULANDO DADOS DO USUÁRIO
__


___	Injetando um Objeto Resquest

// Existem 3 formas para consultar os dados de entrada
//
//	Request::input()	: \Illuminate\Support\facade\Request
//	request()->input()	: request('firstName') helper
//	request->input()	: Injeçao
	
	
\Illuminate\Http\Request


	$request->all()
	
// array com todas as entradas que o usuário inseriu.
// GET, POST e FILES ?>
<form method="POST" action="post-route?utm=12345">
	{{ csrf_field() }}
	<input type="text" name="firstName">
	...
</form><?
Route::post('post-route', function (Request $request) {
	var_dump($request->all())
})
// Exibe
[
	'_token'	=> 'CSRF token here',
	'firstName' => 'value',
	'utm'		=> 12345
]


	$request->except()
	
// Remove campos indesejados
var_dump($request->except('_token'))
// Exibe
[
	'firstName' => 'value',
	'utm'		=> 12345
]

	$request->only()
	
// oposto de $request->except()
var_dump( $request->only(['firstName', 'utm']) )
// Exibe
[
	'firstName' => 'value',
	'utm'		=> 12345
]

	$request->has()
	$request->exists()
	
// verifica se uma parte especifica está disponível
if ($request->has('utm')) {
	// faz algo
}
// has()	: FALSE (se n existe e esta vazia)
// exists()	: FALSE (se n existe)


	$request->input()
	
// obtem uma entrada
// ->input(campo, [fallback])
$request->input('name', 'default')


	Entrada de Array

// Notação de ponto para o acesso a valores do array ?>
<input type="text" name="employees[0][firstName]">
<input type="text" name="employees[0][lastName]">
<input type="text" name="employees[1][firstName]">
<input type="text" name="employees[1][lastName]"><?
// Coletando dados
$request->input('employees.0.firstName')
//> "Beatriz"
$request->input('employees.*.lastName')
//> ["Brandão", "Matias"]
$request->input('employees.1')
//> ["Larissa", "Matias"]


	Entrada JSON $request->json()
	
// $request->input() também coleta dados json
// mais apenas se o cabeçalho for application/json
POST /post-route HTTP 1.1
Content-Type: application/json
{
	'firstName' : 'Joe',
	'lastName'	: 'Schmoe',
	'spouse': { 
		'firstName'	: 'Jill',
		'lastName'	: 'Schmoe'
	}
}
$request->json('firstName')
$reuqest->input('spouse.firstName')


___	Dados de Rotas


// Segmento de URL
// http://myapp.com/users/15
// 2 segmentos user e 15
$request->segments() // retorna todos segmentos
$request->segment(1) // retorna um "user" indice base 1


	A partir de parâmetro de rota

Route::get('users/{id}', function ($id) {
	// myapp.com/users/15	$id = 15
})


___	Upload de Arquivos $request->file()


// $request->file() retorna instancia UploadedFile 
// que extende SplFileInfo

// Saida proveniente do envio do formulário
if ($request->hasFile('profile_picture')) {
	var_dump( $request->file('profile_picture') )
}

// Validando um upload se foi bem sucedido
if (
	$request->hasFile('profile_picture') &&
	$request->hasFile('profile_picture')->isValid()
) {...}

// métodos utilizaveis (Consulte documentaçao)
store(path, storageDisk) // salva
storeAs(path, newName, storageDisk)	// salva com novo nome
...mais uma porrada...


___	Validação



	validate()

// validate() no controlador com o uso de ValidatesRequests
// todos os controladores introduzem o trait ValidatesRequests 
public function store(Request $request) {
	$this->validate($request, [
		'title' => 'required|unique:recipes|max:125',
		'body'	=> 'required'
	])
}

// Caso não valido lança uma ValidationException
// para JSON a exceção criará um JSON contendo os erros
// caso normal redirecionará para a page anterior
// com todas as entradas do usuario e os erros de validação

// Regras
// pode ser separada por '|' pipe ou em array [...] 
// nomecampo:regra|regra ou nomecampo: [regra,regra,...]

// Validação aninhada
$this->validate($request, [
	'user.name'  => 'required',
	'user.email' => 'required|email'
])

// consultar documentação sobre regras
// https://laravel.com/docs/5.3/validation


	Validação Manual

// Caso não esteja trabalhando com um controllador
Route::post('recipes', function (Illuminate\Http\Request $request) {
	$validator = Validator::make($request->all(), [
		'title' => 'required|unique:recipes|max:125',
		'body'	=> 'required'
	]);
	
	if ($validator->fails()) {
		return redirect('recipes/create')
			->withErrors($validator)
			->withInput();
	}
	
	// A receita é válida; dá proseguimento e salva
})

// Exibindo Mensagens de erro da validação
// 	qualquer tipo de erro ao ser transmitodo por withErrors()
// 	estará disponivel na view() pela var $errors
// 	como mágica essa var sempre estará diponível nas views
//	mesmo estando vázia

// Ecoa erros da validação ?>
@if ($errors->any())
	<ul id="errors">
		@foreach ($errors->all() as $error)
			<li>{{ $error }}</li>
		@endforeach
	</ul>
@endif
<?


___	Form Requests


// Padrões repetitivos - validação de entrada, autenticação,
// e redirecionamento

// criando uma form request
php artisan make:request CreateCommentRequest
// define 2 metodos
// rules()		: as regras
// authorize()	: (opcional) se retorna true o user será autorizado

namespace App\Http\Requests;
use App\BlogPost;
use App\Http\Requests\Request;
class CreateCommentRequest extends Request {
	public function rules () {
		return [
			'body' => 'required|max:1000'
		]
	}
	public function authorize () {
		$blogPostId = $this->route('blogPostId');
		return auth()->check() &&
			BlogPost::where('id', $blogPostId)
				->where('user_id', auth()->user()->id)->exists();
	}
}

// Estamos capturando o segmento de rota chamado blogPostId
// sugere que a definição de rota 'blogPosts/{blogPostId}'
// com o mesmo nome ficando acessivel por $this->route('blogPostId')
// Em seguida verifica se o usuário fez login e caso tenha feito
// se exite alguma postagem de blog com esse identificador

// Usando um Form Request
// injetar em Route ou Controladores
Route::post('comments', function (\App\Http\Requests\CreateCommentRequest $request) {
	// armazena comentário
})


___	Atribuição em Massa


// passando um formulário inteiro para um modelo do Eloquent
Route::post('posts', function (Request $request) {
	$newPost = Post::create($request->all())
})
// Essa tecnica não é recomendada sem uma proteção
// defina essas duas propriedades no modelo Post por exemplo
// fillable ativa campos que podem ser atribuidos em massa
// guarded os protege
$fillable e $guarded
// Protegendo o modelo
class Post extends Model {
	// desativa a atribuiçao em massa no campo author_id
	protected $guarded = ['author_id'];
}

// Outra modo de prevenção
$newPost = Post::create( $request->only(['title', 'body']) )



(*) 8 BANCOS DE DADOS E O ELOQUENT
__


// configurações
// por padrão já vem definindo uma configuração
// mais pode ser criadas mais
config/database.php

// como você pode solicitar uma conexão específica
$users = DB::connection('secondary')->select('select * from users')


___	Uso básico do facade DB

// exemplo de uso de SQL bruto e do construtor de consultas
/*
	statement()
	select()
	insert()
	update()
	delete()
*/
// basica
DB::statement('DROP TABLE users')
// seleção bruta e vinculação de parâmetros
DB::select('SELECT * FROM contacts WHERE validated = ?', [true])
// seleção com o uso do construtor fluente
DB::table('users')->get()
// junções e outras chamadas complexas
DB::table('users')->join('contacts', function ($join) {
	$join->on('users.id', '=', 'contacts.user_id')
		->where('contacts.type', 'donor')
})->get()


	vinculação de parâmetros e vinculação nomeada
	
DB::select(
	'SELECT * FROM users WHERE type = ?',
	[$type]
)
// você também pode
DB::select(
	'SELECT * FROM users WHERE type = :type',
	['type' => $type]
)
// inserção
DB::insert(
	'INSERT INTO contacts (name, email) VALUES (?, ?)',
	['sally', 'sally@me.com']
)
// atualização
DB::update(
	'UPDATE contacts SET status = ? WHERE id = ?'
	['donor', $id]
)
// exclusões
DB::delete(
	'DELETE FROM contacts WHERE archived = ?',
	[true]
)


___	Criando encadeamentos com o construtor de consultas


DB::table('users')
	->where('type', $type) //= where('type', '=', $type)
	->get()
	
	
	Métodos de restrição

	
 select()
// colunas que faram parte da seleção
DB::table('contacts')
	->select('email', 'email2 AS second_email')
	->get()
// ou
DB::table('contacts')
	->select('email')
	->addSelect('email2 AS second_email')
	->get()
 
 where()
// restrição de consulta WHERE SQL
DB::table('contacts')
	->where('created_at', '>', Carbon::now()->subDay())
	->get()
	
DB::table('contacts')
	->where('created_at', '>', Carbon::now())
	->where('vip', true)
	->get()
// ou
DB::table('contacts')->where([
	['vip', true],
	['created_at', '>', Carbon::now()]
])

 orWhere()
// instruções OR WHERE
DB::table('contacts')
	->where('vip', true)
	->orWhere('created_at', '>', Carbon::now())
	->get()

DB::table('contacts')
	->where('vip', true)
	->orWhere(function ($query) {
		$query->where('created_at', '>', Carbon::now)
			->where('trial', false)
	})->get()

 whereBetween() | whereNotBetween()
// consulta BETWEEN; entre 2 valore incluindo-os
DB::table('drinks')
	->whereBetween('column', [6, 12])
	->get()

 whereIn()
// apenas os valores que coincidem com o array
DB::table('contacts')
	->whereIn('state', ['FL', 'GA', 'AL'])->get()

 whereNull() | whereNotNull()
// colunas NULL

 whereRaw()
// consulta bruta não escapada (warnning Inject of SQL!)
DB::table('contacts')->whereRaw('id = 12345')->get()

 wherExists()
// consulta WHERE EXISTS
DB::table('users')
	->whereExists(function ($query) {
		$query->select('id')
			->from('commets')
			->whereRaw('commets.user_id = users.id')
	})->get()

 distinct()
// seleciona apenas linhas distintas
DB::table('contacts')->select('last_name')->distinct()->get()


	Métodos de modificação
	
	
 orderBy()
// ordena os resultados; ASC (default) or DESC 
DB::table('contacts')->orderBY('last_name', 'asc')

 groupBy() | having() | havingRaw()
// agrupa resultados
DB::table('contacts')
	->groupBy('city')
	->havingRaw('COUNT(*) > 30')->get()
	
 skip() | take()
// Usado com frequência em paginação, permitem definir qts 
// linhas serão retornadas e qtas serão saltadas
DB::table('contacts')->skip(30)->take(10)->get()

 latest(column) | oldests(column)
// classificam pela coluna passada (ou por created_at se nenhuma
// for passada) crescente latest() decrescente oldest()

 inRandomOrder()
// classifica o resultado aleatório


	Métodos de encerramento/retorno
	

// interrompem a cadeia de consultas e acionam a 
// execução do SQL

 get()
// obtém todos os resultados
DB::table('contacts')->get()

 first() | firstOrFail()
// obtém apenas o 1° resultado; LIMIT 1
// first() 		: falha silênciosamente
// firstOrFail(): lança uma exceção
// OBS.: se passar array retorna apenas as colunas do mesmo
DB::table('contacts')->first()

 find(id) | findOrFail(id)
// como first() mas pe pasado um ID
// find()		: falha silênciosamente
// findOrFail() : lança uma exceção
DB::table('contacts')->findOrFail(5)

 value()
// obtém o valor de um único campo da primeira linha.
// Como first(), mas só quisermos uma única coluna
DB::table('contacts')->orderBY('created_at')->value('email')

 count()
// retorna uma contagem tipo int de todas as linhas encontradas
DB::table('contacts')->where('vip', true)->count()

 min() | max()
// mínimo e máximo de uma coluna
DB::table('orders')->max('amount')

sum() | avg()
// soma ou média
DB::table('orders')->sum('amount')


	Criando consultas brutas dentro de métodos do construtor
	de consultas com DB::raw


 DB::raw
// personaliza a saida
DB::table('contacts')
	->select( DB::raw('*, (score * 100) AS integer_score') )
	->get()

	
	Junções

	
 join() | leftJoin()
// cria junçoes 	
DB::table('users')
	->join('contacts', 'users.id', '=', 'contacts.user_id')
	->select('users.*', 'contacts.name', 'contacts.status')
	->get()

// para junções mais complexa use clouser
DB::table('users')
	->join('contacts', function ($join) {
		$join->on('users.id', '=', 'contacts.user_id')
			->orOn('users.id', '=', 'contacts.proxy_user_ud')
	})->get()
	
	
	Uniões
	
	
 union() | unionAll()
// unir duas ou mais consultas
$first = DB::table('contacts')->whereNull('first_name')

DB::table('contacts')
	->whereNull('last_name')
	->union($first)
	->get()
	

	Inserção
	

 insert() | insertGetId()
// basta passar um array ou um composto para inserir
$id = DB::table('contacts')->insertGetId([
	'name'  => 'Abe Thomas',
	'email' => 'athomas@gmail.com'
])
DB::table('contacts')->insert([
	['name' => 'Tamika Johnson', 'email' => 'tamika@me.com'],
	['name' => 'Jim Patterson', 'email' => 'jim@me.com'],
])


	Atualizações
	
	
 update()
// são simples como consultas normais
DB::table('contacts')
	->where('points' , '>', 100)
	->update(['status' => 'vip'])

// também pode incrementar e decrementar
DB::table('contacts')->increment('tokens', 5)
DB::table('contacts')->decrement('tokens')	


	Exclusões
	
	
 delete()
// são ainda mais simples
DB::table('contacts')
	->where('points' , '>', 100)
	->delete()
	
// também é possível truncar a tabela, além de excluir todas
// as linhas, redefine o ID autoincrement
DB::table('contacts')->truncate()


	Operações JSON

// Novidade do Laravel 5.3
// Quando tiver colunas JSON, poderá atualizar ou selecionar
// as linhas de acordo com os aspectos da estrutura JSON

// Seleciona todos os registros em que a propriedade "isAdmin"
// da coluna JSON "options" está configurada com true
DB::table('users')->where('options->isAdmin', true)->get()

// Atualiza todos os registros, configurando a prop "verified"
// da coluna JSON "options" com true
DB::table('users')->update(['options->verified' => true])


	Transações


DB::transaction(function () use ($userId, $numVotes) {
	// consulta que pode falhar
	DB::table('users')
|		->where('id', $userId)
|		->update(['votes' => $numVotes]);

	// armazena em cache a consulta que não queremos executar
	// se a consulta anterior falhar
	DB::table('votes')
|		->where('user_id', $userId)
|		->delete()
})

// É possível começar e terminar transações manualmente
DB::beginTransaction()
DB::commit()
DB::rollback()



___	Introdução ao Eloquent



// como convenção você tendo um modelo Contato
// ele assume a resposabilidade sobre a tabela
// contatos no plural
php artisan make:model Contato

// modelo mais simples do Eloquent
use Illuminate\Database\Eloquent\Model;
class Contact extends Model {}

// operações realizáveis com o modelo
public function show ($id) {
	// Retorna uma representação JSON de um contato baseada
	// em u segmento de URL; se o contato não existir,
	// lança uma exceção
	return Contato::findOrFail($id)
}

	Nome de tabela
	
// O Laravel passa o nome da classe para "snake case" e pluraliza
// logo "SecondaryContact" acessaria uma tabela "secondary_contacts"
// para personalizar o nome da tabela
protected $table = 'contacts_secondary'

	Chave Primária
	
// Por padrão o Laravel assume uma chave primaria int
// ID autoincrement
// para mudar o nome
protected $primaryKey = "contact_id"
// para sem autoincrement
protected $incrementing = false;

	Timestamp
	
// O Eloquent presume que todas as tabelas terão as
// colunas "created_at" e "updated_at"
// para evitar
public $timestamps = false;


	Recuperando dados com Eloquent

// tudo que pode ser feito no facade DB também poder no Eloquent
// get() e all() são iguais porem ao realizar uma filtragem where()
// apenas o get() funcionará; recomeda-se usar get() para tudo


// acessando tudo
Contact::all()
// Filtrando um pouco
Contact::where('vip', true)->get()
// encadeando restrições
Contact::orderBY('created_at', 'desc')
	->take(10)
	->get()
	

	dividindo respotas com chunck()

// Para uma grande quantidade de registros ao mesmo tempo,
// para evitar bloqueio ou problemas de memória. Ele divide
// as solicitações em partes menores
Contact::chunck(100, function ($contacts) {
	foreach ($contacts as $contact) {
		// Faz algo com $contact
	}
})

	Agregações
	
Contact::where('vip')->count()
Contact::sum('votes')

	Inserções e atualizações

// Inserção de um registro do Eloquent
$contact = new Contact
$contact->name  = 'Ken da Barbie'
$contact->email = 'ken@barbie.com'
$contact->save()
// ou
$contact = new Contact([
	'name'  => 'Ken',
	'email' => 'ken@barbie.com'
]) 
$contact->save()

// Inserção com static create() | update()
// não é necessário savar; já salva instantâneamente
// antes terá de ser aprovado por "atribuição em massa"
Contact::create([
	'name'  => 'Ken',
	'email' => 'ken@barbie.com'
])

	atualizações

// atualiza por meio do salvamento da instância
$contact = Contact::findOrFail(1)
$contact->email = 'theles@me.com'
$contact->save()

// atualização com array
Contact::where('create_at', '>', '2018-09-10')
	->update(['logevity' => 'ancient'])
// ou
$contact = Contact::find(1)
$contact->update(['logevity' => 'ancient'])


	Atribuição em Massa
	
// Atualização com o uso de todas as entradas
// -- ContactController
public function update (Contact $contact, Request $request) {
	$contact->update( $request->all() )
}
// Usando as propriedades de proteção
Class Contact {
	protected $fillable = ['name', 'email']
	// ou
	protected $guarded = ['id', 'created_at', 'owner_id']
}
// Pode também realizar a proteção evitando de usar $request->all()
// e pansando a usar $request->only('name', 'email')


	firstOrCreate() | firstOrNew()
	
// buscam uma instancia com uma propriedade se não existir
// criam
// assinatura são iguais
// @param 1 : array com valor a ser buscado
// @param 2 : (opc) adiciona na criação se não encotrar
// firstOrCreate(busca array, [dados_add] array)
$contact = Contact::firstOrCreate(['email' => 'luis.ramos@gm.com'])
// firstOrCreate() : persiste no banco
// firstOrNew()	   : só cria sem salvar


	Excluindo com Eloquent
	

// A exclusão no Eloquent é muito semelhante à atualização
// mas com soft deletes você pode arquivar os itens excluídos
// para inspeção posterior ou até mesmo recuperação
$contact = Contact::find(5)
$contact->delete()
// Diretamente por IDs
Contact::destroy(1)
// ou
Contact::destroy([1, 5, 7])
// por consulta
Contact::where('updated_at', '>', '2020-03-15')->delete()


	Soft Deletes

// deve ser criado uma column "deleted_at" na tabele do modelo
// para permitir a soft delete adicione a "trait SoftDeletes"
// ao modelo
use Illuminate\Database\Eloquent\Model
use Illuminate\Database\Eloquent\SoftDeletes
class Contact extends Model {
	use SoftDeletes; // usa trait
	// marca essa coluna como uma data
	protected $dates = ['deleted_at'];
}
// após definir a soft delete qlqr exclusão delete(), destroy()
// marcará a column deteled_at com uma data

// Consultando soft deletes
//
// adicionar a uma consulta itens excluídos
Contact::withTrashed()->get()
// ver se uma instância foi excluido
if ($contact->trashed()){...}
// somente itens excluídos
Contact::onlyTrashed()->get()
// restaurar exclusoes
$contact->restore()
// ou
Contact::onlyTrashed()->where('vip', true)->restore()
// forçar exclusões
$contact->forceDelete()
// ou
Contact::onlyTrashed()->forceDelete()


	Escopos
	
	
	Escopo Locais

// Pode se tornar tedioso escrever
$activeVips = Contact::where('vip', true)
|				->where('trial', false)
|				->get()

// poderia ser assim
$activeVips = Contact::activeVips()->get()

// defiva o escopo no modelo
class Contact {
	public function scopeActiveVips ($query) {
		return $query->where('vip', true)->where('trial', false)
	}
}
// passando parâmetros
public function scopeStatus ($query, $status) {
	return $query->where('status', $status)
}
// em uso
$friends = Contato::status('friend')->get()


	Escopo Global

// Define uma regra de consulta para todas as consultas
// deste modelo

// adicionando um escopo global usando um closure
class Contact {
	protected static function boot () {
		parent::boot()
		static::addGlobalScope('active', function (Builder $builder) {
			$builder->where('active', true)
		})
	}
}
// Com isso, em todas as consultas que realizar nesse modelo será
// apenas para itens ativos

// adicionando escopo global usando classe
namespace App\Scope
use Illuminate\Database\Eloquent\Scope 
use Illuminate\Database\Eloquent\Model 
use Illuminate\Database\Eloquent\Builder
class ActiveScope implements Scope {
	public function apply (Builder $builder, Model $model) {
		return $builder->where('active', true)
	}
}
// aplicando ao modelo
class Contact {
	protected static function boot () {
		parent::boot()
		static::addGlobalScope(new ActiveScope)
	}
}

// removendo escopos globais closure em apenas uma consulta
$allContacts = Contact::withoutGlobalScope('active')->get()
// baseado em classe
Contact::withoutGlobalScope(ActiveScope::class)->get()
// mais de um escope
Contact::withoutGlobalScopes([ActiveScope::class, VipScope::class])->get()
// todos os escopos
Contact::withoutGlobalScopes()->get()


	Acessadores
	
// get{NomePropridadeComPascalCase}Attribute
// getFirstNameAttribute : first_name
class Contact {
	public function getNameAttribute ($value) {
		return $value ?: '(No name provided)'
	}
}
// Uso
$contact->name

// você pode difinir acesadores para atributos que 
// nunca existiram no banco de dados
public function getFullNameAttribute () {
	return $this->first_name .' '. $this->last_name
}
// Uso
$contact->full_name


	Modificadores
	
// set{NomePropridadeComPascalCase}Attribute
// setFirstNameAttribute : first_name
public function setAmountAttribute ($value) {
	$this->attributes['amount'] = $value > 0 ? $value : 0
}
// Uso
$contact->amount = 15

// modificadores attr não existente
public function setWorkgroupNameAttribute ($workgroupName) {
	$this->attributes['email'] = "{$workgroupName}@gmail.com"
}


	Casting de atributos
	

// converte os dados em um tipo especifico

// int|integer			(int)
// real|float|double 	(float)
// string				(string)
// bool|boolean			(bool)
// object				analisa de/para JSON, com um obj StdClass
// array				analisa de/para JSON, como um array
// collection			analisa de/para JSON, como um conjunto
// date|datetime		analisa do tipo de banco de dados DATETIME p Carbon, e de volta
// timestamp			analisa do tipo de banco de dados TIMESTAMP p Carbon, e de volta

// Usando o Casting de atributos em um modelo Eloquent
class Contact {
	protected $casts = [
		'vip'				=> 'boolean',
		'children_names' 	=> 'array',
		'birthday'			=> 'date'
	]
}


	Coleções do Eloquent
	
	
Illuminate\Support\Collection
	
// trazer as coleções para projetos não LARAVEL
// Tightenco/Collect https://github.com/tightenco/collect

// criando uma coleção; pode ser um array vazio
$collection = collect([1, 2, 3])
// digamos q quiséssemos deixar de fora os números pares
$odds = $collection->reject(function ($item) {
	return $item % 2 === 0
})
//> [1, 3]
// multiplicando cada por 10
$collection->map(function ($item) {
	return $item * 10
})
//> [10, 20, 30]

// podemos encadear 
$sum = $collection
	->filter(function ($item) {
		return $item % 2 === 0
	})
	->map(function ($item) {
		return $item * 10
	})
	->sum()
	
// Há mais de 60 métodos diponíveis na class Collection
// max() | whereIn() | flatten() | flip()
// pode ser iterada e acessada $collection[1]


	Coleções do Eloquent
	

// um metodo especial so do Eloquent
modelKeys() // retorna as chaves primarias das instancias da coleção

// Classes Collection Personalizadas para Modelos do Eloquent
class OrderCollection extends Collection {
	public function sumBillableAmount () {
		return $this->reduce(function ($carry, $order) {
			return $carry + ($order->billable ? $order->amount : 0)
		}, 0)
	}
}
class Order extends Model {
	public function newCollection (array $models = []) {
		return new OrderCollection($models)
	}
}
// uso
$orders = Order::all()
$billableAmount = $orders->sumBillableAmount()


	Serialização no Eloquent
	

// tanto Coleções qnt Eloquent possuem os métodos
toArray() | toJson()

Contact::first()->toArray()
Contact::first()->toJson()

(string) Contact::first() // serializa em json

	
	retornando modelos diretamente a partir de métodos de rota
	
	
// O roteador do Laravel acaba convertendo tudo que as rotas retornam
// em uma string

// Retonando JSON diretamente a partir de rotas
Route::get('api/contacts', function () {
	return Contact::all()
})

// Ocultando atributos de casting para JSON
// você pode bloquear attr, ocultando os que listar
coas Contact extends Model {
	public $hidden = ['password', 'remember_token']
}
// ou permitir a visualização; exibindo apenas os que listar
class Contact extends Model {
	public $visible = ['name', 'email', 'status']
}
// Isso tbm funcionar p relacionamentos
class User extends Model {
	public $hidden = ['contacts']
	public function contacts () {
		return $this->hasMany(Contact::class)
	}
}

// Podem ocorrer situações em que você queira tornar um
// atributo visível
$user->makeVisible('remember_token')->toArray()

// adicionando uma coluna gerada a uma saída de array e JSON
class Contact extends Model {
	protected $appends = ['full_name']
	public function getFullNameAttribute () {
		return "{$this->first_name} {$this->last_name}"
	}
}


	Relacionamentos do Eloquent
	
	
	Um para um
	
// Um Contact tem um PhoneNumber
class Contact {
	public function phoneNumber () {
		return $this->hasOne(PhoneNumber::class)
	}
}

// O Eloquent espera que a tablea que dá suporte à classe
// PhoneNumber (provavelmente phone_numbers) tenha uma coluna
// contact_id. Se você desse um nome diferente (por exemplo, owner_id)
// teria de alterar a definição
$this->hasOne(PhoneNumber::class, 'owner_id')
// Acessando o número de telefone
$contact = Contact::find(1)
$contact->phoneNumber	// como se fosse uma propriendade
// ou
$contact->phone_number  // retorna uma instância completa

// Definindo o inverso do relacionamento um para um
class PhoneNumber {
	public function contact () {
		return $this->belongsTo(Contact::class)
	}
}
// acessando o mesmo
$phoneNumber->contact

// Inserindo Itens Relacionados
save() | saveMany() | create()

$contact = Contact::find(1)
$phoneNumber = new PhoneNumber
$phoneNumber->number = '+5511324213'
$contact->phoneNumbers()->save($phoneNumber)
// ou
$contact->phoneNumbers()->saveMany([
	PhoneNumber::find(1),
	PhoneNumber::find(2)
])
// ou
$contact->phoneNumbers()->create([
	'number' => '+5511324213'
])


	Um para Muitos
	
// Definindo um relacionamento um para muitos
class User {
	public function contacts () {
		return $this->hasMany(Contact::class)
	}
}
// mais uma vez é esperado que Contact (provavelmente contacts)
// tenha uma coluna user_id
// obtendo o contato
$user->contacts
// nesse caso retorna uma coleção
$user->contacts->filter(function ($contact) {
	return $contact->status == 'donor'
})

// Definindo o inverso
class Contact {
	public function user () {
		return $this->belongsTo(User::class)
	}
}
// acessando
$contact->user->name

// Anexando e desanexando itens relacionados a partir do item anexado
$user->contacts()->save($contact)

$contact = Contact::first()
$contact->user()->associate(User::first())
$contact->save()
// e posterior
$contact->user()->dissociate()
$contact->save()

// Usando relacionamentos como construtor de consultas
$donor = $user->contacts()->where('status', 'donor')->get()

// Selecionando registros que tenham ao menos um item relacionado
$postsWithComments = Post::has('comments')->get()
// Ajustando ainda mais o critério
$postsWithManyComments = Post::has('comments', '>=', 5)->get()
// Aninhado critérios
$usersWithPhoneBooks = User::has('contacts.phoneNumbers')->get()
// consultas personalizadas nos itens relacionados
// Obtém todos os contatos com número de telefone contendo a 
// string "967-5309"
$hennyIGotYourNumber = Contact::whereHas('phoneNumbers', function ($query) {
	$query->where('number', 'like', '%867-5309%')
})


	Relacionamento has many through
	

// É um método conveniente para a obtenão de relacionametos de outros
// relacionamentos. User tem muitos Contacts e cada Contact tem muitos
// PhomeNumbers

// Essa estrutura assume que a tabela contacts tem uma user_id, e a tabela
// phone_numbers tem uma contact_id

// Definindo um relacionamento "has many through"
class User {
	public function phoneNumbers () {
		return $this->hasManyThrough(PhoneNumber::class, Contact::class, 
		'owner_id',		// opcional  
		'id_contato')	// opcional
	}
}
// acessando
$user->phone_numbers
// é possível personalizar a chave do modelo intermediário (com o 3° param
// e 4° param do relacionamento do modelo distânte) 



	Muitos para muitos

	
// Definindo um relacionamento muitos para muitos
class User {
	public function contacts () {
		return $this->belongsToMany(Contact::class)
	}
}
// Definindo o Inverso
class Contact {
	public function users () {
		return $this->belongsToMany(User::class)
	}
}
// Nesse caso é necessário haver uma tabela dinâmica,
// que o Laravel estabelece como a união do nome das
// 2 tabelas em ordem alfabética "contacts_users"
// para redefinir passe com 2° param 
// essa tabela precisa de duas columns "contact_id" e "user_id"

// acessando os itens relacionados
$user->contacts->each(function ($contact) {
	// faz algo
})
// e o contrário
$contact->users->each(function ($user) {
	// faz algo
})

$donors = $user->contacts()->where('status', 'donor')->get()


// Aspectos exclusivos da anexação e desanexação
// como a tabela dinâmica pode ter suas próprias propriedades
// você tbm pode definí-las ao anexar um item
$user = User::first()
$contact = Contact::first()
$user->contacts()->save($contact, ['status' => 'donor'])

// attach() e dettach() são como save() e saveMany()
// mais passando apenas o ID
$user = User::first()
$user->contacts()->attach(1)
$user->contacts()->attach(2, ['status' => 'donor'])
$user->contacts()->attach([1, 2, 3])
$user->contacts()->attach([
	1 => ['status' => 'donor'], 
	2, 
	3
])
$user->contacts()->detach(1)
$user->contacts()->detach([1, 2])
$user->contacts()->detach() // desanexa todos

// fazer alteração apenas no registro dinâmico
$user->contacts()->updateExistingPivot($contactID, [
	'status' => 'inactive'
])

// E se quiser substituir os relacionamentos atuas, por novos
// (desanexar e anexar)
$user->contacts()->sync([1, 2, 3])
$user->contacts()->sync([
	1 => ['status' => 'donor'],
	2,
	3
])

// Adicionando campos a um registro dinâmico
public function contacts () {
	return $this->belongsToMany(Contact::class)
		->withTimestamps()	// created_at e updated_at
		->withPivot('status', 'preferred_greeting')
}

// quando você obtiver uma instância e um modelo por meio
// de um relacionamento, ela terá uma propriendade "pivot"
// que representará seu local na tabela dinâmica
$user->contacts->each(function ($contact) {
	echo sprintf(
		'Contact associated with this user at: %s',
		$contact->pivot->created_at
	)
})


	Relacionamento polimórfico


// tabela starts conterá um campo, id um starrable_id e starrable_type
// para cada Star você definirá de que tipo (como Contact ou Event)
// ele é e que ID desse tipo

// Criando os modelo para um sistema polimórfico de marcação com estrelas
class Star {
	public function starrable () {
		return $this->morphsTo()
	}
}
class Contact {
	public function stars () {
		return $this->morphMany(Star::class, 'starrable')
	}
}
class Event {
	public function stars () {
		return $this->morphMany(Star::class, 'starrable')
	}
}
// Estendendo um sistema polimórfico para diferenciar por usuário
class Star {
	public function starrable() {...}
	public function user () {
		return $this->belongsTo(User::class)
	}
}
class User {
	public function stars () {
		return $this->hasMany(Star::class)
	}
}
// ao criar uma star você pode passar o user
$event->stars()->create(['user_id' => $user->id])

// como criar estrelas
$contact->stars()->create()
//agora o contato está marcado com uma estrela

// recuperando as instâncias
$contact->starts->each(function ($star) {
	// faz algo
})

// recuperando o alvo de uma instância polimórfica
$star = Star::all()
$star->each(function ($star) {
	$star->starrabla // instância de Contact ou Event
})


	Relacionamento polimórfico muitos para muitos

// Consular no livro ou documentaçao....


	Registros-filho atualizando timestamps de registros-pai


// O Eloquent presume por padrão que as columns created_at e updated_at
// estão definidas em suas tabelas dos modelos

// atualizando um registro-pai sempre que o registro-filho for atualizado
class PhoneNumber {
	protected $touches = ['contact']
	public function contacts () {
		return $this->belongsTo(Contact::class)
	}
}

	Eager Loading

// Por padrão, o Eloquent carrega relacionamentos usando "lazy loading".
// Ou seja, qnd vc carrega pela primeira vez a instância de um modelo,
// os modelos relacionados não serão carregados com ela.
// Usando "eager loading"; deve passar o nome do metodo de relacionamento
// O eager loading realiza uma consulta inteligente
$contacts = Contact::with('phoneNumber')->get()

// múltiplos relacionamentos
$contacts = Contact::with('phoneNumber', 'addresses')->get()

// pode aninhar eager loading para carregar por essa técnica relacionamentos
// de relacionamentos
$authors = Author::with('posts.comments')->get()

// se não quiser todos os itens relacionados
$contacts = Contacts::with(['addresses' => function ($query) {
	$query->where('mailable', true)
}])->get()

// Lazy eager loading
$contact = Contact::all()
if ($showPhoneNumber) {
	$contact->load('phoneNumbers')
}

// Fazendo o eager loading somente da contagem
$author = Author::withCount('posts')->get()
// adiciona um int "posts_count" acada Author com uma contagem
// do número de posts relacionados desse autor

	
	Eventos do Eloquent

	
// Os modelos do Eloquent acionam eventos a esmo no app sempre
// que certas ações ocorrem, não importa se estamos escutando.
// Se estiver familiarizado com o padrão pub/sub

// consultar book e documentação....sobre funcionamento de eventos

// Vinculando um ouvinte a um evento do Eloquent
class AppServiceProvider extends ServiceProvider {
	public function boot () {
		$terceiro = new AlgumTerceiro;
		Contact::creating(function ($contact) use ($terceiro) {
			try 
			{
				$terceiro->add($contact)
			} 
			catch (Exception $e) 
			{
				Log::error('Failed adding contact to AlgumTerceiro; calcelled')
				return false
			}
		})
	}
}



	AUTENTICAÇÃO E AUTORIZAÇÃO DE USUÁRIOS
	
	
...

	Auth::routes()
	
// routes/web.php
Auth::routes()
// traz um grupo de rotas pré-definido

// Rotas de autenticação
$this->get('login', 'Auth\LoginController@showLoginForm') 
$this->post('login', 'Auth\LoginController@login')
$this->post('logout', 'Auth\LoginController@logout')
// Rotas de registro
$this->get('register', 'Auth\RegisterController@showRegistrationForm')
$this->post('register', 'Auth\RegisterController@register')
// Rotas de redefinição de senha
$this->get('password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm')
$this->post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')
$this->get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')
$this->post('password/reset', 'Auth\ResetPasswordController@reset')


	O scaffold de autenticação

// Fornece um esqueleto de código ainda maior para
// que o sistema de autenticação posso ser colocado em execução
// rapidamente

// realiza a inclusão de Auth::routes() nos arquivos de rotas
// adiciona uma view para cada rota e cria um HomeController
// para servir como página de destino a quem fizer login
php artisan make:auth
// os seguintes arqs serão criados
app/Http/Controllers/HomeController.php
resources/views/auth/login.blade.php
resources/views/auth/register.blade.php
resources/views/auth/passwords/email.blade.php
resources/views/auth/passwords/reset.blade.php
resources/views/layouts/app.blade.php
resources/views/home.blade.php
// command default
laravel new MyApp
cd MyApp
php artisan make:auth
php artisan migrate


	Lembre-se de mim
	
// O scaffold já vem com esse recurso implementado
// para isso você deve ter uma column "remember_token"
// em sua tabela "users"

// Tentando autenticar um usuário
if (auth()->attempt([
		'email' => request()->input('email'),
		'password' => request()->input('password')
	]))
{
	// manipula login bem-sucedido
}

// Tentando autenticar com um checkbox "lembre-se de mim"
if (auth()->attempt(
			[
				'email' => request()->input('email'),
				'password' => request()->input('password')
			], 
			request()->input('remember')
		)
	)
{
	// manipula login bem-sucedido
}
// Depois para verificar se o usuário fez autenticar por token
// "lembre-se de min"
auth()->viaRemember()


	Alternando usuarios

// Caso seja um administrador logado pode saltar para
// outros usuários
auth()->loginUsingId(5)
// ou
auth()->login()


	Middlewares de autenticação
	

// middlwares de rotas são candidatos perfeitos
// para restringir acesso a usuarios
//
// 3 middlewares padrão estão relacionados com autenticação
auth		// acesso à apenas logados
auth.basic	// acesso à autenticação basica
guest		// acesso à apenas a não logados

Route::group(['middleware' => 'auth'], function () {
	Route::get('dashboard', function () {
		// faz algo
	})
})
Route::get('login', 'Auth\LoginController@login')->middleware('guest')



	Guards
	
// Todos os aspectos do sistema de autenticação do Laravel são roteados
// por meio do guard. Cada guard é uma combinação de dois elementos: um
// driver que define como ele persiste e recupera o estado da autenticação
// (por exemplo, na sessão) e um provedor que permite obter um usuário de 
// acordo com certos critérios (que pode ser o provedor de usuários).
// ...consultar...

	
	Eventos De Autenticação
	
// O sistema de eventos do Laravel é um framework pub/sub básico.
// São transmitidos eventos gerados pelo sistema e pelo usuário, 
// e este pode criar ouvintes de eventos que façam certas coisas em
// resposta a determinados eventos, como:
// "tentativa de login"
// "login bem-sucedido"
// "logout"


	Autorização (ACL) e roles

// Permite determinar se um usuário está autorizado a executar uma
// ação específica, usando alguns verbos
can, cannot, allows e denies

if (Gate::denies('edit', $contact)) abort(403)
if (! Gate::check('create', Contact::class)) abort(403)

	
	Definindo regras de autorização
	
// Uma regra de autorização se chama ability
// Exp.: de ability para a atualização de um contato
class AuthServiceProvider extends ServiceProvider {
	public function boot (GateContract $gate) {
		$this->registerPolicies($gate)
		$gate->define('update-contact', function ($user, $contact) {
			return $user->id === $contact->user_id
		})
	}
}


	O facade Gate (e a injeção de Gate)

// Agora que definiu uma ability é hora de testá-la
if (Gate::allows('update-contact', $contact)) {...atualiza}
// ou
if (Gate::denies('update-contact', $contact)) { abort(403) }


	O middleware Authorize

// Se quiser autorizar rotas inteiras
Route::get('people/create', function () {
	// cria pessoa...
})->middleware('can:create-person')
// {people} segmento de rota e passado como param
Route::get('people/{people}/edit', function () {
	// cria pessoa...
})->middleware('can:create,person')


	Autorização de controlador

// Simplificando a autorização de controlador com authorize()
// Disto:
public function show ($contactId) {
	$contact = Contact::findOrFail($contactId)
	if (Gate::cannot('update-contact', $contact)) abort(403)
}
// Para isto:
public function show ($contactId) {
	$contact = Contact::findOrFail($contactID)
	$this->authorize('update-contact', $contact)
}

	Fazendo verificação em uma instância de User
	
// Se vc não estiver em um controlador, é mais provável
// que queira verificar as permissões de um usuário específico
// e não do usuário autenticado. Isso é possível pelo facade Gate
// pelo método forUser(), mas as vezes a sintaxe pode ser confusa
// Authorizable fornece 3 métodos na classe user
$user->can(), $user->cant() idem $user->cannot()

// verificando autorização
$user = User::find(1)
if ($user->can('create-contact')) // faz algo


	Verificações do Blade

?>
<nav>
	<a href="/">home</a>
	@can('edit-contact', $contact)
		<a href="{{ route('contacts.edit', [$contact->id]) }}">Edit</a>
	@endcan
</nav>
<?

	Interceptando verificações
	
// Permite adicionar uma classe de superusuário que sobrepõe
// as verificações base
// ...consultar....


	Politica

// ...consultar...



(*) 10 SOLICITAÇÕES E RESPOSTAS
__


	Provedores de serviços
	
// Um provedor de serviço é uma classe que encapsula a lógica
// que várias partes do aplicativo precisarão executar para iniciar
// sua funcionalidade básica
// ..consultar...
class GitHubServiceProvider extends ServiceProvider {
	protected $defer = true;
	public function provides () {
		return [
			GitHubClient::class
		]
	}
}


	Objeto Resquest
	

// capturar seu obj Illuminate Request direto de globais PHP
$req = Illuminate\Http\Request::capture() 


	Obtendo um obj Request

// typehinting
class PeopleController extends Controller {
	public function index (Illuminate\Http\Request $req) {
		// faz algo
	}
}
// pelo helper
request()
request()->all()
// pelo método global
$req = app(Illumiate\Http\Request::class)
// ou
$req = app('request')


	Obtendo informações sobre uma solicitação
	
	
	entrada básica
	
// retorna todas as entradas fornecidas
$req->all()
// uma única entrada
$req->input('email')
// apenas as informadas
$req->only(['email', 'nome', 'telefone'])
// se a entrada existe
$req->exists('email')
// se e existe && não é vazia
$req->has('email')
// retorna um parameterBag
$req->json()
// uma única prop do JSON
$req->json('email')


	estado do usuário e da solicitação
	
// retorna a ação usada
$req->method()
// retorna caminho (sem dominio)
// www.myapp.com/abc/def -> "abc/def"
$req->path()
// url com domínio
$req->url()
// boolean indicando se a url atual coincide
// ou não com a string (exp.: a/b/c encontraria)
$req->is('*b*')
// IP do usuário
$req->ip()
// todos as cabeçalhos ou apenas um
$req->header()
// todos os dados $_SERVER ou apenas um
$req->server()
// boolean true se https
$req->secure()
// boolean se tiver JSON em cabeçalho Content-Type
$req->isJson()
// boolean se aceita um tipo especifico de conteúdo 
$req->accepts()


	arquivos

// as instancias trazidas por file
// são Symfony\Component\HtpFoundation\File\UploadedFile

// todos os arqs ou apenas um
$req->file()
// boolean se um arq foi submetido
$req->hasFile()


	persistência

// transmite a entrada do usuario para sessão
// a ser recuperda posteriormente
$req->flash()
// idem a 1° porém a uma chave do array fornecido
$req->flashOnly()
// idem a 1° porém e exceto a chave fornecida
$req->flashExcept()
// todas as entradas anteriormente ou apenas uma (salvas com flash*())
$req->old()
// remove todas as entradas anteriores
$req->flush()
// todos os cookies ou apenas um
$req->cookie()
// se tem um cookie
$req->hasCookie()


	Objeto Response
	
// uso básico sempre converte em HTTP
Route::get('/', function () {
	return new Illumiate\Http\Response('Hello!')
})
// ou
Route::get('/', function () {
	return response('Hello!')
})

// HTTP com status | cabeçalho | cookie
Route::get('/', function () {
	return response('Error!', 400)
		->header('X-Header-Name', 'valor')
		->cookie('nome', 'valor')
})


	Tipos de Resposta
	
	views

// Usando tipo de resposta view()
Route::get('/', function (XmlGetterService $xml) {
	$data = $xml->get();
	return response()
		->view('xml-structure', $data)
		->header('Content-Type', 'text/xml')
})

	download
	
// Usando tipo de resposta download()
return response()
	->download('file.csv', 'export.csv', ['cabecalho' => 'valor'])
// ou
return respose()->download('file.csv')

	arquivos

// idem a download mais força apenas 
// a abertura do arq no navegador
return response()
	->file("./invoices/{$id}.pdf", ['cabecalho' => 'valor'])

	JSON

// passa os dados para json_encode() e configura
// Content-Type com application/json
return response()->json(Contact::all())
return response()->json(['tom', 'jerry'])


	Respostas com Redirecionamento

// Casos de uso do helper global redirect()
return redirect('account/payment')
return redirect()->to('account/payment') // idem à cima
return redirect()->route('account.payment')
return redirect()->action('AccountController@showPayment')
return redirect()->route('contact.edit', ['id' => 13])
return redirect()->action('ContactController@edit', ['id' => 13])
// redirecionamento de volta com entrada
return back()->withInput()
// redirecionamento com dados
return redirect()->with('message', 'Contact Created!')
// para obter os dados; isso é geramente na blade
session('message')

	macros de resposta personalizadas
	
class AppServiceProvider {
	public function boot () {
		Response::macro('myJson', function ($content) {
			return response(json_encode($content))
				->header(['Content-Type' => 'application/json'])
		})
	}
}
// Em uso
return response()->myJson(['name' => 'Sangeetha'])



	Laravel Middleware


// criando um middleware
php artisan make:middleware BanDeleteMthod
// -- esqueleto em: app/Http/Middleware/BanDeleteMthod.php
class BanDeleteMethod {
	public function handle ($request, Closure $next) {
		return $next($request)
	}
}

	Entendendo do middleware
	
class BanDeleteMethod {
	public function handle ($request, Closure $next) {
		// Neste ponto, $request é a solicitação bruta do usuário
		// Faremos algo com ela, por diversão
		if ($request->ip() === '192.168.1.1') {
			return response('BANNED IP ADDRESS!', 403)
		}
		// Agora decidimos aceitá-la. Ela será passada para o 
		// próximo middleware da pilha. Vamos passá-la para
		// $next(), e o retorno será a resposta após $request ter
		// sido passada para baixo na pilha de middlewares, chegar
		// ao aplicativo e a resposta do aplicativo ter sido passada para
		// cima na pilha
		$response = $next($request)
		// Neste ponto, podemos interagir novamente com a resposta
		// imediatamente antes de ela ser retornada para o usuário
		$response->cookie('visited-our-site', true)
		// Por fim, podemos liberar essa resposta para o usuário
		return $response
	}
}

// Middleware banindo o método DELTE
public function handle ($request, Closure $next) {
	// Teste para o método DELETE
	if ($request->method() == 'DELETE')
		return response('Get out of here with that delete method', 405)
	$response = $next($request)
	// Atribui cookie
	$response->cookie('visited-our-site', true)
	return $response
}

	vinculando middlewares
	
	vinculo globalmente

// -- app/Http/Kernel.php
protected $middleware = [
	\Illumante\Foundation\Http\Middleware\CheckForMaintenanceMode::class,
	\App\Http\Middleware\BanDeleteMethod::class
]

	vinculo em rota
	
// -- app/Http/Kernel.php	
protected $routeMeddleware = [
	'auth' => \App\Http\Middleware\Authenticate::class,
	...
	'nodelete' => \App\Http\Middleware\BanDeleteMethod::class
]

// Em uso 
Route::get('contacts', [
	'middleware' => 'nodelete',
	'uses' => 'ContactController@index'
])
// ou
Route::group(['prefix' => 'api', 'middleware' => 'nodelete'], function () {
	// rotas do grupo
})


	Passando parâmetros para middleware
	
	
// por exemplo temos dois tipos de autenticação
// de usuários "owner" and "member" 
Route::get('company', function () {
	// faz algo
})->middleware('auth:owner')

// para fazer funcionar vc precisa definir os parâmetros
// no middleware
public function handle ($request, $next, $role) {
	if (auth()->check() && auth()->user()->hasRole($role))
		return $next($request)
	return redirect('login')
}
// para passar mais de um método separe-os por vírgula
})->middleware('auth:owner,view')



(*) 11 O CONTÊINER
__


// injeção de dependência básica
public function __construct (Mailer $mailer) {...}


	helper global app()
	
// passar nome totalmente qualificado (FQCN, fully qualified class name)
// retorna uma instância da classe
$logger = app(Logger::class)


	Injetando dependências
	
	como o container faz deduções
	
// O contêiner é capaz de resolver parâmetro
// inplicitos a partir do typehinting e até mesmo
// criar as instâncias necessárias implicitamente
// para que a aplicação continue naturalmente
// Exemplo:
class Bar {
	public function __construct () {}
}
class Baz {
	public function __construct () {}
}
class Foo {
	public function (Bar $bar, Baz $bar) {}
}
// ao executar o app() com a classe Foo
// será gerado as duas instancias por conta do typehinting
$foo = app(Foo::class)


	Vinculação classes ao contêiner


	vinculando a um closure
	
// vinculação básica ao contêiner
// deve ser no método register de um provedor
public function register () {
	$this->app->bind(Logger::class, function ($app) {
		return new Logger('\log\path\here', 'error')
	})
}
// Logo se a classe que está sendo resolvida tiver uma dependência
// que você queira resolver a partir do contêiner, use-a na definição
$this->app->bind(UserMailer::class, function ($app) {
	return new UserMailer(
		$app->make(Mailer::class),
		$app->make(Logger::class),
		$app->make(Slack::class)
	)
})

	vinculando a singletons, aliases e instâncias

// para manter a saída do closure em cache
// para n ser reexecutado sempre que uma instância for solicitada
$this->app->singleton(Logger::class, function () {
	return new Logger('\log\path\here', 'error')
})


	vinculando uma interface
	
// Assim como podemos vincular uma classe à outra ou uma classe a um
// atalho, também podemos fazer a vinculação a uma interface


	vinculação contextual
	
// Podemos ter de alterar a maneira de resolver uma interface
// dependendo do contexto. Poderíamos querer registrar os eventos
// ocorridos em um lugar em um syslog local e eventos ocorridos
// em outros lugares em um serviço externo.


	Injeção por método
	
// chamando o método de uma classe manualmente usando o método call()
// do contêiner
class Foo {
	public function bar ($param1) {}
}
// Chamando
app()->call($foo, 'bar', ['param1' => 'value'])


	Facades e o contêiner
	

// https://laravel.com/docs/5.3/facades
// Os facades são classes que fornecem acesso simples a partes
// básicas de funcionalidade do Laravel. Todos estão disponíveis
// no namespace global \
Log::alert('something has gone wrong!')
// para usar essa mesma chamada sem o facade faríamos
$logger = app('log')
$logger->alert('...')

// Se estivessemos em um namespace teríamos de definir
use Illuminate\Support\Facade\Log

// Como os facades funcionam
namespace Illuminate\Support\Facade\Log
class Log extends facade {
	protected static function getFacadeAccessor () {
		return 'log'
	}
}



(*) 13 CRIANDO APIS
__


// Representational State Transfer (REST) é um estilo de arquitetura
// para a construção de APIs. RESTful ou REST-like
// Estruturas de endpoints comuns em APIs REST
// -- GET /api/cats
[
	{id: 1, name: 'Fluffy'},
	{id: 2, name: 'Killer'}
]

	Organização dos controladores e retornos em JSON
	
// criando um novo controlador para nosso recurso, que 
// rotearemos em /api/dogs
php artisan make:controller Api/\DogsController --resource
// '/\' servem para escapar a criação do namespace
namespace App\Http\Controller\Api
class DogsController {
	public function index(){}
	// public function create(){}
	public function store(){}
	public function show(){}
	// public function edit(){}
	public function update(){}
	public function destroy(){}
}
// remover o create() e edit() são referêntes as views de criação e edição
// as APIs não trabalham com elementos visuais
// O Eloquent ao retornar uma consulta direto em uma rota converte em JSON
class DogsController {
	public function index () {
		return Dog::all()
	}
	public function store (Request $req) {
		Dog::create($req->all())
	}
	public function show ($id) {
		return Dog::findOrFail($id);
	}
	public function update (Request $req, $id) {
		$dog = Dog::findOrFail($id);
		$dog->update($req->all())
	}
	public function destroy ($id) {
		$dog = Dog::findOrFail($id)
		$dog->delete()
	}
}
// Vinculando as rotas para um controladr de recurso
// -- routes.php
Route::group(['prefix' => 'api', 'namespace' => 'Api'], function () {
	Route::resource('dogs', 'DogsController')
})


	Lendo e enviando cabeçalhos
	
	
// Adcionando um cabeçalho de resposta
return response(Dog::all())->header('nome', 'valor')

// Lendo um cabeçalho de solicitação
echo $request->header('Accept')


	Paginação

// Apenas troque get() ou all() por paginate()
Route::get('dogs', function () {
	return Dog::paginate(20)
})

/*
	GET /dogs			results 1-20
	GET /dogs?page=1	results 1-20
	GET /dogs?page=2	results 21-40
*/
// Usando o paginate() em uma chamada do construtor
return DB::table('dogs')->paginate(20)
// saida
{
	'total': 50,
	'per_page': 3,
	'current_page': 1,
	'last_page': 17,
	'next_page_url': 'www.myapp.com/api/dogs?page=2',
	'prev_page_url': null,
	'from': 1,
	'to': 3,
	'data': [{}...]
}


	Classificando e filtrando

/*
	Especificação JSON API
	
	(http://jsonapi.org) é um padrão que define como manipular tarefas
	comuns na construção de APIs baseadas em JSON: filtragem, classificação,
	paginação, autenticação, incorporação, links, metadados e muito mais
*/

// Classificação de API, com controle de direção
// /dogs?sort=name e dogs?sort=-name
Route::get('dogs', function (Request $req) {
	// obtém parâmetro ou fallback
	$sortCol = $req->input('sort', 'name')
	// define a direção
	$sortDir = start_with($sortCol, '-') ? 'DESC' : 'ASC'
	$sortCol = ltrim($sortCol, '-')
	return Dog::orderBy($sortCol, $sortDir)->paginate(20)
})

// Classificação estilo JSON API
// ?sort=name,-weight
Route::get('dogs', function (Request $req) {
	// obtém parâmetro ou fallback
	$sorts = explode(',', $req->input('sort', 'name'))
	// cria query
	$query = Dog::query()
	// adiciona os classificados um a um
	foreach ($sorts as $sort) {
		$sortDir = start_with($sort, '-') ? 'DESC' : 'ASC'
		$sortCol = ltrim($sort, '-')
		
		$query->orderBY($sortCol, $sortDir)
	}
	return $query->paginate(20)
})


	Filtrando os resultaos de sua API
	

// múltiplos filtros para resultados da API
// ?filter=sex:female,color:brown
Route::get('dogs', function (Request $req) {
	$query = Dogs::query()
	
	if ($req->has('filter')) {
		$filters = explode(',', $req->input('filter'))
		foreach ($filters as $filter) {
			list($criteria, $value) = explode(':', $filter)
			$query->where($criteria, $value)
		}
	}
	return $query->paginate(20)
})



	Transformando resultado

	
// Transformador simples
Route::get('users/{id}', function ($id) {
	return (new UserTransformer(User::findOrFail($id)))
})
class UserTransformer {
	protected $user;
	public function __construct ($user) {
		$this->user = $user
	}
	private function toArray () {
		return [
			'id' => $this->user->id,
			'name' => sprintf(
				"%s %s",
				$this->user->first_name,
				$this->user->last_name,
			),
			'friendsCount' => $this->user->friends->count()
		]
	}
	private function toJson () {
		return json_encode($this->toArray())
	}
	public function __toString () {
		return $this->toJson()
	}
}


	Aninhamento e relacionamento
	
// users/5
// users/5/friends
// users/5?embed=friends,dogs
// friends?user=5
class UserTransformer {
	protected $user;
	protected $embeds;
	public function __construct ($user, $embeds = []) {
		$this->user = $user;
		$this->embeds = $embeds;
	}
	public function toArray () {
		$appends = [];
		if (in_array('friends', $this->embeds)) {
			$appends['friends'] = $this->user->friends->map(function ($friend) {
				return (new FriendTransformer($friend))->toArray()
			})
		}
		return array_merge([
			'id' => $this->user->id,
			'name' => sprintf(
				"%s %s",
				$this->user->first_name,
				$this->user->last_name,
			)
		], $appends)
	}
	...
}


	Autenticação de API com o Laravel Passport
	
// consultar...



(*) 14 ARMAZENAMENTO E RECUPERAÇÃO
__


// É possível gerenciar os arquivos locais e na nuvem
// configurando a acesso a arquivos
// -- config/filesystems.php
'disk' => [
	'local' => [
		'dirver' => 'local',
		'root' => storage_path('app')
	],
	'public' => [
		'driver' => 'local',
		'root' => storage_path('app/public'),
		'visibility' => 'public'
	]
	...
]


	Usando o facade Storage
	
// configurando o disco de armazenamento
Storage::disk('s3')->get('file.jpg')


// Existem diversos métodos para manipulação
// recupera arq
get('file.jpg')
// insere conteúdo de arq fornecido
put('file.jpg', $contentsOrStream)
// entre outros
exists()
copy()
...


	Upload e manipulação comum
	
// fluxo de trabalho comum de upload
class DogsController {
	public function updatePicture (Request $req, Dog $dog) {
		Storage::put(
			'dogs/'. $dog->id,
			file_get_contents($req->file('picture')->getRealPath())
		)
	}
}

// Um sistema mais complexo de upload de arq, usando o intervention
class DogsController {
	public function updatePicture (Request $req, Dog $dog) {
		$original = $req->file('picture')
		// redimensionando a imagem para a largura máxima de 150
		$image = Image::make($original)->resize(150, null, function ($constraint) {
			$constraint->aspectRation()
		})->encode('jpg', 75)
		
		Storage::put(
			'dogs/thumbs/'. $dogs->id,
			$image->getEncoded()
		)
	}
}



	Sessões
	

	Acessando a sessão
	
// get
session()->get('key')
session('key')
// put
session()->put('key', 'value')
session(['key' => 'value'])


	Métodos disponíveis nas instâncias da sessão
	
// extrai o valor
// @fallback: string | closure
// retorna null sem fallback
session->get('key', fallback)
// grava
seesion->put('key', 'value')
// adiciona um elem no array
session->put('key', ['a', 'b', 'c'])
session->push('d')
// verifica se há valor e não é null
// pode ser um array e será true se todos existirem e n null
session->has('value')
// retorna todos os valore até os definidos pelo app
session->all()
// remove um valor
session->forget('value')
// apaga todos até os do app
session->flush()
// como get() mais remove ao coletar
session->pull('key', fallback)
// regenerate
session->regenerate()

	armazenamento de sessão flash
	
// Um padrão muito comum no armazenamento de sessões é a definição de um
// valor disponível apenas durante o próximo carregamento da página
// como put()
session->flash('key', 'value')
// permaneçam para mais uma solicitação
session->reflash()
// restaurar o conteúdo inteiro para a próxima solicitação
session->keep('key')


	Cache

	
// -- config/cache.php

	Acessando o cache
	
$user = Cache::get('user')

// usando o helper global
// capturando
cache('key', fallback)
cache()->get('key', fallback)
// inserção com a duração de min
canche(['key' => 'value'], $min)
cache()->put('key', 'value', $min)


	Métodos disponíveis em instâncias de Cache
	
// captura
cache()->get('key', fallback) | cache()->pull('key', fallback)
// atribui
// @minuteOrExpiration : int ou obejo Carbon
cache()->put('key', 'value', minuteOrExpiration)
cache()->put('key', 'value', Carbon::now()->addDay())
// é como put(), porém se o valor já existe ele não atribui
cache()->add('key', 'value')
// é como put(), só que nunca expira apenas com forget()
cache()->forever('key', 'value')
// bool se há ou não e vazio
cache()->has('key')
// verifica se existe um valor no cache para uma chave específica
// e se ele não existe, obter o valor de alguma forma, salvá-lo e retornar
cache()->remember('key', minute, closure)
cache()->rememberForever('key', closure)

// retorna o valor do cache em "users" ou obtém o valor de "User::all()"
// armazena-o no cache em "users" e o retorna
cache()->remember('users', 120, function () {
	return Users::all()
})
// incrementa e decrementa
cache()->increment('key', amount)
cache()->decrement('key', amount)
// remove um
cache()->forget('key')
// remove todos
cache()->flush()


	Cookies
	

	Facade Cookie
	
// É a opção mais completa, permitindo não só ler e craiar cookies,
// mas também enfileirá-los para que sejam adcionados à resposta

// acesa o valor
Cookie::get('key')
// bool se há
Cookie::has('key')
// criar um cookie sem enfileirá-lo
Cookie::make('key', 'value', 'min', 'path', 'domain', 'secure', 'httpOnly')
// como make() mas já enfileira
Cookie::queue(...)

	
	Busca por Texto Completo
	
	
// ...consultar...



(*) 15 EMAIL E NOTIFICAÇÕES
__


	Email "Clássico" (antiga)

// sintaxe básica 
Mail::send(
	// view
	'email.assignment',
	// dados da view
	['trainer' => $trainer, 'trainee' => $trainee],
	// clouser de cofiguração dos dados
	function ($m) use ($trainer, $trainee) {
		$m->from($trainer->email, $trainer->name)
		$m->to($trainee->email, $trainee->name)->subject('Titulo')
	}
)

	Email "mailable"
	
// faz uso de classes para enviar o email consulte...
// sintaxe
php artisan make:mail Assignment


namespaces App\Mail
...
class Assignment extends Mailable {
	use Queueable, SerializesModels
	public $trainer, $trainee
	public function __construct ($trainer, $trainee) {
		$this->trainer = $trainer
		$this->trainee = $trainee
	}
	public function build () {
		return $this->subject('Titulo'. $this->trainer-name)
			->view('emails.assignment')
	}
}
// Envio simples
Mail::to($user)->send(new Assignment($trainer, $trainee))
// com CC/BCC/etc
Mail::to($user1)
	->cc($user2)
	->bcc($user3)
	->send(new Assignment($trainer, $trainee))
// Com conjuntos
Mail::to('me@app.com')
	->bcc(User::all())
	->send(new Assignment($trainer, $trainee))

// as propriedades são publicas na classe
// com isso podem ser acessadas a través da view
//ou pode passar valores explicitos
return $this->subject('titulo')
	->view('emails.assignment')
	->with(['assignment' => $this->event->name])

// ao definir text() transforma a view em texto puro
// deixando de ser HTML
return $this->view('emails.reminder')->text('emails.reminder_plain')


	Métodos disponíveis em build()

// nome end remetente
from('address', 'name')
// assunto
subject('subject')
// anexa um arq
attach('pathToFile', array options)
// anexa um arq a partir de uma string bruta
attachData('data', 'name', array options)
// prioridade 1 mais alta e 5 mais baixa
priority('priority')
// Modificando o objeto SwiftMessage subjacente
return $this->subject('Howdy!')
	->withSwiftMessage(function ($swift) {
		$swift->setReplyTo('noreply@email.com')
	})
	->view('emails.howdy')

	
	Anexos e imagens inline
	

// anexando arquivos ou dados a mailables
return $this->subject('Your whitepaper download')
	->attach(storage_path('pdfs/whitepaper.pdf'), [
		'mime' => 'application/pdf', // opcional
		'as'   => 'whitepaper.pdf'	 // opcional
	])
	->view('emails.whitepaper')

// anexando um arquivo passando os dados brutos
return $this->subject('Your whitepaper download')
	->attachData(
		file_get_contents(storage_path('pdfs/whitepaper.pdf')),
		'whitepaper.pdf',
		['mime' => 'application/pdf'] // opcional
	)
	->view('emails.whitepaper')

// Imagens Inline ?>
<!-- emails/image.blade.php -->
<img src="{{ $message->embed(storage_path('embed.jpg')) }}">
Or, the same image embedding the data:
<img src="{{ $message->embedData(
	file_get_contents(storage_path('embed.jpg')),
	'embed.jpg') }}"><?

	
	Filas

// Enviar um email é uma tarefa demorada que pode fazer os aplicativos
// ficarem lentos, logo é comum mover o envio de emails para uma fila
// em segundo plano


	queue()
	
// Para enfileirar use queue() em vez de send()
Mail::queue(new Assignment($trainer, $trainee))


	later()

// idem a queue() mais permite adicionar uma espera em min
$when = Carbon::now()->addMinutes(30)
Mail::later($when, new Assignment($trainer, $trainee))


	Especificando a file ou a conexão
	
onConnection() | onQueue()


	Desenvolvimento local
	
// Como testar todas essas técnicas? há tres ferramentas
// básicas: driver log do Laravel, um aplicativo de software
// como serviço (SaaS, Sofware as a Service) chamado Mailtrap e 
// a configuraçao "to universal"


	Notificação
	
// Representa uma cominicação a ser enviada para o usuário
// consultar...
php artisan make:notification WorkoutAvailable



(*) 16 FILAS, JOBS, EVENTOS, BROADCASTING E O AGENDADOR
__


// -- config/queue.php

	Jobs enfileirados
	
// criando um job
php artisan make:job CruchReports


	inserindo um job em uma fila
	

// Em um controller
public function index () {
	$user = auth()->user()
	$this->dispatch(new \App\Jobs\CrunchReports($user))
}
// Em outro local
dispatch(new \App\Jobs\CrunchReports($user))

// personalizando conexão
dispatch((new DothingJob)->onConnection('redis'))
// personalizando fila
dispatch((new DothingJob)->onQueue('high'))
// personalizando espera
dispatch((new DothingJob)->delay(60))


	Executando um worker de fila

php artisan queue:work redis --timeout=60 --sleep=15 --tries=3 --queue=high,medium


	
	Eventos
	
// Com um evento, o código chamador informa ao aplicativo que
// algo acorreu: UserSubscribed (usuário se inscreveu),
// UserSignedUp (usuário assinou), ou CntactWasAdded (contato
// foi adicionado). Os eventos são notificações de que algo aconteceu

	assinatura de eventos
	
// É uma classe contendo um conjunto de métodos que agem como ouvintes
// separados para ecentos exclusicos


	Broadcast de eventos por WebSockets e o Laravel Echo
	
// WebSockets é um protocolo, popularizado pelo Pusher, que simplifica fornecer
// comunicação quase em tempo real entre dispositivos web. As bibliotecas WebSockets
// abrem uma conexão direta entre o cliente e o servidor.


	Laravel Echo (o lado Javascript)

// Facilita manipular a autenticação, a autorização e a inscrição em canais 
// privados e de presença. O Echo pode ser usado com os SDKs do Pusher JS


	Agendador
	
// Simplifica a manipulação de tarefas agendadas. Você criará as tarefas
// agendadas em código e então apontará um cron job



(*) 17 HELPERS E COLEÇÕES
_____



	Helpers
	
	array

// retorna o 1° valor do array que atenda a um critério
array_first(array, closure, default = null)
$people = [
	['email' => 'm@me.co', 'name' => 'Malcon Me'],
	['email' => 'j@jo.co', 'name' => 'James Jo'],
]
array_first($people, function ($key, $person) {
	return $person['email'] == 'j@jo.co'
})

// Facilita obter um valor em um array
array_get(array, key, default = null)
$array = ['owner' => ['address' => ['line1' => '123 Main St.']]]
array_get($array, 'owner.address.line1', 'No address')

// Verifica se tem
array_has(array, key)
if (array_has($array, 'owner.address.line1')) ...

// retorna array com os valores correnspondes a chave fornecida
array_pluck(array, key, indexKey)
$array = [
	['owner' => ['id' => 4, 'name' => 'Tricia']],
	['owner' => ['id' => 7, 'name' => 'Kimberly']]
]
array_pluck($array, 'owner.name')
//> ['Tricia', 'Kimberly']
array_pluck($array, 'owner.name', 'owner.id')
//> [4 => 'Tricia', 7 => 'Kimberly']


	Strings
	
// alias para htmlentities()
e(string)

// começa | termina | contêm
starts_with (haystack, needle)
ends_with (haystack, needle)
str_contains (haystack, needle)

// trunca uma string
str_limit (string, numCharacters, concatenation = '...')
str_limit($string, 30)
//> "Lorem ipsum dolor sit amet, co..."

// coincide ou não com um padrão
str_is(pattern, string)
str_is('*.dev', 'myapp.dev') //> true

// string aleatória
str_random(length)
str_random(64)
//> fdslfajLJWÇLTR34L4Kfd7667LDSJFLjk4jlKRjlt4jlajçJK5

// slug
str_slug(string, separator = '-')
str_slug('Im really like to studying with Anki')
//> "im-really-like-to-studying-with-anki"


	Caminhos do aplicativo
	
// caminho do dir app
app_path(append = '')
//> /home/forge/myapp.com/app

// dir-raíz
base_path(append = '')
//> /home/forge/myapp.com

// path config app
config_path(append = '')
//> /home/forge/myapp.com/config

// path banco de dados
database_path(append = '')
// /home/forge/myapp.com/database

// dir storage
storage_path(append = '')
// /home/forge/myapp.com/storage


	URLs
	
// Supondo que um método de controller tenha um único URL mapeado para ele
action('Controller@method', param = [], absolute = true)
?><a href="{{ action('PeopleController@show', ['id' => 3]) }}"><?

// Qnd rotas possuem nome
route('routeName', param = [], absolute = true)
?><a href="{{ route('people.index') }}"><?

// caminho absoluto
url(append = '') e secure_url()
//> http://myapp.com/
url()->current()
url()->full()
url()->previous()

// com sistema de versões do Elixir
elixir(filePath)


	Miscelânea

// lança exceções
abort() | abort_unless() | abort_if()
	
// retorna instância do autenticador do Laravel
auth()

// redirecionamento de volta
back()

// cria uma coleção do array
collect(array)
collect([1,2,3])

// retorna valor de qlqr item de config
config(key)
config('database.default')

// token de formulário
csrf_field() | csrf_token()

// abbr var_dump() para depuração; já aplica exit()
dd(var1, [var2, ...])

// retorna valor de var do ambiente
env(key, default = null)
env('API_KEY', '')


	Coleções
	
// As coleções do Laravel pegam o poder dos métodos PHP de manipulação
// de arrays e acrescentam uma sintaxe limpa e fluida. o helper collect()
// gera novas coleções
// Coleções fora do Laravel 
// https://packagist.org/packages/tightenco/collect

$users = collect([...])
$users->filter(function ($user) {
	return $user['status'] == 'admin'
})
->map(function ($user) {
	return $user['name'] = $user['first'] .' '. $user['last']
})

	Alguns métodos
	
// all() converte p array apenas a coleção, mas não qlqr obj Eloquent
// toArray() converte a coleção e obj Eloquent	
all() e toArray()
$users = User::all()
$users->toArray()
/*>
	[
		['id' => 1, 'name' => 'Agouhanna']
		...
	]
*/
$users->all()
/*
	[
		Eloquent Object {...}
		...
	]
*/

// obtem um subconjunto
// filter() (mantem caso true)
// reject() (mantem caso false)
filter() e reject()
$users->filter(function ($user) {
	return $user->isAdmin
})

// facilita fornecer um subconjunto de sua coleção original
// em que uma chave específica seja igual a determinado valor
$users->where('role', 'admin')

// extrai 1° e ultimo com um critério
first() e last()
$users->first(function ($user) {
	return $user->isAdmin
})

// Iterar por todos
each()
$users->each(function ($user) {
	// faz algo
})

// itera e modifica retornando um novo array
map()
$users->map(function ($user) {
	return [
		'name' => $user['first'] .' '. $user['last'],
		'email' => $user['email']
	]
})

// reduz a um unico valor
reduce()
$users->reduce(function ($carry, $user) {
	return $carry + $user->points
}, 0)

// extrai apenas os valores de uma chave específica de cada item da coleção
pluck()
$emails = $users->pluck('email')->toArray()

// chuck() divide a coleção em grupos com tam específico
// take() extra apenas o número de itens fornecidos
$users->chuck(3)	// separa em grupos de 3
$users->take(3)		// 3 primeiros 

// inverte ordem e aleatório
reverse() shuffle()

// classifica
sort() sortBy sortByDesc()
collect([3,5,2])->sort()->toArray()
//> [2,3,5]
$users->sortBy('email' | closure)

// count() total de itens
// isEmpty() se vazio
count()
isEmpty()

// avg() media
// sum() soma
collect([3,5,1])->avg() // 3
collect([3,5,1])->sum() // 9
$users->avg('points' | closure)











