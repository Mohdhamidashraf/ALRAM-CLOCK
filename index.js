// variables of alarm
var selectValues=$('#alarm-values select').children();  // first child options of select
var timeValues=$("#alarm-values select") // time values -< hour min sec
var form=$('#alarm-values'); 
var list=$('#list');
var delButton=$('#list input');


// setting option values in form
function setValues(){
   
    for(let i=0;i<=12;i++){
        let option=`<option value=${i}> ${i} </option>`;
        //selectValues[0].firstElementChild.insertAdjacentHTML("afterend",option);
        $(selectValues[0]).after(option)
    }
    
    for(let i=0;i<=59;i++){
        i=i<10?"0"+i:i;
        let option=`<option value=${i}> ${i} </option>`; 
        $(selectValues[1]).after(option)
    }
    
    for(let i=0;i<=59;i++){
        i=i<10?"0"+i:i;
        let option=`<option value=${i}> ${i} </option>`;
        $(selectValues[2]).after(option)
    }

    for(let i=0;i<=1;i++){
        let ampm=i==0?"PM":"AM";
        let option=`<option value=${ampm}> ${ampm} </option>`;
        $(selectValues[3]).after(option)
    }
}
setValues();

// conatins list of alarm
var alarm_list=[];
$("#set-alarm-button").click(function(e){
    // fetching option values fr which alarm is to be set
    var Hour=$(timeValues[0]).val();
    var Min=$(timeValues[1]).val();
    var Sec=$(timeValues[2]).val();
    var AmPm=$(timeValues[3]).val();
    // this is alarm time
    var alarmTime=`${Hour}:${Min}:${Sec} ${AmPm}`;
    if(alarmTime.includes("Hour")|| alarmTime.includes("Min")|| alarmTime.includes("Sec")||alarmTime.includes("AM/PM")){
        window.alert("Invalid Values");
        return;
    }
    // pushing alarm to alarmlist
    alarm_list.push(alarmTime);
    console.log(alarm_list)
    render();
    form[0].reset();
})


function render(){
    // rendering alarmlist
    document.getElementById('list').innerHTML='';
    for(let i=0;i<alarm_list.length;i++){
        addToDOM(alarm_list[i],i);
    }
}

function addToDOM(element,i){
    // displaying alarmlist values
    let x=$(`<li>
    <span>${element} </span>
    <input type="button" value="Delete" id=${i} onClick="Delete(${i})">
    </li> 
    `);
    list.append(x);
}


// element for current-time


function ctime(){
    let currentTime=new Date();
    currentTime=currentTime.toLocaleTimeString('en-US');
    $(`#ctime`).text(currentTime)
    for(let i=0;i<alarm_list.length;i++){
       if(alarm_list[i]===currentTime){
        window.alert("Wake Up!");
        Delete(i);
        render();
       }
    } 
}

//delete funtion
function Delete(id){
    console.log(id);
    alarm_list.splice(id,1);
    console.log(alarm_list);
    render();
}
// interval setting
setInterval(ctime,1000);
