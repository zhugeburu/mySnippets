function delete_cookie_and_reload() {
  // document.cookie = 'Hm_lvt_431673927acf89fbdf45f2181547bc09' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  var expires = "";
  var date = new Date();
  date.setTime(date.getTime() + (24*60*60*1000));
  expires = "; expires=" + date.toUTCString();
  document.cookie = "info298" + "=" + "0" + expires + "; path=/";
}
function vote(){
	//var vote_btn = document.querySelector('.like_btn')
	//vote_btn.click()
	var http = new XMLHttpRequest()
	http.open('GET','http://anniversary15.kaytrip.com/index.php/main/agreeYes?id=298',true)
	http.send(null);
	http.onreadystatechange = function() {
        if (http.readyState != 4 || http.status != 200) {
            return;
        }

        var data = {
            msg: '解析失败'
        }
        try {
            data = JSON.parse(http.responseText)
        } catch (err) {
        }

        if (data.status == 1) {
            console.log('=> 成功:' + data.msg + ' - ' + http.status + ' - ' + http.responseText)
        } else {
            console.error('=> 失败:' + data.msg + ' - ' + http.status + ' - ' + http.responseText)
        }
    }
	
}

function vote_n(count){
	for(var i = 0;i<count;i++){
		delete_cookie_and_reload()
		vote()
	}
}

vote_n(55)
