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
              <button type="button" class="btn btn-warning mr-1">新增管理員</button>
            </div>

            <div class="card-body">

              <?php
              

                $sql="SELECT * FROM `administrator`";

                $memback = $pdo->query($sql);

                $memback->bindColumn("adminNo", $adminNo);
                $memback->bindColumn("adminId", $adminId);
                $memback->bindColumn("adminPsw", $adminPsw);
                $memback->bindColumn("adminStatus", $adminStatus);
                
              ?>
              
              <table class="table text-center">
                <thead>
                  <tr>
                    <th>管理員編號</th>
                    <th>管理員名稱</th>
                    <th>管理員密碼</th>
                    <!-- <th>管理員權限</th> -->
                    <th>管理員編輯</th>
                    <th>管理員帳號刪除</th>
                  </tr>
                </thead>
                <tbody>

                  <?php
                    while($memback->fetch(PDO::FETCH_ASSOC)){
                      // $checktype="";
                      // if($status==1){
                      //   $checktype="checked";
                      // }else{
                      //   $checktype="";
                      // }
                  ?>
                  <tr>
                    <form action="php/adminedit.php" method="GET">

                      <td><?=$adminNo?></td>
                      <td><input class="adminId" name="adminId" type="text" value="<?=$adminId?>" disabled=""></td>
                      <td><input class="adminPsw" name="adminPsw" type="password" value="<?=$adminPsw?>" disabled=""></td>
                      <!-- <td>
                        <select class="form-control" disabled=""><option selected="" value="0">唯讀</option><option value="1">管理員</option></select>
                      </td> -->
                      <td>
                        <button type="button" class="editbtn btn btn-pill btn-primary btn-xl">編輯</button>
                        <button style="display:none;" type="submit" class="savebtn btn btn-pill btn-primary btn-xl">儲存</button>
                      </td>
                      <td>
                        <button type="button" class="btn btn-pill btn-danger btn-xl">刪除</button>
                      </td>
                      <input type="hidden" name="adminNo" value="<?=$adminNo?>">
                    </form>
                  </tr>
                  <?php
                    }
                  ?>
                </tbody>
              </table>

              <script>
                function edit(e){
                  e.target.nextElementSibling.style.display='';

                  let inputs = e.target.parentNode.parentNode.getElementsByTagName("input");
                  inputs[0].disabled=false;
                  inputs[1].disabled = false;
                }


                function save(e){
                  e.target.style.display='none';
                  
                  let inputs = e.target.parentNode.parentNode.getElementsByTagName("input");
                  // inputs[0].disabled = true;
                  // inputs[1].disabled = true;
                }

                window.onload = function () {
                  let editbtns = document.getElementsByClassName("editbtn");
                  for(let i=0; i<editbtns.length; i++){
                    editbtns[i].onclick = edit;
                  }

                  let savebtns = document.getElementsByClassName("savebtn");
                  for(let i=0; i<savebtns.length; i++){
                    savebtns[i].onclick = save;
                  }

                };
              </script>


            </div>
          </div>
        </div>
      </div>


       
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