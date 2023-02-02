import User from '../models/user';
import Badge from '../models/badge';
import Meetup from '../models/meetup';
import Asset from '../models/asset';
import { uploadAvatar } from '../services/s3';

export const getUser = async (request, response) => {
  try {
    const user = await User.findById(request.params.id);
    // .populate({
    //   path: 'badges',
    //   model: BadgeStatus,
    //   populate: {
    //     path: 'badge',
    //     model: Badge,
    //   },
    // });
    response.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addBadges = async (request, response) => {
  try {
    // array of objectsを作らないといかん。
    const { badgeIds } = request.body;
    console.log(badgeIds);
    const arr = badgeIds.map((badgeId) => {
      return { badge: badgeId, totalVotes: 0 };
    });

    const user = await User.findById(request.params.id);
    let badgeStatuses = await BadgeStatus.create(arr); // create populateって無理なのかね。。。まあいいか。
    // 再度queryするしかないな。
    const bss = await BadgeStatus.find({
      _id: {
        $in: badgeStatuses.map((badgeStatus) => {
          return badgeStatus._id;
        }),
      },
    });
    // console.log(badgeStatuses);
    user.badges.push(...badgeStatuses);
    user.save();
    // badgeStatuses = await badgeStatuses.populate('badge').execPopulate();
    // console.log(badgeStatuses);
    response.status(200).json({
      badges: bss,
    });
  } catch (error) {
    console.log(error);
  }
};

// これ, userではなくmeetup側にcontrollerを設定した方がいいわ。紛らわしい。
export const getPastMeetups = async (request, response) => {
  try {
    const user = await User.findById(request.params.id)
      .select({ pastMeetups: 1, assets: 1, badge: 1 })
      .populate({
        path: 'pastMeetups',
        model: Meetup,
        populate: [
          {
            path: 'assets',
            model: Asset,
          },
          {
            path: 'badge',
            model: Badge,
          },
          {
            path: 'launcher',
            model: User,
          },
        ],
      });

    response.status(200).json({
      pastMeetups: user.pastMeetups,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserAssets = async (request, response) => {
  try {
    const assets = await Asset.find({ createdBy: request.params.id });
    response.status(200).json({
      assets,
    });
  } catch (error) {
    console.log(error);
  }
};

export const editProfilePhoto = async (request, response) => {
  try {
    const user = await User.findById(request.params.id);
    user.photo = `https://lampost-${process.env.NODE_ENV}.s3.us-east-2.amazonaws.com/avatars/${request.file.filename}`;
    user.save();
    uploadAvatar(request.file.filename);
    console.log('this is the body data', request.body);
    console.log('this is the file name', request.file.filename);
    response.status(200).json({
      photo: user.photo,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateViewedChatsLastTime = async (request, response) => {
  try {
    console.log(request.body);
    const user = await User.findById(request.params.id);
    // const up = user.upcomingMeetups.forEach((meetupObject) => {
    //   if (meetupObject.meetup === request.body.meetupId) {
    //     meetupObject.viewedChatsLastTime = request.body.dateTime;
    //   }
    // });
    for (let i = 0; i < user.upcomingMeetups.length; i++) {
      if (user.upcomingMeetups[i].meetup.toString() === request.body.meetupId) {
        user.upcomingMeetups[i].viewedChatsLastTime = request.body.dateTime;
      }
    }
    user.save();
    response.status(200).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};
