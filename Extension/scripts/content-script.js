//window.open('popup.htm',"ventana-poup",'width=400,height=250');

function abrirpoup(){
    window.open('https://www.amazon.es/',"ventana-poup",'width=400,height=250');
    //document.getElementById('fusion-app').style.display = "none"
}
abrirpoup();

const popup = document.createElement("div");
popup.style.backgroundColor = "blue"
popup.id = "popup";
popup.style.marginLeft = "35%";
popup.style.backgroundImage = "url('imagen.png')";
popup.style.zIndex = "10000";
popup.style.position = "absolute";
popup.style.height = "500px";
popup.style.width = "500px";
popup.textContent = "Esto es un div insertado con JS.";

const app = document.querySelector("#fusion-app");
app.insertAdjacentElement("beforebegin", popup);

//const infocookie = document.querySelector("#didomi-host");
 var a = document.getElementById("didomi-host");
 a.style.display = "none";


