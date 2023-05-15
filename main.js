import './style.css'
document.addEventListener("DOMContentLoaded", (event) => {
let installButton = document.getElementById("installMe")
let notifButton = document.getElementById("sendNotif")
let pwaInfo = document.getElementById("pwaInfo")
let allowNotifButton = document.getElementById("allowNotif")
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  console.log("before install prompt fired")
  deferredPrompt = e;
});

//add an event to installButton to prompt for user to install the PWA
installButton.addEventListener("click", async (e) => {
  console.log("install button clicked")
  if (deferredPrompt !== null) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      deferredPrompt = null;
    }
  }
})

//add an event to the allowNotifButton to ask for permission to send notifications
allowNotifButton.addEventListener("click", (e) => {
  console.log("allow notif button clicked")
  Notification.requestPermission();
})

//add an event to notifButton to send a notification, but only if it has permission
notifButton.addEventListener("click", (e) => {
  console.log("notif button clicked")
  if (Notification.permission !== 'granted') {
    Notification.requestPermission();
  }
  let notification
  if (Notification.permission === 'granted') {
    notification = new Notification(`Hello !`, {
      body: 'we sent you something',
      // Other optional options: icon, badge, etc.
      icon: '/chad.png',
    });
  }
})

//add browser compatibility info to pwaInfo
//if permission is default, change the text
if (Notification.permission === 'default') {
  pwaInfo.innerHTML = `You have to grant permissions for notifications.`
  //disable the send notif button and make it gray
  notifButton.disabled = true
  notifButton.style.backgroundColor = "gray"
  //change cursor to indicate you can't click
  notifButton.style.cursor = "not-allowed"
} else if (Notification.permission === 'granted') {
  pwaInfo.innerHTML = `You ${window.Notification.permission} permissions for notifications.`
} else if (Notification.permission === 'denied') {
  pwaInfo.innerHTML = `You ${window.Notification.permission} permissions for notifications.`
  //disable the send notif button and make it gray
  notifButton.disabled = true
  notifButton.style.backgroundColor = "gray"
  //change cursor to indicate you can't click
  notifButton.style.cursor = "not-allowed"
}


//check if my browser is compatible with bluetooth api for the pwa
if ("bluetooth" in navigator) {
  pwaInfo.innerHTML += `<br>You have bluetooth support !`
}
else {
  pwaInfo.innerHTML += `<br>You don't have bluetooth support :(`
}

//check if my browser is compatible with orientation and sensors api for the pwa
if ("AbsoluteOrientationSensor" in window) {
  pwaInfo.innerHTML += `<br>You have orientation and sensors support !`
}
else {
  pwaInfo.innerHTML += `<br>You don't have orientation and sensors support :(`
}
});

