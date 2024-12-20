// GIT


# configurações
--

// @ --global -> define como padrão para
// todos os repositorios futuros que serão 
// controlados pelo git. Sem --global é para
// apenas este projeto

git config [--global] user.name "<user-name>"
git config [--global] user.email "<user-email>"
git config [--global] core.editor notepad++


// visualizar as configurações
git config user.email
git config --list


# comandos basicos
--

// Iniciando um repositorio
// aplicar dentro da pasta do projeto
git init


// lista os arquivos que o git esta controlando
git ls-files


// verificando estado
git status


// verificar todas alteração nos arquivos 
git diff


// verifica em um arquivo especifico
git diff index.html


// verifica apenas os nomes dos arquivos que foram alterados
git diff --name-only


// adicionando arquivos ao repositorio GIT (indexação)
git add file1 file2		// por arquivos individual
git add -A ou --all 	// todos
git add . 				// todos


// Voltando alterações estando no "Working Directory"

// @ HEAD -> branch atual
// @ --   -> significa que é um arquivo
git checkout HEAD -- index.html
git checkout index.html // Idem
git checkout .	// todos os arquivos

// comitando (gravando as modificações)
git commit -m "mensagem"
// add + commit juntos
git commit -am "mensagem"


// vendo os commits
git log

// visualizando alterações feitas
git whatchanged [-p]

// voltando um commit
git reset --mixed <codigo_commit> // desfaz COMMIT e INDEX mais mantem alterações (DEFAULT)
git reset --soft // desfaz commit e volta ao INDEX mantem alterações
git reset --hard // apaga todos alterações

git reset --hard c1aaca7fa018b14c949fd7025bf8637ca7d66213


// ver os branch
git branch

// deleta branch local
git branch -D <nome_branch>

// deleta branch remoto
git push origin :<nome_branch>

// manda branch para repo remoto
git push origin <nome_branch>

// mudar de branch
git checkout <nome_branch>

// cria e já entra na branch
git checkout -b <nome_branch>

// gerando repositorio remoto
// @ origin -> nome do repositório remoto
git remote add origin https://gith... // endereço do repositorio remoto

// ver os repositorios remotos
git remote
git remote -v // mais detalhes

// mandar os arquivos para o repo remoto no GITHUB
// @ origin -> destino
// @ master -> branch que eu vou enviar do meu repo local
git push -u origin master


// revertendo alteração
// revert é conhecido como salvador de sexta-feira
git revert --no-edit <codigo_commit>
git revert --no-edit c1aaca7fa018b14c949fd7025bf8637ca7d66213


// trazer alterações do remoto
git pull origin master


// clonar projeto do GIT
git clone <url_projeto>
git clone https://github.com/VictorMann/modulogit


// Muitos desenvolvedores preferem utilizar uma ferramenta 
// gráfica para facilitar o processo de merge manual

// mostra no console uma lista de programas possíveis de ser utilizados
git mergetool --tool-help

// instalar no seu computador 
// gratuitas mais comuns são o kdiff3, Meld ou P4Merge
git mergetool -t <nome_do_programa>


// para evitar conflitos
// indica qual é a base de commits
git rebase <branch>
git rebase master 
// estamos migrando os commits para o branch atual
// exemplo: estamos no branch desenvolvimento
// nesse caso estamos passando os commits do master 
// para o inicio da fila e jogando os do desenvolvimento
// para o final

Exp.:

master -> aa--bb // antes da criaçao do desenvolvimento
// xx--qq commits de outro contribuidor
master -> aa--bb--ww--xx--qq
desenvolvimento -> aa--bb--cc--dd // cc--dd novos commits
git rebase master
// desenvolvimento passa a ser
desenvolvimento -> aa--bb--ww--xx--qq--cc--dd


// caso haja CONFLICT

// descarta aquele conflito, ou seja o commit 
git rebase --skip

// dispensa todo o rebase, não realiza
git rebase --abort

// apos tratar os arquivos com os devidos conflitos
git add .	// indexa os arquivos alterados
git rebase --continue

// para isso vamos ate o branch alternativo
// Ex.: desenvolvimento
checkout desenvolvimento
git rebase master

// move os commits de uma determinada 
// branch para outra branch
git merge <branch>
git merge desenvolvimento // desenvolvimento é uma brach que queremos mesclar à master



// Desfazendo alterações

// as alterações ainda estão no "Working Directory". 
// Então, ele decide descartar todas as alterações que 
// foram realizadas desde o último commit, isto é, 
// voltar o seu sistema para o estado em que se 
// encontra no HEAD 

// A saída não devolve nada mas, ao realizar o comando git
// status, verificamos que não há mais alterações no 
// arquivo "proposta_1.html" que estejam no "Working Directory".
git checkout <nome_arquivo>
git checkout index.html



/***
	Enquanto isso, a usuária "mmsoaresgit" atualizou o repositório remoto
	modificando o arquivo "proposta_1.html". Ao realizar o git pull na branch
	master, o usuário "jcfonsecagit" recebeu a atualização que a "mmsoaresgit"
	realizou. Agora, ele deseja utilizar a versão apenas do arquivo "proposta_1.html"
	que se encontra na branch master, deixando o resto dos arquivos intactos. 
	Uma solução seria olhar o arquivo na branch master e copiar o seu conteúdo
	para a branch desenvolvimento. Contudo, o Git já nos permite fazer tal operação
	de uma maneira mais simples: basta passar ao comando git checkout o nome da branch
	e o do arquivo que se deseja copiar. No nosso caso, temos:

	> git checkout master proposta_1.html
	
	Esse comando trará o arquivo "proposta_1.html" como ele se encontra na branch
	"master" e o adicionará ao Index do repositório na branch "desenvolvimento", 
	pronto para um commit.

*/


