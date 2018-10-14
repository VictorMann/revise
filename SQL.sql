/* * * * * * * * * * * * * * * * * * * * * * *//*
 *									20-01-2017
 *	-- APRENDENDO SQL -- 
 *
 *			by Allan Beaulieu
 *
 * * * * * * * * * * * * * * * * * * * * * * */

DELIMITER $$

CREATE PROCEDURE select_categories(tipo VARCHAR(7))
BEGIN
	IF tipo = 'coffee' THEN
		SELECT * FROM general_coffees ORDER BY category;
	ELSEIF tipo = 'goodies' THEN
		SELECT * FROM non_coffee_categories ORDER BY category;
	END IF;
END$$

CREATE PROCEDURE select_products(tipo VARCHAR(7), cat TINYINT)
BEGIN
	IF tipo = 'coffee' THEN
		SELECT gc.description, gc.image, CONCAT('C', sc.id) AS sku,
		CONCAT_WS(' - ', s.size, sc.caf_decaf, sc.ground_whole, '') AS name,
		sc.stock, sc.price, sales.price AS sale_price
		FROM specific_coffees AS sc
		INNER JOIN sizes AS s ON s.id = sc.size_id
		INNER JOIN general_coffees AS gc ON gc.id = sc.general_coffee_id
		LEFT OUTER JOIN sales ON (sales.product_id = sc.id
		 AND sales.product_type = 'coffee'
		 AND ((NOW() BETWEEN sales.start_date AND sales.end_date)
		  OR (NOW() > sales.start_date AND sales.end_date IS NULL)))
		WHERE sc.general_coffee_id = cat AND sc.stock > 0
		ORDER BY name ASC;
	ELSEIF tipo = 'goodies' THEN
		SELECT ncc.description AS g_description, ncc.image AS g_image,
		CONCAT('G', ncp.id) AS sku, ncp.name, ncp.description, ncp.image,
		ncp.price, ncp.stock, sales.price AS sale_price
		FROM non_coffee_products AS ncp
		INNER JOIN non_coffee_categories AS ncc ON ncc.id = ncp.non_coffee_category_id
		LEFT OUTER JOIN sales ON (sales.product_id = ncp.id
		 AND sales.product_type = 'goodies'
		 AND ((NOW() BETWEEN sales.start_date AND sales.end_date)
		  OR (NOW() > sales.start_date AND sales.end_date IS NULL)))
		WHERE ncp.non_coffee_category_id = cat
		ORDER BY ncp.date_created DESC;
	END IF;
END$$

CREATE PROCEDURE select_sale_items(get_all BOOLEAN)
BEGIN
	IF get_all = 1 THEN
		SELECT CONCAT('G', ncp.id) AS sku, sa.price AS sale_price, ncc.category,
		ncp.image, ncp.name, ncp.price, ncp.stock, ncp.description
		FROM sales AS sa
		INNER JOIN non_coffee_products AS ncp ON sa.product_id = ncp.id
		INNER JOIN non_coffee_categories AS ncc ON ncc.id = ncp.non_coffee_category_id
		WHERE sa.product_type = 'goodies'
		AND ((NOW() BETWEEN sa.start_date AND sa.end_date) OR (NOW() > sa.start_date AND sa.end_date IS NULL))
		UNION
		SELECT CONCAT('C', sc.id), sa.price, gc.category, gc.image,
		CONCAT_WS(' - ', s.size, sc.caf_decaf, sc.ground_whole), sc.price, sc.stock, gc.description
		FROM sales AS sa
		INNER JOIN specific_coffees AS sc ON sa.product_id = sc.id
		INNER JOIN sizes AS s ON s.id = sc.size_id
		INNER JOIN general_coffees AS gc ON gc.id = sc.general_coffee_id
		WHERE sa.product_type = 'coffee'
		AND ((NOW() BETWEEN sa.start_date AND sa.end_date) OR (NOW() > sa.start_date AND sa.end_date IS NULL));
	ELSE
		(SELECT CONCAT('G', ncp.id) AS sku, sa.price AS sale_price, ncc.category,
		ncp.image, ncp.name, ncp.price, ncp.stock, ncp.description
		FROM sales AS sa
		INNER JOIN non_coffee_products AS ncp ON sa.product_id = ncp.id
		INNER JOIN non_coffee_categories AS ncc ON ncc.id = ncp.non_coffee_category_id
		WHERE sa.product_type = 'goodies'
		AND ((NOW() BETWEEN sa.start_date AND sa.end_date) OR (NOW() > sa.start_date AND sa.end_date IS NULL))
		ORDER BY RAND() LIMIT 2)
		UNION
		(SELECT CONCAT('C', sc.id), sa.price, gc.category, gc.image,
		CONCAT_WS(' - ', s.size, sc.caf_decaf, sc.ground_whole), sc.price, sc.stock, gc.description
		FROM sales AS sa
		INNER JOIN specific_coffees AS sc ON sa.product_id = sc.id
		INNER JOIN sizes AS s ON s.id = sc.size_id
		INNER JOIN general_coffees AS gc ON gc.id = sc.general_coffee_id
		WHERE sa.product_type = 'coffee'
		AND ((NOW() BETWEEN sa.start_date AND sa.end_date) OR (NOW() > sa.start_date AND sa.end_date IS NULL))
		ORDER BY RAND() LIMIT 2);
	END IF;
END$$
DELIMITER ;
 
CREATE TABLE item_venda (
	id_venda SMALLINT REFERENCES venda (id),
	id_produto SMALLINT REFERENCES produto (id),
	quantidade INT,
	preco FLOAT,
	CONSTRAINT pk_item_venda PRIMARY KEY (id_venda, id_produto)
) ENGINE = InnoDB DEFAULT CHARSET = UTF8;

CREATE TABLE livros (
	id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
	titulo VARCHAR(100),
	descricao TEXT,
	preco DECIMAL(10, 2)
) ENGINE = InnoDB DEFAULT CHARSET = UTF8;


CREATE PROCEDURE del_tab ()
DROP TEMPORARY TABLE IF EXISTS tab;

-- LAÇO REPEAT
DELIMITER $$
CREATE PROCEDURE tabuada (numero INT)
BEGIN
	DECLARE i INT;
	SET i = 0;
	CREATE TEMPORARY TABLE IF NOT EXISTS tb (resp VARCHAR(20));
	REPEAT
		INSERT INTO tb VALUES (CONCAT(i, ' x ', numero, ' = ', i * numero));
		SET i = i + 1;
	UNTIL i = 11 END REPEAT;
	SELECT * FROM tb;
	DROP TEMPORARY TABLE tb;
END $$
DELIMITER ;

-- LAÇO LOOP
DROP PROCEDURE IF EXISTS fatorial;
DELIMITER $$
CREATE PROCEDURE fatorial (n INT)
COMMENT 'Iterando com LOOP'
BEGIN
	DECLARE x INT;
	DECLARE y INT;
	SET x = 2;
	SET y = n;
	itera: LOOP
		SET y = y * x;
		SET x = x + 1;
		IF x = n THEN LEAVE itera; END IF;
	END LOOP itera;
	SELECT y fatorial_n;
END $$
DELIMITER ;

-- LAÇO WHILE
DROP PROCEDURE IF EXISTS t;
DELIMITER $$
CREATE PROCEDURE t (OUT z INT)
COMMENT 'Variável externa'
BEGIN
	DECLARE i INT;
	SET i = 0;
	WHILE i < 10 DO
		SET i = i + 1;
	END WHILE;
	SELECT i INTO z;
	SELECT z;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE f( x INT )
COMMENT 'Testando inteiro'
BEGIN
	DECLARE t INT;
	SELECT x INTO t;
	IF t = x THEN 
		SELECT x;
	END IF;
END $$
DELIMITER ;


Instruções de Esquema (DDL) :

CREATE
DROP
ALTER

Instruções de Dados (DML) :

SELECT
INSERT
UPDATE
DELETE

para logar no MySQL:

-- fazer uso de um database
mysql -u root -p
use bank

-- para logar e usar um database sem comando use
mysql -u root -p bank; 

-- cria um database
CREATE DATABASE bank;

-- cria um usuario com todos os privilégios
GRANT ALL PRIVILEGES ON bank.* TO 'NomeUsuario'@'localhost' IDENTIFIED BY 'senha';

-- Alterar a senha do usuário
SET PASSWORD FOR root@localhost = PASSSWORD('nova senha');
ALTER USER root@localhost IDENTIFIED BY 'secret';
FLUSH PRIVILEGES;

-- para sair do mysql
quit | exit | \q
-- loga com novo user
mysql -u nome -p bank


-- Data e Hora atual
SELECT NOW();
+---------------------+
| NOW()               |
+---------------------+
| 2017-01-20 20:36:04 |
+---------------------+


CHAR(20)	/* tamanho fixo 	*/
VARCHAR(20)	/* tamanho variado 	*/


-- Conjunto de Caracteres

-- Exibe os conjuntos de caracters suportados pelo seu server
SHOW CHARACTER SET;	

-- para definir um conjunto
VARCHAR(20) CHARACTER SET UTF8
CREATE DATABASE bank CHARACTER SET UTF8


-- Dados de Texto
CHAR			256
VARCHAR			65.535
TINYTEXT		256
TEXT			65.535
MEDIUMTEXT		16.777.215
LONGTEXT		4.294.967.295

/* Dados Numericos 
type			com sinal						sem sinal	*/
TINYINT			-128 a 127						0 a 255
SMALLINT		-32.768 a 32.767				0 a 65.535
MEDIUMINT		-8.388.608 a            		0 a 16.777.215
INTEGER			???								0 a 4.294.967.295
BIGINT			????							0 a 18.446.744.073.709.551.615

-- p (precisão) digitos total, e (escala) digitos a direita do ponto
FLOAT(p, e)		/* valor muio grande 			*/
DOUBLE(p,e)		/* valor extremamente grande 	*/


-- Dados Temporais 
DATE			1000-01-01 a 9999-12-31
DATETIME		1000-01-01 00:00:00 a 9999-12-31 23:59:59
TIMESTAMP		1970-01-01 00:00:00 a 2037-12-31 23:59:59
YEAR			1901 a 2155
TIME			-838:59:59 a 838:59:59 /* transcorrido */


/* 
	- Refinamento
	normalização é o processo de garantir que não haja colunas duplicadas (além 
	das chaves estrangeiras nem colunas compostas) em seu projeto de banco de dados.
*/


/* Restrição de Verificação
	o servidor MySQL permite que restrições sejam definidas mais não força seu uso.
	No entanto, o MySQL fornece outro tipo de dado de caracter ENUM, que une a verificação
	de restrição à definição de dados */
gender CHAR(1) CHECK (gender IN ('M', 'F'))
gender ENUM('M', 'F')



CREATE TABLE person (
	person_id SMALLINT UNSIGNED,
	fname VARCHAR(20),
	lname VARCHAR(20),
	gender ENUM('M', 'F'),
	birth_date DATE,
	street VARCHAR(30),
	city VARCHAR(20),
	state VARCHAR(20),
	country VARCHAR(20),
	postal_code VARCHAR(20),
	CONSTRAINT pk_person PRIMARY KEY (person_id)
);

CREATE TABLE favorite_food (
	person_id SMALLINT UNSIGNED,
	food VARCHAR(40),
	CONSTRAINT fk_favorite_food FOREIGN KEY (person_id) REFERENCES person (person_id),
	CONSTRAINT pk_favorite_food PRIMARY KEY (person_id, food)
);

-- Criando uma tabela condicionalmente
CREATE TABLE IF NOT EXISTS employees (
	id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	fname VARCHAR(20) NOT NULL
);

-- Copiando um Tabela
CREATE TABLE employee2 SELECT * FROM employee;

-- alterando coluna person_id
ALTER TABLE person
MODIFY person_id SMALLINT UNSIGNED AUTO_INCREMENT;

-- Apagando uma Tabela
DROP [TEMPORARY] TABLE [IF NOT EXISTS] tbl_name [, tbl_name, ...]

-- Alterando a estrutura de uma Tabela
ALTER TABLE employee ADD COLUMN birthdate DATE;
ALTER TABLE employee ADD COLUMN birthdate DATE [AFTER nome | FIRST | LAST];
ALTER TABLE employee CHANGE birthdate birth_date DATE NOT NULL;

-- inserindo dados na tabela 
INSERT INTO person (person_id, fname, lname, gender, birth_date)
VALUES (null, 'Hugo', 'Costa', 'M', '1996-03-05');

-- atualizando dados
UPDATE person
SET street = '1225 Carabujam Est.',
city = 'Boston',
country = 'USA',
WHERE person_id = 1;

-- listando dados da tabela
SELECT person_id, fname, lname
FROM person
WHERE person_id = 1;

-- excluindo dados
DELETE FROM person
WHERE person_id = 1;

-- converção de data
UPDATE person
SET birth_date = STR_TO_DATE('DEC-10-2017', '%b-%d-%Y')
WHERE person_id = 1;

/*
	%a	->	Sun, Mon, ...
	%b	->	Jan, fev, ...
	%c	->	mês (0..12)
	%d	->	dia (00..31)
	%f	->	microssegundos (000000..999999)
	%H	->	hora (00..23)
	%h	->	hora (01..12)
	%i	->	minutos (00..59)
	%M	->	mês (january..december)
	%m	->	mês (01..12)
	%p	->	A.M ou P.M
	%s	->	segundos (00..59)
	%W	->	semana (Sunday..Saturday)
	%w	->	semana (0=Domingo..6=Sabado)
	%Y	->	ano 4 digitos
*/

--	XML ?


mysql -u user -p --xml bank


-- VER TABELAS NO BANCO

SHOW TABLES;
+----------------+
| Tables_in_bank |
+----------------+
| account        |
| branch         |
| business       |
| customer       |
| datatest       |
| department     |
| employee       |
| individual     |
| officer        |
| product        |
| product_type   |
| transaction    |
+----------------+

-- VER DEFINIÇÃO DA TABELA

