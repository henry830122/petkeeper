<?php
	
	$errMsg="";

	try{
		require_once('../../connectdd103g3.php');

		$questAdd=$pdo->prepare("select * from `questionandlibrary`;");
	    // $questAdd->bindValue(":midd",$_GET['mid']);
	    $questAdd->execute();

	    // if($questAdd->rowCount()==0){
	        // echo "成功註冊";

			
	 
			$sql="INSERT INTO `questionandlibrary` (`quesText`,`ansAText`,`ansBText`,`rightAns`,`quesType`,`quesStatus`) VALUES (:quesText,:ansAText,:ansBText,:rightAns,0,0)";


			$statement=$pdo->prepare($sql);


			$statement->bindValue(":quesText",$_GET["quesText"]);
			$statement->bindValue(":ansAText",$_GET["ansAText"]);
			$statement->bindValue(":ansBText",$_GET["ansBText"]);
			$statement->bindValue(":rightAns",$_GET["rightAns"]);
			// $statement->bindValue(":memail",$_GET["memail"]);
			// $statement->bindValue(":mphone",$_GET["mphone"]);
			// $statement->bindValue(":sex",1);



			$statement->execute();
		
	        // header("Location: ../home.html");
	        echo "<script>alert('成功新增');</script>";
			// echo "<script>history.go(-1)</script>";
			echo "<script>location.href='../question.php';</script>";

		// }else{
	 //        echo "<script>alert('帳號重複');</script>";
	 //        echo "<script>history.go(-1)</script>";
	 //    }
		

	}catch (PDOException $e) {
		$errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
		$errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
	};
?>