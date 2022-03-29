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
if(access_token.length < 5){
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
    request_rec();
    }else{
        request("코미디","None,None,None,None,None","1")
    }


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
// 로그인이 되었을 경우 메뉴바에서 li 회원가입 로그인 제거 후 로그아웃 버튼 만들기


const nfx = document.getElementById("nfx_tap");
const prv = document.getElementById("prime_tap");
const watcha = document.getElementById("watcha_tap");
const wavve = document.getElementById("wavve_tap");
const dnp = document.getElementById("dnp_tap");

providers=[nfx,prv,watcha,wavve,dnp];
// if (providers_state.includes("Nfx_on")){
//     providers_name[num]="넷플릭스"}
// else if(providers_state.includes("wavve_on")){
//     providers_name[num]="웨이브"
// }else if(providers_state.includes("watch_on")){
//     providers_name[num]="왓챠"
// }else if(providers_state.includes("prime_on")){
//     providers_name[num]="prv"
// }else if(provider_state.includes("dnp_on")){
//     providers_name[num]="dnp"
// }
let provider_state=["Nfx_on","prime_on","watcha_on","wavve_on","dnp_on"]

let providers_name=["None","None","None","None","None"]

function IconClicked(event){
    const png= event.target.src.split("/",10)
    console.log(png)
    let company=png[3].split(".",1)[0]
    if(company.includes("_off")){
        company = company.replace("_off","");
    } 
        if(provider_state.includes(company+"_off")){
            let num=provider_state.indexOf(company+"_off")
            provider_state[num]=company+"_on"
            if(company=="Nfx"){
                providers_name[num]="None"
            }else if(company=="prime"){
                providers_name[num]="None"
            }else if(company=="watcha"){
                providers_name[num]="None"
            }else if(company=="wavve"){
                providers_name[num]="None"
            }else if(company=="dnp"){
                providers_name[num]="None"
            }
            let src ="https://pys9-flask-logo.s3.amazonaws.com/"+company+".png"
                event.target.src=src
                console.log(providers_name)
            let str1 = providers_name.join(',');
            
            if(typeof access_token === 'undefined' || access_token.length ==0)
            {request("코미디",str1,"1")}
            request("액션",str1,"2");
            request("SF",str1,"3");
            request("판타지",str1,"4");
            request("가족",str1,"5");
            console.log(str1);
        }
        else if(provider_state.includes(company+"_on")){
            let num=provider_state.indexOf(company+"_on")
            let src ="https://pys9-flask-logo.s3.amazonaws.com/"+company+"_off.png"
            event.target.src=src
            provider_state[num]=company+"_off"
            if(company=="Nfx"){
                providers_name[num]="넷플릭스"
            }else if(company=="prime"){
                providers_name[num]="prv"
            }else if(company=="watcha"){
                providers_name[num]="왓챠"
            }else if(company=="wavve"){
                providers_name[num]="웨이브"
            }else if(company=="dnp"){
                providers_name[num]="dnp"
            }
            console.log(providers_name)
            let str1 = providers_name.join(',');

            if(typeof access_token === 'undefined' || access_token.length ==0)
            {request("코미디",str1,"1")}
            request("액션",str1,"2");
            request("SF",str1,"3");
            request("판타지",str1,"4");
            request("가족",str1,"5");
        
            // console.log(event.target.src="logo/"+company+"_off.PNG")
                }
            }
for(let i = 0; i <providers.length; i++){
providers[i].addEventListener("click",IconClicked);
}