DESC account;
+--------------------+----------------------------------+------+-----+---------+----------------+
| Field              | Type                             | Null | Key | Default | Extra          |
+--------------------+----------------------------------+------+-----+---------+----------------+
| account_id         | int(10) unsigned                 | NO   | PRI | NULL    | auto_increment |
| product_cd         | varchar(10)                      | NO   | MUL | NULL    |                |
| cust_id            | int(10) unsigned                 | NO   | MUL | NULL    |                |
| open_date          | date                             | NO   |     | NULL    |                |
| close_date         | date                             | YES  |     | NULL    |                |
| last_activity_date | date                             | YES  |     | NULL    |                |
| status             | enum('ACTIVE','CLOSED','FROZEN') | YES  |     | NULL    |                |
| open_branch_id     | smallint(5) unsigned             | YES  | MUL | NULL    |                |
| open_emp_id        | smallint(5) unsigned             | YES  | MUL | NULL    |                |
| avail_balance      | float(10,2)                      | YES  |     | NULL    |                |
| pending_balance    | float(10,2)                      | YES  |     | NULL    |                |
+--------------------+----------------------------------+------+-----+---------+----------------+




--- * [ 3 ] Introdução as Consultas




-- Clausulas de consultas

SELECT		-->	determina quais colunas serão incluidas no conjunto-resultado da consulta
FROM		-->	identifica as tabelas de onde serão retirados os dados e como aqs tabelas deverão ser juntadas
WHERE		-->	filtra os dados indesejados
GROUP BY	-->	usada para agrupar linhas por meio de valores comuns de colunas
HAVING		--> filtra grupos indesejados
ORDER BY	--> ordena as linhas do conjunto-resultado final usando uma ou mais colunas


-- lista todas as colunas e linhas
SELECT * FROM account;

-- lista uma coluna e todas linhas
SELECT account_id FROM account;


-- Alem de colunas voce pode implementar outros dados na clausula SELECT
- literais numeros e strings
- expressões
- funções nativas

SELECT cust_id, 'ACTIVE', cust_id * 3.1415, UPPER(fname)
FROM individual;
+---------+--------+------------------+--------------+
| cust_id | ACTIVE | cust_id * 3.1415 | UPPER(fname) |
+---------+--------+------------------+--------------+
|       1 | ACTIVE |           3.1415 | JAMES        |
|       2 | ACTIVE |           6.2830 | SUSAN        |
|       3 | ACTIVE |           9.4245 | FRANK        |
|       4 | ACTIVE |          12.5660 | JOHN         |
|       5 | ACTIVE |          15.7075 | CHARLES      |
|       6 | ACTIVE |          18.8490 | JOHN         |
|       7 | ACTIVE |          21.9905 | MARGARET     |
|       8 | ACTIVE |          25.1320 | LOUIS        |
|       9 | ACTIVE |          28.2735 | RICHARD      |
+---------+--------+------------------+--------------+



SELECT VERSION(), USER(), DATABASE();
+------------+----------------+------------+
| VERSION()  | USER()         | DATABASE() |
+------------+----------------+------------+
| 5.7.17-log | root@localhost | bank       |
+------------+----------------+------------+


-- Aliases de Colunas


SELECT emp_id, 'ACTIVE' AS status, emp_id * 3.1415 AS id_x_PI, UPPER(lname) AS Caixa_Alta
FROM employee;
+--------+--------+---------+------------+
| emp_id | status | id_x_PI | Caixa_Alta |
+--------+--------+---------+------------+
|      1 | ACTIVE |  3.1415 | SMITH      |
|      2 | ACTIVE |  6.2830 | BARKER     |
|      3 | ACTIVE |  9.4245 | TYLER      |
|      4 | ACTIVE | 12.5660 | HAWTHORNE  |
|      5 | ACTIVE | 15.7075 | GOODING    |
|      6 | ACTIVE | 18.8490 | FLEMING    |
|      7 | ACTIVE | 21.9905 | TUCKER     |
|      8 | ACTIVE | 25.1320 | PARKER     |
|      9 | ACTIVE | 28.2735 | GROSSMAN   |
|     10 | ACTIVE | 31.4150 | ROBERTS    |
|     11 | ACTIVE | 34.5565 | ZIEGLER    |
|     12 | ACTIVE | 37.6980 | JAMESON    |
|     13 | ACTIVE | 40.8395 | BLAKE      |
|     14 | ACTIVE | 43.9810 | MASON      |
|     15 | ACTIVE | 47.1225 | PORTMAN    |
|     16 | ACTIVE | 50.2640 | MARKHAM    |
|     17 | ACTIVE | 53.4055 | FOWLER     |
|     18 | ACTIVE | 56.5470 | TULMAN     |
+--------+--------+---------+------------+


-- Removendo Linhas Duplicadas


SELECT DISTINCT cust_id
FROM account;
+---------+
| cust_id |
+---------+
|       1 |
|       2 |
|       3 |
|       4 |
|       5 |
|       6 |
|       7 |
|       8 |
|       9 |
|      10 |
|      11 |
|      12 |
|      13 |
+---------+




-- Cláusula FROM


-- A cláusula from define as tabelas em uma consulta, junto com os meios 
-- de víncular tais tabelas

--> tableas permanentes
--> tableas temporárias
--> tabelas virtuais

SELECT e.emp_id, e.fname, e.lname
FROM (SELECT emp_id, lname, fname, start_date, title FROM employee) e;
+--------+----------+-----------+
| emp_id | fname    | lname     |
+--------+----------+-----------+
|      1 | Michael  | Smith     |
|      2 | Susan    | Barker    |
|      3 | Robert   | Tyler     |
|      4 | Susan    | Hawthorne |
|      5 | John     | Gooding   |
|      6 | Helen    | Fleming   |
|      7 | Chris    | Tucker    |
|      8 | Sarah    | Parker    |
|      9 | Jane     | Grossman  |
|     10 | Paula    | Roberts   |
|     11 | Thomas   | Ziegler   |
|     12 | Samantha | Jameson   |
|     13 | John     | Blake     |
|     14 | Cindy    | Mason     |
|     15 | Frank    | Portman   |
|     16 | Theresa  | Markham   |
|     17 | Beth     | Fowler    |
|     18 | Rick     | Tulman    |
+--------+----------+-----------+


-- VIEW


CREATE VIEW emp_view AS
SELECT emp_id, fname, lname, YEAR(start_date) AS start_year
FROM employee;

SELECT emp_id, start_year
FROM emp_view;
+--------+------------+
| emp_id | start_year |
+--------+------------+
|      1 |       2001 |
|      2 |       2002 |
|      3 |       2000 |
|      4 |       2002 |
|      5 |       2003 |
|      6 |       2004 |
|      7 |       2004 |
|      8 |       2002 |
|      9 |       2002 |
|     10 |       2002 |
|     11 |       2000 |
|     12 |       2003 |
|     13 |       2000 |
|     14 |       2002 |
|     15 |       2003 |
|     16 |       2001 |
|     17 |       2002 |
|     18 |       2002 |
+--------+------------+


-- Vínculo de tabelas e Aliases

-- Modelo antigo
SELECT e.emp_id, e.lname, d.name
FROM employee AS e, department AS d
WHERE e.dept_id = d.dept_id;

-- SQL92 (new sugerido)
SELECT e.emp_id, e.lname, d.name
FROM employee AS e INNER JOIN department AS d
ON e.dept_id = d.dept_id;
+--------+-----------+----------------+
| emp_id | lname     | name           |
+--------+-----------+----------------+
|      4 | Hawthorne | Operations     |
|      6 | Fleming   | Operations     |
|      7 | Tucker    | Operations     |
|      8 | Parker    | Operations     |
|      9 | Grossman  | Operations     |
|     10 | Roberts   | Operations     |
|     11 | Ziegler   | Operations     |
|     12 | Jameson   | Operations     |
|     13 | Blake     | Operations     |
|     14 | Mason     | Operations     |
|     15 | Portman   | Operations     |
|     16 | Markham   | Operations     |
|     17 | Fowler    | Operations     |
|     18 | Tulman    | Operations     |
|      5 | Gooding   | Loans          |
|      1 | Smith     | Administration |
|      2 | Barker    | Administration |
|      3 | Tyler     | Administration |
+--------+-----------+----------------+


-- Cláusula WHERE

-- É o mecanismo de filtragem de linhas indesejadas de seu conjunto-resultado.

SELECT emp_id, lname, title
FROM employee
WHERE title = 'Head Teller';
+--------+---------+-------------+
| emp_id | lname   | title       |
+--------+---------+-------------+
|      6 | Fleming | Head Teller |
|     10 | Roberts | Head Teller |
|     13 | Blake   | Head Teller |
|     16 | Markham | Head Teller |
+--------+---------+-------------+


-- Cláusula GROUP BY e HAVING

SELECT d.name, COUNT(e.emp_id) num_funcionarios
FROM employee e INNER JOIN department d
ON e.dept_id = d.dept_id
GROUP BY d.name
HAVING COUNT(e.emp_id) > 1;
+----------------+------------------+
| name           | num_funcionarios |
+----------------+------------------+
| Administration |                3 |
| Operations     |               14 |
+----------------+------------------+



-- Cláusula ORDER BY

-- É o mecanismo que ordena seus conjuntos-resultados usando dados de colunas
-- brutos ou expressões baseadas em dados de colunas.

SELECT open_emp_id, product_cd
FROM account;
+-------------+------------+
| open_emp_id | product_cd |
+-------------+------------+
|          10 | CHK        |
|          10 | SAV        |
|          10 | CD         |
|          10 | CHK        |
|          10 | SAV        |
|          13 | CHK        |
|          13 | MM         |
|           1 | CHK        |
|           1 | SAV        |
|           1 | MM         |
|          16 | CHK        |
|           1 | CHK        |
|           1 | CD         |
|          10 | CD         |
|          16 | CHK        |
|          16 | SAV        |
|           1 | CHK        |
|           1 | MM         |
|           1 | CD         |
|          16 | CHK        |
|          16 | BUS        |
|          10 | BUS        |
|          16 | CHK        |
|          13 | SBL        |
+-------------+------------+

SELECT open_emp_id, product_cd
FROM account
ORDER BY open_emp_id, product_cd;
+-------------+------------+
| open_emp_id | product_cd |
+-------------+------------+
|           1 | CD         |
|           1 | CD         |
|           1 | CHK        |
|           1 | CHK        |
|           1 | CHK        |
|           1 | MM         |
|           1 | MM         |
|           1 | SAV        |
|          10 | BUS        |
|          10 | CD         |
|          10 | CD         |
|          10 | CHK        |
|          10 | CHK        |
|          10 | SAV        |
|          10 | SAV        |
|          13 | CHK        |
|          13 | MM         |
|          13 | SBL        |
|          16 | BUS        |
|          16 | CHK        |
|          16 | CHK        |
|          16 | CHK        |
|          16 | CHK        |
|          16 | SAV        |
+-------------+------------+


-- Ordenação Ascendente versus Ordenação Descente


SELECT emp_id, fname, lname
FROM employee
WHERE emp_id < 5
ORDER BY fname DESC;
+--------+---------+-----------+
| emp_id | fname   | lname     |
+--------+---------+-----------+
|      2 | Susan   | Barker    |
|      4 | Susan   | Hawthorne |
|      3 | Robert  | Tyler     |
|      1 | Michael | Smith     |
+--------+---------+-----------+


-- Ordenação por Expressão


SELECT cust_id, cust_type_cd, city, fed_id
FROM customer
ORDER BY RIGHT(fed_id, 3);
+---------+--------------+------------+-------------+
| cust_id | cust_type_cd | city       | fed_id      |
+---------+--------------+------------+-------------+
|       1 | I            | Lynnfield  | 111-11-1111 |
|      10 | B            | Salem      | 04-1111111  |
|       2 | I            | Woburn     | 222-22-2222 |
|      11 | B            | Wilmington | 04-2222222  |
|       3 | I            | Quincy     | 333-33-3333 |
|      12 | B            | Salem      | 04-3333333  |
|       4 | I            | Waltham    | 444-44-4444 |
|      13 | B            | Quincy     | 04-4444444  |
|       5 | I            | Salem      | 555-55-5555 |
|       6 | I            | Waltham    | 666-66-6666 |
|       7 | I            | Wilmington | 777-77-7777 |
|       8 | I            | Salem      | 888-88-8888 |
|       9 | I            | Newton     | 999-99-9999 |
+---------+--------------+------------+-------------+


-- Ordenação por Referência Númericas


SELECT emp_id, title, start_date, fname, lname
FROM employee
ORDER BY 2, 5;
+--------+--------------------+------------+----------+-----------+
| emp_id | title              | start_date | fname    | lname     |
+--------+--------------------+------------+----------+-----------+
|     13 | Head Teller        | 2000-05-11 | John     | Blake     |
|      6 | Head Teller        | 2004-03-17 | Helen    | Fleming   |
|     16 | Head Teller        | 2001-03-15 | Theresa  | Markham   |
|     10 | Head Teller        | 2002-07-27 | Paula    | Roberts   |
|      5 | Loan Manager       | 2003-11-14 | John     | Gooding   |
|      4 | Operations Manager | 2002-04-24 | Susan    | Hawthorne |
|      1 | President          | 2001-06-22 | Michael  | Smith     |
|     17 | Teller             | 2002-06-29 | Beth     | Fowler    |
|      9 | Teller             | 2002-05-03 | Jane     | Grossman  |
|     12 | Teller             | 2003-01-08 | Samantha | Jameson   |
|     14 | Teller             | 2002-08-09 | Cindy    | Mason     |
|      8 | Teller             | 2002-12-02 | Sarah    | Parker    |
|     15 | Teller             | 2003-04-01 | Frank    | Portman   |
|      7 | Teller             | 2004-09-15 | Chris    | Tucker    |
|     18 | Teller             | 2002-12-12 | Rick     | Tulman    |
|     11 | Teller             | 2000-10-23 | Thomas   | Ziegler   |
|      3 | Treasurer          | 2000-02-09 | Robert   | Tyler     |
|      2 | Vice President     | 2002-09-12 | Susan    | Barker    |
+--------+--------------------+------------+----------+-----------+




--- * [ 4 ] Filtragem




-- Usando Parênteses

WHERE end_date IS NULL
AND (title = 'Teller' OR title = 'Head Teller')


-- Usando o operador NOT

WHERE end_date IS NULL
AND NOT (title = 'Teller' OR title = 'Head Teller')


