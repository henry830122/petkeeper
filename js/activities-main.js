function id(id) {
  return document.getElementById(id);
}

//--------ScreenWidth
var ScreenWidth = screen.width;
//--------resize
$(window).resize(function () {
  var ScreenWidth = screen.width;
});

//========= activities.html 活動專區 ==========//
/***** 接資料 *****/
//----------------------顯示所有活動、產生頁數、顯示Banner
function showAllacts() {
  //印出JSON於DOM
  function showAllActivity(jsonStr) {
    var activities = JSON.parse(jsonStr);

    var allActHTML = "";
    let allBannerHTML = "";
    var allPagesHTML = "";
    var showActsNum = 12; //顯示幾筆資料
    var actsPages = Math.ceil(activities.length / showActsNum); //總頁數

    var actsMiddleSection = document.querySelector('.activities-acts .middle');
    let actsBannerSection = id("pics");
    var actsPagesSection = document.querySelector('.activities-acts .acts-pages');
    var actsCard = document.getElementsByClassName('act-card');
    var actPage = document.getElementsByClassName('page');

    //產生Banner
    for (var i = 0; i < 3; i++) {
      allBannerHTML += `
        <li data-actno="${activities[i].actNo}">
          <div class="pic"><img src="./backStage/images/${activities[i].actPic}"></div>
        </li>
      `;
    }
    actsBannerSection.innerHTML = allBannerHTML;
    actsBanner(); //產生BannerEnd
    clickActBanner(); //點擊Banner

    //產生卡片
    if (activities.length > showActsNum) {
      for (var i = 0; i < showActsNum; i++) {
        allActHTML += `
        <div class="act-card" data-actno="${activities[i].actNo}">
          <div class="cardImg">
            <img src="./backStage/images/${activities[i].actPic}">
          </div>
          <div class="cardInfo inner_px">
            <p id="actsDate" class="actsDate">${activities[i].actDate}</p>
            <p id="actsName" class="actsName">${activities[i].actName}</p>
            <div class="cardBottom clearFix">
              <div id="actsSort" class="actsSort">#${activities[i].actType}</div>
              <div id="actsNowNum" class="actsNowNum">${activities[i].parNum}人已報名</div>
            </div>
          </div>
        </div>
      `;
      }
      if (i < 3) {
        actsCard[i].className += "newTag";
      }
    } else {
      for (var i = 0; i < activities.length; i++) {
        allActHTML += `
        <div class="act-card" data-actno="${activities[i].actNo}">
          <div class="cardImg">
            <img src="./backStage/images/${activities[i].actPic}">
          </div>
          <div class="cardInfo inner_px">
            <p id="actsDate" class="actsDate">${activities[i].actDate}</p>
            <p id="actsName" class="actsName">${activities[i].actName}</p>
            <div class="cardBottom clearFix">
              <div id="actsSort" class="actsSort">#${activities[i].actType}</div>
              <div id="actsNowNum" class="actsNowNum">${activities[i].parNum}人已報名</div>
            </div>
          </div>
        </div>
      `;
      }
    };
    actsMiddleSection.innerHTML = allActHTML;
    clickActCard(); //點擊ActCard
    for (var i = 0; i < 3; i++) {
      actsCard[i].classList.add('newTag');
    } //產生卡片End

    //產生頁數(頁數1加上樣式)
    for (var i = 1; i <= actsPages; i++) {
      allPagesHTML += `
        <div class = "page"> ${i} </div>
      `;
    }
    actsPagesSection.innerHTML = allPagesHTML; //產生頁數End
    actPage[0].classList.add('nowPage');
    clickActPage('allacts'); //點擊Page(全部活動)
  } //印出JSON於DOM End

  //AJAX串接資料(回傳所有活動資料)
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status == 200) {
      showAllActivity(xhr.responseText);
    } else {
      console.log(xhr.status);
    }
  }
  xhr.open("get", "./php/activities_showAllact.php", true);
  xhr.send(null); //AJAX串接資料End

} //顯示所有活動、產生頁數、顯示BannerEnd

