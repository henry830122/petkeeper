<?php
  $errMsg="";
  try{
    require_once("../connectdd103g3.php");
    $sql = "select * from product where prodType != 1";
    $products = $pdo->query($sql);
    $arr=[];

    while($productRow=$products->fetch(PDO::FETCH_ASSOC)){
      //有上架的商品才放入陣列 prodStatus==0
      if($productRow["prodStatus"] == 0){
        array_push($arr,$productRow);
      }
    };
    echo json_encode($arr);

  }catch(PDOException $e){
    $errMsg .="錯誤原因: ".$e->getMessage()."<br>";
    $errMsg .="錯誤行號: ".$e->getLine()."<br>";
  }
?>