-- Construindo uma condição

-- uma condição é construida com uma ou mais expressões unidas por um operador.
-- uma expressão pode ser:

--> Número
--> Uma coluna de uma tabela ou view
--> String
--> Função nativa, como CONCAT('Learnig', ' ', 'SQL') 
--> Subconsulta
--> Lista de expressões ('Teller', 'Head Teller', 'Operations Manager')

-- Operadores pode ser:

--> Comaparação: =, !=, <>, >, >=, <, <=, LIKE, IN e BETWEEN
--> Aritiméticos: +, -, * e /



-- Condições de Igualdade

title 	= 'Teller'
fed_id 	= '111-11-1111'
amount 	= 375.25
dept_id = (SELECT dept_id FROM department WHERE name = 'Loans')


-- Condições de Desigualdade

SELECT emp_id, fname, lname, title
FROM employee
WHERE title != 'Teller' OR title != 'Head Teller';


-- Modificação de dados usando condições de iqualdade

DELETE FROM account
WHERE status = 'CLOSED' AND YEAR(close_date) = 2002;


-- Condições de intervalo

SELECT emp_id, fname, lname, start_date
FROM employee
WHERE start_date < '2002-01-01';

-- usando limite inferior e superior
SELECT emp_id, fname, lname, start_date
FROM employee
WHERE start_date < '2007-01-01' AND start_date >= '2002-01-01';


-- Operador BETWEEN

SELECT emp_id, fname, lname, start_date
FROM employee
WHERE start_date BETWEEN '2002-01-01' AND '2007-01-01';

-- intervalos de string
SELECT cust_id, fed_id
FROM customer
WHERE cust_type_cd = 'I' AND fed_id BETWEEN '500-00-0000' AND '999-99-9999';


-- Condição de Adesão

SELECT account_id, product_cd, cust_id, avail_balance
FROM account
WHERE product_cd IN ('CHK', 'SAV', 'CD', 'MM')
ORDER BY 1;
+------------+------------+---------+---------------+
| account_id | product_cd | cust_id | avail_balance |
+------------+------------+---------+---------------+
|          1 | CHK        |       1 |       1057.75 |
|          2 | SAV        |       1 |        500.00 |
|          3 | CD         |       1 |       3000.00 |
|          4 | CHK        |       2 |       2258.02 |
|          5 | SAV        |       2 |        200.00 |
|          7 | CHK        |       3 |       1057.75 |
|          8 | MM         |       3 |       2212.50 |
|         10 | CHK        |       4 |        534.12 |
|         11 | SAV        |       4 |        767.77 |
|         12 | MM         |       4 |       5487.09 |
|         13 | CHK        |       5 |       2237.97 |
|         14 | CHK        |       6 |        122.37 |
|         15 | CD         |       6 |      10000.00 |
|         17 | CD         |       7 |       5000.00 |
|         18 | CHK        |       8 |       3487.19 |
|         19 | SAV        |       8 |        387.99 |
|         21 | CHK        |       9 |        125.67 |
|         22 | MM         |       9 |       9345.55 |
|         23 | CD         |       9 |       1500.00 |
|         24 | CHK        |      10 |      23575.12 |
|         28 | CHK        |      12 |      38552.05 |
+------------+------------+---------+---------------+

-- (Idem) Usando Subconsultas
SELECT account_id, product_cd, cust_id, avail_balance
FROM account
WHERE product_cd IN (SELECT product_cd FROM product
WHERE product_type_cd = 'ACCOUNT')
ORDER BY 1;
+------------+------------+---------+---------------+
| account_id | product_cd | cust_id | avail_balance |
+------------+------------+---------+---------------+
|          1 | CHK        |       1 |       1057.75 |
|          2 | SAV        |       1 |        500.00 |
|          3 | CD         |       1 |       3000.00 |
|          4 | CHK        |       2 |       2258.02 |
|          5 | SAV        |       2 |        200.00 |
|          7 | CHK        |       3 |       1057.75 |
|          8 | MM         |       3 |       2212.50 |
|         10 | CHK        |       4 |        534.12 |
|         11 | SAV        |       4 |        767.77 |
|         12 | MM         |       4 |       5487.09 |
|         13 | CHK        |       5 |       2237.97 |
|         14 | CHK        |       6 |        122.37 |
|         15 | CD         |       6 |      10000.00 |
|         17 | CD         |       7 |       5000.00 |
|         18 | CHK        |       8 |       3487.19 |
|         19 | SAV        |       8 |        387.99 |
|         21 | CHK        |       9 |        125.67 |
|         22 | MM         |       9 |       9345.55 |
|         23 | CD         |       9 |       1500.00 |
|         24 | CHK        |      10 |      23575.12 |
|         28 | CHK        |      12 |      38552.05 |
+------------+------------+---------+---------------+


-- Usando NOT IN

SELECT account_id, product_cd, cust_id, avail_balance
FROM account
WHERE product_cd NOT IN ('CHK', 'SAV', 'CD', 'MM')
ORDER BY 1;
+------------+------------+---------+---------------+
| account_id | product_cd | cust_id | avail_balance |
+------------+------------+---------+---------------+
|         25 | BUS        |      10 |          0.00 |
|         27 | BUS        |      11 |       9345.55 |
|         29 | SBL        |      13 |      50000.00 |
+------------+------------+---------+---------------+


-- Condição de correspondencia


SELECT emp_id, fname, lname
FROM employee
WHERE LEFT(lname, 1) = 'T';
+--------+--------+--------+
| emp_id | fname  | lname  |
+--------+--------+--------+
|      3 | Robert | Tyler  |
|      7 | Chris  | Tucker |
|     18 | Rick   | Tulman |
+--------+--------+--------+


-- Usando Curingas


/*	CARACTER CORINGA		CORRESPONDÊNCIA
	_						exatamente um caracter
	%						qualquer número de caracteres (incluindo 0)
*/

SELECT lname
FROM employee
WHERE lname LIKE '_a%e%';
+-----------+
| lname     |
+-----------+
| Barker    |
| Hawthorne |
| Parker    |
| Jameson   |
+-----------+

/*	Exemplos
	F%				->		string iniciado com F
	%T				->		string terminada com T
	%bas%			->		strings que contenham a substring 'bas'
	__t_			->		string de 4 caracters com um t na 3º posiçãa
	___-__-____		->		string de 11 carc com hífens na 4º e 7º posição
*/

SELECT cust_id, fed_id
FROM customer
WHERE fed_id LIKE '___-__-____';
+---------+-------------+
| cust_id | fed_id      |
+---------+-------------+
|       1 | 111-11-1111 |
|       2 | 222-22-2222 |
|       3 | 333-33-3333 |
|       4 | 444-44-4444 |
|       5 | 555-55-5555 |
|       6 | 666-66-6666 |
|       7 | 777-77-7777 |
|       8 | 888-88-8888 |
|       9 | 999-99-9999 |
+---------+-------------+


SELECT emp_id, fname, lname
FROM employee
WHERE lname LIKE 'F%' OR lname LIKE 'G%';
+--------+-------+----------+
| emp_id | fname | lname    |
+--------+-------+----------+
|      5 | John  | Gooding  |
|      6 | Helen | Fleming  |
|      9 | Jane  | Grossman |
|     17 | Beth  | Fowler   |
+--------+-------+----------+

-- Usando Expressões Regulares

SELECT emp_id, fname, lname
FROM employee
WHERE lname REGEXP '^[FG]';
+--------+-------+----------+
| emp_id | fname | lname    |
+--------+-------+----------+
|      5 | John  | Gooding  |
|      6 | Helen | Fleming  |
|      9 | Jane  | Grossman |
|     17 | Beth  | Fowler   |
+--------+-------+----------+


-- NULL: aquela palavra de 4 letras

--> não aplicavel
--> valor ainda não conhecido
--> valor indefinido

-- Ao trabalhar com NULL você deve se lembrar:
--> Uma expressão pode ser nula, mas nunca pode ser igual a NULL
--> Dois NULLs nunca são iguais

SELECT emp_id, fname, lname, superior_emp_id
FROM employee
WHERE superior_emp_id IS NULL;
+--------+---------+-------+-----------------+
| emp_id | fname   | lname | superior_emp_id |
+--------+---------+-------+-----------------+
|      1 | Michael | Smith |            NULL |
+--------+---------+-------+-----------------+

SELECT emp_id, fname, lname, superior_emp_id
FROM employee
WHERE superior_emp_id IS NOT NULL;


-- Levar consideração de que algumas linhas pode ser NULL
SELECT emp_id, fname, lname, superior_emp_id
FROM employee
WHERE superior_emp_id <> 6 OR superior_emp_id IS NULL;




--- * [ 5 ] Consultando múltiplas tabelas




-- Produto Cartesiano (cross join é raramente usado)


SELECT e.fname, e.lname, d.name
FROM employee e JOIN department d;
+----------+-----------+----------------+
| fname    | lname     | name           |
+----------+-----------+----------------+
| Michael  | Smith     | Operations     |
| Michael  | Smith     | Loans          |
| Michael  | Smith     | Administration |
| Susan    | Barker    | Operations     |
| Susan    | Barker    | Loans          |
| Susan    | Barker    | Administration |
| Robert   | Tyler     | Operations     |
| Robert   | Tyler     | Loans          |
| Robert   | Tyler     | Administration |
| Susan    | Hawthorne | Operations     |
| Susan    | Hawthorne | Loans          |
| Susan    | Hawthorne | Administration |
| John     | Gooding   | Operations     |
| John     | Gooding   | Loans          |
| John     | Gooding   | Administration |
| Helen    | Fleming   | Operations     |
| Helen    | Fleming   | Loans          |
| Helen    | Fleming   | Administration |
| Chris    | Tucker    | Operations     |
| Chris    | Tucker    | Loans          |
| Chris    | Tucker    | Administration |
| Sarah    | Parker    | Operations     |
| Sarah    | Parker    | Loans          |
| Sarah    | Parker    | Administration |
| Jane     | Grossman  | Operations     |
| Jane     | Grossman  | Loans          |
| Jane     | Grossman  | Administration |
| Paula    | Roberts   | Operations     |
| Paula    | Roberts   | Loans          |
| Paula    | Roberts   | Administration |
| Thomas   | Ziegler   | Operations     |
| Thomas   | Ziegler   | Loans          |
| Thomas   | Ziegler   | Administration |
| Samantha | Jameson   | Operations     |
| Samantha | Jameson   | Loans          |
| Samantha | Jameson   | Administration |
| John     | Blake     | Operations     |
| John     | Blake     | Loans          |
| John     | Blake     | Administration |
| Cindy    | Mason     | Operations     |
| Cindy    | Mason     | Loans          |
| Cindy    | Mason     | Administration |
| Frank    | Portman   | Operations     |
| Frank    | Portman   | Loans          |
| Frank    | Portman   | Administration |
| Theresa  | Markham   | Operations     |
| Theresa  | Markham   | Loans          |
| Theresa  | Markham   | Administration |
| Beth     | Fowler    | Operations     |
| Beth     | Fowler    | Loans          |
| Beth     | Fowler    | Administration |
| Rick     | Tulman    | Operations     |
| Rick     | Tulman    | Loans          |
| Rick     | Tulman    | Administration |
+----------+-----------+----------------+

18 funcionarios x 3 departamentos



-- Junções Internas

-- Se um valor existe na coluna dept_id de uma tabela mas não existe na outra,
-- a junção falha para as linhas que contenham esse valor, e tais linhas são excluídas
-- do conjunto-resultado.

SELECT e.fname, e.lname, d.name
FROM employee e INNER JOIN department d
ON e.dept_id = d.dept_id;
+----------+-----------+----------------+
| fname    | lname     | name           |
+----------+-----------+----------------+
| Susan    | Hawthorne | Operations     |
| Helen    | Fleming   | Operations     |
| Chris    | Tucker    | Operations     |
| Sarah    | Parker    | Operations     |
| Jane     | Grossman  | Operations     |
| Paula    | Roberts   | Operations     |
| Thomas   | Ziegler   | Operations     |
| Samantha | Jameson   | Operations     |
| John     | Blake     | Operations     |
| Cindy    | Mason     | Operations     |
| Frank    | Portman   | Operations     |
| Theresa  | Markham   | Operations     |
| Beth     | Fowler    | Operations     |
| Rick     | Tulman    | Operations     |
| John     | Gooding   | Loans          |
| Michael  | Smith     | Administration |
| Susan    | Barker    | Administration |
| Robert   | Tyler     | Administration |
+----------+-----------+----------------+

-- se os nomes das colunas para juntar as duas tabelas forem idênticos,
-- o que é o caso anterior, você pode usar a subcláusula using em vez da on,
-- como em:
SELECT e.fname, e.lname, d.name
FROM employee e INNER JOIN department d
USING (dept_id);



-- Juntando três ou mais tabelas

SELECT a.account_id, c.fed_id, e.fname, e.lname
FROM account a 
INNER JOIN customer c ON a.cust_id     = c.cust_id
INNER JOIN employee e ON a.open_emp_id = e.emp_id
WHERE c.cust_type_cd = 'B';
+------------+------------+---------+---------+
| account_id | fed_id     | fname   | lname   |
+------------+------------+---------+---------+
|         24 | 04-1111111 | Theresa | Markham |
|         25 | 04-1111111 | Theresa | Markham |
|         27 | 04-2222222 | Paula   | Roberts |
|         28 | 04-3333333 | Theresa | Markham |
|         29 | 04-4444444 | John    | Blake   |
+------------+------------+---------+---------+
-- A ordem da junção não importa é como uma bola de neve


-- Usando Subconsultas como tabelas

-- encontrar todas as contas abertas por caixas experientes
-- atualmente alocados na filial Woburn

