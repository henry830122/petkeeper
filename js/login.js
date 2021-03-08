function id(id) {
	return document.getElementById(id);
}

/** 註冊燈箱 **/
// 註冊燈箱關閉按鈕(click事件->關閉登入/註冊燈箱)
function registeredclosebtn() {
	id("registered-close").onclick = loginclose;
}

// 註冊(click事件->註冊燈箱打開||登出)
function registeredopenbtn() {
	id("registeredopenbtn").onclick = registered;
}

// 註冊燈箱打開||登出
function registered() {
	if (id("registeredopenbtn").innerText == "註冊") {
		/** 尚未登入 **/
		//打開註冊燈箱
		id("loginbox").style.display = "none";
		id("login").style.display = "";
		id("registeredbox").style.display = "";
		sendRegisteredbtn(); //送出註冊按鈕(click事件->送出註冊表單)
	} else {
		/** 登出 **/
		if (document.title == "會員專區--鏟屎官" || document.title == "寵物當家--鏟屎官") {
			location.href = "./home.html";
		} else {
			window.location.reload(); //重新刷新頁面
		};
		//將登出的字改成註冊
		//將會員暱稱改成登入
		id("registeredopenbtn").innerText = "註冊";
		id("loginopenbtn").innerText = "登入";
		//--------------------回Server端清除session資料
		window.sessionStorage.removeItem('memId');//成為飼主新增，不要再刪掉！！
		window.sessionStorage.removeItem('petName');//成為飼主新增，不要再刪掉！！
		var xhr = new XMLHttpRequest();
		xhr.onload = function () {
			if (xhr.status == 200) {
				console.log("已清除資料了");
			} else {
				alert(xhr.status);
			}
		}
		xhr.open("get", `./php/share_ajaxLogout.php`, true);
		xhr.send(null); //AJAX串接資料End
	}
}

// 送出註冊按鈕(click事件->送出註冊表單)
function sendRegisteredbtn() {
	/** 檢查帳號 **/
	id('memIdValue').addEventListener("blur", function () {
		var memIdValue = id('memIdValue').value;
		//--------------------回Server端檢查帳號是否被使用
		var xhr = new XMLHttpRequest();
		xhr.onload = function () {
			if (xhr.status == 200) {
				var idRes = xhr.responseText;
				if (idRes == "0") {
					id('memIdValue').focus();
					id('memIdValue').value = "";
					id('memIdValue').placeholder = "此帳號已被使用";
				}
			} else {
				alert(xhr.status);
			}
		}
		xhr.open("get", `./php/share_checkMemId.php?resMemId=${memIdValue}`, true);
		xhr.send(null);
	});

	/** 檢查密碼 **/
	id('memPswValue').addEventListener("blur", function () {
		var memPswValue = id('memPswValue').value;
		//--------------------回Server端檢查密碼是否被使用
		var xhr = new XMLHttpRequest();
		xhr.onload = function () {
			if (xhr.status == 200) {
				var pswRes = xhr.responseText;
				if (pswRes == "0") {
					id('memPswValue').focus();
					id('memPswValue').value = "";
					id('memPswValue').placeholder = "此密碼已被使用";
				}
			} else {
				alert(xhr.status);
			}
		}
		xhr.open("get", `./php/share_checkMemId.php?resMemPsw=${memPswValue}`, true);
		xhr.send(null);
	});

	/**送出表單 **/
	id('registered-submit').addEventListener('click', function () {
		var sexValue = document.querySelector('input[name="sex"]:checked').value;
		var memIdValue = id('memIdValue').value;
		var memPswValue = id('memPswValue').value;
		var memNameValue = id('memNameValue').value;
		var memNickValue = id('memNickValue').value;
		var memMailValue = id('memMailValue').value;
		var memPhoneValue = id('memPhoneValue').value;
		if (memIdValue == "") {
			id('memIdValue').focus();
			id('memIdValue').placeholder = "請填寫您的帳號";
		} else if (memPswValue == "") {
			id('memPswValue').focus();
			id('memPswValue').placeholder = "請填寫您的密碼";
		} else if (memNameValue == "") {
			id('memNameValue').focus();
			id('memNameValue').placeholder = "請填寫您的姓名";
		} else if (memNickValue == "") {
			id('memNickValue').focus();
			id('memNickValue').placeholder = "請填寫您的暱稱";
		} else if (memMailValue == "") {
			id('memMailValue').focus();
			id('memMailValue').placeholder = "請填寫您的信箱";
		} else if (memMailValue.indexOf("@") < 0) {
			id('memMailValue').focus();
			id('memMailValue').value = "";
			id('memMailValue').placeholder = "信箱格式不符";
		} else if (memPhoneValue == "") {
			id('memPhoneValue').focus();
			id('memPhoneValue').placeholder = "請填寫您的手機";
		} else {
			//--------------------回Server端送出表單
			console.log(typeof (memPswValue));
			$.ajax({
				url: './php/share_registered.php',
				datatype: 'json',
				data: {
					id: memIdValue,
					psw: memPswValue,
					name: memNameValue,
					nick: memNickValue,
					mail: memMailValue,
					phone: memPhoneValue,
					sex: parseInt(sexValue),
				},
				type: 'POST',
				success: function () {
					window.sessionStorage.setItem('memId', memIdValue); //成為飼主新增 不要再刪掉！！
					window.sessionStorage.setItem('petName', "null");//成為飼主新增 不要再刪掉！！
					window.location.reload(); //重新刷新頁面
				},
			});
		}
	});
}


