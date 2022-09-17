//window.open('popup.htm',"ventana-poup",'width=400,height=250');

function abrirpoup(){
    window.open('https://www.amazon.es/',"ventana-poup",'width=400,height=250');
    //document.getElementById('fusion-app').style.display = "none"
}
abrirpoup();

const popup = document.createElement("div");
popup.style.backgroundColor = "red";
popup.id = "popup";
popup.style.position = "absolute";
popup.style.height = "500px";
popup.style.width = "500px";
popup.textContent = "Esto es un div insertado con JS.";

const app = document.querySelector("#fusion-app"); // <div id="app">App</div>

app.insertAdjacentElement("beforebegin", popup);
//document.getElementsByClassName('ctn_head').inner;