SELECT a.account_id, a.cust_id, a.open_date, a.product_cd
FROM account a INNER JOIN
(SELECT emp_id, assigned_branch_id
FROM employee
WHERE start_date < '2007-01-01'
AND (title = 'Teller' OR title = 'Head Teller')) e
ON a.open_emp_id = e.emp_id
INNER JOIN
(SELECT branch_id
FROM branch
WHERE name = 'Woburn Branch') b
ON e.assigned_branch_id = b.branch_id;
+------------+---------+------------+------------+
| account_id | cust_id | open_date  | product_cd |
+------------+---------+------------+------------+
|          1 |       1 | 2000-01-15 | CHK        |
|          2 |       1 | 2000-01-15 | SAV        |
|          3 |       1 | 2004-06-30 | CD         |
|          4 |       2 | 2001-03-12 | CHK        |
|          5 |       2 | 2001-03-12 | SAV        |
|         17 |       7 | 2004-01-12 | CD         |
|         27 |      11 | 2004-03-22 | BUS        |
+------------+---------+------------+------------+


-- Autojunções

-- consulta que lista o nome de cada funcionário junto com o
-- nome de seu gerente

SELECT e.fname, e.lname, e_mgr.fname mgr_fname, e_mgr.lname mgr_lname
FROM employee e INNER JOIN employee e_mgr
ON e.superior_emp_id = e_mgr.emp_id;
+----------+-----------+-----------+-----------+
| fname    | lname     | mgr_fname | mgr_lname |
+----------+-----------+-----------+-----------+
| Susan    | Barker    | Michael   | Smith     |
| Robert   | Tyler     | Michael   | Smith     |
| Susan    | Hawthorne | Robert    | Tyler     |
| John     | Gooding   | Susan     | Hawthorne |
| Helen    | Fleming   | Susan     | Hawthorne |
| Chris    | Tucker    | Helen     | Fleming   |
| Sarah    | Parker    | Helen     | Fleming   |
| Jane     | Grossman  | Helen     | Fleming   |
| Paula    | Roberts   | Susan     | Hawthorne |
| Thomas   | Ziegler   | Paula     | Roberts   |
| Samantha | Jameson   | Paula     | Roberts   |
| John     | Blake     | Susan     | Hawthorne |
| Cindy    | Mason     | John      | Blake     |
| Frank    | Portman   | John      | Blake     |
| Theresa  | Markham   | Susan     | Hawthorne |
| Beth     | Fowler    | Theresa   | Markham   |
| Rick     | Tulman    | Theresa   | Markham   |
+----------+-----------+-----------+-----------+


-- Junçoes equivalentes versus não-equivalentes

-- Essa consulta une duas tabelas que não têm relacionamento de
-- chave estrangeira. A intenção é encontrar todos os funcionários
-- que começaram a trabalhar no banco o produto No-Fee Checking
-- estava sendo oferecido.
SELECT e.emp_id, e.fname, e.lname, e.start_date
FROM employee e INNER JOIN product p
ON e.start_date >= p.date_offered
AND e.start_date <= p.date_offered
WHERE p.name = 'no-fee checking';


-- autojunção não-equivalentes

-- uma pessoa não pode jogar xadrez com ela mesma
SELECT e1.fname, e1.lname, 'VS' vs, e2.fname, e2.lname
FROM employee e1 INNER JOIN employee e2
ON e1.emp_id < e2.emp_id
WHERE e1.title = 'Teller' AND e2.title = 'Teller';
+----------+----------+----+----------+----------+
| fname    | lname    | vs | fname    | lname    |
+----------+----------+----+----------+----------+
| Chris    | Tucker   | VS | Sarah    | Parker   |
| Chris    | Tucker   | VS | Jane     | Grossman |
| Chris    | Tucker   | VS | Thomas   | Ziegler  |
| Chris    | Tucker   | VS | Samantha | Jameson  |
| Chris    | Tucker   | VS | Cindy    | Mason    |
| Chris    | Tucker   | VS | Frank    | Portman  |
| Chris    | Tucker   | VS | Beth     | Fowler   |
| Chris    | Tucker   | VS | Rick     | Tulman   |
| Sarah    | Parker   | VS | Jane     | Grossman |
| Sarah    | Parker   | VS | Thomas   | Ziegler  |
| Sarah    | Parker   | VS | Samantha | Jameson  |
| Sarah    | Parker   | VS | Cindy    | Mason    |
| Sarah    | Parker   | VS | Frank    | Portman  |
| Sarah    | Parker   | VS | Beth     | Fowler   |
| Sarah    | Parker   | VS | Rick     | Tulman   |
| Jane     | Grossman | VS | Thomas   | Ziegler  |
| Jane     | Grossman | VS | Samantha | Jameson  |
| Jane     | Grossman | VS | Cindy    | Mason    |
| Jane     | Grossman | VS | Frank    | Portman  |
| Jane     | Grossman | VS | Beth     | Fowler   |
| Jane     | Grossman | VS | Rick     | Tulman   |
| Thomas   | Ziegler  | VS | Samantha | Jameson  |
| Thomas   | Ziegler  | VS | Cindy    | Mason    |
| Thomas   | Ziegler  | VS | Frank    | Portman  |
| Thomas   | Ziegler  | VS | Beth     | Fowler   |
| Thomas   | Ziegler  | VS | Rick     | Tulman   |
| Samantha | Jameson  | VS | Cindy    | Mason    |
| Samantha | Jameson  | VS | Frank    | Portman  |
| Samantha | Jameson  | VS | Beth     | Fowler   |
| Samantha | Jameson  | VS | Rick     | Tulman   |
| Cindy    | Mason    | VS | Frank    | Portman  |
| Cindy    | Mason    | VS | Beth     | Fowler   |
| Cindy    | Mason    | VS | Rick     | Tulman   |
| Frank    | Portman  | VS | Beth     | Fowler   |
| Frank    | Portman  | VS | Rick     | Tulman   |
| Beth     | Fowler   | VS | Rick     | Tulman   |
+----------+----------+----+----------+----------+



-- Condição de junção versus condição de filtro

-- cabe a você colocar suas condições nos lugares corretos para que
-- suas consultas sejam fáceis de entender e manter.

SELECT a.account_id, a.product_cd, c.fed_id
FROM account a INNER JOIN customer c
ON a.cust_id = c.cust_id
WHERE c.cust_type_cd = 'B';

SELECT a.account_id, a.product_cd, c.fed_id
FROM account a INNER JOIN customer c
ON a.cust_id = c.cust_id 
AND c.cust_type_cd = 'B';

SELECT a.account_id, a.product_cd, c.fed_id
FROM account a INNER JOIN customer c
WHERE a.cust_id = c.cust_id 
AND c.cust_type_cd = 'B';

+------------+------------+------------+
| account_id | product_cd | fed_id     |
+------------+------------+------------+
|         24 | CHK        | 04-1111111 |
|         25 | BUS        | 04-1111111 |
|         27 | BUS        | 04-2222222 |
|         28 | CHK        | 04-3333333 |
|         29 | SBL        | 04-4444444 |
+------------+------------+------------+




--- * [ 6 ] Trabalhando com conjuntos (consultas compostas)



/*
 Ao realizar operações de conjunto sobre dois conjuntos de dados
 as seguintes linhas gerais devem ser seguidas:

--> Ambos os conjuntos de dados devem ter o mesmo número de dados.
--> Os tipos de dados de cada coluna ao longo dos dois conjuntos
	devem ser os mesmos (ou o server deve ser capaz de converter um no outro).
*/

SELECT 1 num, 'ABC' letter
UNION ALL
SELECT 9 num, 'XYZ' letter;
+-----+--------+
| num | letter |
+-----+--------+
|   1 | ABC    |
|   9 | XYZ    |
+-----+--------+


-- Operadores de conjunto


-- Operador UNION e UNION ALL

-- union 		-> ordena o conjunto e remove duplicatas
-- union all 	-> realiza a união total sem remover duplicatas

SELECT 'IND' type_cd, cust_id, lname name
FROM individual
UNION ALL
SELECT 'BUS' type_cd, cust_id, name
FROM business;
+---------+---------+------------------------+
| type_cd | cust_id | name                   |
+---------+---------+------------------------+
| IND     |       1 | Hadley                 |
| IND     |       2 | Tingley                |
| IND     |       3 | Tucker                 |
| IND     |       4 | Hayward                |
| IND     |       5 | Frasier                |
| IND     |       6 | Spencer                |
| IND     |       7 | Young                  |
| IND     |       8 | Blake                  |
| IND     |       9 | Farley                 |
| BUS     |      10 | Chilton Engineering    |
| BUS     |      11 | Northeast Cooling Inc. |
| BUS     |      12 | Superior Auto Body     |
| BUS     |      13 | AAA Insurance Inc.     |
+---------+---------+------------------------+


-- A primeira consulta da instrução composta recupera todos os caixas
-- alocados na filial Woburn. Das quatro linhas do conjunto-resultado
-- uma delas é uma duplicata (o empregado de id 10). Se você quiser
-- que sua tabela combinada exclua linhas duplicatas, você precisará
-- usar o operador union em vez de union all.

SELECT emp_id
FROM employee
WHERE assigned_branch_id = 2
AND title IN ('Teller', 'Head Teller')
UNION ALL
SELECT DISTINCT open_emp_id
FROM account
WHERE open_branch_id = 2;
+--------+
| emp_id |
+--------+
|     10 |
|     11 |
|     12 |
|     10 |
+--------+

SELECT emp_id
FROM employee
WHERE assigned_branch_id = 2
AND title IN ('Teller', 'Head Teller')
UNION
SELECT DISTINCT open_emp_id
FROM account
WHERE open_branch_id = 2;
+--------+
| emp_id |
+--------+
|     10 |
|     11 |
|     12 |
+--------+



-- Operador INTERSECT * MySQL não implementa este operador

SELECT emp_id
FROM employee
WHERE assigned_branch_id = 2
AND title IN ('Teller', 'Head Teller')
INTERSECT
SELECT DISTINCT open_emp_id
FROM account
WHERE open_branch_id = 2;
+--------+
| emp_id |
+--------+
|     10 |
+--------+


-- Operador EXCEPT * MySQL não implementa este operador

SELECT emp_id
FROM employee
WHERE assigned_branch_id = 2
AND title IN ('Teller', 'Head Teller')
EXCEPT
SELECT DISTINCT open_emp_id
FROM account
WHERE open_branch_id = 2;
+--------+
| emp_id |
+--------+
|     11 |
|     12 |
+--------+



-- Ordenando resultados de consultas compostas

-- Se quiser que os resultados de sua consulta composta sejam ordenados
-- você pode adicionar uma cláusula ORDER BY após a última consulta. Ao
-- especificar nomes de colunas na cláusula ORDER BY, você deverá escolher
-- da primera consulta composta.
SELECT emp_id, assigned_branch_id
FROM employee
WHERE title = 'Teller'
UNION
SELECT open_emp_id, open_branch_id
FROM account
WHERE product_cd = 'SAV'
ORDER BY emp_id;
+--------+--------------------+
| emp_id | assigned_branch_id |
+--------+--------------------+
|      1 |                  1 |
|      7 |                  1 |
|      8 |                  1 |
|      9 |                  1 |
|     10 |                  2 |
|     11 |                  2 |
|     12 |                  2 |
|     14 |                  3 |
|     15 |                  3 |
|     16 |                  4 |
|     17 |                  4 |
|     18 |                  4 |
+--------+--------------------+




--- * [ 7 ] Geração, conversão e manipulação de dados



-- Trabalhando com Strings

char		(MySQL)			255
char 		(Oracle)		2000
char 		(SQL Server)	8000

varchar		(MySQL)			65.535
varchar2	(Oracle)		4000
varchar		(SQL Server)	8000

text,..,longtext	(MySQL)			-- até 4 GB
text				(SQL Server)	-- até 2 GB
clob				(Oracle)		-- até 128 TB


-- Para truncar uma string no MySQL é preciso
-- altera para o modo ANSI

SELECT @@session.sql_mode;
+----------------------------------------------------------------+
| @@session.sql_mode                                             |
+----------------------------------------------------------------+
| STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION |
+----------------------------------------------------------------+

SET sql_mode = 'strict';

SELECT @@session.sql_mode;

+--------------------------------------------------------------------------------+
| @@session.sql_mode                                                             |
+--------------------------------------------------------------------------------+
| REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI |
+--------------------------------------------------------------------------------+


-- Incluindo aspas simples

-- acrescente uma aspas simples imediatamente antes para o escape

UPDATE produtos
SET string = 'This string didn''t work, but it does now';
-- pode ser usado \'

-- para recuperar a string com escape, use a função quote()

SELECT quote(string) FROM str_table;


-- Incluindo caracters especiais (ASCII)

SELECT 'abc', CHAR(97,98,99);
+-----+----------------+
| abc | CHAR(97,98,99) |
+-----+----------------+
| abc | abc            |
+-----+----------------+

-- Concatenar strings

SELECT CONCAT('danke sch', CHAR(148), 'n') concatenando;
+--------------+
| concatenando |
+--------------+
| danke schön  |
+--------------+

-- Código ASCII do caracter

SELECT ASCII('ã');
+------------+
| ASCII('ã') |
+------------+
|        198 |
+------------+


-- Manipulação de Strings


-- Funções que retornam números

SELECT LENGTH('léguas');
+------------------+
| LENGTH('léguas') |
+------------------+
|                6 |
+------------------+

-- Encontrar a posição da string
-- se não encontrar retorna 0
SELECT POSITION('World' IN 'Hello World');
+------------------------------------+
| POSITION('World' IN 'Hello World') |
+------------------------------------+
|                                  7 |
+------------------------------------+

-- define a posi de inicio da pesquisa
SELECT LOCATE('pato', 'pato pata pato', 5) posi_5;
+--------+
| posi_5 |
+--------+
|     11 |
+--------+

-- função de comparação só MySQL

--> -1 primeira antes da segunda em ordem de classificação
-->  0 sejam idênticas
-->  1 primeira aparece após a segunda em ordem de classificação

SELECT STRCMP('12345', '12345') 12345_12345,
STRCMP('abcd', 'xyz') abcd_xyz,
STRCMP('qrst', 'QRST') qrst_QRST,
STRCMP('12345', 'xyz') 12345_xyz;
+-------------+----------+-----------+-----------+
| 12345_12345 | abcd_xyz | qrst_QRST | 12345_xyz |
+-------------+----------+-----------+-----------+
|           0 |       -1 |         0 |        -1 |
+-------------+----------+-----------+-----------+


-- O MySQL também permite a você usar os operadores
-- LIKE e REGEXP para comparar strings

