////////// Escuchar el evento "load" de la ventana emergente
window.addEventListener("load", () => {
    // Obtener la URL actual
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      let currentUrl = tabs[0].url;
      console.log('La url que se obtuvo es :'+tabs[0].url);
      // Verificar si la URL está bloqueada y actualizar el estado del botón
      chrome.runtime.sendMessage({action: "isUrlBlocked", url: currentUrl}, (response) => {
        
        if (response && response.isBlocked) {
          let isBlocked = response.isBlocked;
          let blockButton = document.getElementById("blockButton");
          let unblockButton = document.getElementById("unblockButton");
          // Actualizar el estado de los botones
          if (isBlocked) {
            console.log('La url esta bloqueada '+ currentUrl)
            blockButton.disabled = true;
            unblockButton.disabled = false;
          } else {
            console.log('La url esta desbloqueada '+ currentUrl)
            blockButton.disabled = false;
            unblockButton.disabled = true;
          }
        }
        
      });
    });
  
/////// Escuchar el evento "click" del botón de bloqueo
    document.getElementById("blockButton").addEventListener("click", () => {
      // Obtener la URL actual
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        let currentUrl = tabs[0].url;
        // Bloquear la URL
        chrome.runtime.sendMessage({action: "blockUrl", url: currentUrl}, (response) => {
          // Actualizar el estado de los botones
          document.getElementById("blockButton").disabled = true;
          document.getElementById("unblockButton").disabled = false;
        });
      });
    });
  
////// Escuchar el evento "click" del botón de desbloqueo
    document.getElementById("unblockButton").addEventListener("click", () => {
      // Obtener la URL actual
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        let currentUrl = tabs[0].url;
        // Desbloquear la URL
        chrome.runtime.sendMessage({action: "unblockUrl", url: currentUrl}, (response) => {
          // Actualizar el estado de los botones
          document.getElementById("blockButton").disabled = false;
          document.getElementById("unblockButton").disabled = true;
        });
      });
    });
  
///// Escuchar el evento "click" del botón de agregar cookie esencial
    document.getElementById("addCookieButton").addEventListener("click", () => {
      // Obtener el nombre de la cookie esencial
      let cookieName = document.getElementById("cookieName").value;
      console.log('Se quiere añadir la cookie : '+ cookieName);
      // Agregar la cookie esencial
      chrome.runtime.sendMessage({action: "addEssentialCookie", cookieName: cookieName}, (response) => {
        // Actualizar el mensaje de estado
        document.getElementById("statusMessage").textContent = response.message;
      });
    });
  
///// Escuchar el evento "click" del botón de eliminar cookie esencial
    document.getElementById("removeCookieButton").addEventListener("click", () => {
      // Obtener el nombre de la cookie esencial
      let cookieName = document.getElementById("cookieName").value;
      console.log('Se quiere eliminar la cookie : '+ cookieName);
      // Eliminar la cookie esencial
      chrome.runtime.sendMessage({action: "removeEssentialCookie", cookieName: cookieName}, (response) => {
        // Actualizar el mensaje de estado
        document.getElementById("statusMessage").textContent = response.message;
      });
    });
  });