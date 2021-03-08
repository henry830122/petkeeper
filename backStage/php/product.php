<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>

<!-- 上傳圖片與新增商品 -->
<?php
// $prodType=$_POST['type'];
// $prodName=$_POST['pName'];
// // $prodPic=$_POST['img'];
// $prodText=$_POST['pInfo'];
// $price=$_POST['pPrice'];
// $prodStatus=$_POST['pStatus'];
$errMsg="";
try {
	require_once("../../connectdd103g3.php");
	$pdo->beginTransaction();
	//.......確定是否上傳成功
	if( $_FILES["upFile"]["error"] == UPLOAD_ERR_OK){
		
		$sql = "INSERT INTO `product` 
      (`prodStatus`,`prodType`,`prodName`,`prodText`,`price`,prodPic) values
     (0,:type,:pName,:pInfo,:pPrice,'');";
		$addProd = $pdo->prepare($sql);
    // $addProd->bindValue(":prodStatus",0);
    $addProd->bindValue(":type",$_POST['type']);
    $addProd->bindValue(":pName",$_POST['pName']);
    $addProd->bindValue(":pInfo",$_POST['pInfo']);
    $addProd->bindValue(":pPrice",$_POST['pPrice']);
    $addProd->execute();

		//取得自動創號的key值
		$psn = $pdo->lastInsertId();

		//先檢查images資料夾存不存在
		if( file_exists("images") === false){
			mkdir("images");
		}
		//將檔案copy到要放的路徑
		$fileInfoArr = pathinfo($_FILES["upFile"]["name"]);
		$fileName = "{$psn}.{$fileInfoArr["extension"]}";  //8.gif

		$from = $_FILES["upFile"]["tmp_name"];
		$to = "../images/$fileName";
		if(copy( $from, $to)===true){
			//將檔案名稱寫回資料庫
			$sql = "update product set prodPic = :image where prodNo =$psn";
			$addProd = $pdo->prepare($sql);
			$addProd -> bindValue(":image", $fileName);
			$addProd -> execute();
			// echo "新增成功~";
			$pdo->commit();	
			header("location:../product.html");		
		}else{
			$pdo->rollBack();
			// echo "<script>history.go(-1)</script>";	
		}

	}else{
		echo "錯誤代碼 : {$_FILES["upFile"]["error"]} <br>";
		echo "新增失敗<br>";
		$pdo->rollBack();
	}
} catch (PDOException $e) {
	$pdo->rollBack();
	$errMsg .= "錯誤原因 : ".$e -> getMessage(). "<br>";
	$errMsg .= "錯誤行號 : ".$e -> getLine(). "<br>";	
}
echo $errMsg;
  // try{
  //   require_once("../../connectdd103g3.php");
  //   $sql = "insert into `product` 
  //   (prodStatus,prodType,prodName,prodPic,prodText,price) value 
  //   (:prodStatus,:prodType,:prodName,:prodPic,:prodText,:price);";
  //   $addProd = $pdo->prepare($sql);
  //   $addProd->bindValue(":prodStatus",0);
  //   $addProd->bindValue(":prodType",$prodType);
  //   $addProd->bindValue(":prodName",$prodName);
  //   $addProd->bindValue(":prodPic",$prodPic);
  //   $addProd->bindValue(":prodText",$prodText);
  //   $addProd->bindValue(":price",$price);
  //   $addProd->execute();  
  // }catch(PDOException $e){
  //   $errMsg .="錯誤原因: ".$e->getMessage()."<br>";
  //   $errMsg .="錯誤行號: ".$e->getLine()."<br>";
  //   echo $errMsg;
  // }
 
?>
  
</body>
</html>


    
