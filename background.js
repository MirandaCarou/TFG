// Configuración inicial
/*
En esta sección se crean dos arrays vacíos, uno para almacenar las URLs bloqueadas y otro para almacenar
las cookies esenciales. Estas listas se utilizarán más adelante para determinar si se debe bloquear 
o permitir el acceso a una cookie.
*/
// Definir la lista de cookies no esenciales
let blockedUrls = [];
// Definir la lista de cookies esenciales
let essentialCookies = [];


//------------------------------------------------------------------------------------------------------------------------------
/*Aquí se escucha el evento de cambio de cookie, y se verifica si la cookie es esencial o no. Si la cookie no es esencial, se obtiene
  la URL del sitio web y se verifica si está bloqueada. Si la URL está bloqueada, se elimina la cookie.
*/
// Escucha los eventos de cambio de cookie y bloquea las cookies no esenciales
chrome.cookies.onChanged.addListener((changeInfo) => {
  // Solo bloquear cookies no esenciales
  if (!essentialCookies.includes(changeInfo.cookie.name)) {
    // Obtener la URL del sitio web
    let url = changeInfo.cookie.domain;
    console.log('La url del sitio web es: '+url);
    // Si la URL está bloqueada, eliminar la cookie
    if (blockedUrls.includes(url)) {
      chrome.cookies.remove({
        url: "https" + (changeInfo.cookie.secure ? "s" : "") + "://" + url + changeInfo.cookie.path,
        name: changeInfo.cookie.name
      }, (cookie) => {
        console.log("Cookie eliminada: ", cookie);
      });
    }
  }
});
//-------------------------------------------------------------------------------------------------------
/*
Aquí se escucha los mensajes enviados desde la ventana emergente. Si el mensaje enviado es para bloquear una URL, 
se agrega la URL a la lista de URLs bloqueadas. Si el mensaje enviado es para desbloquear una URL, se busca la URL 
en la lista de URLs bloqueadas y se elimina si está presente. Si el mensaje enviado es para agregar una cookie esencial,
 se agrega el nombre de la cookie a la lista de cookies esenciales. Si el mensaje enviado es para eliminar una cookie esencial,
  se busca el nombre de la cookie en la lista de cookies esenciales y se elimina si está presente.
*/
// Escucha los mensajes de la ventana emergente
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "blockUrl") {
    blockedUrls.push(request.url);
    sendResponse({message: "URL bloqueada"});
  } else if (request.action === "unblockUrl") {
    let index = blockedUrls.indexOf(request.url);
    if (index > -1) {
      blockedUrls.splice(index, 1);
    }
    sendResponse({message: "URL desbloqueada"});
  } else if (request.action === "addEssentialCookie") {
    essentialCookies.push(request.cookieName);
    sendResponse({message: "Cookie esencial agregada"});
  } else if (request.action === "removeEssentialCookie") {
    let index = essentialCookies.indexOf(request.cookieName);
    if (index > -1) {
      essentialCookies.splice(index, 1);
    }
    sendResponse({message: "Cookie esencial eliminada"});
  }
});