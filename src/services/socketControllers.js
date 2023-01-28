import Library from '../models/library';
import LibraryAndUserRelationship from '../models/libraryAndUserRelationship';
import Meetup from '../models/meetup';
import User from '../models/user';
import LoungeChat from '../models/loungeChat';

export const createLoungeChat = async (io, data) => {
  const loungeChat = await LoungeChat.create({
    meetup: data.meetupId,
    user: data.user._id,
    content: data.content,
    type: data.type,
    createdAt: new Date(),
  });

  const loungeChatObject = {
    meetup: loungeChat.meetup,
    user: {
      name: data.user.name,
      photo: data.user.photo,
    },
    content: loungeChat.content,
    type: loungeChat.type,
    createdAt: loungeChat.createdAt,
  };

  io.in(data.meetupId).emit('I_GOT_A_CHAT_IN_THE_ROOM', loungeChatObject);
  io.in(data.meetupId).emit('I_GOT_A_CHAT_OUT_OF_THE_ROOM.GO_CHECK_OUT_THE_LOUNGE', loungeChatObject);
};
