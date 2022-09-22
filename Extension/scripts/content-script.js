//window.open('popup.htm',"ventana-poup",'width=400,height=250');
/* 
function abrirpoup(){
    window.open('https://www.amazon.es/',"ventana-poup",'width=400,height=250');
    //document.getElementById('fusion-app').style.display = "none"
}
abrirpoup();
*/

/*
//const infocookie = document.querySelector("#didomi-host");
 var a = document.getElementById("didomi-host");
 a.style.display = "none";
*/

//INTENTO CON ADDLISTENER
/**
 function aceptarCookies(){ 
    if(document.getElementById("didomi-notice-agree-button")){
        const a = document.getElementById("didomi-notice-agree-button");
        a.click();
        disponible = true;
    }else{
        console.log("Aqui aun no cargo la pagina a tiempo");
        disponible = false;
    }  
}

function temporizador() {
    identificadorTiempoDeEspera = setTimeout(aceptarCookies, 200);
}
function comprobarDisponibilidad() {
    while(disponible != true){
        temporizador();
    }  
}

document.body.addEventListener("onload",comprobarDisponibilidad);

 */
let identificadorTiempoDeEspera;
let cookiesAceptadas = false;

function mostrarPopup() {
    const popup = document.createElement("div");
    popup.style.backgroundColor = "red"
    popup.id = "popup";
    popup.style.marginLeft = "35%";
    popup.style.backgroundImage = "url('imagen.png')";
    popup.style.zIndex = "10000";
    popup.style.position = "absolute";
    popup.style.height = "250px";
    popup.style.width = "250px";
    popup.textContent = "Enorabuena se han aceptado las cookies";
    const app = document.querySelector("#fusion-app");
    app.insertAdjacentElement("beforebegin", popup);
}

function aceptarCookies(){
    const a = document.getElementById("didomi-notice-agree-button");
    console.log(a);
    a.click();   
}

function temporizadorDeRetraso(cookiesAceptadas) {
    if(!cookiesAceptadas){
        identificadorTiempoDeEspera = setTimeout(comprobarDisponibilidad, 200);
    }   
}
function comprobarDisponibilidad() {
    if(document.getElementById("didomi-notice-agree-button")){
        aceptarCookies();
        cookiesAceptadas = true;
        //mostrarPopup();
    }else{
        console.log("Aqui aun no cargo la pagina a tiempo");
        temporizadorDeRetraso();
    }
    
}
temporizadorDeRetraso();