function ribbonClick(event){
    console.log("cliked")
    let svg = event.target
    let m_id = svg.getAttribute("data-name");


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
let ribbon =document.getElementsByClassName("favorite");
let ribbon_l= ribbon.length
for(let i=0; i<ribbon_l;i++){
    ribbon.item(i).addEventListener("click",ribbonClick);
}



function request_add(m_id){
    if(typeof access_token === 'undefined' || access_token.length ==0){
        alert("로그인을 하셔야 사용가능합니다!")
        location.reload();
    }
    fetch('https://em1442145b.execute-api.us-east-1.amazonaws.com/dev/api/favorite/add/'+m_id,{
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
// ribbon = ribbon.item(0)


// 포스터 가져오기
// for(let i=0; i>7; i++){
//     let act = document.getElementById("poster_2_"+String(i))
//     act.src=result[i]['poster']
//     console.log(act.src)
// } 

// let act = document.getElementById("poster_2_0")
// act.src=result[0]['poster']



function request(genre,provider,position) {
    
    encodeURI(encodeURIComponent(genre));
    encodeURI(encodeURIComponent(provider));
    fetch("https://em1442145b.execute-api.us-east-1.amazonaws.com/dev/home?genre="
    +genre+
    "&providers="+provider, {
      method: 'GET',
    })
    .then(response => {
      return response.json();
    })
    .then(data => {count=data.count
      result = data.result
      // 포스터 이미지 객체 가져오기
      let poster_0 = document.getElementById("poster_"+position+"_0")
      let poster_1 = document.getElementById("poster_"+position+"_1")
      let poster_2 = document.getElementById("poster_"+position+"_2")
      let poster_3 = document.getElementById("poster_"+position+"_3")
      let poster_4 = document.getElementById("poster_"+position+"_4")
      let poster_5 = document.getElementById("poster_"+position+"_5")
      let poster_6 = document.getElementById("poster_"+position+"_6")
      // 포스터 하이퍼링크 객체 가져오기
      let poster_0_a = document.getElementById("poster_"+position+"_0_a")
      let poster_1_a = document.getElementById("poster_"+position+"_1_a")
      let poster_2_a = document.getElementById("poster_"+position+"_2_a")
      let poster_3_a = document.getElementById("poster_"+position+"_3_a")
      let poster_4_a = document.getElementById("poster_"+position+"_4_a")
      let poster_5_a = document.getElementById("poster_"+position+"_5_a")
      let poster_6_a = document.getElementById("poster_"+position+"_6_a")
      
      // 공통 변수 생성
      let ran_num_1 = (Math.floor(Math.random()*count));
      let ran_num_2 = (Math.floor(Math.random()*count));
      let ran_num_3 = (Math.floor(Math.random()*count));
      let ran_num_4 = (Math.floor(Math.random()*count));
      let ran_num_5 = (Math.floor(Math.random()*count));
      let ran_num_6 = (Math.floor(Math.random()*count));
      let ran_num_7 = (Math.floor(Math.random()*count));
      
      // path id 객체 가져오기
      let svg_1 = document.getElementById("path_"+position+"_0")
      let svg_2 = document.getElementById("path_"+position+"_1")
      let svg_3 = document.getElementById("path_"+position+"_2")
      let svg_4 = document.getElementById("path_"+position+"_3")
      let svg_5 = document.getElementById("path_"+position+"_4")
      let svg_6 = document.getElementById("path_"+position+"_5")
      let svg_7 = document.getElementById("path_"+position+"_6")
      
      // path data-name 과 movie id 같게 만들기
      svg_1.setAttribute("data-name",result[ran_num_1]['id']);
      svg_2.setAttribute("data-name",result[ran_num_2]['id'])
      svg_3.setAttribute("data-name",result[ran_num_3]['id'])
      svg_4.setAttribute("data-name",result[ran_num_4]['id'])
      svg_5.setAttribute("data-name",result[ran_num_5]['id'])
      svg_6.setAttribute("data-name",result[ran_num_6]['id'])
      svg_7.setAttribute("data-name",result[ran_num_7]['id'])
      
      // path fill 을 #545454로 칠하기
    
    svg_1.setAttribute("fill","#545454")
    svg_1.setAttribute("opacity","0.63")
    svg_2.setAttribute("fill","#545454");
    svg_2.setAttribute("opacity","0.63")
    svg_3.setAttribute("fill","#545454")
    svg_3.setAttribute("opacity","0.63");
    svg_4.setAttribute("fill","#545454");
    svg_4.setAttribute("opacity","0.63")
    svg_5.setAttribute("fill","#545454");
    svg_5.setAttribute("opacity","0.63")
    svg_6.setAttribute("fill","#545454");
    svg_6.setAttribute("opacity","0.63")
    svg_7.setAttribute("fill","#545454");
    svg_7.setAttribute("opacity","0.63")

      // 하이퍼 링크 contents/m_id 형식으로 만들어 주기
      poster_0_a.href=contents_url+result[ran_num_1]['id']
      poster_1_a.href=contents_url+result[ran_num_2]['id']
      poster_2_a.href=contents_url+result[ran_num_3]['id']
      poster_3_a.href=contents_url+result[ran_num_4]['id']
      poster_4_a.href=contents_url+result[ran_num_5]['id']
      poster_5_a.href=contents_url+result[ran_num_6]['id']
      poster_6_a.href=contents_url+result[ran_num_7]['id']
      
      // 포스터 이미지 가져오기

      poster_0.src = result[ran_num_1]['poster']
      poster_1.src = result[ran_num_2]['poster']
      poster_2.src = result[ran_num_3]['poster']
      poster_3.src = result[ran_num_4]['poster']
      poster_4.src = result[ran_num_5]['poster']
      poster_5.src = result[ran_num_6]['poster']
      poster_6.src = result[ran_num_7]['poster']

    });
  }

  function request_rec(){

    fetch('http://3.37.61.76:5001/6',{
        method: 'GET',
        headers: {
            'Authorization':access_token
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.hasOwnProperty("error"))
        for(let i=0; i<7; i++){
        let poster = document.getElementById("poster_1_"+i)
        let link_id = document.getElementById("poster_1_"+i+"_a");
        let path_id = document.getElementById("path_1_"+i)
        poster.src=data.result[i][0]['poster']
        link_id.href=contents_url+data.result[i][0]['index']
        path_id.setAttribute('data-name',data.result[i][0]['index'])
        
    }
    }).catch(error => request("코미디","None,None,None,None,None","1")) // data 끝
        
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
                })
        
        }
        
    



request("액션","None,None,None,None,None","2");
request("SF","None,None,None,None,None","3");
request("판타지","None,None,None,None,None","4");
request("가족","None,None,None,None,None","5");
