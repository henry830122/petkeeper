<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
  <title>鏟屎官後台</title>

  <!-- Icons-->
  <link href="node_modules/@coreui/icons/css/coreui-icons.min.css" rel="stylesheet">
  <link href="node_modules/flag-icon-css/css/flag-icon.min.css" rel="stylesheet">
  <link href="node_modules/font-awesome/css/font-awesome.min.css" rel="stylesheet">
  <link href="node_modules/simple-line-icons/css/simple-line-icons.css" rel="stylesheet">
  <!-- Main styles for this application-->
  <script src="js/main.js"></script>
  <script src="js/share_BSLogin.js"></script>
  <link href="css/style.css" rel="stylesheet">
  <script src="../js/jquery-3.4.1.min.js"></script>
</head>

<body class="app header-fixed sidebar-fixed aside-menu-fixed sidebar-lg-show">


  <?php
  session_start();
    require_once('../connectdd103g3.php');
  ?>


 <!-- top_header -->
 <header class="app-header navbar">
    <button class="navbar-toggler sidebar-toggler d-lg-none mr-auto" type="button" data-toggle="sidebar-show">
      <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand" href="#">
      <img class="navbar-brand-full" src="img/logo.png" width="119" height="33" alt="CoreUI Logo">
    </a>
    <button class="navbar-toggler sidebar-toggler d-md-down-none" type="button" data-toggle="sidebar-lg-show">
      <span class="navbar-toggler-icon"></span>
    </button>
    

    <!-- 歡迎，登出 -->
    <ul class="nav navbar-nav ml-auto">
      <li id="adminName" class="nav-item mr-3"></li>
      <a id="adminLogout" class="nav-item mr-3" href="../backStageLogin.html">登出</a>
    </ul>

  </header>


  <div class="app-body">
    <div class="sidebar">
       <!-- sidebar  menu -->
      <nav class="sidebar-nav">
    <ul class="nav">

      <li class="nav-title">後台管理</li>
      <!-- 管理員管理 -->
      <li class="nav-item">
      <a class="nav-link" href="admin.php">
          <i class="nav-icon icon-key"></i>管理員管理</a>
      </li>

      <li class="nav-title">前台管理</li>    
      <!-- 會員管理 -->
      <li class="nav-item">
        <a class="nav-link" href="member.php">
          <i class="nav-icon icon-people"></i>會員管理</a>
      </li>
      <!-- 問答題庫管理 -->
      <li class="nav-item">
        <a class="nav-link" href="question.php">
          <i class="nav-icon icon-people"></i>問答題庫管理</a>
      </li>
      <!-- 活動區管理 -->
      <li class="nav-item">
        <a class="nav-link" href="act.html">
          <i class="nav-icon icon-calendar"></i>活動區管理</a>
      </li>
      <!-- 商品管理 -->
      <li class="nav-item">
        <a class="nav-link" href="product.html">
          <i class="nav-icon icon-people"></i>商品管理</a>
      </li>
      <!-- 寵物元件管理 -->
      <li class="nav-item">
        <a class="nav-link" href="petcom.html">
          <i class="nav-icon icon-wrench"></i>寵物元件管理</a>
      </li> 
      <!-- <li class="divider"></li> -->
      
    </ul>
  </nav>
      <button class="sidebar-minimizer brand-minimizer" type="button"></button>
    </div>


    <main class="main">

      <!-- 中間內容 -->
      <div class="container-fluid">
   
       <!-- 中間內容 -->
       <div class="row">
        <div class="col-md-12">
          <div class="card">
            
            <!-- card-header -->
            <div class="card-header justify-content-end d-flex">

            </div>

            <div class="card-body">              
              <div class="row">

                <?php
              

                $sql="SELECT * FROM `questionandlibrary`";

                $memback = $pdo->query($sql);

                $memback->bindColumn("quesNo", $quesNo);
                $memback->bindColumn("quesText", $quesText);
                $memback->bindColumn("ansAText", $ansAText);
                $memback->bindColumn("ansBText", $ansBText);
                $memback->bindColumn("quesStatus", $quesStatus);
                $memback->bindColumn("rightAns", $rightAns);


              ?>


                <div class="col-lg-6">
                  <div class="card">
                    <div class="card-header">新增題目</div>
                    <div class="card-body">
                      <form action="php/questAdd.php" method="GET">
                        <table class="table">
                          <tr>
                            <th>題目內容</th>
                            <td>
                              <textarea class="form-control" rows="3" value="" name="quesText">
                              </textarea>
                            </td>
                          </tr>
                          <tr>
                            <th>正確選項</th>
                            <td><input type="text" name="ansAText"></td>
                          </tr>
                          <tr>
                            <th>錯誤選項</th>
                            <td><input type="text" name="ansBText"></td>
                          </tr>
                          <tr>
                            <th>正確答案</th>
                            <td>
                              <textarea class="form-control" rows="3" value="" name="rightAns">
                              </textarea>
                            </td>
                          </tr>

                        </table>
                        <div class="col-xl-4 mb-3 mb-xl-0">
                          <submit>
                            <button class="btn btn-pill btn-block btn-primary" type="submit">確認新增</button>
                          </submit>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                <?php
                  while($memback->fetch(PDO::FETCH_ASSOC)){
                    $checktype="";
                    if($quesStatus==0){
                      $checktype="checked";
                    }else{
                      $checktype="";
                    }
                ?>

                <div class="col-lg-6">
                  <div class="card">
                    <div class="card-header">題目編號#<?=$quesNo?></div>
                    <div class="card-body">
                      <form action="">
                        <table class="table">
                          <!-- <tr>
                            <th>題目類別</th>
                            <td>
                              <select class="form-control equipClass">
                                <option value="0">狗</option>
                                <option value="1">貓</option>
                              </select>
                            </td>
                          </tr> -->
                          <tr>
                            <th>題目內容</th>
                            <td>
                              <textarea class="form-control" rows="3" value=""><?=$quesText?>
                              </textarea>
                            </td>
                          </tr>
                          <tr>
                            <th>正確選項</th>
                            <td><input type="text" value="<?=$ansAText?>"></td>
                          </tr>
                          <tr>
                            <th>錯誤選項</th>
                            <td><input type="text" value="<?=$ansBText?>"></td>
                          </tr>
                          <tr>
                            <th>題庫狀態</th>
                            <td>
                              <label class="switch switch-3d switch-success">
                                <input type="checkbox" class="switch-input" <?=$checktype?> onclick="updateQues(<?=$quesNo?>, this.checked)">
                              <span class="switch-slider" data-checked="" data-unchecked=""></span>
                            </label>
                            </td>
                          </tr>
                          <tr>
                            <th>正確答案</th>
                            <td>
                              <textarea class="form-control" rows="3" value=""><?=$rightAns?>
                              </textarea>
                            </td>
                          </tr>
                        </table>
                        <!-- <div class="col-xl-4 mb-3 mb-xl-0">
                          <button class="btn btn-pill btn-block btn-warning" type="button" onclick="updateQues(<?=$quesNo?>, this.checked)">修改</button>
                        </div> -->
                      </form>
                    </div>
                  </div>
                </div>

                <?php
                  }
                ?>
            </div>
          </div>
        </div>
      </div>

      <script>
        function updateQues(quesNo, quesStatus){
          quesStatus = quesStatus==false? 1 : 0;
          location.href="updateQuestStatus.php?quesNo="+quesNo+"&quesStatus="+quesStatus;
        }

      </script>
     
      </div><!-- 中間內容end -->
    </main>
    
  </div>

  
  <footer class="app-footer">
    <div>
      <span>&copy; 2019 Copyright PetKeepers</span>
    </div>
  </footer>
  <!-- CoreUI and necessary plugins-->
  <script src="node_modules/jquery/dist/jquery.min.js"></script>
  <script src="node_modules/popper.js/dist/umd/popper.min.js"></script>
  <script src="node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
  <script src="node_modules/pace-progress/pace.min.js"></script>
  <script src="node_modules/perfect-scrollbar/dist/perfect-scrollbar.min.js"></script>
  <script src="node_modules/@coreui/coreui/dist/js/coreui.min.js"></script>
</body>
</html>