<?php
	require_once('../connectdd103g3.php');
	
	$sql="DELETE FROM `participate` WHERE `memNo` = :memNo AND `actNo`= :actNo";
	$saru1 = $pdo->prepare($sql);
	$saru1->bindValue(":actNo", $_GET["actNo"]);
	$saru1->bindValue(":memNo", $_GET["memNo"]);
	$saru1->execute();
	


	$sql="update `activity` set `parNum` = `parNum`-1 where actNo = :actNo";
	$saru2 = $pdo->prepare($sql);
	$saru2->bindValue(":actNo", $_GET["actNo"]);
	$saru2->execute();


	header("location:../member.php");
?>