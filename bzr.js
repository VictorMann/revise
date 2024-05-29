// Bazaar

// inicia um repositorio
bzr init
// inicia um repositorio criando o mesmo
bzr init-repo <NomeDiretorio>


// adicionar arquivos na Arvore de Indexação
bzr add file.txt	// arquivo específico
bzr add .			// todos


// verifca mudanças nos arquivos modificados
bzr diff


// ver historico de commit da branch
bzr log -l 3


// publicando no Launchpad (necessário registrar uma chave SSH)
// O Bazaar usa a criptografia SSH e o protocolo de autenticação
// para se conectar ao Launchpad. Você precisa primeiro criar 
// uma chave SSH em seu próprio computador, executando o comando:
// $ ssh-keygen
bzr launchpad-login john.doe


// copia branch
bzr branch . ..\<NOVA_DIR_BRANCH>

// Reverta para um estado antes do commit que você quer desfazer 
// (substitua REVISION pelo número da revisão específica):

// Isso trará o estado dos arquivos de volta para como 
// estavam na revisão antes do commit que você quer desfazer.
bzr revert -r REVISION-1

// Commit as mudanças para finalizar a reversão:
bzr commit -m "Reverted to revision REVISION-1"

// Reverter o Último Commit
bzr revert -r-1
bzr commit -m "Reverted the last commit"

// Se você precisa desfazer múltiplos commits, você pode usar um range de revisões:
// Aqui, REVISION é a revisão antes da série de commits que você deseja desfazer.
bzr revert -r REVISION
bzr commit -m "Reverted to revision REVISION"

// O comando bzr shelve e bzr unshelve no Bazaar permite 
// que você guarde temporariamente as mudanças não commitadas, semelhante ao git stash.
bzr shelve --all --message "texto se quiser"

// Para restaurar (aplicar) as mudanças shelved de volta ao seu diretório de trabalho, use:
bzr unshelve

// Deletar um shelve específico:
bzr shelve --drop 1

// Deleta todos os shelves
bzr shelve --drop

// Usar uma Branch Separada
// Criar uma nova branch:
bzr branch . ../minha-branch-temp

// Commitar as mudanças na nova branch
cd ../minha-branch-temp
bzr add
bzr commit -m "Mudanças temporárias"

// Voltar para a branch original:
// Isso reverte seu diretório de trabalho para o estado limpo da última revisão commitada.
cd ..
bzr revert

// Reintegrar as mudanças mais tarde:
// Quando você estiver pronto para trazer de volta as mudanças da branch temporária, pode fazer um merge:
bzr merge ../minha-branch-temp


// Restaura todo o estado de commits local com o remoto
bzr revert
bzr pull --overwrite
