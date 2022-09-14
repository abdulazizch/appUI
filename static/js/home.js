
$( document ).ready(function(){
  window.onscroll = function() {myFunction()};

  var fixedHeader = document.querySelector(".top-header");

  function myFunction() {
    if (window.pageYOffset >= 50) {
      fixedHeader.classList.add("fixed")
    } else {
      fixedHeader.classList.remove("fixed")
    }
  }
  
});

$( document ).ready(function(){
fut()

expiries()
get_bot_config()
// make_ltp_table()
// ltps()
loops()
// loops2()
// chart_making()



  // $('#orders_table').DataTable({
  //   "paging":   false,
  //  "info": false,
  //  "orderClasses": false
  // });

 
  
});
function loops(){
 
  // ltps()  
  // chart_making()
  if (document.getElementById("active-orders").style.display == "block"){
    
    orders('NO')
    
  }
  
  sleep(1000).then(() => {
    loops()
});
}

function loops2(){
 
    make_ltp_table()
    
  
  sleep(50000).then(() => {
    loops2()
});
}





function get_bot_config(){
  $.get("/bot_config", function(data, status){
    var parsed_data=JSON.stringify(data)
    var data=JSON.parse(parsed_data)
    var place_list=["slPoints","tgtPoints","trailSlPoints","retracementPoints","startTime","sqOffTime","atmpm","maxReentry","reentryTook","both"]
    var choose_list=["futur","expiry","candelTime","productt","buyOrSell"]
    
    for (let i = 0; i < place_list.length; i++){
      
      document.getElementById(place_list[i]).placeholder=data[place_list[i]]
      document.getElementById(place_list[i]).value=""
    }

    for (let i = 0; i < choose_list.length; i++){
      document.getElementById(choose_list[i]).value=data[choose_list[i]]
    }

    bot_status(data['bot_status'])
  })


}

function save_user_config(){
  var btn= document.getElementById('save')
  btn.disabled = true;
  btn.style.backgroundColor = 'gray';
  var bot_config=["slPoints","tgtPoints","trailSlPoints","retracementPoints","startTime","sqOffTime","atmpm","futur","expiry","candelTime","productt","buyOrSell","maxReentry"]

  var bot_config_value={}
  for (let i = 0; i < bot_config.length; i++) {
    if (document.getElementById(bot_config[i]).value !="" && document.getElementById(bot_config[i]).value !="select" ){
      bot_config_value[bot_config[i]]=document.getElementById(bot_config[i]).value

    }
  }
  
  if ($.isEmptyObject(bot_config_value) ==false){
    post_data("/bot_config",JSON.stringify(bot_config_value),type='refresh')
  }
  
  btn.disabled = false;
  btn.style.backgroundColor = '#198754';
  notification('Saved')
  home()
  // window.location.replace("/");
}

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function bot_status(status){
  
  $.get("bot_status/"+status, function(data, status){
    var parsed_data=JSON.stringify(data)
    // var data=JSON.parse(parsed_data)

document.getElementById('bot_status').innerHTML=data['status']
if (data['status']=='RUNNING'){
  document.getElementById('bot_status').style.backgroundColor='green'
  document.getElementById('bot_status').style.color='white'
}else if (data['status']=='PAUSED'){
  document.getElementById('bot_status').style.backgroundColor='yellow'
  document.getElementById('bot_status').style.color='black'
}else if (data['status']=='STOPPED'){
  document.getElementById('bot_status').style.backgroundColor='RED'
  document.getElementById('bot_status').style.color='white'
}
  })
}

function datetimenow(){
  $.get("/datetimenow", function(data, status){
    console.log(data)})}