SELECT name, name LIKE '%ns' AS ends_in_ns
FROM department;
+----------------+------------+
| name           | ends_in_ns |
+----------------+------------+
| Operations     |          1 |
| Loans          |          1 |
| Administration |          0 |
+----------------+------------+

SELECT cust_id, fed_id, fed_id REGEXP '.{3}-.{2}-.{4}' is_ss_no_format
FROM customer;
+---------+-------------+-----------------+
| cust_id | fed_id      | is_ss_no_format |
+---------+-------------+-----------------+
|       1 | 111-11-1111 |               1 |
|       2 | 222-22-2222 |               1 |
|       3 | 333-33-3333 |               1 |
|       4 | 444-44-4444 |               1 |
|       5 | 555-55-5555 |               1 |
|       6 | 666-66-6666 |               1 |
|       7 | 777-77-7777 |               1 |
|       8 | 888-88-8888 |               1 |
|       9 | 999-99-9999 |               1 |
|      10 | 04-1111111  |               0 |
|      11 | 04-2222222  |               0 |
|      12 | 04-3333333  |               0 |
|      13 | 04-4444444  |               0 |
+---------+-------------+-----------------+



-- Função de string que retornam string

UPDATE str_table
SET texto = CONCAT(texto, ' acrescentado ao final');

SELECT CONCAT(fname, ' ', lname, ' atua como ', title, ' desde ', start_date) emp_narrativa
FROM employee
WHERE title IN ('Teller', 'Head Teller');
+--------------------------------------------------------+
| emp_narrativa                                          |
+--------------------------------------------------------+
| Helen Fleming atua como Head Teller desde 2004-03-17   |
| Chris Tucker atua como Teller desde 2004-09-15         |
| Sarah Parker atua como Teller desde 2002-12-02         |
| Jane Grossman atua como Teller desde 2002-05-03        |
| Paula Roberts atua como Head Teller desde 2002-07-27   |
| Thomas Ziegler atua como Teller desde 2000-10-23       |
| Samantha Jameson atua como Teller desde 2003-01-08     |
| John Blake atua como Head Teller desde 2000-05-11      |
| Cindy Mason atua como Teller desde 2002-08-09          |
| Frank Portman atua como Teller desde 2003-04-01        |
| Theresa Markham atua como Head Teller desde 2001-03-15 |
| Beth Fowler atua como Teller desde 2002-06-29          |
| Rick Tulman atua como Teller desde 2002-12-12          |
+--------------------------------------------------------+


-- A função INSERT() serve para inserir/remover caracteres

SELECT INSERT('goodbye world', 9, 0, 'cruel ') string;
+---------------------+
| string              |
+---------------------+
| goodbye cruel world |
+---------------------+

SELECT INSERT('goodbye world', 1, 7, 'hello') string;
+-------------+
| string      |
+-------------+
| hello world |
+-------------+

-- A função SUBSTRING() extrai caracteres

SELECT SUBSTRING('goodbye cruel world', 9, 5) string;
+--------+
| string |
+--------+
| cruel  |
+--------+


-- Trabalhando com dados numéricos


-- todas as operações aritméticas básicas (+, -, /, *) estão disponiveis
-- e parênteses podem ser usados para ditar precedências:
-- FORMAT() define o número de casas decimais com arredondamento se >= 5
SELECT FORMAT( (36+64)/(12-2), 2 ) calc;
+-------+
| calc  |
+-------+
| 10.00 |
+-------+

-- retorna o resto da divisão
SELECT MOD(10, 4) modulo;
+--------+
| modulo |
+--------+
|      2 |
+--------+

-- raiz quadrada
SELECT SQRT(49) raiz;
+------+
| raiz |
+------+
|    7 |
+------+

-- potenciação
SELECT POW(2, 8) elevado;
+---------+
| elevado |
+---------+
|     256 |
+---------+


-- Controlando a precisão numérica

-- CEIL (int cima) e FLOOR (int baixo)
SELECT CEIL(72.0000001), FLOOR(72.0000001);
+------------------+-------------------+
| CEIL(72.0000001) | FLOOR(72.0000001) |
+------------------+-------------------+
|               73 |                72 |
+------------------+-------------------+

-- ROUND (int mais próximo)
SELECT 	ROUND(72.5), ROUND(72.4), ROUND(72.6);
+-------------+-------------+-------------+
| ROUND(72.5) | ROUND(72.4) | ROUND(72.6) |
+-------------+-------------+-------------+
|          73 |          72 |          73 |
+-------------+-------------+-------------+

-- decidindo a casa decimal
SELECT 	ROUND(72.0909, 1), ROUND(72.0909, 2), ROUND(72.0909, 3);
+-------------------+-------------------+-------------------+
| ROUND(72.0909, 1) | ROUND(72.0909, 2) | ROUND(72.0909, 3) |
+-------------------+-------------------+-------------------+
|              72.1 |             72.09 |            72.091 |
+-------------------+-------------------+-------------------+


-- trunca o numero sem arredondar
SELECT 	TRUNCATE(72.0909, 1), TRUNCATE(72.0909, 2), TRUNCATE(72.0909, 3);
+----------------------+----------------------+----------------------+
| TRUNCATE(72.0909, 1) | TRUNCATE(72.0909, 2) | TRUNCATE(72.0909, 3) |
+----------------------+----------------------+----------------------+
|                 72.0 |                72.09 |               72.090 |
+----------------------+----------------------+----------------------+

-- argumento negativo
SELECT ROUND(17, -1), TRUNCATE(17, -1);
+---------------+------------------+
| ROUND(17, -1) | TRUNCATE(17, -1) |
+---------------+------------------+
|            20 |               10 |
+---------------+------------------+


-- Trabalhando com dados sinalizados

--> -1 se é negativo
-->  0 se é ZERO
-->  1 se positivo

SELECT account_id, SIGN(avail_balance), ABS(avail_balance)
FROM account;
+------------+---------------------+--------------------+
| account_id | SIGN(avail_balance) | ABS(avail_balance) |
+------------+---------------------+--------------------+
|          1 |                   1 |            1057.75 |
|          2 |                   1 |             500.00 |
|          3 |                   1 |            3000.00 |
|          4 |                   1 |            2258.02 |
|          5 |                   1 |             200.00 |
|          7 |                   1 |            1057.75 |
|          8 |                   1 |            2212.50 |
|         10 |                   1 |             534.12 |
|         11 |                   1 |             767.77 |
|         12 |                   1 |            5487.09 |
|         13 |                   1 |            2237.97 |
|         14 |                   1 |             122.37 |
|         15 |                   1 |           10000.00 |
|         17 |                   1 |            5000.00 |
|         18 |                   1 |            3487.19 |
|         19 |                   1 |             387.99 |
|         21 |                   1 |             125.67 |
|         22 |                   1 |            9345.55 |
|         23 |                   1 |            1500.00 |
|         24 |                   1 |           23575.12 |
|         25 |                   0 |               0.00 |
|         27 |                   1 |            9345.55 |
|         28 |                   1 |           38552.05 |
|         29 |                   1 |           50000.00 |
+------------+---------------------+--------------------+


-- Trabalhando com dados temporais

/*
	AAAA	Ano		1000 a 9999
	MM		Mês		01 a 12
	DD		Dia		01 a 31
	HH		Hora	00 a 23
	HHH		Horas	-838 a 838 (transcorridas)
	MI		Minutos	00 a 59
	SS		Segund	00 a 59

	DATE		AAAA-MM-DD
	DATETIME	AAAA-MM-DD HH:MI:SS
	TIMESTAMP	AAAA-MM-DD HH:MI:SS
	TIME		HHH:MI:SS
	YEAR		AAAA
*/

UPDATE my_table
SET txn_date = '2009-05-01 15:30:00'
WHERE txn_id = 9999;


-- Funções de geração de datas

SELECT STR_TO_DATE('September 15, 2001', '%M %d, %Y');
+------------------------------------------------+
| STR_TO_DATE('September 15, 2001', '%M %d, %Y') |
+------------------------------------------------+
| 2001-09-15                                     |
+------------------------------------------------+
/*
	%a	->	Sun, Mon, ...
	%b	->	Jan, fev, ...
	%c	->	mês (0..12)
	%d	->	dia (00..31)
	%f	->	microssegundos (000000..999999)
	%H	->	hora (00..23)
	%h	->	hora (01..12)
	%i	->	minutos (00..59)
	%M	->	mês (january..december)
	%m	->	mês (01..12)
	%p	->	A.M ou P.M
	%s	->	segundos (00..59)
	%W	->	semana (Sunday..Saturday)
	%w	->	semana (0=Domingo..6=Sabado)
	%Y	->	ano 4 digitos
*/

SELECT CURRENT_DATE(), CURRENT_TIME(), CURRENT_TIMESTAMP();
+----------------+----------------+---------------------+
| CURRENT_DATE() | CURRENT_TIME() | CURRENT_TIMESTAMP() |
+----------------+----------------+---------------------+
| 2017-01-25     | 22:30:18       | 2017-01-25 22:30:18 |
+----------------+----------------+---------------------+


-- Manipulando dados temporais


-- Função temporais que retornam datas
SELECT DATE_ADD(CURRENT_DATE(), INTERVAL 5 DAY);
+------------------------------------------+
| DATE_ADD(CURRENT_DATE(), INTERVAL 5 DAY) |
+------------------------------------------+
| 2017-01-30                               |
+------------------------------------------+

/*
	SECOND			Número de segundos
	MINUTE			Número de minutos
	HOUR			Número de horas
	DAY				Número de dias
	MONTH			Número de meses
	YEAR			Número de anos
	MINUTE_SECOND	Número de min e seg separados ":"
	HOUR_SECOND		Número de horas, min e seg separados ":"
	YEAR_MONTH		Número de anos meses separados "-"
*/

UPDATE trasaction
SET txn_date = DATE_ADD(txn_date, INTERVAL '3:27:11' HOUR_SECOND)
WHERE txn_id = 9999;

UPDATE employee
SET birth_date = ADDDATE(birth_date, INTERVAL '9-11' YEAR_MONTH)	-- Idem à DATE_ADD()
WHERE txn_id = 9999;

UPDATE employee
SET birth_date = SUBDATE(birth_date, INTERVAL 1 MONTH)
WHERE txn_id = 9999;

-- último dia do mês
SELECT LAST_DAY(CURRENT_DATE());
+--------------------------+
| LAST_DAY(CURRENT_DATE()) |
+--------------------------+
| 2017-01-31               |
+--------------------------+


-- Funções temporais que retornam string

-- qual dia caia a data passada
SELECT DAYNAME('1996-03-05');
+-----------------------+
| DAYNAME('1996-03-05') |
+-----------------------+
| Tuesday               |
+-----------------------+


-- extrai um fragmento da data, usa o mesmo intervalo que DATE_ADD()

SELECT EXTRACT(YEAR FROM '2008-09-18 22:19:05');
+------------------------------------------+
| EXTRACT(YEAR FROM '2008-09-18 22:19:05') |
+------------------------------------------+
|                                     2008 |
+------------------------------------------+


-- Funções temporais que retornam números

-- retorna o num de dias entre duas datas
SELECT DATEDIFF('2009-09-03', '2009-06-24');
+--------------------------------------+
| DATEDIFF('2009-09-03', '2009-06-24') |
+--------------------------------------+
|                                   71 |
+--------------------------------------+


-- Funções de conversão

SELECT CAST('1456789' AS SIGNED INTEGER);
+-----------------------------------+
| CAST('1456789' AS SIGNED INTEGER) |
+-----------------------------------+
|                           1456789 |
+-----------------------------------+

SELECT CAST('999ASDR3545' AS UNSIGNED INTEGER);
+-----------------------------------------+
| CAST('999ASDR3545' AS UNSIGNED INTEGER) |
+-----------------------------------------+
|                                     999 |
+-----------------------------------------+




--- * [ 8 ] Agrupamentos e agregação




SELECT open_emp_id FROM account;
+-------------+
| open_emp_id |
+-------------+
|           1 |
|           1 |
|           1 |
|           1 |
|           1 |
|           1 |
|           1 |
|           1 |
|          10 |
|          10 |
|          10 |
|          10 |
|          10 |
|          10 |
|          10 |
|          13 |
|          13 |
|          13 |
|          16 |
|          16 |
|          16 |
|          16 |
|          16 |
|          16 |
+-------------+


SELECT open_emp_id FROM account
GROUP BY open_emp_id;
+-------------+
| open_emp_id |
+-------------+
|           1 |
|          10 |
|          13 |
|          16 |
+-------------+


-- usando uma função de agregação para contar o número de linhas
-- em cada grupo.
SELECT open_emp_id, COUNT(*) how_many
FROM account
GROUP BY open_emp_id;
+-------------+----------+
| open_emp_id | how_many |
+-------------+----------+
|           1 |        8 |
|          10 |        7 |
|          13 |        3 |
|          16 |        6 |
+-------------+----------+


-- Usando filtro em grupos
SELECT open_emp_id, COUNT(*) how_many
FROM account
GROUP BY open_emp_id
HAVING COUNT(*) > 6;
+-------------+----------+
| open_emp_id | how_many |
+-------------+----------+
|           1 |        8 |
|          10 |        7 |
+-------------+----------+


-- Funções de agregação
/*
	MAX()		->	retorna o valor máximo dentro de um conjunto
	MIN()		->	retorna o valor mínimo dentro de um conjunto
	AVG()		->	retorna o valor médio de um conjunto
	SUM()		->	retorna a soma dos valores de um conjunto
	COUNT()		->	retorna a quantidade de valores de um conjuto
*/

-- grupo implícito (todas as linhas retornadas pela consulta)
SELECT MAX(avail_balance) max_balance,
MIN(avail_balance) min_balance,
AVG(avail_balance) avg_balance,
SUM(avail_balance) tot_balance,
COUNT(*) num_accounts
FROM account
WHERE product_cd = 'CHK';
+-------------+-------------+-------------+-------------+--------------+
| max_balance | min_balance | avg_balance | tot_balance | num_accounts |
+-------------+-------------+-------------+-------------+--------------+
|    38552.05 |      122.37 | 7300.800985 |    73008.01 |           10 |
+-------------+-------------+-------------+-------------+--------------+


