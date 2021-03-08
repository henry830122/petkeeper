function init() {
  /*** 接資料 ***/

  //商品
  function product() {
    function showAllproduct(jsonStr) {
      var products = JSON.parse(jsonStr);
      let allprodHTML = "";
      let prodCardSection = document.querySelector('.shop-cards');

      //產生商品卡片
      for (var i = 0; i < 3; i++) {
        allprodHTML += `
                <div class="shop-card wow flipInX hover" data-wow-duration="2s" data-wow-delay="0s">
                <img src="./backStage/images/${products[i].prodPic}">
                <div class="shop-text">
                  <h4>${products[i].prodName}</h4>
                  <p>功能｜${products[i].prodText}</p>
                  <a href="products.html" class="btn">
                    <p class="btnFz">查看詳情</p>
                    <img src="img/coin.png" alt="" />
                  </a>
                </div>
              </div>
            `;
      };
      prodCardSection.innerHTML = allprodHTML;
    }
    //產生商品卡片End
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (xhr.status == 200) {
        showAllproduct(xhr.responseText);
      } else {
        alert(xhr.status);
      }
    }

    xhr.open("get", "./php/home-products.php", true);
    xhr.send(null);
  }
  product();

  //活動
  function showActivity() {
    function showAllActivity(jsonStr) {
      var activity = JSON.parse(jsonStr);
      let allActHTML = "";
      let actMiddleSection = document.querySelector('.activity-cards');


      //產生卡片
      for (var i = 0; i < 3; i++) {
        allActHTML += `
                <div class="activity-card wow flipInX hover" data-actno='${activity[i].actNo}' data-wow-duration="2s" data-wow-delay="0s">
                  <img src="./backStage/images/${activity[i].actPic}">
                  <div class="activity-text clearfix">
                    <p>${activity[i].actDate}</p>
                    <h4>${activity[i].actName}</h4>
                    <div class="signup">
                      <p>#${activity[i].actType}</p>
                      <p>${activity[i].parNum}人已報名</p>
                    </div>
                  </div>
              </div>
              `;
      };

      actMiddleSection.innerHTML = allActHTML;
      clickActCard();
    } //產生卡片End

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (xhr.status == 200) {
        showAllActivity(xhr.responseText);
      } else {
        alert(xhr.status);
      }
    }


    xhr.open("get", "./php/home-activity.php", true);
    xhr.send(null);

  };
  showActivity();

  //---------------------點擊ActCard
  function clickActCard() {
    var actCards = document.getElementsByClassName('activity-card');
    for (var i = 0; i < actCards.length; i++) {
      actCards[i].addEventListener('click', function (e) {
        var actNo = e.currentTarget.dataset.actno; //抓到data-actno

        //AJAX串接資料
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
          if (xhr.status == 200) {
            location.href = "./activityContent.html";
            //alert(xhr.responseText);
          } else {
            alert(xhr.status);
          }
        }
        xhr.open("get", `./php/activities_showAct.php?actNo=${actNo}`, true);
        xhr.send(null); //AJAX串接資料End
      });
    }
  } //點擊ActCardEnd

}
window.addEventListener("load", init, false);