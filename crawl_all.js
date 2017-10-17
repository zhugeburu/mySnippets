function getVoteCount(pageNum){
	var http = new XMLHttpRequest()
	var url = 'http://anniversary15.kaytrip.com/index.php/main/info/'+pageNum 
	http.open('GET',url,false)
	http.send(null)
	var parser = new DOMParser()
	var html = parser.parseFromString(http.responseText,'text/html')
	var nickname = html.querySelector('.x1')
	var like_count = html.querySelector('.like_btn').getAttribute('data-num')
	if(like_count >= 10000){
		console.log(nickname.innerText,':',like_count,'个赞')
		return [nickname.innerText,like_count];
	}else{
		return ;
	}

}

var namelist = []
for (var i =250;i<320;i++){
	namelist.push(getVoteCount(i))
    }
var unsorted_list = namelist.filter(function(n){return n!= undefined})
console.table(unsorted_list.sort(function(a,b){if(a[1] > b[1]){return -1} else {return 1}}))
// getVoteCount(259)
// getVoteCount(298)
// getVoteCount(308)
// getVoteCount(313)