//----------------------活動類別按鈕切換
function changeActsSort() {
  let pageActsBtn = document.querySelectorAll('.acts-btns .btn');

  //切換大標文字
  for (var i = 0; i < pageActsBtn.length; i++) {
    pageActsBtn[i].addEventListener('click', function (e) {
      //let actType = document.querySelector(`${this.nodeName} p`).innerText;
      var actType = e.target.innerText;
      //let actType = document.querySelector(`${this.tagName} p`).innerText;
      //let actType = document.querySelector(`${e.currentTarget.tagName} p`).innerText; 
      //清除其他按鈕顏色
      cleanBtnBgc();
      //btn換顏色
      e.currentTarget.style.backgroundColor = "#2e5c6d";
      //改大標文字
      id('acts-title').innerText = actType;

      //印出JSON於DOM
      function selectActType(jsonStr) {
        var activities = JSON.parse(jsonStr); //JSON字串轉物件
        var allActHTML = "";
        var allPagesHTML = "";
        var showActsNum = 12; //顯示幾筆資料
        var actsPages = Math.ceil(activities.length / showActsNum); //總頁數

        var actsMiddleSection = document.querySelector('.activities-acts .middle');
        var actsPagesSection = document.querySelector('.activities-acts .acts-pages');
        var actsCard = document.getElementsByClassName('act-card');
        var actPage = document.getElementsByClassName('page');

        //產生卡片
        if (activities.length > showActsNum) {
          for (var i = 0; i < showActsNum; i++) {
            allActHTML += `
              <div class="act-card" data-actno="${activities[i].actNo}">
                <div class="cardImg">
                  <img src="./backStage/images/${activities[i].actPic}">
                </div>
                <div class="cardInfo inner_px">
                  <p id="actsDate" class="actsDate">${activities[i].actDate}</p>
                  <p id="actsName" class="actsName">${activities[i].actName}</p>
                  <div class="cardBottom clearFix">
                    <div id="actsSort" class="actsSort">#${activities[i].actType}</div>
                    <div id="actsNowNum" class="actsNowNum">${activities[i].parNum}人已報名</div>
                  </div>
                </div>
              </div>
          `;
          }
          if (i < 3) {
            actsCard[i].className += "newTag";
          }
        } else {
          for (var i = 0; i < activities.length; i++) {
            allActHTML += `
              <div class="act-card" data-actno="${activities[i].actNo}">
                <div class="cardImg">
                  <img src="./backStage/images/${activities[i].actPic}">
                </div>
                <div class="cardInfo inner_px">
                  <p id="actsDate" class="actsDate">${activities[i].actDate}</p>
                  <p id="actsName" class="actsName">${activities[i].actName}</p>
                  <div class="cardBottom clearFix">
                    <div id="actsSort" class="actsSort">#${activities[i].actType}</div>
                    <div id="actsNowNum" class="actsNowNum">${activities[i].parNum}人已報名</div>
                  </div>
                </div>
              </div>
            `;
          }
        };
        actsMiddleSection.innerHTML = allActHTML;
        clickActCard(); //點擊ActCard
        for (var i = 0; i < 3; i++) {
          actsCard[i].classList.add('newTag');
        } //產生卡片End

        //產生頁數(頁數1加上樣式)
        for (var i = 1; i <= actsPages; i++) {
          allPagesHTML += `
            <div class = "page"> ${i} </div>
          `;
        }
        actsPagesSection.innerHTML = allPagesHTML; //產生頁數End
        actPage[0].classList.add('nowPage');
        if (actType == "全部活動") {
          clickActPage('allacts'); //點擊Page(全部活動)
        } else {
          clickActPage(actType); //點擊Page(其他分類)
        };

      } //印出JSON於DOM End

      //AJAX串接資料(回傳被選的活動類別活動資料)
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (xhr.status == 200) {
          selectActType(xhr.responseText);
        } else {
          console.log(xhr.status);
        }
      }
      xhr.open("get", `./php/activities_selectActType.php?actType=${actType}`, true);
      xhr.send(null); //AJAX串接資料End
    });
  }
  //清除其他按鈕顏色
  function cleanBtnBgc() {
    for (var i = 0; i < pageActsBtn.length; i++) {
      pageActsBtn[i].style.backgroundColor = "#028090";
    }
  };
}; //活動類別按鈕切換End

