<?php 
// $dsn = "mysql:dbname=dd103g3;host=140.115.236.71;charset=utf8";
$dsn = "mysql:host=localhost;port=3306;dbname=dd103g3;charset=utf8";
// $user = "dd103g";
// $password = "dd103g";
$user = "root";
$password = "qwe123456";

try {
    $pdo = new PDO($dsn, $user, $password);
    $pdo->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );//Error Handling
    // print("Connection succsess! <br>");
} catch (PDOException $e) {
    // echo 'Connection failed: ' . $e->getMessage();
}