function nav_func() {
  var x = document.getElementById("portfolio_menu");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

function orders(YN){
  if(YN=='yes'){
    document.getElementById("usersTable").style.display = "none";
    document.getElementById("dashboard").style.display = "none";
  document.getElementById("active-orders").style.display = "block";
  }
  $.get("/get_position", function(data, status){
    var parsed_data=JSON.stringify(data)
    var data=JSON.parse(parsed_data)
    
  
  var style = getComputedStyle(document.body)
  var trr=""
  var mtm=''
  var sum_lstr=0
  for (let i = 0; i < data.length; i++){
    if(data[i]['sq_price']=='None'|| data[i]['sq_price']=='nan'){

      mtm=(parseFloat(data[i]['pricee'])-(parseFloat(data[i]['ltpp']))).toFixed(2)
    }else{
      mtm=(parseFloat(data[i]['pricee'])-parseFloat(data[i]['sq_price'])).toFixed(2)

    }
  sum_lstr+=parseFloat(mtm)
   
    // var mtm=
    var tbl=`<tr>
  <td>${data[i]['timee']}</td>
  <td>${data[i]['symboll']}</td>
  <td>${data[i]['productt']}</td>
  <td>${data[i]['lots']}</td>
  <td>${data[i]['pricee']}</td>
  <td>${data[i]['sq_price']}</td>
  <td>${data[i]['ltpp']}</td>
  <td>${data[i]['statuss']}</td>
 
</tr>`
trr+=tbl
}


document.getElementById('positions').innerHTML=trr
  // document.getElementById("orders_btn").style.backgroundColor= style.getPropertyValue('--primary-color');
  })
  
}

 // <td>
  // <div style="display: flex; flex-direction: row;">
  // <a style="margin-right:5px" onclick="orders_table_button_sq(${data[i]['id']})"> SQ. OFF</a>
  // <a onclick="orders_table_button_clear(${data[i]['id']})"> REMOVE</a>
  // </div>
  // </td>
function orders_table_button_clear(data){
  console.log(data,'clearr')
}

function orders_table_button_sq(data){
  console.log(data,'sq')
}

function home(){
  fut()

expiries()
get_bot_config()
  document.getElementById('usersTable').style.display= "none"
  document.getElementById('active-orders').style.display= "none"
  document.getElementById('dashboard').style.display= "block"
  
}

function ltps(){
  
  var ltps=document.getElementById("ltps");
  if (window.getComputedStyle(ltps).display==="none"){
    
  }else{
    // ltps2()
    $.get("/ltps", function(data, status){
      var parsed_data=JSON.stringify(data)
      var data=JSON.parse(parsed_data)
      for (const property in data) {
        if(property=='NIFTY 50'){
          document.getElementById("n_ltp").innerHTML=data[property]
        }else if (property=='NIFTY BANK'){
          document.getElementById("b_ltp").innerHTML=data[property]
        }else{
          document.getElementById(`${property}_ltp`).innerHTML=data[property]
        }
      }
      
  })}
}




function make_ltp_table(){
  
  $.get("/super", function(data, status){
    // var parsed_data=JSON.stringify(data)
      var data=JSON.parse(data)

var htmls=`
<tr><td>${String(new Date(data['date'])).split("GMT")[0]}</td>
<td>${data['open']}</td>
<td>${data['high']}</td>
<td>${data['low']}</td>
<td>${data['close']}</td>
<td style="color:${data['STX']}">${data['ST']}</td>
</tr>
`


      document.getElementById("ltps_tbody").innerHTML =htmls;
    


  })


}


function expiries(){
  var esp=`<option value="select">select</option>`
  $.get("/expiries", function(data, status){
    var parsed_data=JSON.stringify(data)
    var data=JSON.parse(parsed_data)
    if(data!="expiries"){
      for (const property in data) {

        esp+=`<option value="${data[property]}">${property}</option>`
        }
    }
    
    document.getElementById("expiry").innerHTML =esp;
  })
}

function fut(){
  var esp=`<option value="select">select</option>`
  $.get("/fut", function(data, status){
    var parsed_data=JSON.stringify(data)
    var data=JSON.parse(parsed_data)
    if(data!="unable to make futuresNameList"){
      for (const property in data) {

        esp+=`<option value="${data[property]}">${property}</option>`
        }
    }
    
    
    document.getElementById("futur").innerHTML =esp;
  })
}


function notification(data) {
  var x = document.getElementById("snackbar");
  x.innerHTML=data
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function post_data(url,data,type="none"){
  try {
    $.post(url, data=data, function(result){
      if (type=='refresh'){
      }
    });
  } catch (error) {
    console.log(error,";")
  }
   
}



function uname(){
  $.get("/uname", function(data, status){
    document.getElementById('uname').innerHTML='Hi , '+data
    if (data=='Not Logged In'){
      document.getElementById('logout').style.backgroundColor = 'Green'; 
      document.getElementById('logout').value='Log In'
      document.getElementById('logout').textContent='Log In' 
    }else{
      document.getElementById('logout').style.backgroundColor = 'red'; 
      document.getElementById('logout').value='Log Out'
      document.getElementById('logout').textContent='Log Out' 
    }

    })
    document.getElementById('logout').style.display= "block"
    document.getElementById('spinner').style.display= "none"
}
function addUser(id){
  if(id=='new'){
      document.getElementById("userId").value=""
      document.getElementById("userId").placeholder=""
      
      document.getElementById("api").value=""
      document.getElementById("api").placeholder=""

      document.getElementById("sec").value=""
      document.getElementById("sec").placeholder=""

      document.getElementById("lots").value=""
      document.getElementById("lots").placeholder=""
      
      document.getElementById("broker").value="angel"

      document.getElementById("password").value=""
      document.getElementById("password").placeholder=""

      document.getElementById("isActive").value=""
      document.getElementById("isActive").placeholder=""
      
      document.getElementById('user_id').innerHTML="new"
      document.getElementById('exampleModalLongTitle').innerHTML="Add User"
      
    
      togelModel('userEditMOdel')
      getActiveUsers('all')
  }
}

function deleteUser(id){
  $.get("/deleteUser/"+id, function(data, status){
    notification('user deleted : '+id)
    getActiveUsers('all')
  })
}

function AutoGenereateToken(id){
  $.get("/autoLoginGenerateToken/"+id, function(data, status){
    notification('user Token Generated : '+id)
    getActiveUsers('all')
  })
}


function editUser(id){
  $.get("/users/"+id, function(data, status){
    data=JSON.stringify(data)
    data=JSON.parse(data)
    var clearrrr=['user_id','userId','api','sec','lots','broker','password','isActive']
    for(let i = 0; i < clearrrr.length; i++){
      try{
        document.getElementById(clearrrr[i]).placeholder=""
        document.getElementById(clearrrr[i]).value=""

      }catch{
        
      }

    }

    document.getElementById('user_id').innerHTML=data.id
    document.getElementById('userId').placeholder=data.userId
    document.getElementById('broker').value=data.broker
    document.getElementById('api').placeholder=data.api
    document.getElementById('sec').placeholder=data.sec
    document.getElementById('lots').placeholder=data.lots
    document.getElementById('password').placeholder=data.password
    document.getElementById('isActive').placeholder=data.isActive
    
    // document.getElementById('gractive').value=data.activated

  })
  document.getElementById('exampleModalLongTitle').innerHTML="Edit User"

  togelModel('userEditMOdel')
  
}
function saveuserData(){
  var id=document.getElementById('user_id').innerHTML

var data={}
var lst=['userId','broker','api','sec','lots','password','isActive']
for (let i = 0; i < lst.length; i++){
  if(document.getElementById(lst[i]).value!=""){
    data[lst[i]]=document.getElementById(lst[i]).value

  }

}


$.post("/users/"+id, data=JSON.stringify(data), function(data,result){
  // users()
  togelModel('userEditMOdel')

  getActiveUsers('all')
});
    
}

function getActiveUsers(id){
  $.get("/users/"+id, function(data, status){
    data=JSON.stringify(data)
    data=JSON.parse(data)
    let users=""
    if (data){
      
    }
    for (let i = 0; i < data.length; i++){
      console.log(data[i])
      if(data[i]['login']=='true'){
        var loginButton=`<button type="button" class="btn btn-danger" onclick="logout('${data[i]['id']}')"  style="line-height: 0.2 !important;font-size: 10px !important;width: 115px;">Logout</button>`
        var loggedinbutton=`<span style="color: green;">●</span>`
      }else{
        var loggedinbutton=`<span style="color: red;">●</span>`
        var loginButton=`<button type="button" class="btn btn-success" onclick="loginonly('${data[i]['id']}')"  style="line-height: 0.2 !important;font-size: 10px !important;width: 115px;">Login</button>`
      }
      
if(data[i]['broker']=='zerodha'){
  users+=`<tr>
      <td>${data[i]['id']}</td>
      <td>${data[i]['userId']}${loggedinbutton}</td>
      <td>${data[i]['broker']}</td>
      <td>${data[i]['lots']}</td>
      <td>
      <div style="display: flex;flex-direction: row;">
        <button type="button" class="btn btn-danger" onclick="editUser(${data[i]['id']})"  style="line-height: 0.2 !important;font-size: 10px !important;">Edit</button>
        <button type="button" class="btn btn-danger" onclick="kiteTokenGenerate('${data[i]['api']}')"  style="line-height: 0.2 !important;font-size: 10px !important;width: 115px;">Generate Token</button>
        <button type="button" class="btn btn-danger" onclick="deleteUser(${data[i]['id']})"  style="line-height: 0.2 !important;font-size: 10px !important;">Delete</button>
        <button type="button" class="btn btn-danger" onclick="AutoGenereateToken(${data[i]['id']})"  style="line-height: 0.2 !important;font-size: 10px !important;">AutoGenereateToken</button>
    ${loginButton}</td>
        </div>
        </tr>`
}else{
  users+=`<tr>
  <td>${data[i]['id']}</td>
  <td>${data[i]['userId']}${loggedinbutton}</td>
  <td>${data[i]['broker']}</td>
 
  <td>${data[i]['lots']}</td>
  <td>
  <div style="display: flex;flex-direction: row;">
    <button type="button" class="btn btn-danger" onclick="editUser(${data[i]['id']})"  style="line-height: 0.2 !important;font-size: 10px !important;">Edit</button>
    <button type="button" class="btn btn-danger" style="pointer-events: none;opacity: .65;line-height: 0.2 !important;font-size: 10px !important;width: 115px;">Generate Token</button>
    <button type="button" class="btn btn-danger" onclick="deleteUser(${data[i]['id']})"  style="line-height: 0.2 !important;font-size: 10px !important;">Delete</button>
    ${loginButton}</td>

    </div>
    </tr>`
}
      

    }

    console.log(users)
    document.getElementById("usersTableContent").innerHTML= users
   
    
  })
  // document.getElementById('usersTable').style.display= "block"
  // document.getElementById('active-orders').style.display= "none"
  // document.getElementById('dashboard').style.display= "none"

}

function logout(id){
  $.get("/logout/"+id, function(data, status){
    notification('user logged out : '+data)
    getActiveUsers('all')
  }) 
}
function loginonly(id){
  $.get("/loginonly/"+id, function(data, status){
    notification('user logged in  : '+data)
    getActiveUsers('all')
  })
}

function togelModel(id){
  $('#'+id).modal('toggle');
}

function kiteTokenGenerate(api){
  window.open(
    "https://kite.zerodha.com/connect/login?v=3&api_key="+api, "_blank");
}
  // window.location.replace();

function logout_admin(){
  var val=document.getElementById('logout').value
  document.getElementById('logout').style.display= "none"
    document.getElementById('spinner').style.display= "block"
  $.get("/logout_admin/"+val, function(data, status){
    console.log(data,status)
    if (data.includes('kite.zerodha.com')){
      console.log("hd")
      window.location.replace(data);
    }else{

      window.location.replace("/");
    }
 
  })

}
function placeInstantOrder(){

  var data={}
  var lst=['instantSide','instantbos']
  for (let i = 0; i < lst.length; i++){
    if(document.getElementById(lst[i]).value!=""){
      data[lst[i]]=document.getElementById(lst[i]).value
  
    }
  
  }
  
  
  $.post("/instantOrder", data=JSON.stringify(data), function(data,result){
    // users()
    orders('yes')
    
  });
      
  }
  