//---------------------點擊Page
function clickActPage(pageType) {
  var actType = pageType;
  var actPages = document.querySelectorAll('.acts-pages .page');

  for (var i = 0; i < actPages.length; i++) {
    actPages[i].addEventListener('click', function (e) {
      var pageNo = e.currentTarget.innerText;
      //清除顏色
      var actPage = document.getElementsByClassName('page');
      for (var i = 0; i < actPages.length; i++) {
        actPage[i].classList.remove('nowPage');
      }
      //加上顏色
      e.currentTarget.classList.add('nowPage');

      //印出JSON於DOM
      function showPageActs(jsonStr) {
        var activities = JSON.parse(jsonStr);
        var allActHTML = "";
        var actsMiddleSection = document.querySelector('.activities-acts .middle');

        for (var i = 0; i < activities.length; i++) {
          allActHTML += `
            <div class="act-card" data-actno="${activities[i].actNo}">
              <div class="cardImg">
                <img src="./backStage/images/${activities[i].actPic}">
              </div>
              <div class="cardInfo inner_px">
                <p id="actsDate" class="actsDate">${activities[i].actDate}</p>
                <p id="actsName" class="actsName">${activities[i].actName}</p>
                <div class="cardBottom clearFix">
                  <div id="actsSort" class="actsSort">#${activities[i].actType}</div>
                  <div id="actsNowNum" class="actsNowNum">${activities[i].parNum}人已報名</div>
                </div>
              </div>
            </div>
          `;
        }
        actsMiddleSection.innerHTML = allActHTML;
        clickActCard(); //點擊ActCard
        var actsCard = document.getElementsByClassName('act-card');
        if (pageNo == 1) {
          for (var i = 0; i < 3; i++) {
            actsCard[i].classList.add('newTag');
          };
        };
      }; //印出JSON於DOMEnd

      //AJAX串接資料(回傳被選的活動類別與頁數活動資料)
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (xhr.status == 200) {
          showPageActs(xhr.responseText);
        } else {
          console.log(xhr.status);
        }
      }
      xhr.open("get", `./php/activities_showPageActs.php?pageNo=${pageNo}&actType=${actType}`, true);
      xhr.send(null); //AJAX串接資料End
    });
  }
} //點擊PageEnd

//---------------------點擊ActCard
function clickActCard() {
  var actCards = document.getElementsByClassName('act-card');
  for (var i = 0; i < actCards.length; i++) {
    actCards[i].addEventListener('click', function (e) {
      var actNo = e.currentTarget.dataset.actno; //抓到data-actno

      //AJAX串接資料
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (xhr.status == 200) {
          location.href = "./activityContent.html";
        } else {
          console.log(xhr.status);
        }
      }
      xhr.open("get", `./php/activities_showAct.php?actNo=${actNo}`, true);
      xhr.send(null); //AJAX串接資料End
    });
  }
} //點擊ActCardEnd

//--------------------點擊Banner
function clickActBanner() {
  var actBanners = document.querySelectorAll('.header-banner #banner #pics li');
  for (var i = 0; i < actBanners.length; i++) {
    actBanners[i].addEventListener('click', function (e) {
      var actNo = e.currentTarget.dataset.actno; //抓到data-actno

      //AJAX串接資料
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (xhr.status == 200) {
          location.href = "./activityContent.html";
        } else {
          console.log(xhr.status);
        }
      }
      xhr.open("get", `./php/activities_showAct.php?actNo=${actNo}`, true);
      xhr.send(null); //AJAX串接資料End
    });
  }
}; //點擊BannerEnd
/***** 接資料End *****/

