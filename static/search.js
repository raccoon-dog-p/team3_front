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

if(typeof(access_token) == 'undefined' || access_token.length<20){
  
  }else{
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

function request_search(keyword,provider) {
    encodeURI(encodeURIComponent(provider));
    encodeURI(encodeURIComponent(keyword));
    fetch("https://em1442145b.execute-api.us-east-1.amazonaws.com/dev/api/search"+keyword+"&providers="+provider, {
      method: 'GET',
    })
    .then(response => {
      return response.json();
    })
    .then(data => {

    const count=data.count
    const result=data.result
    
    console.log(result);
    count_video = document.getElementById("count_video");
    count_video.innerText=count+" 개의 영상이 검색되었습니다.";
    // div poster
   
    let body=document.getElementsByClassName("Home_body")

    // div description
    
    for(let i = 0; i<count; i++){
      const id = result[i]["id"]
      let search_body =  document.createElement("div");
      let poster = document.createElement("div");
      let poster_a = document.createElement("a");
      let poster_img = document.createElement("img");
      poster_a.href=contents_url+id
      poster_img.src=result[i]["poster"]
      poster_img.width=300
      poster_img.height=180
      poster_a.appendChild(poster_img);
      poster.appendChild(poster_a);
      search_body.className="search_body"
      poster.className="poster"
      search_body.appendChild(poster);
      console.log(search_body);
      body.item(0).appendChild(search_body);
      console.log(result);


      
      let description = document.createElement("div");
      let description_a = document.createElement("a");
      description.className="description"
      description_a.innerText=result[i]["title"]
      description.appendChild(description_a);
      description.id="description_"+i
      description_a.href= contents_url+id

      let description_ul = document.createElement("ul")
      
      providers = result[i]['provider'].split(",")
      urls = result[i]['urls'].split(",")
      let num = providers.length
     
      console.log(num);
      description.appendChild(description_ul);
      console.log(description);
      
      
      search_body.appendChild(description)
      body.item(0).appendChild(search_body);
      for(let i =0; i<num;i++){
        let li = document.createElement("li");
        let li_a = document.createElement("a");
        let a_img = document.createElement("img");
        let p_str =providers[i]
        p_str= p_str.replace(/(\s*)/g, "")
        console.log(p_str);
      if(p_str == "prv"){

        li_a.href=urls[i]
        a_img.src="https://pys9-flask-logo.s3.amazonaws.com/prime.png"
        li_a.appendChild(a_img);
        li.appendChild(li_a);
        description_ul.appendChild(li);

      }else if(p_str == "dnp"){

        li_a.href=urls[i]
        a_img.src="https://pys9-flask-logo.s3.amazonaws.com/dnp.png"
        li_a.appendChild(a_img);
        li.appendChild(li_a);
        description_ul.appendChild(li);
      
      }else if(p_str == "넷플릭스"){
        li_a.href=urls[i]
        a_img.src="https://pys9-flask-logo.s3.amazonaws.com/Nfx.png"
        li_a.appendChild(a_img);
        li.appendChild(li_a);
        description_ul.appendChild(li);
        
      }else if(p_str == "웨이브"){
        li_a.href=urls[i]
        a_img.src="https://pys9-flask-logo.s3.amazonaws.com/wavve.png"
        li_a.appendChild(a_img);
        li.appendChild(li_a)
        description_ul.appendChild(li);

      }else if(p_str == "왓챠"){
        li_a.href=urls[i]
        a_img.src="https://pys9-flask-logo.s3.amazonaws.com/watcha.png"
        li_a.appendChild(a_img);
        li.appendChild(li_a);
        description_ul.appendChild(li);
      }
      
      
    }
    
    
  }
        
});
  }



function removeElementsByClass(className){
  var elements = document.getElementsByClassName(className);
  while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
  }
}
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

function IconClicked_search(event){
  const png= event.target.src.split("/",10)
  console.log(png)
  let company=png[3].split(".",1)[0]
  if(company.includes("_off")){
      company = company.replace("_off","");
  } 
    // let company= png[png.length-1].split(".",1)
    // if(event.target==nfx){   
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
            
            removeElementsByClass("search_body");
             
            request_search(keyword,str1);
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

            removeElementsByClass("search_body");
            
            request_search(keyword,str1)
        
            // console.log(event.target.src="logo/"+company+"_off.PNG")
                }
            }
for(let i = 0; i <providers.length; i++){
providers[i].addEventListener("click",IconClicked_search);
}
query = window.location.search
let keyword= decodeURI(decodeURIComponent(query));
let head=keyword.split("=",2)[1]
let header= document.getElementById("keyword_head");
header.innerText= head+"의 검색결과"
document.write(header.innerText);

request_search(keyword,"None,None,None,None,None");