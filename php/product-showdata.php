<?php
  session_start();

  $errMsg="";
  try{
    require_once("../connectdd103g3.php");
    //get members equivment
    if( isset($_SESSION["memNo"])){
      $sql = "select prodNo from backpack where memNo = {$_SESSION["memNo"]}";
      $backProds = $pdo->query($sql);
      $backProdsAll = [];
      while($row = $backProds->fetch(PDO::FETCH_ASSOC)){
        $backProdsAll[] = $row["prodNo"];
      }

    }else{
      $backProdsAll = [];
    }
// exit( print_r($backProdsAll));
    
    $sql = "select * from product";
    $products = $pdo->query($sql);
    $arr=[];

    while($productRow=$products->fetch(PDO::FETCH_ASSOC)){
      //有上架的商品才放入陣列 prodStatus==0
      if($productRow["prodStatus"] == 0 ){
        if(in_array($productRow["prodNo"], $backProdsAll)===false){
          array_push($arr,$productRow);
        }
        
      }
    };
    echo json_encode($arr);

  }catch(PDOException $e){
    $errMsg .="錯誤原因: ".$e->getMessage()."<br>";
    $errMsg .="錯誤行號: ".$e->getLine()."<br>";
  }
?>