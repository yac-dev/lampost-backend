import { sendPushNotification } from '../services/expo-push-sdk';

export const pushNotificationExperiment = async (request, response) => {
  try {
    const { pushToken } = request.body;

    sendPushNotification(pushToken);
  } catch (error) {
    console.log(error);
  }
};