/***
	Descartando alterações no Index: git reset
	
	> git reset HEAD -- index.html
	
	Apos o comando o git status indica q os 
	arquivos estão no estado "Working Directory"
*/
git reset HEAD -- index.html


/***
	Guardando alterações para mais tarde: git stash
	
	25004, 25597
	Em seguida, ele começa a modificar o arquivo para resolver uma outra tarefa. 
	Contudo, ele descobre que o seu commit anterior apresentava um bug e deseja 
	resolvê-lo antes de terminar a sua tarefa. Mas as suas alterações que estão no 
	Working Directory e no Index ainda não são suficientes para a realização 
	de um commit. Ele pode descartar as suas modificações com os comandos que 
	vimos anteriormente mas, dessa maneira, ele terá que refazer tudo quando for 
	reiniciar a tarefa. Para resolver isso, o Git nos permite guardar as alterações 
	nesses dois estados em uma área especial, de onde podemos recuperá-los depois. 
	Isso é feito com o comando git stash.
	
	> git stash
	
	Guarda as alterações e volta ao estado HEAD "Working Directory" anterior
	
	Apos isso corrija o bug e realize um commit 
	
	Depois retorno as alterações q estava realizando com o comando:
	
	> git stash pop 		  	// para o ultimo stash salvo e remove-o
	
	> git stash list 		  	// ver os stash salvos
	
	> git stash apply stash@{1} // retorna a um stash especifico
	
	> git stash drop			// apaga stash salvos
*/

/***
	Descartando commits indesejados
	
	O hash é a sequência de caracteres localizada à direita da palavra commit. 
	No nosso caso, o hash do penúltimo commit é b6c7cc8e3fea9b255b5845e1114588206679f609.
	Portanto, se digitarmos o comando git reset b6c7cc8e3fea9b255b5845e1114588206679f609,
	o último commit será descartado, direcionando nosso HEAD para o penúltimo commit.
	Dessa maneira, as alterações encontradas no último commit são revertidas e aplicadas
	aos arquivos em nosso Working Directory. Isso pode ser visto a partir do log do nosso
	projeto
	
	> git reset b6c7cc8e3fea9b255b5845e1114588206679f609
	
*/

/***
	Desfazendo commits antigos
	
	
	Quando desejamos remover commits que foram realizados há algum tempo, a melhor maneira
	seria revertendo-os, isto é, apenas desfazendo as alterações daqueles commits. 
	Todos os outros commits serão mantidos em seu respectivo estado. Isso é feito 
	utilizando o comando git revert passando como argumento o hash do commit que se
	deseja reverter. Ao digitar o comando, um novo commit revertendo as alterações do
	commit escolhido será realizado e o editor de texto padrão se abrirá para que se
	possa digitar a mensagem do commit. Para que o comando seja utilizado, é necessário
	que o Working Directory e o Index estejam "limpos", ou as alterações atuais serão
	descartadas.

	Uma boa alternativa para maior flexibilidade é a opção "-n", para que as alterações
	sejam revertidas e adicionadas ao nosso Working Directory e Index. Assim podemos
	fazer alterações adicionais antes de criar um novo commit de reversão.

	> git revert -n [hash_do_commit]
*/


/***
	Buscando por bugs em muitos commits
	
	
	Imagine que após algum tempo, uma funcionalidade que estava correta, 
	parou de funcionar subitamente em nosso projeto. Um link, que antes funcionava,
	parou de funcionar e não sabemos quando fizemos a alteração que causou 
	esse problema. Sabemos, porém, uma data aproximada de quando funcionava,
	por exemplo na segunda-feira.
	
	Com o comando "git log", podemos encontrar o hash do primeiro commit daquele dia;
	é um bom ponto de partida. Vamos supor que, em nosso projeto, o primeiro commit
	da última segunda-feira é o "02bfc44...". Se desejarmos, podemos utilizar o
	comando git checkout 02bfc44 e verificar se estava funcionando. Supondo que 
	está, devemos voltar ao HEAD, com git checkout HEAD.

	Agora que estamos de volta ao HEAD, veremos quantos commits temos entre ele
	e o commit da segunda-feira que temos certeza que funciona:
	
	Pronto, agora temos que testar commit a commit, ou seja, realizando um git 
	checkout com o hash de cada commit. Imagine o trabalho e o tempo que isso 
	tomará! Por isso, o Git nos fornece o comando git bisect. Vamos utilizá-lo
	e acompanhar seu funcionamento.

    > git bisect start			// inicia bisect
	
    > git bisect bad HEAD		// diz que o commit atual e ruim
	
	> git bisect good 564f324f	// pega um commit em um intervalo que deva estar bom
	
	// apos definir o intervalo o git varrerá de uma forma inteligente
	// commit a commit para encontra o commit ruim
	
	> git bisect bad	// commit ruim
	> git bisect good	// commit bom
*/

/***
	Selecionando commits
	
	
	O comando cherry-pick atua como o merge e rebase. A diferença é que ele
	traz apenas um commit selecionado pela sua hash
	
	> git cherry-pick 19f0bb7d8b4be8ecd687b48fca301b71b95eab41
	> git cherry-pick A..B // pego o intervalo de commits
*/

/**
	Restaura todo o estado de commits local com o remoto
**/
git fetch --all
git reset --hard origin/main

/**
	Mescla commits em um só
	você precisa estar no branch sem ser o master
**/
git rebase -i master

// limpa arquivos temporarios que podem causar erros
git clean -d -f

// Exibe arquivos em conflito
git diff --name-only --diff-filter=U

// Exibir arquivos apenas no Index "aqueles que adicionados com [git add] ou seja prontos para o commit"
git diff --name-only --cached