//--------------------slider
function actsBanner() {
  let bannerDivWidth = 100;
  let bannerLis = document.querySelectorAll('.pics li');
  let bannerCounts = document.querySelectorAll('.pics li').length;

  //ul的css寬度=100*banner個數+% 
  id('pics').style.width = `${bannerDivWidth * bannerCounts}%`;
  //li的css的寬度=100/banner個數+%
  for (var i = 0; i < bannerCounts; i++) {
    bannerLis[i].style.width = `${bannerDivWidth / bannerCounts}%`;
  }

  //增加.bannerSliderWrap
  $('#banner').find('ul#pics').wrapAll('<div class="bannerSliderWrap">');
  let bannerSliderWrap = $('#banner').find('.bannerSliderWrap');
  //clone第二個#pics--寬度=bannerSliderWrap/2 %
  $('#banner').find('ul#pics').css({
    width: `${bannerDivWidth / 2}%`
  }).clone().appendTo('.bannerSliderWrap');
  //bannerSliderWrap寬度=100*banner個數*2 %
  bannerSliderWrap.css({
    width: `${bannerDivWidth * bannerCounts * 2}%`
  });

  //----------banner自動輪播
  let bannerSpeed = 3500;
  let bannerTimer;
  let sliderCounts;
  //增加Dots
  for (var i = 0; i < bannerCounts; i++) {
    $('.dotsWrap').append('<li></li>');
  }


  sliderCounts = 0;
  bannerTimer = setInterval(bannerAutoSlide, bannerSpeed);
  $(".activities-header .dotsWrap li:nth-child(1)").addClass('clickDot');

  function bannerAutoSlide() {
    //Dot換色
    $('.activities-header .dotsWrap li').removeClass('clickDot');
    $(".activities-header .dotsWrap li:eq(" + sliderCounts + ")").addClass('clickDot');
    //banner到第四張第一個dot會亮
    if (sliderCounts >= bannerCounts) {
      $(".activities-header .dotsWrap li:eq(0)").addClass('clickDot');
    }

    //當banner輪播數>banner張數，重新輪播
    if (sliderCounts > bannerCounts) {
      sliderCounts = 0;
      $('.bannerSliderWrap').css({
        left: `${sliderCounts}%`
      });
    } else {
      $('.bannerSliderWrap').animate({
        left: `${(-sliderCounts) * 100}%`,
      }, 1000, 'linear');
    }

    sliderCounts++;
  }; //banner自動輪播End

  //click dot
  $('.activities-header .dotsWrap li').click(function () {
    let dotIndex = $(this).index();
    sliderCounts = dotIndex;
    //重啟自動輪播
    clearInterval(bannerTimer);
    bannerTimer = setInterval(bannerAutoSlide, bannerSpeed);
    //點點樣式做變化
    $(this).addClass('clickDot');
    $('.activities-header .dotsWrap li').not(this).removeClass('clickDot');

    $('.bannerSliderWrap').animate({
      left: `${(-sliderCounts) * 100}%`,
    }, 1000, 'linear');
  });

} //sliderEnd

//--------------------腳步移動動畫
function pawsMove() {
  //-------腳步移動共用動畫
  let smController = new ScrollMagic.Controller();
  let pawAnime = TweenMax.staggerFromTo('.paw', .2, {
    opacity: 0,
  }, {
    opacity: 1,
  }, .5); //腳步移動共用動畫End

  var actionRange = id("acts-paws").offsetHeight;
  if (ScreenWidth < 768) {
    var scene = new ScrollMagic.Scene({
      triggerElement: '#paws-trigger',
      triggerHook: .3,
      duration: actionRange * .3,
      offset: actionRange * .2
    }).setTween(pawAnime).addTo(smController);
  } else if (ScreenWidth < 1200) {
    var scene = new ScrollMagic.Scene({
      triggerElement: '#paws-trigger',
      triggerHook: .52,
      duration: actionRange * .32,
      offset: actionRange * .1
    }).setTween(pawAnime).addTo(smController);
  } else {
    var scene = new ScrollMagic.Scene({
      triggerElement: '#paws-trigger',
      triggerHook: .58,
      duration: actionRange * .6,
      offset: actionRange * .1
    }).setTween(pawAnime).addTo(smController);
  }

  //--------resize
  $(window).resize(function () {
   var actionRange = id("acts-paws").offsetHeight;
  });
}; //腳步移動動畫End


