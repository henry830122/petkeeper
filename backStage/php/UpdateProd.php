<?php

// 商品狀態變更



    require_once('../../connectdd103g3.php');
    $sql="update `product` set prodStatus = :status where prodNo = :prodNo";
    $member = $pdo->prepare($sql);
    $member->bindValue(":status", $_GET["prodStatus"]);
    $member->bindValue(":prodNo", $_GET["prodNo"]);
    // $sql="update `product` set prodStatus = {$_GET["prodStatus"]} where prodNo = {$_GET["prodNo"]}";
    // echo $sql;
    // $member = $pdo->prepare($sql);
    // $member->bindValue(":status", $_GET["prodStatus"]);
    // $member->bindValue(":prodNo", $_GET["prodNo"]);    
    $member->execute();
    header("location:../product.html");
  ?>