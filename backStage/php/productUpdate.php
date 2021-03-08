<?php
// exit();
  $errMsg="";
  $prodNo = $_REQUEST['prodNo'];
  $type = $_REQUEST['type'];
  $prodName =$_REQUEST['pname'];
  $info=$_REQUEST['info'];
  $price=$_REQUEST['price'];
 
// echo $prodNo,$type,$prodName,$info,$price;
  try{
    require_once("../../connectdd103g3.php");

    $sql = "UPDATE `product` SET  `prodType` = :type, `prodName` = :prodName,  `prodText` =:info, `price` =:price WHERE `prodNo` =:prodNo;";
    $update = $pdo->prepare($sql);
    $update->bindValue(":prodNo",$_REQUEST['prodNo']);
    $update->bindValue(":type",$_REQUEST['type']);
    $update->bindValue(":prodName",$_REQUEST['pname']);
    $update->bindValue(":info",$_REQUEST['info']);
    $update->bindValue(":price",$_REQUEST['price']);
    $update->execute();
    header("location:../product.html");
  }catch(PDOException $e){
    $errMsg .="錯誤原因: ".$e->getMessage()."<br>";
    $errMsg .="錯誤行號: ".$e->getLine()."<br>";
    echo $errMsg;
  }
?>