/** 登入燈箱 **/
// 登入(click事件->開啟登入燈箱||跳轉到會員頁面)
function loginopenbtn() {
	id("loginopenbtn").onclick = loginopen;
}

// 還沒註冊?(click事件->註冊燈箱打開)
function registeredbtn() {
	id("registeredbtn").onclick = registered;
}

// 登入燈箱關閉按鈕(click事件->關閉登入/註冊燈箱)
function loginclosebtn() {
	id("login-close").onclick = loginclose;
}

// 送出表單按鈕(click事件->送出登入表單)
function sendLoginBtn() {
	id("login-submit").onclick = sendLoginForm;
}

// 開啟登入燈箱||跳轉到會員頁面
function loginopen() {
	if (id('loginopenbtn').innerText == "登入") {
		/** 尚未登入 **/
		//打開登入燈箱
		id("login").style.display = "";
		id("loginbox").style.display = "";
		id("registeredbox").style.display = "none";
	} else {
		/** 會員登入 **/
		//跳轉到會員頁面
		location.href = "./member.php";
	}
} // 開啟登入燈箱End

//送出登入表單-->帳密認證
function sendLoginForm() {
	var memId = id("memIdInput").value;
	var memPsw = id("memPswInput").value;
	//--------------------回Server端檢查帳密是否正確
	var xhr = new XMLHttpRequest();
	xhr.onload = function () {
		if (xhr.status == 200) {
			if (xhr.responseText == "AccountError") {
				/** 帳密錯誤 **/
				alert("帳密錯誤，請重新輸入。");
			} else if (xhr.responseText == "suspended") {
				/** 被停權 **/
				alert("您似乎被停權了，如有問題請洽詢鏟屎官聯絡電話或信箱。");
			} else {
				/** 帳密正確 **/
				//將登入改成會員名稱
				//將註冊改成登出
				//將登入面板上資料全清空
				//關閉燈箱
				var loginMember = JSON.parse(xhr.responseText);
				window.sessionStorage.setItem('memId', loginMember.memId); //成為飼主新增 不要再刪掉！！
				window.sessionStorage.setItem('petName', loginMember.petName);//成為飼主新增 不要再刪掉！！
				id("loginopenbtn").innerText = loginMember.memNick;//放入會員暱稱
				id("registeredopenbtn").innerText = "登出";
				id("memIdInput").value = "";
				id("memPswInput").value = "";
				loginclose();
				window.location.reload();//重新刷新頁面
			}
		} else {
			alert(xhr.status);
		}
	};
	xhr.open("get", `./php/share_ajaxlogin.php?memId=${memId}&memPsw=${memPsw}`, true);
	xhr.send(null); //AJAX串接資料End
}

// 關閉登入/註冊燈箱
function loginclose() {
	id('login').style.display = "none";
	id("registeredbox").style.display = "none";
	id("loginbox").style.display = "none";
}

//檢查是否已登入
function isLoginIn() {
	//--------------------回Server端檢查是否已登入
	var xhr = new XMLHttpRequest();
	xhr.onload = function () {
		if (xhr.status == 200) {
			if (xhr.responseText != "normal") {
				var loginMemberSession = JSON.parse(xhr.responseText);
				if (loginMemberSession.memId) {
					/** 已登入 **/
					id("loginopenbtn").innerText = loginMemberSession.memNick; //放入會員暱稱
					id("registeredopenbtn").innerText = "登出";
					// 成為飼主新增 不要再刪掉了！
					if(window.sessionStorage.getItem('petName')!=="null"){
						$('.menu-ul>li:nth-child(2)>a').addClass('disabled');
						if(location.href.indexOf('beAPetKeeper.html')>0){
							location.href = "./pethouse.html";
						}
					}
				}
			}
		} else {
			alert(xhr.status);
		}
	}
	xhr.open("get", `./php/share_getLoginInfo.php`, true);
	xhr.send(null); //AJAX串接資料End
}

//寵物家進入判斷
function enterPethouse() {
	id('enterPethouse').addEventListener('click', function () {
		if (id('loginopenbtn').innerText == "登入") {
			/** 尚未登入 **/
			loginopen(); // 開啟登入燈箱
		} else {
			/** 登入 **/
			//--------------------回Server端檢查是否有寵物
			var xhr = new XMLHttpRequest();
			xhr.onload = function () {
				if (xhr.status == 200) {
					/** 沒有寵物 **/
					if (xhr.responseText == "0") {
						alert("您尚未有寵物，去成為飼主找尋您的寵物吧");
					} else {
						/** 有寵物 **/
						location.href = "./pethouse.html";
					}
				} else {
					alert(xhr.status);
				}
			}
			xhr.open("get", `./php/share_havePet.php`, true);
			xhr.send(null);
		}
	});
}

window.addEventListener("load", function () {
	/** 登入燈箱 **/
	loginopenbtn(); //開啟登入燈箱
	loginclosebtn(); // 關閉登入燈箱按鈕
	sendLoginBtn(); // 送出表單按鈕

	/** 註冊燈箱 **/
	registeredopenbtn(); //header開啟註冊燈箱
	registeredclosebtn(); // 關閉註冊燈箱按鈕
	registeredbtn(); // 開啟註冊燈箱按鈕

	/** 寵物家進入判斷 **/
	enterPethouse();

	/** 檢查是否已登入 **/
	isLoginIn();
}, true);