//========= activityContent.html 活動內頁 =========//
/*** 接資料 ***/
//--------------------SHOW活動內容
function showAct() {
  let actLeftHTML = "";
  let actBannerHTML = "";
  var actRightHTML = "";
  let actLeftSection = document.querySelector('.activityContent-actInfo .left');
  let actBannerSection = id("banner");
  var actRightSection = document.querySelector('.activityContent-actInfo .signBox');

  //印出JSON於DOM
  function showActSession(jsonStr) {
    let activity = JSON.parse(jsonStr);

    //產生活動資訊
    for (var i = 0; i < activity.length; i++) {
      actLeftHTML += `
        <!-- breadCrumbs -->
        <ul class="breadCrumbs"></ul>
        <h2 class="actBigName">${activity[i].actName}</h2>
        <!-- 活動細項資訊 -->
        <ul>
          <li class="actTime">
            <bdi>活動時間:</bdi>${activity[i].actDate}
          </li>
          <li class="deadline">
            <bdi>報名截止:</bdi>${activity[i].deadline}
          </li>
          <li class="actLoc">
            <bdi>活動地點:</bdi>${activity[i].actLoc}
          </li>
          <li class="actNum">
            <bdi>人數限制:</bdi>${activity[i].actNum}人
          </li>
          <li class="actNotic">
            <ul>
              <li>※所有的活動均免費</li>
              <li>※限會員參加。<span id="showRegisterBox">點我註冊</span></li>
            </ul>
          </li>
          <li class="actDec">
            <bdi>活動介紹</bdi>
            <p>${activity[i].actText}</p>
          </li>
          <li class="actMap">
            <bdi>活動地圖</bdi>
            <div class="map">
              <map id="actMap"></map>
            </div>
          </li>
        </ul>
      `;

      actBannerHTML += `
        <img src="./backStage/images/${activity[i].actPic}">
      `;

      actRightHTML = `
        <p id="thisActNowNum" class="actNowNum">${activity[i].parNum}人已報名<span class="actNum">/${activity[i].actNum}人</span></p>
        <button id="actSignBtn" class="btn actSign">
          <p>立即報名</p>
        </button>
      `;
    }
    actLeftSection.innerHTML = actLeftHTML;
    actBannerSection.innerHTML = actBannerHTML;
    actRightSection.innerHTML = actRightHTML;
    //產生活動資訊End

    breadCrumbs(activity[0].actType); //產生麵包屑
    showMap(activity[0].mapLat, activity[0].mapLong); //活動地圖
    signBoxFix(); //signBoxFix
    confirmLogin(); //確認是否登陸
    actFull(activity[0].actNum, activity[0].parNum); //人數顯示變化
  } //印出JSON於DOMEnd

  //AJAX串接資料(回傳活動專區選擇的單筆活動SESSION裡的資料)
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status == 200) {
      showActSession(xhr.responseText);
    } else {
      console.log(xhr.status);
    }
  };
  xhr.open("get", `./php/activities_showActSession.php?`, true);
  xhr.send(null); //AJAX串接資料End
}; //SHOW活動內容End

//--------------------確認是否登陸
function confirmLogin(){
  var signBoxInner = document.querySelector('#actSignBtn p');
  //送資料到後端
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status == 200) {
      console.log(xhr.responseText);
      if (xhr.responseText == "login") {
        /** 登入 **/
        confirmActPart(); //確認是否有參加
        id('showRegisterBox').style.display = "none"; //點我註冊消失
      } else {
        /** 尚未登入 **/
        id('actSignBtn').disabled = true; //按鈕不能點按
        id('actSignBtn').style.backgroundColor = '#d8d8d8';
        id('actSignBtn').style.cursor = 'default';
        signBoxInner.innerText = "請先註冊";
        showRegisterBox(); //點我註冊
      }
    } else {
      console.log(xhr.status);
    }
  }
  xhr.open("get", `./php/activities_isLogin.php?`, true);
  xhr.send(null);
} //確認是否登陸End

//--------------------人數顯示變化
function actFull(actNumStr, parNumStr) {
  var actNum = Number(actNumStr);
  var parNum = Number(parNumStr);
  var signBoxInner = document.querySelector('#actSignBtn p');
  //活動限制人數 == 活動參加人數
  if (actNum == parNum) {
    id('actSignBtn').disabled = true; //按鈕不能點按
    id('actSignBtn').style.backgroundColor = '#d8d8d8';
    id('actSignBtn').style.cursor = 'default';
    signBoxInner.innerText = "已額滿";
    id('thisActNowNum').style.color = "#d8d8d8";
  } else if (parNum >= (actNum - 5)){
    id('thisActNowNum').style.color = "#f28123";
    document.querySelector('#thisActNowNum .actNum').style.color = "#d8d8d8";
  };
} //參加人數顯示變化End

