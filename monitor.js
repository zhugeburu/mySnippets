function delete_cookie_and_reload(userId) {
  // document.cookie = 'Hm_lvt_431673927acf89fbdf45f2181547bc09' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  var expires = "";
  var date = new Date();
  date.setTime(date.getTime() + (24*60*60*1000));
  expires = "; expires=" + date.toUTCString();
  document.cookie = "info" + userId + "=0" + expires + "; path=/";
}
function vote(userId){
	//var vote_btn = document.querySelector('.like_btn')
	//vote_btn.click()
	var http = new XMLHttpRequest()
	http.open('GET','http://anniversary15.kaytrip.com/index.php/main/agreeYes?id='+userId,true)
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
            console.log('=> 成功:' + data.msg + ' - ' + http.status + ' - ' + data.text)
        } else {
        	delete_cookie_and_reload()
            console.error('=> 失败:' + data.msg + ' - ' + http.status + ' - ' + data.text)
        }
    }
	
}

function vote_n(count,userId){
	for(var i = 0;i<count;i++){
		delete_cookie_and_reload(userId)
		vote(userId)
	}
}

function getVoteCount(pageNum){
	var http = new XMLHttpRequest()
	var url = 'http://anniversary15.kaytrip.com/index.php/main/info/'+pageNum 
	http.open('GET',url,false)
	http.send(null)
	var parser = new DOMParser()
	var html = parser.parseFromString(http.responseText,'text/html')
	var nickname = html.querySelector('.x1')
	var like_count = html.querySelector('.like_btn').getAttribute('data-num')
	if(like_count >= 3000){
		console.log(nickname.innerText,':',like_count,'个赞')
		return like_count;
	}
	return;
}
// getVoteCount(308)

function monitor(){
	var timer = setInterval(function(){
	if (getVoteCount(298)-getVoteCount(313) <= 10000){
		console.log('目标正在接近我方，即将展开反击')
	 	vote_n(500,298)
	}else{
		clearInterval(timer)
	}
},1000*60)
}


