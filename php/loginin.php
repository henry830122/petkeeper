<?php
	session_start();

	try{
	    require_once("../connectdd103g3.php");

	    if(isset($_POST["loginId"])){
	        $sql='select * from `member` where memId=:loginId and memPsw=:loginPsw and status=1';

	        $user=$pdo->prepare($sql);

	        $user->bindValue(":loginId",$_POST["loginId"]);
			$user->bindValue(":loginPsw",$_POST["loginPsw"]);

	        $user->execute();

	        if($user->rowCount() == 0){
	            echo '登入失敗';
	        }else{
	            $userRow=$user->fetchAll(PDO::FETCH_ASSOC);
	            $_SESSION['memNo']=$userRow[0]['memNo'];
	            $_SESSION['memId']=$userRow[0]['memId'];
	            $_SESSION['memPsw']=$userRow[0]['memPsw'];
	            // echo json_encode($userRow);
	            echo $_SESSION['memId'],$_SESSION['memPsw'];
	        };


	    }else{
	        // $sql='select * from `member` where loginId=:loginId;';

	        // $user=$pdo->prepare($sql);
	        // $user->bindValue(':memId',$_SESSION['memId']);
	        // $user->execute();
	        // $userRow=$user->fetchAll(PDO::FETCH_ASSOC);
	        // echo json_encode($userRow);
	        echo "0";
	    }

	}catch(PDOException $e){
	    echo "青菜";

	}
?>