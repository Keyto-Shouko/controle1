import './style.css'

let installButton = document.getElementById("installMe")
let notifButton = document.getElementById("sendNotif")
let pwaInfo = document.getElementById("pwaInfo")
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  deferredPrompt = e;
});

//add an event to installButton to prompt for user to install the PWA
installButton.addEventListener("click", async(e) => {
  console.log("install button clicked")
  if (deferredPrompt !== null) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
        deferredPrompt = null;
    }
}
})

//add an event to notifButton to send a notification
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
pwaInfo.innerHTML = `You ${window.Notification.permission} permissions for notifications.`

