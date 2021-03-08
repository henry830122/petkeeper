<?php
  $errMsg="";
  
  try{
    require_once("../../connectdd103g3.php");
    $pdo->beginTransaction();
    //圖片上傳成功
    if( $_FILES["actPic"]["error"] == UPLOAD_ERR_OK){
      $sql = "INSERT INTO `activity` (`actType`, `actText`, `actNum`, `actDate`, `actStatus`, `actName`, `deadline`, `actLoc`, `actPic`, `mapLat`, `mapLong`, `parNum`) VALUES (:actType,:actText,:actNum,:actDate,:actStatus,:actName,:deadline,:actLoc,'',:mapLat,:mapLong,0);";
      $insertAct = $pdo->prepare($sql);
      $insertAct->bindValue(":actType",$_POST['actType']);
      $insertAct->bindValue(":actText",$_POST['actText']);
      $insertAct->bindValue(":actNum",$_POST['actNum']);
      $insertAct->bindValue(":actDate",$_POST['actDate']);
      if(isset($_POST['actStatus']) == true){
        $insertAct->bindValue(":actStatus",$_POST['actStatus']);
      }else{
        $insertAct->bindValue(":actStatus",1);
      }
      $insertAct->bindValue(":actName",$_POST['actName']);
      $insertAct->bindValue(":deadline",$_POST['deadline']);
      $insertAct->bindValue(":actLoc",$_POST['actLoc']);
      $insertAct->bindValue(":mapLat",$_POST['mapLat']);
      $insertAct->bindValue(":mapLong",$_POST['mapLong']);
      $insertAct->execute();

      //取得自動創號的key值
      $actNo = $pdo->lastInsertId();

      //檢查images資料夾存不存在
      $path = "../images";
      if( file_exists($path) === false){
        mkdir($path);
      }
      //將檔案copy到要放的路徑
		  $fileInfoArr = pathinfo($_FILES["actPic"]["name"]);
      $fileName = "activities_banner_{$actNo}.{$fileInfoArr["extension"]}"; //activities_banner_1.jpg

      $from = $_FILES["actPic"]["tmp_name"];
      $to = "{$path}/{$fileName}";

      if(copy($from,$to)===true){
        //將檔案名稱寫回資料庫
        $sql = "UPDATE activity SET actPic = :actPic WHERE actNo = :actNo";
        $updateActPic = $pdo->prepare($sql);
        $updateActPic -> bindValue(":actPic",$fileName);
        $updateActPic -> bindValue(":actNo",$actNo);
        $updateActPic -> execute();
        echo "Succesfully uploaded";
        $pdo->commit();			
      }else{
        $pdo->rollBack();
      }

    }else{
      echo "錯誤代碼 : {$_FILES["actPic"]["error"]}";
      echo "新增失敗";
      $pdo->rollBack();
    }
    
  }catch(PDOException $e){
    $errMsg .="錯誤原因: ".$e->getMessage()."<br>";
    $errMsg .="錯誤行號: ".$e->getLine()."<br>";
  }
?>