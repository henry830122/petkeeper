<?php



$errMsg="";
  try{
    require_once("../../connectdd103g3.php");

    
    $sql = "select * from product";
    $products = $pdo->query($sql);
    $arr=[];

    while($productRow=$products->fetch(PDO::FETCH_ASSOC)){

          array_push($arr,$productRow);

    };
    echo json_encode($arr);

  }catch(PDOException $e){
    $errMsg .="錯誤原因: ".$e->getMessage()."<br>";
    $errMsg .="錯誤行號: ".$e->getLine()."<br>";
  }











?>