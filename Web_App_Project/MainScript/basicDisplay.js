var toggleOnEl = document.querySelector("#toggle-on");
var toggleOffEl = document.querySelector("#toggle-off");
var sidenavEl = document.querySelector(".sidenav");
var num = 1;

//navbar behavior
function slide(){
    sidenavEl.classList.toggle("nav-on");
    if(num == 1){
        toggleOnEl.style.visibility = "hidden";
        toggleOffEl.style.visibility = "visible";
        num++;
    }
    else{
        toggleOnEl.style.visibility = "visible";
        toggleOffEl.style.visibility = "hidden";
        num--;
    }
}

toggleOffEl.onclick = slide;
toggleOnEl.onclick = slide;

//date display
var dateEl = document.querySelector("#date");

function dateDisplay(){
    var today = new Date()
    var strDate = today.toLocaleDateString("cn-HK");
    dateEl.textContent = strDate
}




