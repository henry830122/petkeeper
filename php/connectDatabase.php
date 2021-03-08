<?php
	$dsn="mysql:host=localhost;port=3306;dbname=dd103g3;charest=utf8";
	$user="root";
	$password="henry830122";
	$options=array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION,PDO::ATTR_CASE=>PDO::CASE_NATURAL);
	$pdo=new PDO($dsn,$user,$password,$options);
?>