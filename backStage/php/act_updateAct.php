<?php
  $errMsg="";
  try{
    require_once("../../connectdd103g3.php");
    $pdo->beginTransaction();
    if( $_FILES["actPic"]["error"] == UPLOAD_ERR_OK){
      /** 有重新上傳圖片 **/
      $sql = "UPDATE `activity` SET `actType` = :actType, `actText` = :actText, `actNum` = :actNum, `actDate` = :actDate, `actStatus` = :actStatus, `actName` = :actName, `deadline` = :deadline, `actLoc` = :actLoc, `actPic` ='', `mapLat` = :mapLat, `mapLong` = :mapLong WHERE `actNo` = :actNo;";

      $updateAct = $pdo->prepare($sql);
      $updateAct->bindValue(":actType",$_POST['actType']);
      $updateAct->bindValue(":actText",$_POST['actText']);
      $updateAct->bindValue(":actNum",$_POST['actNum']);
      $updateAct->bindValue(":actDate",$_POST['actDate']);
      if(isset($_POST['actStatus']) == true){
        $updateAct->bindValue(":actStatus",$_POST['actStatus']);
      }else{
        $updateAct->bindValue(":actStatus",1);
      }
      $updateAct->bindValue(":actName",$_POST['actName']);
      $updateAct->bindValue(":deadline",$_POST['deadline']);
      $updateAct->bindValue(":actLoc",$_POST['actLoc']);
      $updateAct->bindValue(":mapLat",$_POST['mapLat']);
      $updateAct->bindValue(":mapLong",$_POST['mapLong']);
      $updateAct->bindValue(":actNo",$_POST['actNo']);
      $updateAct->execute();

      //檢查images資料夾存不存在
      $path = "../images";
      if( file_exists($path) === false){
        mkdir($path);
      }
      //將檔案copy到要放的路徑
      $fileInfoArr = pathinfo($_FILES["actPic"]["name"]);
      $fileName = "activities_banner_{$_POST['actNo']}.{$fileInfoArr["extension"]}"; //activities_banner_(第幾個活動).jpg

      $from = $_FILES["actPic"]["tmp_name"];
      $to = "{$path}/{$fileName}";

      if(copy($from,$to)===true){
        //將檔案名稱寫回資料庫
        $sql = "UPDATE activity SET actPic = :actPic WHERE actNo = :actNo";
        $updateActPic = $pdo->prepare($sql);
        $updateActPic -> bindValue(":actPic",$fileName);
        $updateActPic -> bindValue(":actNo",$_POST['actNo']);
        $updateActPic -> execute();
        echo "Succesfully uploaded";
        $pdo->commit();			
      }else{
        $pdo->rollBack();
      }

    }else if($_FILES["actPic"]["error"] == UPLOAD_ERR_NO_FILE){
      /** 沒重新上傳圖片 **/
      $sql = "UPDATE `activity` SET `actType` = :actType, `actText` = :actText, `actNum` = :actNum, `actDate` = :actDate, `actStatus` = :actStatus, `actName` = :actName, `deadline` = :deadline, `actLoc` = :actLoc, `mapLat` = :mapLat, `mapLong` = :mapLong WHERE `actNo` = :actNo;";

      $updateAct = $pdo->prepare($sql);
      $updateAct->bindValue(":actType",$_POST['actType']);
      $updateAct->bindValue(":actText",$_POST['actText']);
      $updateAct->bindValue(":actNum",$_POST['actNum']);
      $updateAct->bindValue(":actDate",$_POST['actDate']);
      if(isset($_POST['actStatus']) == true){
        $updateAct->bindValue(":actStatus",$_POST['actStatus']);
      }else{
        $updateAct->bindValue(":actStatus",1);
      }
      $updateAct->bindValue(":actName",$_POST['actName']);
      $updateAct->bindValue(":deadline",$_POST['deadline']);
      $updateAct->bindValue(":actLoc",$_POST['actLoc']);
      $updateAct->bindValue(":mapLat",$_POST['mapLat']);
      $updateAct->bindValue(":mapLong",$_POST['mapLong']);
      $updateAct->bindValue(":actNo",$_POST['actNo']);
      $updateAct->execute();

      echo "Succesfully uploaded";
      $pdo->commit();

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