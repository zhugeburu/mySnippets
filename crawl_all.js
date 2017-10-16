function getVoteCount(pageNum){
	var http = new XMLHttpRequest()
	var url = 'http://anniversary15.kaytrip.com/index.php/main/info/'+pageNum 
	http.open('GET',url,false)
	http.send(null)
	var parser = new DOMParser()
	var html = parser.parseFromString(http.responseText,'text/html')
	var nickname = html.querySelector('.x1')
	var like_count = html.querySelector('.like_btn').getAttribute('data-num')
	console.log(nickname.innerText,':',like_count,'个赞')
}

for (var i =250;i<310;i++){
    getVoteCount(i)
}