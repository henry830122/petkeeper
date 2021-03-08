function id(id) {
  return document.getElementById(id);
}

function adminLogin() {
  //--------------------回後端撈管理者SESSION
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status == 200) {
      var adminId = xhr.responseText;
      id('adminName').innerHTML = `${adminId} 您好`;
    } else {
      console.log(xhr.status);
    }
  }
  xhr.open("get", `./php/share_adminLogIn.php?`, true);
  xhr.send(null);
}

function adminLogout(){
  id('adminLogout').addEventListener("click",function(){
    //--------------------回後端刪SESSION
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (xhr.status == 200) {
        console.log("確認刪除資料");
      } else {
        console.log(xhr.status);
      }
    }
    xhr.open("get", `./php/share_adminLogOut.php?`, true);
    xhr.send(null);
  });
}

window.addEventListener("load", function () {
  /** 管理員登入 **/
  adminLogin(); //管理員登入
  adminLogout(); //管理員登出
}, true);