<?php
    // 學校
    $dsn = "mysql:host=localhost;dbname=dd103g3;port=3306;charset=utf8";
    $user = "dd103g3";
    $password = "dd103g3";

    // 可懷
    // $dsn = "mysql:host=localhost;port=3306;dbname=dd103g3;charset=utf8";
    // $user = "root";
    // $password = "qwe123456";

    // 高
    // $dsn = "mysql:dbname=dd103g31117;host=localhost;charset=utf8";
    // $user = "root";
    // $password = "root";

    // 麒
 //    $dsn = "mysql:host=localhost;port=3306;dbname=dd103g3;charset=utf8";
	// $user = "root";
 //    $password = "root";

    // 徐浩
 //    $dsn="mysql:host=localhost;port=3306;dbname=dd103g3;charest=utf8";
	// $user="root";
	// $password="henry830122";
    
    // 安
	// $dsn="mysql:host=localhost;port=3306;dbname=dd103g3;charest=utf8";
	// $user="root";
 //    $password="h83510";

 try{
    $options=array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION,PDO::ATTR_CASE=>PDO::CASE_NATURAL);
	$pdo=new PDO($dsn,$user,$password,$options);
 }catch(PDOException $e){
    echo json_encode(
        [
            'error' => [
                'msg' => "資料庫連線失敗：".$e->getMessage()
            ]
        ]
    );
    exit();
}
?>