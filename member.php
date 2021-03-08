<!DOCTYPE html>
<html>

<head>
	<meta name="viewport"
		content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no">
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>會員專區--鏟屎官</title>
	<link rel="icon" href="img/petKeepersIcon.ico" type="image/x-icon/" />
	<link rel="stylesheet" href="css/reset.css">
	<link rel="stylesheet" href="css/member.css">
	<link rel="stylesheet" href="css/fontStyle.css" />
	<link rel="stylesheet" href="css/header-footer.css" />
	<link rel="stylesheet" href="css/login.css">
	<script src="js/login.js"></script>
	<script src="js/jquery-2.2.4.min.js"></script>
	<script src="js\burger.js"></script>
</head>


<body>
	<?php
	session_start();
		require_once('connectdd103g3.php');

		// $sql="select * from `member` where memNo=4";
		
		
	?>

	<!-- 登入 -->
  <div id="login" class="col-md-12" style="display: none;">
    <!-- loginbox開始 -->
    <div id="loginbox" class="loginbox col-md-5">
      <h6>會員登入</h6>
      <div class="loginpic">
        <img src="img/logo-01.png" alt="">
      </div>
      <div class="login-input">
        <div>
          <span>帳號:</span>
          <input type="text" id="memIdInput" maxlength="10">
        </div>
        <div>
          <span>密碼:</span>
          <input type="password" id="memPswInput" maxlength="10">
        </div>
        <input type="submit" value="送出" id="login-submit">
        <span id="registeredbtn">還沒申請帳號?</span>
      </div>
      <span id="login-close">X</span>
    </div><!-- loginbox結束 -->

    <!-- registeredbox開始 -->
    <div id="registeredbox" class="registeredbox col-md-5" style="display: none;">
      <h6>會員註冊</h6>
      <div class="login-input">
        <div>
          <span>帳號:</span>
          <input type="text" name="mid" id="memIdValue" maxlength="10">
        </div>
        <div>
          <span>密碼:</span>
          <input type="password" name="mpsw" id="memPswValue" maxlength="10">
        </div>
        <div>
          <span>姓名:</span>
          <input type="text" name="mname" id="memNameValue" maxlength="10">
        </div>
        <div>
          <span>暱稱:</span>
          <input type="text" name="mnick" id="memNickValue" maxlength="10">
        </div>
        <div>
          <span>性別:</span>
          <div class="registeredsex">
            <input type="radio" name="sex" value="0" style="width: 20px;" checked>男
            <input type="radio" name="sex" value="1" style="width: 20px;">女
          </div>
        </div>
        <div>
          <span>信箱:</span>
          <input type="text" name="memail" id="memMailValue" maxlength="50">
        </div>
        <div>
          <span>手機:</span>
          <input type="text" name="mphone" id="memPhoneValue" maxlength="10">
        </div>
        <p class="logInAlert">※以上欄位都必須填寫</p>
        <input type="submit" value="送出" id="registered-submit">
      </div>
      <span id="registered-close">X</span>
    </div><!-- registeredbox結束 -->

  </div><!-- 登入結束 -->


	<!-- header開始 -->
  <header>
  	<div class="index-logo">
  		<div class="logo">
  			<a href="home.html"><img src="./img/logo.png" alt="" /></a>
  		</div>
  	</div>
  	<div class="menu">
  		<ul class="menu-ul">
  			<li><a id="enterPethouse">寵物當家</a></li>
  			<li><a href="beAPetKeeper.html">成為飼主</a></li>
  			<li><a href="products.html">寵物商店</a></li>
  			<li><a href="activities.html">活動專區</a></li>
  			<div class="login">
  				<div class="login-status">
  					<a id="loginopenbtn">登入</a>
  					<b>|</b>
  					<a id="registeredopenbtn">註冊</a>
  				</div>
  			</div>
  		</ul>
  	</div>
  	<div class="burger">
  		<span class="bar1" id="bar"></span>
  		<span class="bar2" id="bar"></span>
  		<span class="bar3" id="bar"></span>
  	</div>
  </header>
	<!-- header結束 -->



	<!-- footer開始 -->
	<div class="wrap">

		<!-- 會員開始 -->
		<div class="member-wrap">
			<div class="member">
				<?php

					$sql="select * from `member` where memNo={$_SESSION['memNo']}";
					$member = $pdo->query($sql);
					$member->bindColumn("petPic", $petPic);

				?>

				<div class="member-left col-12 col-md-3">
					<!-- 會員左邊 -->

					<div class="member-left-box">
						<div class="member-left-bighead">
							<?php
							while($member->fetch(PDO::FETCH_ASSOC)){

							?>
							<img src="img/user/<?=$petPic?>" alt="">
							<?php
								}
							?>
						</div>
						<span><?=$_SESSION['memNick']?></span>

						<div class="member-left-page">
							<span id="memberbtn1" style="color:#ffc342">個人資料</span>
							<span id="memberbtn2">購買紀錄</span>
							<span id="memberbtn3">活動紀錄</span>
						</div>
					</div>

				</div><!-- 左邊結束 -->


				<div class="member-right col-12 col-md-9">
					<!-- 會員右邊 -->

					<div class="member-right-box col-md-10">
						<h2 id="member-right-title">個人資料</h2>
						<?php

							$sql="select * from `member` where memNo={$_SESSION['memNo']}";

							$member2 = $pdo->query($sql);

							$member2->bindColumn("memName", $memName);
							$member2->bindColumn("memTel", $memTel);
							$member2->bindColumn("sex", $sex);
							$member2->bindColumn("petName", $petName);
							$member2->bindColumn("memNick", $memNick);
							$member2->bindColumn("email", $email);
							$member2->bindColumn("coin", $coin);
						?>

						

						<?php
							$sql="SELECT COUNT(*) FROM `member` WHERE `coin`> (SELECT `coin` FROM `member` WHERE memNo={$_SESSION['memNo']});";

							$memcount=$pdo->query($sql);
							$memcount->bindColumn(1, $count);

						?>

						<!-- 個人資料 -->
						<table id="member1">
							
							<?php
								while($member2->fetch(PDO::FETCH_ASSOC)){
									$sexturn="";
									if($sex==true){
										$sexturn="女";
									}else{
										$sexturn="男";
									}

									$petNameturn="";
									if($petName==null){
										$petNameturn="尚未遊玩";
									}else{
										$petNameturn=$petName;
									}

									$memcount->fetch(PDO::FETCH_ASSOC);
							?>

							<tr>
								<td>姓名:</td>
								<td><?=$memName?></td>
							</tr>
							<tr>
								<td>暱稱:</td>
								<td><?=$memNick?></td>
							</tr>
							<tr>
								<td>電話:</td>
								<td><?=$memTel?></td>
							</tr>
							<tr>
								<td>性別:</td>
								<td><?=$sexturn?></td>
							</tr>
							<tr>
								<td>寵物:</td>
								<td><?=$petNameturn?></td>
							</tr>
							<tr>
								<td>信箱:</td>
								<td><?=$email?></td>
							</tr>
							<tr>
								<td>愛心幣:</td>
								<td><?=$coin?></td>
							</tr>
							<tr>
								<td>愛心幣排名:</td>
								<td>第<?=$count+1?>名</td>
							</tr>
							
							<?php
								}
							?>

						</table>
						<!-- <button id="reset">修改</button> -->



						<?php
							$sql="SELECT `backpack`.`memNo`,`backpack`.`date`,`product`.`prodName`,`product`.`price` FROM `backpack`,`product` WHERE `backpack`.`memNo`={$_SESSION['memNo']} AND `product`.`prodNo`=`backpack`.`prodNo` ORDER BY `backpack`.`date` DESC;";

							$memproduct = $pdo->query($sql);


							$memproduct->bindColumn("prodName", $prodName);
							$memproduct->bindColumn("price", $price);
							$memproduct->bindColumn("date", $date);
						?>


						<!-- 購買紀錄 -->
						<table id="member2" style="display: none">

							<thead>
								<tr>
									<td>商品名稱</td>
									<td>愛心幣</td>
									<td>購買日期</td>
								</tr>
							</thead>

							<?php
								while($memproduct->fetch(PDO::FETCH_ASSOC)){
								// 	while($memact->fetch(PDO::FETCH_ASSOC)){
							?>
							<tr>
								<td><?=$prodName?></td>
								<td><?=$price?></td>
								<td><?=$date?></td>
							</tr>
							<?php
								}
							?>

						</table>

						<?php

							// $sql="select * from `participate` where memNo={$_SESSION['memNo']}";
							// $mempart = $pdo->query($sql);
							// $mempart->bindColumn("actNo", $actNo);
							

							// $sql="select * from `activity` where actNo={$_SESSION['memNo']}";
							// $memact = $pdo->query($sql);
							// $memact->bindColumn("actName", $actName);

						$sql="SELECT `participate`.`memNo`,`participate`.`actNo`,`activity`.`actDate`,`activity`.`actName` FROM `participate`,`activity` WHERE   `participate`.`memNo`={$_SESSION['memNo']} AND `participate`.actNo=`activity`.actNo ORDER BY `activity`.`actDate` desc;";
						$mempart = $pdo->query($sql);
						// $mempart->bindValue(":memNo",$_SESSION['memNo']);
						// $mempart->execute();
						$mempart->bindColumn("memNo", $memNo);
						$mempart->bindColumn("actNo", $actNo);
						$mempart->bindColumn("actName", $actName);
						$mempart->bindColumn("actDate", $actDate);
							
						?>
					

						<!-- 活動紀錄 -->
						<table id="member3" style="display: none;">
							<thead>
								<td>活動名稱</td>
								<td>活動日期</td>
								<td>活動狀態</td>
							</thead>

							<?php
								while($mempart->fetch(PDO::FETCH_ASSOC)){
								// 	while($memact->fetch(PDO::FETCH_ASSOC)){
							?>
							
							<tr>
								<form action="php/memberAct.php">
									<input type="hidden" value="<?=$memNo?>" name="memNo">
									<input type="hidden" value="<?=$actNo?>" name="actNo">
									<td><?=$actName?></td>
									<td><?=$actDate?></td>
									<td>
										<button class="memAct" type="submit">取消報名</button>
									</td>
								</form>
							</tr>
		
							<?php
								}
							?>
						</table>
					</div>


				</div><!-- 右邊結束 -->
			</div>
		</div>
		<!-- 會員結束 -->

		<footer>
			<p>Copyright © 2019 PetKeepers</p>
		</footer>
	</div>
	<!-- footer結束 -->


	<script>
		// 個人資料
		function member1() {
			document.getElementById("member1").style.display = "";
			document.getElementById("member2").style.display = "none";
			document.getElementById("member3").style.display = "none";

			document.getElementById("memberbtn1").style.color = "#ffc342";
			document.getElementById("memberbtn2").style.color = "#fff";
			document.getElementById("memberbtn3").style.color = "#fff";

			document.getElementById("member-right-title").innerText = "個人資料"
			document.getElementById("reset").style.display = "";
		};
		// 購買紀錄
		function member2() {
			document.getElementById("member1").style.display = "none";
			document.getElementById("member2").style.display = "";
			document.getElementById("member3").style.display = "none";

			document.getElementById("memberbtn1").style.color = "#fff";
			document.getElementById("memberbtn2").style.color = "#ffc342";
			document.getElementById("memberbtn3").style.color = "#fff";

			document.getElementById("member-right-title").innerText = "購買紀錄"
			document.getElementById("reset").style.display = "none";
		};
		// 活動紀錄
		function member3() {
			document.getElementById("member1").style.display = "none";
			document.getElementById("member2").style.display = "none";
			document.getElementById("member3").style.display = "";

			document.getElementById("memberbtn1").style.color = "#fff";
			document.getElementById("memberbtn2").style.color = "#fff";
			document.getElementById("memberbtn3").style.color = "#ffc342";

			document.getElementById("member-right-title").innerText = "活動紀錄"
			document.getElementById("reset").style.display = "none";
		};

		// (個人資料，購買紀錄，活動紀錄)按鈕
		function memberbtn() {
			document.getElementById("memberbtn1").onclick = member1;
			document.getElementById("memberbtn2").onclick = member2;
			document.getElementById("memberbtn3").onclick = member3;
		};

		// window.onload=memberbtn;
		// window.onload=loginclosebtn;
		// window.onload=registeredclosebtn;
		// window.onload=registeredbtn;

		window.onload = function () {
			memberbtn(); // (個人資料，購買紀錄，活動紀錄)按鈕
		};
	</script>
</body>


</html>