import { Expo } from 'expo-server-sdk';
const expo = new Expo();

export const sendPushNotification = async (expoPushToken) => {
  // Check that all your push tokens appear to be valid Expo push tokens
  if (!Expo.isExpoPushToken(expoPushToken)) {
    console.error(`expo-push-token is not a valid Expo push token`);
  }
  const messages = [];
  const message = {
    // 相手のpush tokenがここに入るのだろう。というか、複数のpush tokenだ。group chatだから。
    to: expoPushToken,
    title: 'Sent by my lampost backend server',
    body: 'This push notification was sent by a Lampost.',
    data: { message: 'Did you get this?' },
  };
  messages.push(message);
  const chunks = expo.chunkPushNotifications(messages);
  const tickets = [];

  try {
    (async () => {
      for (const chunk of chunks) {
        try {
          const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
          tickets.push(...ticketChunk);
        } catch (error) {
          console.error(error);
        }
      }
    })();
  } catch (error) {
    console.error(error);
  }
};
