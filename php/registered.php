<?php
	
	$errMsg="";

	try{
		require_once('../connectdd103g3.php');

		$findId=$pdo->prepare("select * from `member` where memId=:midd");
	    $findId->bindValue(":midd",$_GET['mid']);
	    $findId->execute();

	    if($findId->rowCount()==0){
	        // echo "成功註冊";

			
	 
			$sql="INSERT INTO `member` (`memId`,`memPsw`,`memName`,`memNick`,`sex`,`email`,`memTel`,`petType`,`petPic`,`status`,`petName`,`coin`,`Feelfull`,`feedNum`,`lastFeed`,`petColor`) VALUES (:mid,:mpsw,:mname,:mnick,:sex,:memail,:mphone,null,null,1,null,0,null,0,null,null)";


			$statement=$pdo->prepare($sql);


			$statement->bindValue(":mid",$_GET["mid"]);
			$statement->bindValue(":mpsw",$_GET["mpsw"]);
			$statement->bindValue(":mname",$_GET["mname"]);
			$statement->bindValue(":mnick",$_GET["mnick"]);
			$statement->bindValue(":memail",$_GET["memail"]);
			$statement->bindValue(":mphone",$_GET["mphone"]);
			$statement->bindValue(":sex",1);



			$statement->execute();
		
	        // header("Location: ../home.html");
	        echo "<script>alert('註冊成功');</script>";
	        echo "<script>history.go(-1)</script>";

		}else{
	        echo "<script>alert('帳號重複');</script>";
	        echo "<script>history.go(-1)</script>";
	    }
		

	}catch (PDOException $e) {
		$errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
		$errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
	};
?>