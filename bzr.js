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