-- grupos explícitos (group by)
SELECT product_cd,
MAX(avail_balance) max_balance,
MIN(avail_balance) min_balance,
AVG(avail_balance) avg_balance,
SUM(avail_balance) tot_balance,
COUNT(*) num_accounts
FROM account
GROUP BY product_cd;
+------------+-------------+-------------+--------------+-------------+--------------+
| product_cd | max_balance | min_balance | avg_balance  | tot_balance | num_accounts |
+------------+-------------+-------------+--------------+-------------+--------------+
| BUS        |     9345.55 |        0.00 |  4672.774902 |     9345.55 |            2 |
| CD         |    10000.00 |     1500.00 |  4875.000000 |    19500.00 |            4 |
| CHK        |    38552.05 |      122.37 |  7300.800985 |    73008.01 |           10 |
| MM         |     9345.55 |     2212.50 |  5681.713216 |    17045.14 |            3 |
| SAV        |      767.77 |      200.00 |   463.940002 |     1855.76 |            4 |
| SBL        |    50000.00 |    50000.00 | 50000.000000 |    50000.00 |            1 |
+------------+-------------+-------------+--------------+-------------+--------------+



-- Contando valores distintos
SELECT account_id, open_emp_id
FROM account;
+------------+-------------+
| account_id | open_emp_id |
+------------+-------------+
|         10 |           1 |
|         11 |           1 |
|         12 |           1 |
|         14 |           1 |
|         15 |           1 |
|         21 |           1 |
|         22 |           1 |
|         23 |           1 |
|          1 |          10 |
|          2 |          10 |
|          3 |          10 |
|          4 |          10 |
|          5 |          10 |
|         17 |          10 |
|         27 |          10 |
|          7 |          13 |
|          8 |          13 |
|         29 |          13 |
|         13 |          16 |
|         18 |          16 |
|         19 |          16 |
|         24 |          16 |
|         25 |          16 |
|         28 |          16 |
+------------+-------------+


SELECT COUNT(open_emp_id)
FROM account;
+--------------------+
| COUNT(open_emp_id) |
+--------------------+
|                 24 |
+--------------------+

SELECT COUNT(DISTINCT open_emp_id)
FROM account;
+-----------------------------+
| COUNT(DISTINCT open_emp_id) |
+-----------------------------+
|                           4 |
+-----------------------------+


-- Usando expressões
SELECT MAX(pending_balance - avail_balance) max_uncleared
FROM account;
+---------------+
| max_uncleared |
+---------------+
|        660.00 |
+---------------+


-- Como NULLs são tratados

CREATE TABLE tabela (
	id SMALLINT
);
INSERT INTO tabela (id)
VALUES (1),(2),(3),(null);
+------+
| id   |
+------+
|    1 |
|    2 |
|    3 |
| NULL |
+------+

SELECT COUNT(*) num_rows,
COUNT(id) num_ids,
MAX(id) max_id,
MIN(id) min_id,
AVG(id) avg_id,
SUM(id) sum_id
FROM tabela;
+----------+---------+--------+--------+--------+--------+
| num_rows | num_ids | max_id | min_id | avg_id | sum_id |
+----------+---------+--------+--------+--------+--------+
|        4 |       3 |      3 |      1 | 2.0000 |      6 |
+----------+---------+--------+--------+--------+--------+


-- Gerando grupos

-- Agrupamento por uma coluna
SELECT product_cd, COUNT(avail_balance) prod_balance
FROM account
GROUP BY product_cd;
+------------+--------------+
| product_cd | prod_balance |
+------------+--------------+
| BUS        |            2 |
| CD         |            4 |
| CHK        |           10 |
| MM         |            3 |
| SAV        |            4 |
| SBL        |            1 |
+------------+--------------+

-- Agrupamento por múltiplas colunas
SELECT product_cd, open_branch_id, SUM(avail_balance) tot_balance
FROM account
GROUP BY product_cd;
+------------+----------------+-------------+
| product_cd | open_branch_id | tot_balance |
+------------+----------------+-------------+
| BUS        |              4 |     9345.55 |
| CD         |              2 |    19500.00 |
| CHK        |              2 |    73008.01 |
| MM         |              3 |    17045.14 |
| SAV        |              2 |     1855.76 |
| SBL        |              3 |    50000.00 |
+------------+----------------+-------------+

SELECT product_cd, open_branch_id, SUM(avail_balance) tot_balance
FROM account
GROUP BY product_cd, open_branch_id;
+------------+----------------+-------------+
| product_cd | open_branch_id | tot_balance |
+------------+----------------+-------------+
| BUS        |              2 |     9345.55 |
| BUS        |              4 |        0.00 |
| CD         |              1 |    11500.00 |
| CD         |              2 |     8000.00 |
| CHK        |              1 |      782.16 |
| CHK        |              2 |     3315.77 |
| CHK        |              3 |     1057.75 |
| CHK        |              4 |    67852.33 |
| MM         |              1 |    14832.64 |
| MM         |              3 |     2212.50 |
| SAV        |              1 |      767.77 |
| SAV        |              2 |      700.00 |
| SAV        |              4 |      387.99 |
| SBL        |              3 |    50000.00 |
+------------+----------------+-------------+


-- Agrupamento por meio de expressão

SELECT EXTRACT(YEAR FROM start_date) year, COUNT(*) how_many
FROM employee
GROUP BY EXTRACT(YEAR FROM start_date);
+------+----------+
| year | how_many |
+------+----------+
| 2000 |        3 |
| 2001 |        2 |
| 2002 |        8 |
| 2003 |        3 |
| 2004 |        2 |
+------+----------+

-- Gerando resumos (rollups)

SELECT product_cd, open_branch_id, SUM(avail_balance) tot_balance
FROM account
GROUP BY product_cd, open_branch_id WITH ROLLUP;
+------------+----------------+-------------+
| product_cd | open_branch_id | tot_balance |
+------------+----------------+-------------+
| BUS        |              2 |     9345.55 |
| BUS        |              4 |        0.00 |
| BUS        |           NULL |     9345.55 |
| CD         |              1 |    11500.00 |
| CD         |              2 |     8000.00 |
| CD         |           NULL |    19500.00 |
| CHK        |              1 |      782.16 |
| CHK        |              2 |     3315.77 |
| CHK        |              3 |     1057.75 |
| CHK        |              4 |    67852.33 |
| CHK        |           NULL |    73008.01 |
| MM         |              1 |    14832.64 |
| MM         |              3 |     2212.50 |
| MM         |           NULL |    17045.14 |
| SAV        |              1 |      767.77 |
| SAV        |              2 |      700.00 |
| SAV        |              4 |      387.99 |
| SAV        |           NULL |     1855.76 |
| SBL        |              3 |    50000.00 |
| SBL        |           NULL |    50000.00 |
| NULL       |           NULL |   170754.46 |
+------------+----------------+-------------+


-- Condições de filtro de grupo

SELECT product_cd, SUM(avail_balance) prod_balance
FROM account
WHERE status = 'ACTIVE'
GROUP BY product_cd
HAVING SUM(avail_balance) >= 10000;
+------------+--------------+
| product_cd | prod_balance |
+------------+--------------+
| CD         |     19500.00 |
| CHK        |     73008.01 |
| MM         |     17045.14 |
| SBL        |     50000.00 |
+------------+--------------+


SELECT product_cd, SUM(avail_balance) prod_balance
FROM account
WHERE status = 'ACTIVE'
GROUP BY product_cd
HAVING MIN(avail_balance) >= 1000
AND MAX(avail_balance) <= 10000;
+------------+--------------+
| product_cd | prod_balance |
+------------+--------------+
| CD         |     19500.00 |
| MM         |     17045.14 |
+------------+--------------+




---* [ 9 ] Subconsultas



-- Tipos de subconsultas


-- não-correlatas
-- pode ser executada de forma independente e não referencia qualquer
-- coisa da instrução-contêiner
SELECT account_id, product_cd, cust_id, avail_balance
FROM account
WHERE account_id = (SELECT MAX(account_id) FROM account);
+------------+------------+---------+---------------+
| account_id | product_cd | cust_id | avail_balance |
+------------+------------+---------+---------------+
|         29 | SBL        |      13 |      50000.00 |
+------------+------------+---------+---------------+

SELECT MAX(account_id) FROM account;
+-----------------+
| MAX(account_id) |
+-----------------+
|              29 |
+-----------------+


-- Subconsultas de linhas múltiplas e coluna única

-- Operador IN e NOT IN

-- a consulta retornam quais funcionarios supervisionam outros
SELECT emp_id, fname, lname, title
FROM employee
WHERE emp_id IN (SELECT superior_emp_id FROM employee);
+--------+---------+-----------+--------------------+
| emp_id | fname   | lname     | title              |
+--------+---------+-----------+--------------------+
|      1 | Michael | Smith     | President          |
|      3 | Robert  | Tyler     | Treasurer          |
|      4 | Susan   | Hawthorne | Operations Manager |
|      6 | Helen   | Fleming   | Head Teller        |
|     10 | Paula   | Roberts   | Head Teller        |
|     13 | John    | Blake     | Head Teller        |
|     16 | Theresa | Markham   | Head Teller        |
+--------+---------+-----------+--------------------+


-- Essa consulta encontra todos os funcionarios que não supervisionam
-- outroas pessoas. Para essa consulta, precisei adicionar uma condição
-- de filtro à subconsulta para garantir que valores null não aparecessem
-- na tabela retornada pela subconsulta
SELECT emp_id, fname, lname, title
FROM employee
WHERE emp_id NOT IN (SELECT superior_emp_id 
FROM employee
WHERE superior_emp_id IS NOT NULL);
+--------+----------+----------+----------------+
| emp_id | fname    | lname    | title          |
+--------+----------+----------+----------------+
|      2 | Susan    | Barker   | Vice President |
|      5 | John     | Gooding  | Loan Manager   |
|      7 | Chris    | Tucker   | Teller         |
|      8 | Sarah    | Parker   | Teller         |
|      9 | Jane     | Grossman | Teller         |
|     11 | Thomas   | Ziegler  | Teller         |
|     12 | Samantha | Jameson  | Teller         |
|     14 | Cindy    | Mason    | Teller         |
|     15 | Frank    | Portman  | Teller         |
|     17 | Beth     | Fowler   | Teller         |
|     18 | Rick     | Tulman   | Teller         |
+--------+----------+----------+----------------+


-- Operador ALL

-- permite fazer comparações entre um valor e cada valor de um
-- conjunto (=, <>, <, >, etc.)

-- Encontra todas as contas que tenham um saldo inferior
-- do que as contas de Frank Tucker
SELECT account_id, cust_id, product_cd, avail_balance
FROM account
WHERE avail_balance < ALL (SELECT a.avail_balance
FROM account a INNER JOIN individual i
ON a.cust_id = i.cust_id
WHERE i.fname = 'Frank' AND i.lname = 'Tucker');
+------------+---------+------------+---------------+
| account_id | cust_id | product_cd | avail_balance |
+------------+---------+------------+---------------+
|          2 |       1 | SAV        |        500.00 |
|          5 |       2 | SAV        |        200.00 |
|         10 |       4 | CHK        |        534.12 |
|         11 |       4 | SAV        |        767.77 |
|         14 |       6 | CHK        |        122.37 |
|         19 |       8 | SAV        |        387.99 |
|         21 |       9 | CHK        |        125.67 |
|         25 |      10 | BUS        |          0.00 |
+------------+---------+------------+---------------+

-- Frank tem duas contas, com o saldo menor sendo 1057.75, 
-- a consulta-contêiner inclui todas as contas com saldo inferior
-- a 1057.75
SELECT a.avail_balance
FROM account a INNER JOIN individual i
ON a.cust_id = i.cust_id
WHERE i.fname = 'Frank' AND i.lname = 'Tucker';	
+---------------+
| avail_balance |
+---------------+
|       1057.75 |
|       2212.50 |
+---------------+


-- Operador ANY

-- Frank tem duas contas com saldos 1057.75 e 2212.50, para
-- ter um saldo superior a qualquer uma dessas deve-se ter
-- um saldo superior a 1057.75
SELECT account_id, cust_id, product_cd, avail_balance
FROM account
WHERE avail_balance > ANY (SELECT a.avail_balance
FROM account a INNER JOIN individual i
ON a.cust_id = i.cust_id
WHERE i.fname = 'Frank' AND i.lname = 'Tucker');
+------------+---------+------------+---------------+
| account_id | cust_id | product_cd | avail_balance |
+------------+---------+------------+---------------+
|          3 |       1 | CD         |       3000.00 |
|          4 |       2 | CHK        |       2258.02 |
|          8 |       3 | MM         |       2212.50 |
|         12 |       4 | MM         |       5487.09 |
|         13 |       5 | CHK        |       2237.97 |
|         15 |       6 | CD         |      10000.00 |
|         17 |       7 | CD         |       5000.00 |
|         18 |       8 | CHK        |       3487.19 |
|         22 |       9 | MM         |       9345.55 |
|         23 |       9 | CD         |       1500.00 |
|         24 |      10 | CHK        |      23575.12 |
|         27 |      11 | BUS        |       9345.55 |
|         28 |      12 | CHK        |      38552.05 |
|         29 |      13 | SBL        |      50000.00 |
+------------+---------+------------+---------------+


-- Subconsultas de múltiplas colunas

SELECT account_id, product_cd, cust_id
FROM account
WHERE open_branch_id = (SELECT branch_id
FROM branch
WHERE name = 'Woburn Branch')
AND open_emp_id IN (SELECT emp_id
FROM employee
WHERE title IN ('Teller', 'Head Teller'));
+------------+------------+---------+
| account_id | product_cd | cust_id |
+------------+------------+---------+
|          1 | CHK        |       1 |
|          2 | SAV        |       1 |
|          3 | CD         |       1 |
|          4 | CHK        |       2 |
|          5 | SAV        |       2 |
|         17 | CD         |       7 |
|         27 | BUS        |      11 |
+------------+------------+---------+

