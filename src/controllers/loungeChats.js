import LoungeChat from '../models/loungeChat';
import Meetup from '../models/meetup';

export const getMyLoungeStatus = async (request, response) => {
  try {
    const myUpcomingMeetupAndChatsTable = {};
    const { myUpcomingMeetups } = request.body;
    // [ {meetup: 'meetupId', viewedChatsLastTime: 2022/9/3 20:00},
    //   {meetup: 'meetupid', viewedChatsLastTime: 2022/10/12 03:21} ] //みたいな感じ
    for (let i = 0; i < myUpcomingMeetups.length; i++) {
      myUpcomingMeetupAndChatsTable[myUpcomingMeetups[i].meetup] = {}; // { meetupId: {} }を作る。
      myUpcomingMeetupAndChatsTable[myUpcomingMeetups[i].meetup]._id = myUpcomingMeetups[i].meetup;
      // { meetupのId: {_id: 'meetupのId'}}
      myUpcomingMeetupAndChatsTable[myUpcomingMeetups[i].meetup].viewedChatsLastTime =
        myUpcomingMeetups[i].viewedChatsLastTime;
      // { meetupのId: { _id: 'meetupのId', viewedChatsLastTime: '2022/9/1'} }
      myUpcomingMeetupAndChatsTable[myUpcomingMeetups[i].meetup].unreadChatsCount = 0;
      // myUpcomingMeetupAndChatsTable[myUpcomingMeetups[i].meetup].chats = [];
      // { meetupのId: { _id: 'meetupのId', viewedChatsLastTime: '2022/9/1', unreadChatsCount: 0} }
    }
    // ここまでで、objectの準備をする。

    const upcomingMeetupIds = myUpcomingMeetups.map((meetupObject) => {
      return meetupObject.meetup;
    });

    const meetups = await Meetup.find({ _id: { $in: upcomingMeetupIds } }).select({
      title: 1,
      startDateAndTime: 1,
      launcher: 1,
      state: 1,
    });
    // [{_id: 111, title: '', startDateAndTime: 2022/9/1}, {_id: 222, title: '', startDateAndTime: 2022/8/1}]
    // {
    //  111: { _id: 111, title: '', startDateAndTime: 2022/9/1, chats: [], viewedChatsLastTime: '' },
    //  222: { _id: 222, title: '', startDateAndTime: 2022/8/1, chats: [], viewedChatsLastTime: '' }
    // }
    for (let i = 0; i < meetups.length; i++) {
      myUpcomingMeetupAndChatsTable[meetups[i]._id].title = meetups[i].title;
      myUpcomingMeetupAndChatsTable[meetups[i]._id].startDateAndTime = meetups[i].startDateAndTime;
      myUpcomingMeetupAndChatsTable[meetups[i]._id].launcher = meetups[i].launcher;
      myUpcomingMeetupAndChatsTable[meetups[i]._id].state = meetups[i].state;
      // myUpcomingMeetupAndChatsTable[meetups[i]._id].chats = [];
    }
    // loungechatsのcollectionから、upcomingのmeetupのやつだけまず取ってくる。
    const loungeChats = await LoungeChat.find({ meetup: { $in: upcomingMeetupIds } }).populate({
      path: 'user',
      select: 'name photo',
    });
    for (let i = 0; i < loungeChats.length; i++) {
      // myUpcomingMeetupAndChatsTable[loungeChats[i].meetup]['chats'].push(loungeChats[i]);
      //そのloungechatsが該当するmeetuptableのlastviewedより、loungechatsのcreatedが新しい場合、unreadをinrementする。
      if (
        new Date(myUpcomingMeetupAndChatsTable[loungeChats[i].meetup].viewedChatsLastTime) <
        new Date(loungeChats[i].createdAt)
      ) {
        myUpcomingMeetupAndChatsTable[loungeChats[i].meetup].unreadChatsCount++;
        // myUpcomingMeetupAndChatsTable['totalUnreadChatsCount']++;
      }
    }
    response.status(200).json({
      myUpcomingMeetupAndChatsTable,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getLoungeChats = async (request, response) => {
  try {
    const loungeChats = await LoungeChat.find({ meetup: request.params.meetupId }).populate({
      path: 'user',
      select: '_id name photo',
    });
    response.status(200).json({
      loungeChats,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSelectedMeetupLoungeChats = async (request, response) => {
  try {
    const loungeChats = await LoungeChat.find({ meetup: request.params.meetupId })
      .populate({
        path: 'user',
        select: 'name photo',
      })
      .populate({
        path: 'replyTo',
        select: 'content user createdAt',
        populate: { path: 'user', select: 'name photo' },
      });
    response.status(200).json({
      loungeChats,
    });
  } catch (error) {
    console.log(error);
  }
};
