// 1. 액세스 토큰 가져오기
function get_token(){
    let cookie = document.cookie
    token = cookie.split("=",2)[1];
    return token
}

function delCookie(key) {

    document.cookie=key+"=;";

}

// 2. 가져온 토큰 기반으로 로그인 확인
if(document.cookie.length != 0){ 
access_token= get_token();
if(access_token.length != 0){
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
}

// 3. 로그 아웃 버튼
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

// 리본 클릭시 추가 할 함수

function ribbonClick(event){
    console.log("cliked")
    let svg = event.target
    let m_id=svg.parentNode.id
    

    if(svg.getAttribute("fill")=="#00FFC2"){
        request_del(m_id)
        svg.setAttribute("fill","#545454");
        svg.setAttribute("opacity","0.63")
    }else if(svg.getAttribute("fill")=="#545454"){
        svg.setAttribute("fill","#00FFC2");
        svg.setAttribute("opacity","1")
        request_add(m_id);
    }
    
}

let ribbon =document.getElementsByClassName("favorite_one");

ribbon.item(0).addEventListener("click",ribbonClick);

let ribbon_bottom=document.getElementsByClassName("favorite")
let ribbon_l= ribbon_bottom.length
for(let i=0; i<ribbon_l;i++){
    ribbon_bottom.item(i).addEventListener("click",ribbonClick);
}
// 데이터 베이스에 추가하는 함수

function request_add(movie_id){
    if(typeof access_token === 'undefined' || access_token.length ==0){
        alert("로그인을 하셔야 사용가능합니다!")
        location.reload();
    }
    console.log(movie_id)
    fetch('https://em1442145b.execute-api.us-east-1.amazonaws.com/dev/api/favorite/add/'+movie_id,{
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
        } // if 끝
        
    }) // data 끝
        
    } // funtion 끝
    
    
// 데이터 베이스 지우는 함수

function request_del(m_id){
    if(typeof access_token === 'undefined' || access_token.length ==0){
        alert("로그인을 하셔야 사용가능합니다!")
        location.reload();
    }
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


function request_data (movie_id){
fetch("https://6kynnowk23.execute-api.us-east-1.amazonaws.com/5/"+movie_id,
{method:'GET'})
.then((response) => response.json())
.then((data) => {
    document.getElementById("svg_id").id=(data['영화정보']['id'])
    document.getElementById("poster").src = (data['영화정보']["poster"])
    document.getElementById("title").innerHTML= (data['영화정보']['title'])
    document.getElementById("div1").innerHTML = "출시년도 : " + (data['영화정보']["release_year"])
    document.getElementById("div2").innerHTML = "장르 : " + (data['영화정보']["genre_ids"])
    document.getElementById("div4").innerHTML =(data['영화정보']["short_description"])
    var providers = data['영화정보']['provider'].split(',')
    var urls = data['영화정보']['urls'].split(',')
    let num = providers.length
    
    
    let provider_ul = document.getElementById("provider");
    for(let i=0;i<num;i++){
        let li = document.createElement("li");
        let li_a = document.createElement("a");
        let a_img = document.createElement("img");
        let p_str =providers[i]
        p_str= p_str.replace(/(\s*)/g, "")
        if(p_str == "prv"){

        li_a.href=urls[i]
        a_img.src="https://pys9-flask-logo.s3.amazonaws.com/prime.png"
        li_a.appendChild(a_img);
        li.appendChild(li_a);
        provider_ul.appendChild(li);

        }else if(p_str == "dnp"){

        li_a.href=urls[i]
        a_img.src="https://pys9-flask-logo.s3.amazonaws.com/dnp.png"
        li_a.appendChild(a_img);
        li.appendChild(li_a);
        provider_ul.appendChild(li);

        }else if(p_str == "넷플릭스"){
        li_a.href=urls[i]
        a_img.src="https://pys9-flask-logo.s3.amazonaws.com/Nfx.png"
        li_a.appendChild(a_img);
        li.appendChild(li_a);
        provider_ul.appendChild(li);

        }else if(p_str == "웨이브"){
        li_a.href=urls[i]
        a_img.src="https://pys9-flask-logo.s3.amazonaws.com/wavve.png"
        li_a.appendChild(a_img);
        li.appendChild(li_a)
        provider_ul.appendChild(li);

        }else if(p_str == "왓챠"){
        li_a.href=urls[i]
        a_img.src="https://pys9-flask-logo.s3.amazonaws.com/watcha.png"
        li_a.appendChild(a_img);
        li.appendChild(li_a);
        provider_ul.appendChild(li);
        }


        }   
                }
            
            );


        }

contents_url = "http://127.0.0.1:5000/contents?movie_id="

function request_rec_con(movie_id){

    fetch('http://3.37.61.76:5001/7?movie_id='+movie_id,{
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.hasOwnProperty("error"))
        for(let i=0; i<7; i++){
        let poster = document.getElementById("poster_2_"+i)
        let link_id = document.getElementById("poster_2_"+i+"_a");
        let svg_id = document.getElementById("svg_2_"+i)
        poster.src=data.result[i][0]['poster']
        link_id.href=contents_url+data.result[i][0]['index']
        svg_id.id=data.result[i][0]['index']
        
    }
    }) // data 끝
        
    }

let movie_id = window.location.search
movie_id=movie_id.split("=",2)[1];
request_rec_con(movie_id);
request_data(movie_id);