SELECT account_id, product_cd, cust_id
FROM account
WHERE (open_branch_id, open_emp_id) IN
(SELECT b.branch_id, e.emp_id
FROM branch b INNER JOIN employee e
ON b.branch_id = e.assigned_branch_id
WHERE b.name = 'Woburn Branch'
AND (e.title = 'Teller' OR e.title = 'Head Teller'));
+------------+------------+---------+
| account_id | product_cd | cust_id |
+------------+------------+---------+
|          1 | CHK        |       1 |
|          2 | SAV        |       1 |
|          3 | CD         |       1 |
|          4 | CHK        |       2 |
|          5 | SAV        |       2 |
|         17 | CD         |       7 |
|         27 | BUS        |      11 |
+------------+------------+---------+


-- Subconsultas correlatas

-- conta o número de contas de cada cliente, e então a consulta-
-- contêiner recupera aqueles clientes que têm extamente duas contas
SELECT c.cust_id, c.cust_type_cd, c.city
FROM customer c
WHERE 2 = (SELECT COUNT(*)
FROM account a
WHERE a.cust_id = c.cust_id);
+---------+--------------+---------+
| cust_id | cust_type_cd | city    |
+---------+--------------+---------+
|       2 | I            | Woburn  |
|       3 | I            | Quincy  |
|       6 | I            | Waltham |
|       8 | I            | Salem   |
|      10 | B            | Salem   |
+---------+--------------+---------+


-- Encontra todos os clientes cujo saldo total disponível
-- ao longo de todas as contas fica entre 5000 e 10000. Mais
-- uma vez, a subconsulta correlata é executada 13 vezes (uma
-- vez para cada linha de cliente) e cada execução da subconsulta 
-- retorna o saldo em conta total de um determinado cliente
SELECT c.cust_id, c.cust_type_cd, c.city
FROM customer c
WHERE (SELECT SUM(a.avail_balance)
FROM account a
WHERE a.cust_id = c.cust_id)
BETWEEN 5000 AND 10000;
+---------+--------------+------------+
| cust_id | cust_type_cd | city       |
+---------+--------------+------------+
|       4 | I            | Waltham    |
|       7 | I            | Wilmington |
|      11 | B            | Wilmington |
+---------+--------------+------------+


-- Operador EXISTS

-- operador comumente usado para construir condições que utilizem 
-- subconsultas correlatas é o operador exists. Ele é usado quando
-- se quer identificar que um relacionamento existe, independente da
-- quantidade. Por exemplo a consulta a seguir encontra todas as contas
-- nas quais uma transação foi efetuada em um dia em particular, independente
-- quantas transações foram efetuadas
SELECT a.account_id, a.product_cd, a.cust_id, a.avail_balance
FROM account a
WHERE EXISTS (SELECT 1
FROM transaction t
WHERE t.account_id = a.account_id
AND t.txn_date = '2008-09-22');


-- Essa consulta encontra todos os clientes cujo ID de cliente não
-- apareça na tabela business, que é uma maneira indireta de encontrar
-- todos os clientes não-corporativos.
SELECT a.account_id, a.product_cd, a.cust_id
FROM account a
WHERE NOT EXISTS (SELECT 1
FROM business b
WHERE b.cust_id = a.cust_id);
+------------+------------+---------+
| account_id | product_cd | cust_id |
+------------+------------+---------+
|          1 | CHK        |       1 |
|          2 | SAV        |       1 |
|          3 | CD         |       1 |
|          4 | CHK        |       2 |
|          5 | SAV        |       2 |
|          7 | CHK        |       3 |
|          8 | MM         |       3 |
|         10 | CHK        |       4 |
|         11 | SAV        |       4 |
|         12 | MM         |       4 |
|         13 | CHK        |       5 |
|         14 | CHK        |       6 |
|         15 | CD         |       6 |
|         17 | CD         |       7 |
|         18 | CHK        |       8 |
|         19 | SAV        |       8 |
|         21 | CHK        |       9 |
|         22 | MM         |       9 |
|         23 | CD         |       9 |
+------------+------------+---------+


-- Manipulação de dados usando subconsultas correlatas


UPDATE account a
SET a.last_activity_date = (SELECT MAX(t.txn_date)
	FROM trasaction t
	WHERE t.account_id = a.account_id)
WHERE EXISTS (SELECT 1
	FROM trasaction t
	WHERE t.account_id = a.account_id);


-- Subconsultas como fontes de dados

SELECT d.dept_id, d.name, e_cnt.how_many num_emplyees
FROM department d INNER JOIN 
(SELECT dept_id, COUNT(*) how_many
	FROM employee
	GROUP BY dept_id) e_cnt
ON d.dept_id = e_cnt.dept_id;
+---------+----------------+--------------+
| dept_id | name           | num_emplyees |
+---------+----------------+--------------+
|       1 | Operations     |           14 |
|       2 | Loans          |            1 |
|       3 | Administration |            3 |
+---------+----------------+--------------+

SELECT dept_id, COUNT(*) how_many
FROM employee
GROUP BY dept_id;
+---------+----------+
| dept_id | how_many |
+---------+----------+
|       1 |       14 |
|       2 |        1 |
|       3 |        3 |
+---------+----------+


-- Fabricação de dados

SELECT 'Small Fry' name, 0 low_limit, 4999.99 high_limit
UNION ALL
SELECT 'Average Joes' name, 5000 low_limit, 9999.99 high_limit
UNION ALL
SELECT 'Heavy Hitters' name, 10000 low_limit, 999999.99 high_limit;
+---------------+-----------+------------+
| name          | low_limit | high_limit |
+---------------+-----------+------------+
| Small Fry     |         0 |    4999.99 |
| Average Joes  |      5000 |    9999.99 |
| Heavy Hitters |     10000 |  999999.99 |
+---------------+-----------+------------+

SELECT groups.name, COUNT(*) num_customers
FROM 
(SELECT SUM(a.avail_balance) cust_balance
	FROM account a INNER JOIN product p
	ON a.product_cd = p.product_cd
	WHERE p.product_type_cd = 'ACCOUNT'
	GROUP BY a.cust_id) cust_rollup
INNER JOIN 
	(SELECT 'Small Fry' name, 0 low_limit, 4999.99 high_limit
	UNION ALL
	SELECT 'Average Joes' name, 5000 low_limit, 9999.99 high_limit
	UNION ALL
	SELECT 'Heavy Hitters' name, 10000 low_limit, 999999.99 high_limit) groups
ON cust_rollup.cust_balance BETWEEN 
groups.low_limit AND groups.high_limit
GROUP BY groups.name;
+---------------+---------------+
| name          | num_customers |
+---------------+---------------+
| Average Joes  |             2 |
| Heavy Hitters |             4 |
| Small Fry     |             5 |
+---------------+---------------+


-- Subconsultas em condições de filtro

SELECT open_emp_id, COUNT(*) how_many
FROM account
GROUP BY open_emp_id
HAVING COUNT(*) = (SELECT MAX(emp_cnt.how_many)
	FROM (SELECT COUNT(*) how_many
		FROM account
		GROUP BY open_emp_id) emp_cnt
);
+-------------+----------+
| open_emp_id | how_many |
+-------------+----------+
|           1 |        8 |
+-------------+----------+

-- Subconsultas como geradores de expressões

SELECT 
	(SELECT p.name FROM product p
		WHERE p.product_cd = a.product_cd
		AND p.product_type_cd = 'ACCOUNT') product,
	(SELECT b.name FROM branch b
		WHERE b.branch_id = a.open_branch_id) branch,
	(SELECT CONCAT(e.fname, ' ', e.lname) FROM employee e
		WHERE e.emp_id = a.open_emp_id) name,
	SUM(a.avail_balance) tot_deposits
FROM account a
GROUP BY a.product_cd, a.open_branch_id, a.open_emp_id
ORDER BY 1, 2;
+------------------------+---------------+-----------------+--------------+
| product                | branch        | name            | tot_deposits |
+------------------------+---------------+-----------------+--------------+
| NULL                   | Quincy Branch | John Blake      |     50000.00 |
| NULL                   | So. NH Branch | Theresa Markham |         0.00 |
| NULL                   | Woburn Branch | Paula Roberts   |      9345.55 |
| certificate of deposit | Headquarters  | Michael Smith   |     11500.00 |
| certificate of deposit | Woburn Branch | Paula Roberts   |      8000.00 |
| checking account       | Headquarters  | Michael Smith   |       782.16 |
| checking account       | Quincy Branch | John Blake      |      1057.75 |
| checking account       | So. NH Branch | Theresa Markham |     67852.33 |
| checking account       | Woburn Branch | Paula Roberts   |      3315.77 |
| money market account   | Headquarters  | Michael Smith   |     14832.64 |
| money market account   | Quincy Branch | John Blake      |      2212.50 |
| savings account        | Headquarters  | Michael Smith   |       767.77 |
| savings account        | So. NH Branch | Theresa Markham |       387.99 |
| savings account        | Woburn Branch | Paula Roberts   |       700.00 |
+------------------------+---------------+-----------------+--------------+




---* [ 10 ] Junções revisitadas



-- Junção externa esquerda versus direita

-- A palavara-chave left indica que a tabela no lado esquerdo
-- da junção é responsável por determinar o número de linhas 
-- do conjunto-resultado, enquanto a tabela no lado direito é
-- usada para fornecer valores de coluna sempre que uma corres-
-- pondência é encontrada
SELECT c.cust_id, b.name
FROM customer c LEFT OUTER JOIN business b
ON c.cust_id = b.cust_id;
+---------+------------------------+
| cust_id | name                   |
+---------+------------------------+
|      10 | Chilton Engineering    |
|      11 | Northeast Cooling Inc. |
|      12 | Superior Auto Body     |
|      13 | AAA Insurance Inc.     |
|       1 | NULL                   |
|       2 | NULL                   |
|       3 | NULL                   |
|       4 | NULL                   |
|       5 | NULL                   |
|       6 | NULL                   |
|       7 | NULL                   |
|       8 | NULL                   |
|       9 | NULL                   |
+---------+------------------------+

SELECT c.cust_id, b.name
FROM customer c RIGHT OUTER JOIN business b
ON c.cust_id = b.cust_id;
+---------+------------------------+
| cust_id | name                   |
+---------+------------------------+
|      10 | Chilton Engineering    |
|      11 | Northeast Cooling Inc. |
|      12 | Superior Auto Body     |
|      13 | AAA Insurance Inc.     |
+---------+------------------------+


-- Junções externas de três tabelas

SELECT a.account_id, a.product_cd,
CONCAT(i.fname, ' ', i.lname) person_name,
b.name business_name
FROM account a 
LEFT OUTER JOIN individual i ON a.cust_id = i.cust_id
LEFT OUTER JOIN business b   ON a.cust_id = b.cust_id
ORDER BY 1 ASC;
+------------+------------+-----------------+------------------------+
| account_id | product_cd | person_name     | business_name          |
+------------+------------+-----------------+------------------------+
|          1 | CHK        | James Hadley    | NULL                   |
|          2 | SAV        | James Hadley    | NULL                   |
|          3 | CD         | James Hadley    | NULL                   |
|          4 | CHK        | Susan Tingley   | NULL                   |
|          5 | SAV        | Susan Tingley   | NULL                   |
|          7 | CHK        | Frank Tucker    | NULL                   |
|          8 | MM         | Frank Tucker    | NULL                   |
|         10 | CHK        | John Hayward    | NULL                   |
|         11 | SAV        | John Hayward    | NULL                   |
|         12 | MM         | John Hayward    | NULL                   |
|         13 | CHK        | Charles Frasier | NULL                   |
|         14 | CHK        | John Spencer    | NULL                   |
|         15 | CD         | John Spencer    | NULL                   |
|         17 | CD         | Margaret Young  | NULL                   |
|         18 | CHK        | Louis Blake     | NULL                   |
|         19 | SAV        | Louis Blake     | NULL                   |
|         21 | CHK        | Richard Farley  | NULL                   |
|         22 | MM         | Richard Farley  | NULL                   |
|         23 | CD         | Richard Farley  | NULL                   |
|         24 | CHK        | NULL            | Chilton Engineering    |
|         25 | BUS        | NULL            | Chilton Engineering    |
|         27 | BUS        | NULL            | Northeast Cooling Inc. |
|         28 | CHK        | NULL            | Superior Auto Body     |
|         29 | SBL        | NULL            | AAA Insurance Inc.     |
+------------+------------+-----------------+------------------------+


-- Junções cruzadas (produto cartesiano)

SELECT pt.name, p.product_cd, p.name
FROM product p CROSS JOIN product_type pt;
+-------------------------------+------------+-------------------------+
| name                          | product_cd | name                    |
+-------------------------------+------------+-------------------------+
| Customer Accounts             | AUT        | auto loan               |
| Insurance Offerings           | AUT        | auto loan               |
| Individual and Business Loans | AUT        | auto loan               |
| Customer Accounts             | BUS        | business line of credit |
| Insurance Offerings           | BUS        | business line of credit |
| Individual and Business Loans | BUS        | business line of credit |
| Customer Accounts             | CD         | certificate of deposit  |
| Insurance Offerings           | CD         | certificate of deposit  |
| Individual and Business Loans | CD         | certificate of deposit  |
| Customer Accounts             | CHK        | checking account        |
| Insurance Offerings           | CHK        | checking account        |
| Individual and Business Loans | CHK        | checking account        |
| Customer Accounts             | MM         | money market account    |
| Insurance Offerings           | MM         | money market account    |
| Individual and Business Loans | MM         | money market account    |
| Customer Accounts             | MRT        | home mortgage           |
| Insurance Offerings           | MRT        | home mortgage           |
| Individual and Business Loans | MRT        | home mortgage           |
| Customer Accounts             | SAV        | savings account         |
| Insurance Offerings           | SAV        | savings account         |
| Individual and Business Loans | SAV        | savings account         |
| Customer Accounts             | SBL        | small business loan     |
| Insurance Offerings           | SBL        | small business loan     |
| Individual and Business Loans | SBL        | small business loan     |
+-------------------------------+------------+-------------------------+