//--------------------確認是否有報名
function confirmActPart(){
  //於DOM顯示報名狀態
  function isActPart(ans){
    var isAct = Number(ans);
    if(isAct == 1){
      alreadySignUp(); //會員已報名狀態
    }else{
      actSignUp(); //報名活動(會員尚未報名)
    };
  }; //於DOM顯示報名狀態End

  //AJAX串接資料
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status == 200) {
      isActPart(xhr.responseText); //判斷是否報名
    } else {
      console.log(xhr.status);
    }
  }
  xhr.open("get", `./php/activities_isActPart.php?`, true);
  xhr.send(null); //AJAX串接資料End
}; //確認是否有報名End

//--------------------報名活動(會員尚未報名)
function actSignUp() {
  id("actSignBtn").addEventListener('click', function (e) {
    let actSignBtnText = e.target;
    id('actSignBtn').disabled = true; //按鈕不能點按

    id('actsSignSuccessLightBox').style.display = '';
    let actSigntimer = setTimeout(closeSuccessBox, 2000);
    //click lightBOX外面關掉lightBox，顯示已報名
    id('actsSignSuccessLightBox').addEventListener('click', function () {
      id('actsSignSuccessLightBox').style.display = 'none';
      id('actSignBtn').style.backgroundColor = '#d8d8d8';
      id('actSignBtn').style.cursor = 'default';
      actSignBtnText.innerText = '已報名';
      showParNum(); //顯示報名人數
    });
    //自動關掉lightBox，顯示已報名
    function closeSuccessBox() {
      id('actsSignSuccessLightBox').style.display = 'none';
      id('actSignBtn').style.backgroundColor = '#d8d8d8';
      id('actSignBtn').style.cursor = 'default';
      actSignBtnText.innerText = '已報名';
      showParNum(); //顯示報名人數
    };

    //AJAX串接資料(活動人數+1)
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (xhr.status == 200) {
        console.log("活動人數增加了");
        actAddMem(); //活動參加表單新增資料
      } else {
        console.log(xhr.status);
      }
    }
    xhr.open("get", `./php/activities_addActParNum.php?`, true);
    xhr.send(null); //AJAX串接資料End
  });
}; //報名活動End

//--------------------活動參加表單新增資料
function actAddMem(){
  //AJAX串接資料(活動參加表單新增資料)
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status == 200) {
      console.log("活動參加表單新增了");
    } else {
      console.log(xhr.status);
    }
  }
  xhr.open("get", `./php/activities_memSignUp.php?`, true);
  xhr.send(null); //AJAX串接資料End
};//活動參加表單新增資料End

//--------------------顯示報名人數
function showParNum(){
  var signBoxNumHTML = "";
  //印出參加人數於DOM
  function printParNum(jsonStr) {
    let signUpAct = JSON.parse(jsonStr);
    for(var i=0; i<signUpAct.length; i++){
      signBoxNumHTML += `${signUpAct[i].parNum}人已報名<span class="actNum">/${signUpAct[i].actNum}人</span>`;
    };
    id('thisActNowNum').innerHTML = signBoxNumHTML;
    actFull(signUpAct[0].actNum, signUpAct[0].parNum);
  }; //印出參加人數於DOMEnd

  //AJAX串接資料(回傳活動專區選擇的單筆活動SESSION裡的資料)
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status == 200) {
      printParNum(xhr.responseText);
    } else {
      console.log(xhr.status);
    }
  };
  xhr.open("get", `./php/activities_showParNum.php?`, true);
  xhr.send(null); //AJAX串接資料End
}; //顯示報名人數End

//--------------------會員已報名
function alreadySignUp() {
  var signBoxInner = document.querySelector('#actSignBtn p');
  id('actSignBtn').disabled = true; //按鈕不能點按
  id('actSignBtn').style.backgroundColor = '#d8d8d8';
  id('actSignBtn').style.cursor = 'default';
  signBoxInner.innerText = '已報名';
}; //會員已報名End

