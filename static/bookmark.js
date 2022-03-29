contents_url = "http://52.78.40.92:5001/contents?movie_id="

function getCookie(cookie_name) {
    var x, y;
    var val = document.cookie.split(';');
  
    for (var i = 0; i < val.length; i++) {
      x = val[i].substring(0, val[i].indexOf('='));
      y = val[i].substring(val[i].indexOf('=') + 1);
      x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
      if (x == cookie_name) {
        return unescape(y); // unescape로 디코딩 후 값 리턴
      }
    }
  }

access_token = getCookie("token")

function delCookie(key) {

    getCookie(key)=""

}
if(access_token.length > 15){
    let login_li = document.getElementById('login');
    let register_li = document.getElementById("register");
    let menu_bar = document.getElementById("menu-bar-ul")
    login_li.parentNode.removeChild(login_li);
    register_li.parentNode.removeChild(register_li);
    let logout_li = document.createElement("li")
    let logout_a = document.createElement("a")
    logout_li.appendChild(logout_a);
    logout_a.innerText="로그아웃"
    logout_a.addEventListener("click",request_logout);
    logout_li.id="logout"
    menu_bar.appendChild(logout_li);
}


// if(typeof access_token === 'undefined' || access_token.length ==0){
//     alert("로그인을 하셔야 사용가능합니다!")
//     location.href="http://127.0.0.1:5000/";
// }

function request_logout(){
    
    fetch('https://em1442145b.execute-api.us-east-1.amazonaws.com/dev/api/logout',{
      method: 'POST',
      headers:{
          'Authorization':access_token
      }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.hasOwnProperty("error"))
        console.log(data)   
        if(data.hasOwnProperty("error")){
            alert(data.error);
        }else{
            alert(data.result);
            delCookie("token")
            location.reload();
        } // if 끝
        
    }) // data 끝
        
    }


function request_del(m_id){
    fetch('https://em1442145b.execute-api.us-east-1.amazonaws.com/dev/api/favorite/del/'+m_id,{
        method: 'DELETE',
        headers:{
            'Authorization':access_token
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.hasOwnProperty("error"))
        console.log(data)   
        if(data.hasOwnProperty("error")){
            alert(data.error);
        }else{
            alert(data.result); 
        } // if 끝
        
    }) // data 끝
        
    } // funtion 끝

function ribbonClick(event){
    console.log("cliked")
    let svg = event.target
    let m_id = svg.getAttribute("id");

    let item = svg.parentNode.parentNode
    request_del(m_id);
    item.parentNode.removeChild(item);
    count_span = document.getElementById("count")
    count_span.innerText=count+"개의 영상"
}


function request_list(){
fetch("https://6kynnowk23.execute-api.us-east-1.amazonaws.com/4?offset=0&limit=20",
{method:'GET',
headers:{
    'Authorization':access_token
}})
.then((response) => response.json())
.then((data) => {
    console.log(data.count)
    
    // 포스트맨 response = "count" : 11 "result" : [{"movie_id","poster" : }]
    count = data.count
    count_span = document.getElementById("count")
    count_span.innerText=count+"개의 영상"
    for(let i=0;i<count;i++){
        let body = document.getElementById("book_body")
        let div = document.createElement("div");
        
        let a = document.createElement("a");
        a.href=contents_url+data.result[i]["movie_id"] // movie_id
        let img = document.createElement("img");
        img.className="poster"
        img.src=data.result[i]["poster"] //poster_url
        
        a.appendChild(img)
        
        
        div.className="item"
        
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class','favorite')
        svg.setAttribute('width', '100px');
        svg.setAttribute('height', '100px');
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', "M0,0H24V33L12.077,24.315,0,33Z");
        path.setAttribute('fill', "#00FFC2");
        path.setAttribute('width', '24px');
        path.setAttribute('height', '33px');
        path.setAttribute('opacity', '1.0');
        path.setAttribute("id",data.result[i]["movie_id"])
        svg.appendChild(path);
        
        
        div.appendChild(svg);
        div.appendChild(a);
        body.appendChild(div);
        svg.addEventListener("click",ribbonClick);

        }

})
}

request_list();