SELECT DATE_ADD(CURRENT_DATE(), INTERVAL ones.num + tens.num + hundreds.num DAY)
FROM 
(SELECT 0 num UNION ALL
SELECT 1 num UNION ALL
SELECT 2 num UNION ALL
SELECT 3 num UNION ALL
SELECT 4 num UNION ALL
SELECT 5 num UNION ALL
SELECT 6 num UNION ALL
SELECT 7 num UNION ALL
SELECT 8 num UNION ALL
SELECT 9 num) ones
CROSS JOIN
(SELECT 0 num UNION ALL
SELECT 10 num UNION ALL
SELECT 20 num UNION ALL
SELECT 30 num UNION ALL
SELECT 40 num UNION ALL
SELECT 50 num UNION ALL
SELECT 60 num UNION ALL
SELECT 70 num UNION ALL
SELECT 80 num UNION ALL
SELECT 90 num) tens
CROSS JOIN
(SELECT 0 num UNION ALL
SELECT 100 num UNION ALL
SELECT 200 num UNION ALL
SELECT 300 num) hundreds
WHERE ones.num + tens.num + hundreds.num < 365
ORDER BY 1 ASC;
	



---* [ 11 ] Lógica condicional


-- Expressões CASE pesquisadas
-- C1, C2, ..., CN representão condições, e os símbolos E1,..,EN
-- representam expressões que serão retornadas pela expressão CASE.
-- Todas as expressões retornadas pelas várias cláusulas WHEN devem
-- retornar o mesmo tipo de dados (Exp: date, number, string).
CASE 
	WHEN C1 THEN E1
	WHEN C2 THEN E2
	...
	WHEN CN THEN EN
	[ELSE EP]
END

SELECT c.cust_id, c.fed_id,
	CASE
		WHEN c.cust_type_cd = 'I'
			THEN CONCAT(i.fname, ' ', i.lname)
		WHEN c.cust_type_cd = 'B'
			THEN b.name
		ELSE 'Unknown'
	END name
FROM customer c 
LEFT OUTER JOIN individual i ON c.cust_id = i.cust_id
LEFT OUTER JOIN business b   ON c.cust_id = b.cust_id;
+---------+-------------+------------------------+
| cust_id | fed_id      | name                   |
+---------+-------------+------------------------+
|      10 | 04-1111111  | Chilton Engineering    |
|      11 | 04-2222222  | Northeast Cooling Inc. |
|      12 | 04-3333333  | Superior Auto Body     |
|      13 | 04-4444444  | AAA Insurance Inc.     |
|       1 | 111-11-1111 | James Hadley           |
|       2 | 222-22-2222 | Susan Tingley          |
|       3 | 333-33-3333 | Frank Tucker           |
|       4 | 444-44-4444 | John Hayward           |
|       5 | 555-55-5555 | Charles Frasier        |
|       6 | 666-66-6666 | John Spencer           |
|       7 | 777-77-7777 | Margaret Young         |
|       8 | 888-88-8888 | Louis Blake            |
|       9 | 999-99-9999 | Richard Farley         |
+---------+-------------+------------------------+


-- utilzando subconsultas (retorna o mesmo que acima)

SELECT c.cust_id, c.fed_id,
	CASE
		WHEN c.cust_type_cd = 'I' THEN 
			(SELECT CONCAT(i.fname, ' ', i.lname)
			FROM individual i
			WHERE i.cust_id = c.cust_id)
		WHEN c.cust_type_cd = 'B' THEN
			(SELECT b.name
			FROM business b
			WHERE b.cust_id = c.cust_id)
		ELSE 'Unknown'
	END name
FROM customer c;


-- Expressões CASE simples
-- São menos poderosas que as pesquisadas por que você não pode 
-- especificar suas próprias condições: em vez disso, condições de
-- igualdade são construídas para você.
CASE V0
	WHEN V1 THEN E1
	WHEN V2 THEN E2
	...
	WHEN VN THEN EN
	[ELSE EP]
END

-- Exp.:

CASE customer.cust_type_cd
	WHEN 'I' THEN
		(SELECT CONCAT(i.fname, ' ', i.lname)
		FROM individual i
		WHERE i.cust_id = c.cust_id)
	WHEN 'B' THEN
		(SELECT b.name
		FROM business b
		WHERE b.cust_id = c.cust_id)
	ELSE 'Unknown Customer Type'
END


-- Transfomação de conjuntos-resultados


-- Consulta que mostre o número de contas abertas entre os anos
-- de 2000 e 2005

SELECT YEAR(open_date) year, COUNT(*) how_many
FROM account
WHERE open_date BETWEEN '2000-01-01' AND '2005-12-31'
GROUP BY YEAR(open_date);
+------+----------+
| year | how_many |
+------+----------+
| 2000 |        3 |
| 2001 |        4 |
| 2002 |        5 |
| 2003 |        3 |
| 2004 |        9 |
+------+----------+

-- digamos que você queira exibir em uma única linha o resultado

SELECT 
	SUM(CASE YEAR(open_date)
			WHEN 2000 THEN 1 
			ELSE 0
		END) year_2000,
	SUM(CASE YEAR(open_date)
			WHEN 2001 THEN 1 
			ELSE 0
		END) year_2001,
	SUM(CASE YEAR(open_date)
			WHEN 2002 THEN 1 
			ELSE 0
		END) year_2002,
	SUM(CASE YEAR(open_date)
			WHEN 2003 THEN 1 
			ELSE 0
		END) year_2003,
	SUM(CASE YEAR(open_date)
			WHEN 2004 THEN 1 
			ELSE 0
		END) year_2004
FROM account
WHERE open_date BETWEEN '2000-01-01' AND '2005-12-31';
+-----------+-----------+-----------+-----------+-----------+
| year_2000 | year_2001 | year_2002 | year_2003 | year_2004 |
+-----------+-----------+-----------+-----------+-----------+
|         3 |         4 |         5 |         3 |         9 |
+-----------+-----------+-----------+-----------+-----------+


-- Verificando a existência

-- Está consulta usa multiplas expressoes CASE para gerar duas colunas
-- de saída, uma para mostrar se o cliente tem alguma conta corrente e
-- outra para mostrar se o cliente tem alguma conta poupança
SELECT c.cust_id, c.fed_id, c.cust_type_cd,
	CASE 
		WHEN EXISTS (SELECT 1 FROM account a
			WHERE a.cust_id = c.cust_id
			AND a.product_cd = 'CHK') THEN 'Y'
		ELSE 'N'
	END has_checking,
	CASE
		WHEN EXISTS (SELECT 1 FROM account a
			WHERE a.cust_id = c.cust_id
			AND a.product_cd = 'SAV') THEN 'Y'
		ELSE 'N'
	END has_savings
FROM customer c;
+---------+-------------+--------------+--------------+-------------+
| cust_id | fed_id      | cust_type_cd | has_checking | has_savings |
+---------+-------------+--------------+--------------+-------------+
|       1 | 111-11-1111 | I            | Y            | Y           |
|       2 | 222-22-2222 | I            | Y            | Y           |
|       3 | 333-33-3333 | I            | Y            | N           |
|       4 | 444-44-4444 | I            | Y            | Y           |
|       5 | 555-55-5555 | I            | Y            | N           |
|       6 | 666-66-6666 | I            | Y            | N           |
|       7 | 777-77-7777 | I            | N            | N           |
|       8 | 888-88-8888 | I            | Y            | Y           |
|       9 | 999-99-9999 | I            | Y            | N           |
|      10 | 04-1111111  | B            | Y            | N           |
|      11 | 04-2222222  | B            | N            | N           |
|      12 | 04-3333333  | B            | Y            | N           |
|      13 | 04-4444444  | B            | N            | N           |
+---------+-------------+--------------+--------------+-------------+


-- Usa uma expressão CASE simples para contar o número de contas
-- de cada cliente e, então, retorna 'None', '1', '2' ou '3+'
SELECT c.cust_id, c.fed_id, c.cust_type_cd,
	CASE (SELECT COUNT(*) FROM account a
		WHERE a.cust_id = c.cust_id)
		WHEN 0 THEN 'None'
		WHEN 1 THEN '1'
		WHEN 2 THEN '2'
		ELSE '3+'
	END num_accounts
FROM customer c;
+---------+-------------+--------------+--------------+
| cust_id | fed_id      | cust_type_cd | num_accounts |
+---------+-------------+--------------+--------------+
|       1 | 111-11-1111 | I            | 3+           |
|       2 | 222-22-2222 | I            | 2            |
|       3 | 333-33-3333 | I            | 2            |
|       4 | 444-44-4444 | I            | 3+           |
|       5 | 555-55-5555 | I            | 1            |
|       6 | 666-66-6666 | I            | 2            |
|       7 | 777-77-7777 | I            | 1            |
|       8 | 888-88-8888 | I            | 2            |
|       9 | 999-99-9999 | I            | 3+           |
|      10 | 04-1111111  | B            | 2            |
|      11 | 04-2222222  | B            | 1            |
|      12 | 04-3333333  | B            | 1            |
|      13 | 04-4444444  | B            | 1            |
+---------+-------------+--------------+--------------+


-- Erros de divisão por ZERO


SELECT 100 / 0;
+---------+
| 100 / 0 |
+---------+
|    NULL |
+---------+

-- Essa consulta cálcula a proporção entre o saldo de cada conta 
-- e o saldo total de todas as contas do mesmo tipo de produtos.
-- Já que alguns tipos de produtos, como os empréstimos para empresas,
-- poderiam ter um saldo de zero no caso de todos os empréstimos
-- term sido complementamente pagos, é melhor incluir a expressão CASE
-- para garantir que o denominador nunca seja zero.
SELECT a.cust_id, a.product_cd, a.avail_balance / 
	CASE
		WHEN prod_tots.tot_balance = 0 THEN 1
		ELSE prod_tots.tot_balance
	END percent_of_total
FROM account a INNER JOIN 
	(SELECT a.product_cd, SUM(a.avail_balance) tot_balance
	FROM account a
	GROUP BY a.product_cd) prod_tots
ON a.product_cd = prod_tots.product_cd;
+---------+------------+------------------+
| cust_id | product_cd | percent_of_total |
+---------+------------+------------------+
|       1 | CHK        |         0.014488 |
|       1 | SAV        |         0.269431 |
|       1 | CD         |         0.153846 |
|       2 | CHK        |         0.030928 |
|       2 | SAV        |         0.107773 |
|       3 | CHK        |         0.014488 |
|       3 | MM         |         0.129802 |
|       4 | CHK        |         0.007316 |
|       4 | SAV        |         0.413723 |
|       4 | MM         |         0.321915 |
|       5 | CHK        |         0.030654 |
|       6 | CHK        |         0.001676 |
|       6 | CD         |         0.512821 |
|       7 | CD         |         0.256410 |
|       8 | CHK        |         0.047764 |
|       8 | SAV        |         0.209073 |
|       9 | CHK        |         0.001721 |
|       9 | MM         |         0.548282 |
|       9 | CD         |         0.076923 |
|      10 | CHK        |         0.322911 |
|      10 | BUS        |         0.000000 |
|      11 | BUS        |         1.000000 |
|      12 | CHK        |         0.528052 |
|      13 | SBL        |         1.000000 |
+---------+------------+------------------+


-- Atualizações condicionais

UPDATE account
SET last_activity_date = CURRENT_TIMESTAMP(),
pending_balance = pending_balance +
	(SELECT t.amount *
		CASE t.txn_type_cd WHEN 'DBT' THEN -1 ELSE 1 END
	FROM transaction t
	WHERE t.txn_id = 999)
WHERE account.account_id = 
	(SELECT t.account_id FROM transaction t
	WHERE t.txn_id = 999);



---* [ 12 ] Transações



-- Banco de dados multiusuários

-- Locking
-- versioning
/* Granularidade dos bloqueios (como bloquear um recurso)
		a tres niveis diferentes:
			bloqueio de tabela (table locks): impede que multiplos usuarios modifiquem
			uma tabela ao mesmo tempo;
			bloqueio de pagina (page lock)
			bloqueio de linha (row locks) impede que modifiquem a mesma linha
*/


-- O que é transação?
-- agrupa diversas instruções SQL de forma que todas ou nunhuma seja bem-sucedida

START TRANSACTION;
-- saca dinheiro da primeira conta, certifica-se que o saldo é suficiente
UPDATE account 
SET avail_balance = avail_balance - 500
WHERE account_id = 998 AND avail_balance > 500;

IF /*se exatamente uma linha foi atualizada*/ THEN
-- deposita o dinheiro na segunda conta
UPDATE account 
SET avail_balance = avail_balance + 500
WHERE account_id = 999;

IF /*se exatamente uma linha foi atualizada*/ THEN
-- tudo ocorreu bem, torne as modificações permanentes
COMMIT;
ELSE
/*algo deu errado, desfaça todas as mudanças dessa transação*/
ROLLBACK;
END IF;
ELSE
/*fundos insuficientes, ou erro encontrado durante a atualização*/
ROLLBACK;
END IF;

/* 
	Para sair do modo de autocomissão (auto-commit) no MySQL
	
	Uma vez que você tenha saído do modo de autocomissão, todos
	os comandos SQL serão realizados dentro do escopo de uma transação
	e devem ter um commit realizado ou devem ser desfeitos explicitamente.
*/
SET AUTOCOMMIT = 0


-- Mecanismos de armazenamento

--> MyISAM -> não-transacional que emprega bloqueio de tabelas.
--> InnoDB -> transacional que emprega bloqueio de linha	




---* [ 13 ] Índices e Restrições



-- Criação de índices
-- Otimiza o sistema de buscas
ALTER TABLE department
ADD INDEX dept_name_idx (name);

-- Para excluílo
ALTER TABLE department
DROP INDEX dept_name_idx;


-- Restrições

--> restrição de chave primária
--> restrição de chave estrangeira
--> restrição exclusivas
--> restrições de verificação


ALTER TABLE product
ADD CONSTRAINT pk_product PRIMARY KEY (product_cd);
ALTER TABLE product
ADD CONSTRAINT fk_product_type_cd FOREIGN KEY (product_type_cd) 
REFERENCES product_type (product_type_cd);

ALTER TABLE product
DROP PRIMARY KEY;
ALTER TABLE product
DROP FOREIGN KEY fk_product_type_cd;


-- Restrições em cascata

ALTER TABLE product
ADD CONSTRAINT fk_product_type_cd FOREIGN KEY (product_type_cd) 
REFERENCES product_type (product_type_cd)
ON UPDATE CASCADE
ON DELETE CASCADE;





