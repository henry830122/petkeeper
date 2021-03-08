<?php
	session_start();
	$errMsg="";
	try{
		require_once('../connectdd103g3.php');
    
    $sql="INSERT INTO `member` (`memId`,`memPsw`,`memName`,`memNick`,`sex`,`email`,`memTel`,`petType`,`petPic`,`status`,`petName`,`coin`,`Feelfull`,`feedNum`,`lastFeed`,`petColor`,`times`) VALUES (:memId,:memPsw,:memName,:memNick,:sex,:email,:memTel,null,null,1,null,500,null,0,null,null,0)";

    $newMem=$pdo->prepare($sql);
    $newMem->bindValue(":memId",$_REQUEST["id"]);
    $newMem->bindValue(":memPsw",$_REQUEST["psw"]);
    $newMem->bindValue(":memName",$_REQUEST["name"]);
    $newMem->bindValue(":memNick",$_REQUEST["nick"]);
    $newMem->bindValue(":sex",$_REQUEST["sex"]);
    $newMem->bindValue(":email",$_REQUEST["mail"]);
    $newMem->bindValue(":memTel",$_REQUEST["phone"]);
    $newMem->execute();

    //取得自動創號的key值
    $memNo = $pdo->lastInsertId();
    $_SESSION["memId"] = $_REQUEST["id"];
    $_SESSION["memName"] = $_REQUEST["name"];
    $_SESSION["memNick"] = $_REQUEST["nick"];
    $_SESSION["petName"] = null;
    $_SESSION["memNo"] = $memNo;

    $resignResult = array("memName"=>$_REQUEST["name"],"memId"=>$_REQUEST["id"],"memNick"=>$_REQUEST["nick"]);
    echo json_encode($resignResult);
    
	}catch (PDOException $e) {
		$errMsg .="錯誤原因: ".$e->getMessage()."<br>";
    $errMsg .="錯誤行號: ".$e->getLine()."<br>";
    echo $errMsg;
	};
?>