const notificationSound = new Audio("/audio/notification-sound.mp3");

export function playNotificationSound() {
  notificationSound.currentTime = 0;

  notificationSound.play().catch(() => {
    console.log("Notification sound couldn't be played");
  });
}