//--------------------腳步移動動畫
function pawsMove2() {
  //-------腳步移動共用動畫
  let smController = new ScrollMagic.Controller();
  let pawAnime = TweenMax.staggerFromTo('.paw', .2, {
    opacity: 0,
  }, {
    opacity: 1,
  }, .5); //腳步移動共用動畫End

  var actionRange = id("acts-paws2").offsetHeight;
  if (ScreenWidth < 768) {
    var scene = new ScrollMagic.Scene({
      triggerElement: '#paws-trigger',
      triggerHook: .3,
      duration: actionRange * .4,
      offset: actionRange * .15
    }).setTween(pawAnime).addTo(smController);
  } else if (ScreenWidth < 1025) {
    var scene = new ScrollMagic.Scene({
      triggerElement: '#paws-trigger',
      triggerHook: .45,
      duration: actionRange * .2,
      offset: actionRange * .12
    }).setTween(pawAnime).addTo(smController);
  } else if (ScreenWidth < 1200) {
    var scene = new ScrollMagic.Scene({
      triggerElement: '#paws-trigger',
      triggerHook: .45,
      duration: actionRange * .35,
      offset: actionRange * .12
    }).setTween(pawAnime).addTo(smController);
  } else {
    var scene = new ScrollMagic.Scene({
      triggerElement: '#paws-trigger',
      triggerHook: .58,
      duration: actionRange * .6,
      offset: actionRange * .1
    }).setTween(pawAnime).addTo(smController);
  }

  //--------resize
  $(window).resize(function () {
    var actionRange = id("acts-paws2").offsetHeight;
  });
}; //腳步移動動畫結束

//--------------------signBoxFix
function signBoxFix() {
  var signBox = document.querySelector('.activityContent-actInfo .signBox');
  var actRightSectionWidth = document.querySelector('.activityContent-actInfo .right').offsetWidth;

  if (ScreenWidth > 768) {
    var startFix = document.querySelector('.activityContent-header').offsetHeight;

    $(window).scroll(function () {
      var startFix = document.querySelector('.activityContent-header').offsetHeight;
      if ($(document).scrollTop() < startFix) {
        signBox.classList.remove('signBoxFix');
      } else {
        signBox.classList.add('signBoxFix');
        signBox.style.width = (actRightSectionWidth * 0.699833) + 'px';
      }
    });
  };

  $(window).resize(function () {
    var ScreenWidth = screen.width;
    var startFix = document.querySelector('.activityContent-header').offsetHeight;
    if (ScreenWidth > 768) {
      var actRightSectionWidth = document.querySelector('.activityContent-actInfo .right').offsetWidth;
      $(window).scroll(function () {
        var startFix = document.querySelector('.activityContent-header').offsetHeight;
        if ($(document).scrollTop() < startFix) {
          signBox.classList.remove('signBoxFix');
        } else {
          signBox.classList.add('signBoxFix');
          signBox.style.width = (actRightSectionWidth * 0.699833) + 'px';
        }
      });
    };
  });
}; //signBoxFixEnd

//--------------------活動地圖
function showMap(actLat, actLng) {
  let area = id('actMap');
  let actLatLng = new google.maps.LatLng(actLat, actLng);
  let options = {
    zoom: 14,
    center: actLatLng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };
  let actMap = new google.maps.Map(area, options);
  let marker = new google.maps.Marker({
    position: actLatLng,
    map: actMap,
    icon: './img/activities_mapLocation.png',
  });
} //活動地圖End

//--------------------麵包屑
function breadCrumbs(actType) {
  var actType = actType;
  //let breadCrumbsLast = document.querySelectorAll('.breadCrumbs li:last-child')[0];
  let actBigTitle = document.querySelectorAll('.actBigName')[0];
  $('.breadCrumbs').append('<li><a href="activities.html">活動專區</a></li>');
  //第二個需要判斷在前一頁是否有click頁籤
  $('.breadCrumbs').append(`<li><a href="activities.html">${actType}</a></li>`);
  //麵包屑最後一項跟活動標題一樣
  $('.breadCrumbs').append(`<li>${actBigTitle.innerText}</li>`);
} //麵包屑End

//--------------------點我註冊
function showRegisterBox() {
  id('showRegisterBox').addEventListener("click",function(){
    //打開註冊燈箱
    id("loginbox").style.display = "none";
    id("login").style.display = "";
    id("registeredbox").style.display = "";
  });
}; //點我註冊End

//--------------------init
function init(){
  //---------依頁面標題載入function
  switch (document.title) {
    case "活動專區--鏟屎官":
      showAllacts();
      pawsMove();
      changeActsSort();
      break;
  
    case "活動內容--鏟屎官":
      showAct(); 
      pawsMove2();
      break;
  }
};//initEnd
window.addEventListener("load",init,false);
