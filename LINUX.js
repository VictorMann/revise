LINUX COMMANDS

// Procurar por uma pasta específica no diretório atual
find -type d -name NOME_PASTA

// Procurar por um arquivo case-sensitive
find -iname *NOME_ARQUIVO*

// ENTRAR NO CACHE / IRIS

csession ensemble
iris session iris
iris session irishml

// REINICAR TOMCAT

systemctl restart tomcat
OU
systemctl stop tomcat.service
systemctl start tomcat.service
OU
/opt/apache-tomcat/bin/shutdown.sh
/opt/apache-tomcat/bin/startup.sh

// MUDAR PERMISSÃO DE ARQUIVOS/DIR

chmod 777 ./<DIR> -R

// MUDAR PERMISSÃO DE GRUPO

chgrp cacheusr ./<DIR> -R
chown cacheusr ./<DIR> -R

// PARAR/INICAR O CACHE

ccontrol stop ensemble
ccontrol start ensemble

// CONFIGURAÇÃO HTTPD

cd /usr/local/httpd2/conf/
httpd.conf


// PARAR/INICAR O HTTPD

systemctl status httpd.service
service httpd stop
service httpd start

// MATAR PROCESSOS

kill -9 <PID>

// CORREÇÃO  DATA / HORA

 date -s "MM/DD/YYYY HH:mm:ss"

// TAMANHO DOS ARQUIVOS 

du -h -d 1 ./

// LISTAR DOCKERS EM EXECUÇÃO

docker ps

// incluindo aqueles que estão parados
docker ps -a 

// Entrar em um docker
docker exec -it e4bcbe7c9ce7 bash


// ALTERAR SENHA USER

sudo passwd <NOME_USER>


// Gerar uma nova chave SSH

ssh-keygen -t ed25519 -C "lp.log.planning@gmail.com"

1° aberto dar enter
demais passos colocar senha: T@sc1234#

2° apos criar chave ir até o local onde a chave foi gerar e abrir o arquivo .pub:

cd /root/.ssh/
more id_ed25519.pub

3° Exibirá algo semelhante a isso, copiar e depois ir até o GitHub para inserir tal chave: 

ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIPWU7lOLysjHYaJrCDSdGU258dEGnFHcB/YOO/l/+V+h
 lp.log.planning@gmail.com

// Compacta arquivos para .tar

tar -cvf reports.tar /Reports
 
// Extrair arquivos .tar

tar -xvf reports.tar

// Remove Diretorios cheios -r (recursivo) -f (Força remoção)

rm -r Dir1
// ou
rm -rf Dir1