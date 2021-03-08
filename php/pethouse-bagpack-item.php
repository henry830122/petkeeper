<?php
session_start();
$errMsg="";

try{

    require_once("../connectdd103g3.php");
    
    $sql="select * from `product`";
    $product=$pdo->query($sql);

    if($product->rowCount()==0){
          echo "找不到資料";
    }else{
        
    $arr=[];
    $i=0;
     
        while($result = $product->fetch(PDO::FETCH_ASSOC)){

            $arr[$i]=$result;
            $i++;

        };

    echo json_encode( $arr,JSON_UNESCAPED_UNICODE);

    }

}catch(PDOEexception $e){
    $errMsg.="錯誤訊息:".$e->getMessage()."<br>";
    $errMsg.="錯誤行數:".$e->getLine()."<br>";
};

