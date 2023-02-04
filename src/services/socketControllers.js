import Library from '../models/library';
import LibraryAndUserRelationship from '../models/libraryAndUserRelationship';
import Meetup from '../models/meetup';
import User from '../models/user';
import LoungeChat from '../models/loungeChat';
import { Expo } from 'expo-server-sdk';
const expo = new Expo();

// どうしようか。group chatって、連絡がおおくなると面倒だよね。launcherにだけpush tokenを送る感じかな。。。あとは、返信ありにすると、その人にも
const sendPushNotification = async (expoPushToken, content, meetupId) => {
  // Check that all your push tokens appear to be valid Expo push tokens
  if (!Expo.isExpoPushToken(expoPushToken)) {
    console.error(`expo-push-token is not a valid Expo push token`);
  }
  const messages = [];
  const message = {
    to: expoPushToken,
    data: { notificationType: 'loungeChat', meetupId },
    title: 'You got chat message',
    body: content,
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

export const createLoungeChat = async (io, socket, data) => {
  const loungeChat = await LoungeChat.create({
    meetup: data.meetupId,
    user: data.user._id,
    content: data.content,
    type: data.type,
    createdAt: new Date(),
    replyTo: data.replyTo ? data.replyTo._id : null,
  });

  const loungeChatObject = {
    meetup: loungeChat.meetup,
    user: {
      _id: data.user._id,
      name: data.user.name,
      photo: data.user.photo,
    },
    content: loungeChat.content,
    type: loungeChat.type,
    createdAt: loungeChat.createdAt,
    replyTo: data.replyTo
      ? {
          user: {
            _id: data.replyTo.user._id,
            name: data.replyTo.user.name,
          },
          createdAt: data.replyTo.createdAt,
          content: data.replyTo.content,
        }
      : null,
  };

  io.in(data.meetupId).emit('I_GOT_A_CHAT_IN_THE_ROOM', loungeChatObject);
  if (data.launcher) {
    const launcher = await User.findById(data.launcher);
    sendPushNotification(launcher.pushToken, data.content, data.meetupId); // ここで、laucher、もしくはattendeesにchatを送るようにする。
  }
  // else {
  //   // if(data.replyTo){
  //   // } // ここはいいや。送り主がlauncherで、かつreplytoがない場合は、members全員にsendnotificationを送りたい。launcherによる全員への通知っていう感じ。
  // }
  if (data.replyTo) {
    const user = await User.findById(data.replyTo.user._id);
    sendPushNotification(user.pushToken, data.content, data.meetupId);
  }
  // socket.broadcast.to(data.meetupId).emit('I_GOT_A_CHAT_OUT_OF_THE_ROOM.GO_CHECK_OUT_THE_LOUNGE', loungeChatObject);
  // io.in(data.meetupId).emit('I_GOT_A_CHAT_OUT_OF_THE_ROOM.GO_CHECK_OUT_THE_LOUNGE', loungeChatObject);
};
