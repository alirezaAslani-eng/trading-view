import { createAudio } from "@/v2-architecture/src/shared/utils";

const notificationSound = createAudio("/audio/notification-sound.mp3")!;

export function playNotificationSound() {
  notificationSound.currentTime = 0;

  notificationSound.play().catch(() => {
    console.log("Notification sound couldn't be played");
  });
}
